import config from "config";
import apigClientFactory from "aws-api-gateway-client";

export const pageService = {
  createPage,
  deletePage,
  getPage,
  getPageList
};

var apigClient = apigClientFactory.newClient(config);

function createPage(state, page) {
  const pathParams = {};
  const pathTemplate = "/pages";
  const additionalParams = {};
  const body = page;

  return apigClient
    .invokeApi(pathParams, pathTemplate, "POST", additionalParams, body)
    .then(handleResponse);
}

function deletePage(state, slug) {
  const pathParams = {
    pageSlug: slug
  };
  const pathTemplate = "/pages/{pageSlug}";

  return apigClient
    .invokeApi(pathParams, pathTemplate, "DELETE")
    .then(handleResponse);
}

function getPage(state, slug) {
  const pathParams = {
    pageSlug: slug
  };
  const pathTemplate = "/pages/{pageSlug}";

  return apigClient
    .invokeApi(pathParams, pathTemplate, "GET")
    .then(handleResponse);
}

function getPageList(state) {
  const pathParams = {};
  const pathTemplate = "/pages";

  return apigClient
    .invokeApi(pathParams, pathTemplate, "GET")
    .then(handleResponse);
}

function handleResponse(response) {
  console.log(response.data);
  return response.data;
}
