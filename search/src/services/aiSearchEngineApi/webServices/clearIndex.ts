import { Request, Response } from "express";
import { routesUtils } from "../../../utils";
import { getWeaviate } from "../../../models/weaviateProvider";

export default async (req: Request, res: Response) => {
  const data = Object.assign(req.body, req.query);

  try {
    const weaviate = getWeaviate();

    await weaviate.clearIndex();

    return routesUtils.jsonResponseOK({}, res);
  } catch (e) {
    routesUtils.jsonResponseException(e, data, res);
  }
};
