import { Request, Response } from "express";
import { ValidParameterMiddleware, required, routesUtils } from "../../../utils";
import { getWeaviate } from "../../../models/weaviateProvider";
import { Weaviate } from "../../../models/Weaviate";

class WebServicesParameters extends ValidParameterMiddleware {
  @required
  keyword: string;
}

export default async (req: Request, res: Response) => {
  const data = Object.assign(req.body, req.query);

  try {
    const prms = new WebServicesParameters(data);

    const weaviate = getWeaviate();

    const results = await weaviate.search(prms.keyword, Weaviate.SEARCH_RESULT_COUNT);

    return routesUtils.jsonResponseOK(results, res);
  } catch (e) {
    routesUtils.jsonResponseException(e, data, res);
  }
};
