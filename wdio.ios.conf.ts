import 'dotenv/config';
import { config as baseConfig } from './wdio.conf';

export const config = {
    ...baseConfig,
    hostname: undefined,
    port: undefined,
    path: undefined,
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: ['browserstack'],
    reporters: baseConfig.reporters,
    capabilities: [{
        platformName: 'iOS',
        'appium:platformVersion': '16',
        'appium:deviceName': 'iPhone 13',
        'appium:app': process.env.BS_APP_URL,
        'appium:automationName': 'XCUITest',
        'appium:bundleId': 'com.example.iosapp'
    }],
};
