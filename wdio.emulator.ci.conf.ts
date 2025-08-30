import type { Options } from '@wdio/types'
require('dotenv').config();

export const config = {
    runner: 'local',
    // autoCompileOpts removed: handled by wdio v7+ or ts-node/register in service

    port: 4723,

    specs: [
        './test/specs/**/*.ts'
    ],
    exclude: [
        './test/specs/e2e/**/*.ts'
    ],

    maxInstances: 1, // Single instance for CI stability

    capabilities: [{
        platformName: 'android',
        'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'emulator-5554',
        // Use the detected API level, or fallback to device UDID for more flexibility
        ...(process.env.ANDROID_PLATFORM_VERSION && { 'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION }),
        'appium:automationName': 'UiAutomator2',
        'appium:udid': process.env.ANDROID_UDID || 'emulator-5554',
        'appium:app': 'app/InvoiceSimple.apk',
        'appium:autoGrantPermissions': true,
        'appium:fullReset': true, // Full reset for clean CI state
        'appium:noReset': false,
        'appium:shouldTerminateApp': true,
        'appium:autoAcceptAlerts': true,
        'appium:autoDismissAlerts': true,
        'appium:disableWindowAnimation': true,
        // CI-specific timeouts and optimizations
        'appium:newCommandTimeout': 300,
        'appium:waitForIdleTimeout': 5000,
        'appium:androidInstallTimeout': 90000,
        'appium:unicodeKeyboard': true,
        'appium:resetKeyboard': true
    }],

    logLevel: 'info',
    bail: 0,

    // Extended timeouts for CI environment
    waitforTimeout: 15000,
    connectionRetryTimeout: 180000,
    connectionRetryCount: 3,

    services: ['appium', 'visual'],

    framework: 'mocha',

    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 900000 // 15 minutes for CI
    },

    // Global hooks
    onPrepare: function () {
        console.log('Starting CI test execution on Android Emulator...');
        console.log('Platform: Android');
        console.log('Target: Emulator');
        console.log('API Level:', process.env.ANDROID_PLATFORM_VERSION || '29');
    },

    onComplete: function () {
        console.log('CI test execution completed');
    },

    // Screenshot on failure
    afterTest: async function (test, _context, { passed }) {
        if (!passed) {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const screenshotPath = `./screenshots/${test.parent}-${test.title}-${timestamp}.png`;

            try {
                await (global as any).driver.saveScreenshot(screenshotPath);
                console.log(`Screenshot saved: ${screenshotPath}`);
            } catch (screenshotError) {
                console.log('Failed to take screenshot:', screenshotError);
            }
        }
    }
}

