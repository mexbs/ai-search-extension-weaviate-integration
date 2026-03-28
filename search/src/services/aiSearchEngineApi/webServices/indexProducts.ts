import { Request, Response } from "express";
import { ValidParameterMiddleware, required, routesUtils } from "../../../utils";
import { getWeaviate } from "../../../models/weaviateProvider";

class WebServicesParameters extends ValidParameterMiddleware {
  @required
  products: number[];
}

export default async (req: Request, res: Response) => {
  const data = Object.assign(req.body, req.query);

  try {
    const prms = new WebServicesParameters(data);

    const weaviate = getWeaviate();

    await weaviate.indexProducts(prms.products || []);

    return routesUtils.jsonResponseOK({}, res);
  } catch (e) {
    routesUtils.jsonResponseException(e, data, res);
  }
};
