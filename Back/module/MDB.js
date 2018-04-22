'use strict';
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'project';

function getDataObj(sName){
    let json = fs.readFileSync('../../DataBase/' + sName + '.json', 'utf8');
    return JSON.parse(json);
}

const insertDocuments = function(db, callback){
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
        // {a : 1}, {a : 2}, {a : 3},
        {data: getDataObj('Route-ItemID'), name: 'Route-ItemID'},
    ], function(err, result){
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        assert.equal(1, result.ops.length);
        console.log('Inserted');
        callback(result);
    });
};

const updateDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ a : 2 }
        , { $set: { b : 1 } }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated the document with the field a equal to 2");
        callback(result);
    });
};

const findDocuments = function(db, name, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({name}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};


// Use connect method to connect to the server
MongoClient.connect(url, function(err, client){
    assert.equal(null, err);
    console.log('Connected successfully to server');

    const db = client.db(dbName);

    // findDocuments(db, 'items', function(){
    //     client.close();
    // });
    // updateDocument(db, function(){
    //     client.close();
    // });
    insertDocuments(db, function(){
        client.close();
    });
});
