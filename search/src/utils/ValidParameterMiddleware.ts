import {
  JSONObject,
  JSONTypeError,
  required,
  optional,
  passthrough,
  map,
  validate,
  custom,
  union,
  gt,
  gte,
  lt,
  lte,
  eq,
  ne,
  integer,
  array,
  minLength,
  maxLength,
} from 'ts-json-object';
import { InvalidNumberType } from './';

class ValidParameterMiddleware extends JSONObject {
  static validInt = (object: any, key: string, value: any) => {
    if (typeof value === 'undefined') return;
    value = parseInt(value);
    if (!value || isNaN(value)) throw new InvalidNumberType(`${key} is not number`);
    return parseInt(value);
  };
  static notZero = (object: any, key: string, value: any) => {
    if (isNaN(value) || value <= 0) throw new InvalidNumberType(`${key} is zero`);
    return value;
  };
  static validNumber = (object: any, key: string, value: any) => {
    if (typeof value === 'undefined') return;
    value = parseFloat(value);
    if (!value || isNaN(value)) throw new InvalidNumberType(`${key} is not number`);
    return parseFloat(value);
  };
  static numberToBool = (object: any, key: string, value: any) => {
    if (typeof value === 'undefined') return false;
    value = parseInt(value);
    if (!value || isNaN(value)) return false;
    return Boolean(parseInt(value));
  };
}

export {
  ValidParameterMiddleware,
  JSONTypeError,
  required,
  optional,
  passthrough,
  map,
  validate,
  custom,
  union,
  gt,
  gte,
  lt,
  lte,
  eq,
  ne,
  integer,
  array,
  minLength,
  maxLength,
};
