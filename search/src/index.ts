import { AppManagement } from './AppManagement';
import { Logger } from './utils';

const appManagement = new AppManagement();
appManagement.start();

process.on('uncaughtException', (err) => {
  Logger.warn(`Caught exception: ${err}. ${err.stack}`);
});

process.on('SIGTERM', async (code) => {
  Logger.warn(`About to SIGTERM with code: ${code}`);
  await appManagement.shutdown();
});

process.on('SIGINT', async (code) => {
  Logger.warn(`About to SIGINT with code: ${code}`);
  await appManagement.shutdown();
});
