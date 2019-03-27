import config from "config";
import apigClientFactory from "aws-api-gateway-client";

export const pageService = {
  getPage
};

/* const config = {
  invokeUrl: "https://hmgx6049z7.execute-api.eu-west-1.amazonaws.com/alfa",
  apiKey: "sB5m0yr2QX2Jw5yO6TKkKgqTSCTygHS4y8WGxUq1",
  region: "eu-west-1"
}; */

var apigClient = apigClientFactory.newClient(config);

function getPage(state, slug) {
  const pathParams = {
    pageSlug: slug
  };
  const pathTemplate = "/pages/{pageSlug}";
  const method = "GET";

  return apigClient
    .invokeApi(pathParams, pathTemplate, method)
    .then(handleResponse);
}

function handleResponse(response) {
  return response.data;
}
