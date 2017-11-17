'use strict';

const MongoClient = require('mongodb').MongoClient,
assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    // insertDocuments(db, result=>{
    //     console.log(result);
    // });
    findDocuments (db, docs=>{
        // console.log(docs);
    });
    db.close();
});

function insertDocuments(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the document collection");
        callback(result);
    });
}


function findDocuments (db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    // assert.equal(2, docs.length);
    console.log("Found the following records");
    console.dir(docs);
    callback(docs);
  });
}
