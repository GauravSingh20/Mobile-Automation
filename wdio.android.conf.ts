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
        platformName: 'Android',
        'appium:platformVersion': '13.0',
        'appium:deviceName': 'Google Pixel 7',
        'appium:app': process.env.BS_APP_URL,
        'appium:automationName': 'UIAutomator2',
        'appium:appPackage': 'com.aadhk.woinvoice'
    }],
};
