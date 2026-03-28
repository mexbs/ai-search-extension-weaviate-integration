import { AuthError } from '.';

import loadConfig from '../../loadConfig';

export class ApiValidationMiddleware {
  static async normalizeAndVerifyRequest(req, res, next: any) {
    const remoteIP = (req.headers['x-forwarded-for'] as string) || req.connection.remoteAddress;
    if (
      loadConfig.allowedIps &&
      loadConfig.allowedIps.length > 0 &&
      !loadConfig.allowedIps.includes(remoteIP)
    ) {
      next(new AuthError(`The internal API user IP is not allowed: ${remoteIP}`));
    }
    let reqData;
    if (
      req.method === 'POST' ||
      req.method === 'PUT' ||
      req.method === 'DELETE' || 
      req.method === 'PATCH'
    ) {
      reqData = Object.assign(req.body, req.query);
    } else {
      reqData = req.query;
    }
    reqData.remoteIp = remoteIP;
   

    req.reqData = reqData;
    next();
  }
}
