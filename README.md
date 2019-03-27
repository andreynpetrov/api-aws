#api-aws
Sandbox for AWS API Gateway tests


## CORS
* https://enable-cors.org/server_awsapigateway.html


##Links
* https://github.com/aws-samples/aws-amplify-vue
* https://github.com/aws-samples/aws-amplify-auth-starters/tree/vue
* https://github.com/aws-samples/aws-serverless-appsync-loyalty
* https://github.com/aws-samples/amplify-photo-gallery-workshop


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## vue.config.js
```
module.exports = {
  outputDir: "dist",
  publicPath: undefined,
  assetsDir: undefined,
  runtimeCompiler: true,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
  lintOnSave: undefined,
  crossorigin: "anonymous",

  pwa: {
    name: "MyWiki"
  },

  configureWebpack: {
    externals: {
      // global app config object
      config: JSON.stringify({
        invokeUrl:
          "https://hmgx6049z7.execute-api.eu-west-1.amazonaws.com/alfa",
        apiKey: "secret",
        region: "eu-west-1"
      })
    }
  }
};
```

