exports.config = {
    directConnect: true,

    framework: 'jasmine2',

    specs: [
        'spec.js'
    ],

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            // 'args': ['show-fps-counter=true']
            args: ['--test-type']
        }
    },
    onPrepare: function() {
        // ***************Jsamine spec reporter***************

        var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv().addReporter(new SpecReporter({
            displayStacktrace: 'specs'
        }));
        // ***************Jsamine spec reporter***************
        // ***************jasmine-json-test-reporter***************
        var JSONReporter = require('jasmine-json-test-reporter');

        jasmine.getEnv().addReporter(new JSONReporter({
            file: 'report.json',
            beautify: true,
            indentationLevel: 4
        }));

        // ***************jasmine-json-test-reporter***************
        // ***************jasmine-reporter***************



        // returning the promise makes protractor wait for the reporter config before executing tests 
        return browser.getProcessedConfig().then(function(config) {
            var jasmineReporters = require('jasmine-reporters');
            // you could use other properties here if you want, such as platform and version 
            var browserName = config.capabilities.browserName;

            var junitReporter = new jasmineReporters.JUnitXmlReporter({
                consolidateAll: true,
                savePath: 'testresults',
                filePrefix: 'report',
                modifyReportFileName: function(generatedFileName, suite) {
                    // this will produce distinct file names for each capability, 
                    // e.g. 'firefox.SuiteName' and 'chrome.SuiteName' 
                    return browserName + '.' + generatedFileName;
                }
            });
            jasmine.getEnv().addReporter(junitReporter);
        });

        //***************jasmine-reporter***************

    }
};