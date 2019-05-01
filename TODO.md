* Add mediawiki style links to pages: [[aws]]
* Add /search POST method to backend
  + https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.Lambda.Tutorial.html 
  + https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.Lambda.BestPracticesWithDynamoDB.html
  + https://github.com/rlingineni/Lambda-Serverless-Search 
  + Lambda with Whoosh or with Python binding to Xapian
  + https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/search-example.html
  + https://github.com/jkeczan/aws-api-gateway-elastic-search-proxy
* Add confirmation to delete page button
* Pagination for Pages List
* Use localstorage


Search engines:
"Whoosh is actually very fast for a python-only implementation. That said, it's still at least an order of magnitude slower. Depending on the amount of data you need to index and search and the requirements on the maximum allowable latency and concurrent searches, it may not be an option.

SOLR is a bit of a complicated beast, but it's by far the most comprehensive search solution. Mix it with solrpy for stunning results. Yes, you will need java hosting.

You might also want to check out the python bindings for xapian. Xapian is very very fast, but less of a complete solution than SOLR. They are GPL licensed though, so that may/may not be viable for you."
