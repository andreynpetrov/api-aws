//import config from "config";
import apigClientFactory from "aws-api-gateway-client";

export const pageService = {
  getPage
};

const config = {
  invokeUrl: "https://hmgx6049z7.execute-api.eu-west-1.amazonaws.com/alfa",
  apiKey: "sB5m0yr2QX2Jw5yO6TKkKgqTSCTygHS4y8WGxUq1",
  region: "eu-west-1"
};

var apigClient = apigClientFactory.newClient(config);
var pathTemplate = "/pages/{pageSlug}";
var method = "GET";

function getPage(state, slug) {
  console.log("This is getPage service");
  //return { slug: slug, title: slug, content: "## This is test content. ##\n It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout." };

  var pathParams = {
    pageSlug: slug
  };

  apigClient
    .invokeApi(pathParams, pathTemplate, method)
    .then(function(result) {
      //This is where you would put a success callback
      console.log("apigClient success callback");
      return result;
    })
    .catch(function (result) {
      //This is where you would put an error callback
      console.log("apigClient error callback");
      return result;
    });
}
