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

async function connectDB(url, dbName){
    try{
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        return {client, db};
    }
    catch(err){
        throw new Error(err);
    }
}

// const findDocuments = function(db, name, callback) {
//     const collection = db.collection('documents');
//     collection.find({name}).toArray(function(err, docs) {
//         assert.equal(err, null);
//         console.log("Found the following records");
//         callback(docs);
//     });
// };

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

// const updateDocument = function(db, name, data, callback) {
//     const collection = db.collection('documents');
//     collection.updateOne({name}
//         , { $set: {data} }, function(err, result) {
//         assert.equal(err, null);
//         assert.equal(1, result.result.n);
//         console.log("Updated the document with the field a equal to 2");
//         callback(result);
//     });
// };

async function updateDocument1(db, name, data) {
    try{
        const collection = db.collection('documents');
        collection.updateOne({name}
            , { $set: {data} }, function(err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                console.log("Updated the document with the field a equal to 2");
            });
    }
    catch(err){
        throw new Error(err);
    }
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
    }
    catch(err){
        throw err;
    }
}

/*
 * 添加条目时，在【主题路径——条目ID】对象，找到对应的主题路径，为其添加条目ID
 *
 */
async function addItemIDToRoute(sItemID, aRoutes){
    try{
        // 连接数据库
        const {client, db} = await connectDB(url, dbName);
        // const client = await MongoClient.connect(url);
        // const db = client.db(dbName);

        // 获得映射对象
        const docs = await findDocuments1(db, 'Route-ItemID');
        let map = docs[0].data;

        // 添加的条目可能同时有多个路径，在上述映射对象中，为每个路径项添加该条目ID
        aRoutes.forEach(route=>{
            map[route].push(sItemID);
        });

        // 更新数据库
        await updateDocument1(db, 'Route-ItemID', map);

        client.close();

        // MongoClient.connect(url, function(err, client){
        //     assert.equal(null, err);
        //     const db = client.db(dbName);
        //     findDocuments(db, 'Route-ItemID', function(doc){
        //         let map = doc[0].data;
        //         aRoutes.forEach(route=>{
        //             map[route].push(sItemID);
        //         });
        //         updateDocument(db, 'Route-ItemID', map, function(){
        //             client.close();
        //         });
        //     });
        // });
    }
    catch(err){
        throw err;
    }
}

async function getItemIDs(aRoute){
    try{
        const {client, db} = await connectDB(url, dbName);
        const docs = await findDocuments1(db, 'Route-ItemID');
        const map = docs[0].data;
        return map[aRoute.join()];
        client.close();
    }
    catch(err){
        throw err;
    }
}


/*
 * 查找条目对象
 *
 * @param  {Number}  nLevel1ID      条目大类ID
 * @param  {Number}  nLevel2ID      条目子类ID
 * @param  {Number}  nInnerID       条目类别内ID
 * @return {Object}                 条目对象
 */
async function getItem(nLevel1ID, nLevel2ID, nInnerID){
    try{
        const {client, db} = await connectDB(url, dbName);
        const itemsDocs = await findDocuments1(db, 'items');
        const aItems = itemsDocs[0].data;
        const oItem = aItems[nLevel1ID].children[nLevel2ID].children[nInnerID];
        client.close();
        return oItem;
    }
    catch(err){
        throw err;
        console.error(oItem);
    }
}


/*
 * 删除条目
 * 该方法首先删除items数据文档的条目，同时记录其所有的主题ID路径
 * 然后在Route-ItemID数据文档中以此查找上述每个主题ID路径，并删除其中的条目ID
 *
 * @param  {Number}  nLevel1ID      条目大类ID
 * @param  {Number}  nLevel2ID      条目子类ID
 * @param  {Number}  nInnerID       条目类别内ID
 */
async function removeItem(nLevel1ID, nLevel2ID, nInnerID){
    try{
        const {client, db} = await connectDB(url, dbName);

        // 获取条目对象
        const itemsDocs = await findDocuments1(db, 'items');
        const aItems = itemsDocs[0].data;
        const oItem = aItems[nLevel1ID].children[nLevel2ID].children[nInnerID];

        // 获取该条目包含的所有主题的所有主题路径
        const aRoutes = [];
        oItem.subjects.forEach(subject=>{
            subject.routes.forEach(route=>{
                aRoutes.push(route);
            });
        });

        // 标记该条目为删除状态
        aItems[nLevel1ID].children[nLevel2ID].children[nInnerID] = null;

        // 更新数据库
        await updateDocument1(db, 'items', aItems);

        // 计算条目ID字符串
        const sLevel1ID = nLevel1ID<10 ? '0' + nLevel1ID : '' + nLevel1ID;
        const sLevel2ID = nLevel2ID<10 ? '0' + nLevel2ID : '' + nLevel2ID;
        const sItemID = sLevel1ID + sLevel2ID + nInnerID;

        // 获取Route-ItemID对象数据
        const RouteItemIDDocs = await findDocuments1(db, 'Route-ItemID');
        const oRouteItemID = RouteItemIDDocs[0].data;

        // 从oRouteItemID删除所有的条目ID
        aRoutes.forEach(route=>{
            let sRoute = route.join();
            let index = oRouteItemID[sRoute].indexOf(sItemID);
            if (index===-1){
                throw new Error('错误的条目ID字符串');
            }
            oRouteItemID[sRoute].splice(index, 1);
        });

        // 更新数据库
        await updateDocument1(db, 'Route-ItemID', oRouteItemID);

        client.close();
    }
    catch(err){
        throw err;
    }
}

module.exports = {
    addItem,
    addItemIDToRoute,
    removeItem,
    getItem,
    getItemIDs,
};
