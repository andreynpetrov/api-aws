import apigClientFactory from "aws-api-gateway-client";

const config = {
  invokeUrl: "https://hmgx6049z7.execute-api.eu-west-1.amazonaws.com/alfa",
  apiKey: "...",
  region: "eu-west-1"
};

var apigClient = apigClientFactory.newClient(config);

var pathParams = {
  pageSlug: "aws"
};
var pathTemplate = "/pages/{pageSlug}";
var method = "GET";
var body = {};
var additionalParams = {};

apigClient
  .invokeApi(pathParams, pathTemplate, method, additionalParams, body)
  .then(function(result) {
    //This is where you would put a success callback
    console.log(result);
  })
  .catch(function(result) {
    //This is where you would put an error callback
    console.log(result);
  });
