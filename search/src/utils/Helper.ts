import { Logger, ExceptionalExecutionError } from './';

export class Helper {
  public static getCurrentUTCDate(minutesToAdd: number = 0): Date {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutesToAdd);
    return date;
  }

  public static getCurrentUTCDateSqlFormat(minutesToAdd: number = 0): string {
    const date = Helper.getCurrentUTCDate(minutesToAdd);
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

  public static toDataString = (obj, depth = 5) => {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }
    if (depth === 0) {
      return typeof obj;
    }
    let string = '[';
    for (const key of Object.keys(obj)) {
      if (obj[key] && typeof obj[key] === 'object') {
        string += `${key}=${Helper.toDataString(obj[key], depth - 1)};`;
        continue;
      }
      string += `${key}=${obj[key]};`;
    }
    string += ']';
    return string;
  };

  public static printObjectSummary = (obj: any) => {
    const notPrintKeys = ['token', 'password'];
    try {
      if (!obj || typeof obj !== 'object') return;
      let string = '';

      // Set default value for indentation
      // Iterate through object properties
      for (const key of Object.keys(obj)) {
        let value = obj[key];

        // Print key and indentation
        //console.log(" ".repeat(indent) + key + ": ");
        if (typeof value === 'function' || key === 'logger') continue;
        if (notPrintKeys.includes(key)) {
          if (typeof value === 'string') {
            value = `${value.substring(0, 4)}...${value.substring(value.length - 4)}`;
          } else {
            value = 'hidden';
          }
        }
        string += `[${key}: `;

        // Print value
        if (typeof value === 'object' && value != null) {
          // If value is an object, print summary of object
          let valueToSend = value;
          if (Array.isArray(valueToSend)) {
            string +=
              Helper.printObjectSummary(valueToSend.splice(0, 10)) +
              ` (size: ${valueToSend.length})...] `;
          } else {
            if (Object.keys(valueToSend).length > 10) {
              let miniValueToSend = {};
              for (const _k of Object.keys(valueToSend)) {
                if (Object.keys(miniValueToSend).length >= 10) break;
                miniValueToSend[_k] = valueToSend[_k];
              }
              string +=
                Helper.printObjectSummary(miniValueToSend) +
                ` (size: ${Object.keys(valueToSend).length})...] `;
            } else {
              string += Helper.printObjectSummary(valueToSend) + '] ';
            }
          }
        } else {
          // If value is not an object, print value as string
          if (String(value).length > 20) {
            string += String(value).substring(0, 20) + '...] ';
          } else {
            string += String(value) + '] ';
          }
        }
      }
      return string;
    } catch (e) {
      Logger.warn(`error on printObjectSummary: ${e.message}`);
      console.log(e);
      console.log(obj);
    }
  };

  public static getRemoteAddr = (req: any) => {
    return (req.headers['x-forwarded-for'] as string) || req.connection.remoteAddress;
  };
}
