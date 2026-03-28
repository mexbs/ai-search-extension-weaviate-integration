import { Response } from 'express';
import { Logger } from './';
import {
  AuthError,
  DeniedRequestError,
  ErrorVisibleForClient,
  ImpossibleActionError,
  InvalidParameters,
} from './Errors';
import { Helper } from './Helper';

const jsonResponseOK = (mess: object, res: Response) => {
  let json = {
    responseStatus: 'OK',
  };
  res.status(200).json(Object.assign(json, mess));
};

const jsonResponseException = (e: any, data, res: Response, destinationServer: string = null, requestHeaders: string = null) => {
  Logger.error(
    `[${e.constructor.name}]: ${Helper.toDataString(e.message)}, ${destinationServer ? "[destination server]:" + destinationServer + "," : ""} [url]: ${res.req.originalUrl}, [data]: ${Helper.printObjectSummary(data)}, ${requestHeaders ? "[headers]: " + Helper.printObjectSummary(requestHeaders) : ""}`
  );
  let json = {
    success: false,
    responseStatus: 'Exception',
  };

  let message = 'system_error';
  let headerCode = 500;
  try {
    headerCode = e.getCode() || 200;
    if (e instanceof AuthError) {
      message = `${e.message}`;
    } else if (e instanceof DeniedRequestError) {
      message = 'bad_session';
    } else if (e instanceof InvalidParameters) {
      message = `${e.message}`;
    } else if (e instanceof ErrorVisibleForClient) {
      message = `${e.message}`;
    }
    json['message'] = message;

    const extraData = e.getExtraData();
    if (extraData) {
      json = { ...json, ...extraData };
    }
  } catch (err) {
    message = 'system_error';
    json['message'] = message;
    headerCode = 500;
  }

  res.setHeader('Content-Type', 'application/json');
  return res.status(headerCode).json(json);
};

export default {
  jsonResponseOK,
  jsonResponseException,
};
