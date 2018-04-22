const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'project';

// const insertDocuments = function(db, callback){
//     // Get the documents collection
//     const collection = db.collection('documents');
//     // Insert some documents
//     collection.insertMany([
//         {data: getDataObj('Items')},
//     ], function(err, result){
//         assert.equal(err, null);
//         assert.equal(1, result.result.n);
//         assert.equal(1, result.ops.length);
//         console.log('Inserted');
//         callback(result);
//     });
// };

const findDocuments = function(db, name, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({name}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        // console.log(docs);
        callback(docs);
    });
};

async function findDocuments1(db, name){
    try{
        // Get the documents collection
        const collection = db.collection('documents');
        // Find some documents
        const docs = await collection.find({name}).toArray();
        return docs;
    }
    catch(err){
        throw new Error(err);
    }
};

const updateDocument = function(db, name, data, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({name}
        , { $set: {data} }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated the document with the field a equal to 2");
        callback(result);
    });
};

async function updateDocument1(db, name, data) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({name}
        , { $set: {data} }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated the document with the field a equal to 2");
    });
};

// Use connect method to connect to the server
// MongoClient.connect(url, function(err, client){
//     assert.equal(null, err);
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);
//     insertDocuments(db, function(){
//         client.close();
//     });
// });


// 添加条目成功后返回条目的类别内ID
async function addItem(oItem, nLevel1ID, nLevel2ID){
    try{
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const docs = await findDocuments1(db, 'items');
        let aItems = docs[0].data;
        const len = aItems[nLevel1ID]['children'][nLevel2ID]['children']
            .push(oItem);
        await updateDocument1(db, 'items', aItems);
        client.close();
        return len-1;

        // MongoClient.connect(url, function(err, client){
        //     assert.equal(null, err);
        //     const db = client.db(dbName);
        //     findDocuments(db, 'items', function(docs){
        //         let aItems = docs[0].data;
        //         const len = aItems[nLevel1ID]['children'][nLevel2ID]['children']
        //             .push(oItem);
        //         // await writeFile(ItemsDoc, JSON.stringify(aItems));
        //         updateDocument(db, 'items', aItems, function(){
        //             client.close();
        //         });
        //         return len-1;
        //     });
        // });
    }
    catch(err){
        throw err;
    }
}

async function addItemIDToRoute(sItemID, aRoutes){
    try{
        // let data = await readFile(RouteItemIDDoc, 'utf8');
        // let map = new Map(JSON.parse(data));

        MongoClient.connect(url, function(err, client){
            assert.equal(null, err);
            const db = client.db(dbName);
            findDocuments(db, 'Route-ItemID', function(doc){
                let map = doc[0].data;
                aRoutes.forEach(route=>{
                    map[route].push(sItemID);
                });
                updateDocument(db, 'Route-ItemID', map, function(){
                    client.close();
                });
            });
        });
    }
    catch(err){
        throw err;
    }
}

async function getItemIDs(aRoute){
    try{
        let client = await MongoClient.connect(url);
        const db = client.db(dbName);

        let docs = await findDocuments1(db, 'Route-ItemID');
        // console.log('promise', docs);
        let map = docs[0].data;
        console.log(map[aRoute.join()]);
        // findDocuments(db, 'Route-ItemID', function(docs){
        //     let map = docs[0].data;
        //     map[aRoute.join()];
        //     client.close();
        // });
        client.close();
        // MongoClient.connect(url, function(err, client){
        //     assert.equal(null, err);
        //     const db = client.db(dbName);
        //     findDocuments(db, 'Route-ItemID', function(doc){
        //         let map = doc[0].data;
        //         map[aRoute.join()];
        //         client.close();
        //     });
        // });
    }
    catch(err){
        throw err;
    }
}


module.exports = {
    addItem,
    addItemIDToRoute,
    // removeItem,
    getItemIDs,
};
