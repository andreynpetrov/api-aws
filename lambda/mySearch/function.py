from whoosh.fields import TEXT, ID, Schema
from whoosh.qparser import QueryParser
from whoosh.filedb.filestore import RamStorage
import boto3
import json
import decimal
from boto3.dynamodb.conditions import Key, Attr


class MyIndex(object):
    def __init__(self):
        self.schema = Schema(title=TEXT(stored=True), slug=ID(stored=True), content=TEXT)
        self.storage = RamStorage().create()
        self.index = self.storage.create_index(self.schema)
        self.writer = self.index.writer()
        self.searcher = self.index.searcher()

    def add(self, event):
        client = boto3.resource('dynamodb')
        table = client.Table("Pages")
        for i in table.query(KeyConditionExpression=Key('cognitosub').eq(event["cognitosub"])).get("Items"):
            self.writer.add_document(title=i["title"], slug=i["slug"], content=i["content"])
        self.writer.commit()

    def search(self, field, query):
        searcher = self.index.searcher()
        return searcher.search(QueryParser(field, self.index.schema).parse(query))


def handler(event, context):
    idx = MyIndex()
    idx.add(event)
    return [ dict(slug=i["slug"], title=i["title"]) for i in idx.search(event["field"], event["query"]) ]