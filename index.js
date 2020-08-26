const cypress = require('cypress');
const dotenv = require('dotenv');
const cron = require('node-cron');
const notifier = require('node-notifier');

const logger = console;

dotenv.config();
const { SCHEDULE } = process.env;

if (SCHEDULE) {
  cron.schedule(SCHEDULE, main);
} else {
  main();
}

async function main() {
  const { REFERENCE_NO, LAST_NAME, EMAIL, TARGET_MONTH } = process.env;

  logger.info(`Starting automated appointment check [${Date()}]`);

  const result = await cypress.run({
    browser: 'chrome',
    headless: true,
    quiet: true,
    config: {
      video: false,
    },
    env: {
      referenceNo: REFERENCE_NO,
      lastName: LAST_NAME,
      email: EMAIL,
      targetMonth: TARGET_MONTH,
    },
  });

  const isAlarmMode = result.totalPassed === 1;
  const message = isAlarmMode
    ? `✅ Free slot for ${TARGET_MONTH} is available!`
    : `❌ No dates are available for ${TARGET_MONTH}`;

  logger.info(message);

  notifier.notify({
    title: 'VFS Global',
    message,
    sound: isAlarmMode ? 'Hero' : 'Basso',
    wait: true,
  });
}
