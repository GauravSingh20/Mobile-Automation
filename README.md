# Mobile Automation Framework

A robust, cross-platform mobile automation framework built with WebdriverIO, Appium, and BrowserStack. Designed for scalable, maintainable end-to-end (E2E) testing of Android and iOS applications, supporting both local and cloud execution.

---

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Environment Variables](#environment-variables)
- [Reporting](#reporting)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Dependencies](#dependencies)
- [License](#license)

---

## Features
- **Cross-platform support:** Android, iOS, iPad
- **WebdriverIO v9** with TypeScript for modern, type-safe automation
- **Appium integration** for device automation (local and remote)
- **BrowserStack cloud execution** for scalable device testing
- **Mocha test framework** for flexible test authoring
- **Allure reporting** for rich, interactive test reports
- **Page Object Model (POM)** for maintainable, reusable test code
- **Environment variable support** for secure, flexible configuration
- **Extensible structure** for easy addition of new platforms, devices, or test suites

---

## Project Structure
```
MobileAutomation/
├── package.json
├── tsconfig.json
├── wdio.conf.ts                # Base WebdriverIO config
├── wdio.android.conf.ts        # Android-specific config (BrowserStack)
├── wdio.ios.conf.ts            # iOS-specific config (BrowserStack)
├── wdio.ipad.conf.ts           # iPad config (Appium, commented)
├── logs/                       # Log files
│   └── bstack-wdio-service.log
│   └── performance-report/
├── test/
│   ├── pageobjects/            # Page Object files (add your page classes here)
│   └── specs/                  # Test specs
│       └── test.e2e.ts         # Example test spec
└── allure-report/              # Allure HTML reports (generated)
```

---

## Prerequisites
- **Node.js** (v16 or later recommended)
- **npm** (v8 or later)
- **Appium** (for local device execution)
- **BrowserStack account** (for cloud execution)
- **Java JDK** (for Appium, Android)
- **Xcode** (for iOS local execution)

---

## Setup & Installation
1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd MobileAutomation
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Install Appium (for local runs):**
   ```sh
   npm install -g appium
   ```
4. **Install Allure CLI (for reporting):**
   ```sh
   npm install -g allure-commandline --save-dev
   ```

---

## Configuration
- **Base config:** `wdio.conf.ts` defines main WebdriverIO settings, test specs, and runner options.
- **Platform configs:**
  - `wdio.android.conf.ts` and `wdio.ios.conf.ts` extend the base config for BrowserStack cloud execution.
  - `wdio.ipad.conf.ts` (commented) is an example for local Appium execution on iPad.
- **TypeScript:** Configured via `tsconfig.json` for strict type checking and compatibility with WebdriverIO.
- **Environment variables:** See [Environment Variables](#environment-variables) for required values.

---

## Running Tests

### Android (BrowserStack)
```sh
npx wdio run wdio.android.conf.ts
```

### iOS (BrowserStack)
```sh
npx wdio run wdio.ios.conf.ts
```

### iPad (Local Appium, Example)
Uncomment and configure `wdio.ipad.conf.ts` as needed, then run:
```sh
npx wdio run wdio.ipad.conf.ts
```

#### Tips
- Ensure all required environment variables are set before running tests.
- For local Appium runs, make sure Appium server is running and devices are connected.
- For BrowserStack, ensure your credentials and app URL are correct.

---

## Writing Tests
- Place your test specs in `test/specs/` (see `test.e2e.ts` for a template).
- Use the Page Object Model: add page classes in `test/pageobjects/` and import them in your specs.
- Example test spec:
  ```ts
  import LoginPage from '../pageobjects/login.page';
  describe('Login Test', () => {
    it('should login successfully', async () => {
      await LoginPage.open();
      await LoginPage.login('user', 'pass');
      // Add assertions here
    });
  });
  ```
- Example page object:
  ```ts
  class LoginPage {
    get username() { return $('~username'); }
    get password() { return $('~password'); }
    get loginBtn() { return $('~login'); }
    async open() { await browser.url('/login'); }
    async login(user, pass) {
      await this.username.setValue(user);
      await this.password.setValue(pass);
      await this.loginBtn.click();
    }
  }
  export default new LoginPage();
  ```

---

## Environment Variables
Create a `.env` file in the project root with the following variables:
```
BROWSERSTACK_USERNAME=your_browserstack_username
BROWSERSTACK_ACCESS_KEY=your_browserstack_access_key
BS_APP_URL=bs://<app-id>
# For local Appium/iOS:
APPIUM_UDID=your_device_udid
XCODEORGID=your_xcode_org_id
IOS_APP_PATH=path_to_your_app.ipa
```
- **Note:** Never commit your `.env` file or secrets to version control.

---

## Reporting
- Allure reports are supported via `@wdio/allure-reporter`.
- After running tests, generate the report:
  ```sh
  npx allure generate ./allure-results --clean -o ./allure-report
  npx allure open ./allure-report
  ```
- The HTML report will open in your browser, showing test results, steps, screenshots, and logs.

---

## Troubleshooting
- **Logs:** Check logs in the `logs/` directory for BrowserStack/Appium issues.
- **Environment:** Ensure all environment variables are set correctly.
- **Devices:** For device-specific issues, verify device names, platform versions, and app URLs.
- **Common Issues:**
  - App not launching: Check app URL, device UDID, and Appium server status.
  - Test failures: Review Allure report and logs for stack traces and screenshots.
  - Dependency errors: Run `npm install` to ensure all packages are installed.

---

## Contributing
1. Fork the repository and create your branch from `main`.
2. Add your feature or bugfix with clear, descriptive commits.
3. Add/modify tests as needed.
4. Run tests locally to verify.
5. Submit a pull request with a clear description of your changes.

---

## Dependencies
- [WebdriverIO](https://webdriver.io/) v9
- [Appium](https://appium.io/)
- [BrowserStack](https://www.browserstack.com/)
- [Mocha](https://mochajs.org/)
- [Allure Reporter](https://docs.qameta.io/allure/)
- [dotenv](https://www.npmjs.com/package/dotenv)

---
