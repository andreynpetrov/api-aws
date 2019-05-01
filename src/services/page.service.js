import config from "config";
import apigClientFactory from "aws-api-gateway-client";
import { Auth } from "aws-amplify";

export const pageService = {
  createPage,
  deletePage,
  getPage,
  getPageList,
  getPageSearchResults
};

var apigClient = apigClientFactory.newClient(config);

function getPage(state, slug) {
  return Auth.currentSession()
    .then(session => {
      return {
        pathParams: { pageSlug: slug },
        pathTemplate: "/pages/{pageSlug}",
        method: "GET",
        additionalParams: {
          headers: { Authorization: session.idToken.jwtToken }
        },
        body: {}
      };
    })
    .then(callAPI)
    .catch(err => console.log("error happened", err));
}

function getPageSearchResults(state, body) {
  return Auth.currentSession()
    .then(session => {
      return {
        pathParams: {},
        pathTemplate: "/search",
        method: "POST",
        additionalParams: {
          headers: { Authorization: session.idToken.jwtToken }
        },
        body: body
      };
    })
    .then(callAPI)
    .catch(err => console.log("error happened", err));
}

function getPageList(state) {
  return Auth.currentSession()
    .then(session => {
      return {
        pathParams: {},
        pathTemplate: "/pages",
        method: "GET",
        additionalParams: {
          headers: { Authorization: session.idToken.jwtToken }
        },
        body: {}
      };
    })
    .then(callAPI)
    .catch(err => console.log("error happened", err));
}

function createPage(state, page) {
  return Auth.currentSession()
    .then(session => {
      return {
        pathParams: {},
        pathTemplate: "/pages",
        method: "POST",
        additionalParams: {
          headers: { Authorization: session.idToken.jwtToken }
        },
        body: page
      };
    })
    .then(callAPI)
    .catch(err => console.log("error happened", err));
}

function deletePage(state, slug) {
  return Auth.currentSession()
    .then(session => {
      return {
        pathParams: { pageSlug: slug },
        pathTemplate: "/pages/{pageSlug}",
        method: "DELETE",
        additionalParams: {
          headers: { Authorization: session.idToken.jwtToken }
        },
        body: {}
      };
    })
    .then(callAPI)
    .catch(err => console.log("error happened", err));
}

function callAPI(r) {
  //console.log(r);
  return apigClient
    .invokeApi(
      r.pathParams,
      r.pathTemplate,
      r.method,
      r.additionalParams,
      r.body
    )
    .then(handleResponse)
    .catch(err => console.log("error happened", err));
}

function handleResponse(response) {
  console.log(response.data);
  return response.data;
}
