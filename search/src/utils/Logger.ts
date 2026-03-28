import winston, { transports } from 'winston';

import loadConfig from '../../loadConfig';

export class Logger {
  private static logger = winston.createLogger({
    level: loadConfig.logger.minimalLevel,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ level, message, timestamp }) => {
        return `${timestamp} [${level}]: ${message}`;
      })
    ),
    transports: [new transports.Console()],
  });

  static debug(message: string) {
    try {
      Logger.logger.log('debug', message);
    } catch (e) {
      console.log('console:debug', message);
      console.log('console:debug:logging error', e.message);
    }
  }
  static info(message: string) {
    try {
      Logger.logger.log('info', message);
    } catch (e) {
      console.log('console:info', message);
      console.log('console:info:logging error', e.message);
    }
  }
  static error(message: string) {
    try {
      Logger.logger.log('error', message);
    } catch (e) {
      console.log('console:error', message);
      console.log('console:error:logging error', e.message);
    }
  }
  static warn(message: string) {
    try {
      Logger.logger.log('warn', message);
    } catch (e) {
      console.log('console:warn', message);
      console.log('console:warn:logging error', e.message);
    }
  }
}
