const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const DU = require('./DataUtils');

const url = 'mongodb://localhost:27017';
const dbName = 'project';
// const client = await MongoClient.connect(url);
// const db = client.db(dbName);

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

async function connectDB(){
    try{
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        return {client, db};
    }
    catch(err){
        console.error(err);
    }
}

// async function connectDB1(){
//     try{
//         await MongoClient.connect(url);
//         client.db(dbName);
//     }
//     catch(err){
//         throw new Error(err);
//     }
// }


function closeDB(){
    client.close();
}

async function findDocuments(db, name){
    try{
        // Get the documents collection
        const collection = db.collection('documents');
        // Find some documents
        const docs = await collection.find({name}).toArray();
        return docs;
    }
    catch(err){
        console.error(err);
    }
};


async function updateDocument(db, name, data) {
    try{
        const collection = db.collection('documents');
        collection.updateOne({name}
            , { $set: {data} }, function(err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
            });
    }
    catch(err){
        console.error(err);
    }
};

async function updateItemsDocument(aItems){
    try{
        const {client, db} = await connectDB();
        await updateDocument(db, 'items', aItems);
        client.close();
        return true;
    }
    catch(err){
        console.error(err);
    }
}

async function updateRouteItemIDDocument(oRouteItemID){
    try{
        const {client, db} = await connectDB(url, dbName);
        await updateDocument(db, 'Route-ItemID', oRouteItemID);
        client.close();
        return true;
    }
    catch(err){
        console.error(err);
    }
}

// Use connect method to connect to the server
// MongoClient.connect(url, function(err, client){
//     assert.equal(null, err);
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);
//     insertDocuments(db, function(){
//         client.close();
//     });
// });


/*
 * 在Items数据数组里添加一个新条目
 *
 * @param   {Object}  oItem        条目对象
 * @param   {Number}  nLevel1ID    条目大类ID
 * @param   {Number}  nLevel2ID    条目子类ID
 * @return  {Number}               添加条目成功后返回条目的类别内ID
 */
async function addItem(oItem, nLevel1ID, nLevel2ID){
    try{
        // 获取条目数据数组
        let aItems = await getItemsData();

        // 将新条目添加到指定的类别，并返回组内ID
        const len = aItems[nLevel1ID]['children'][nLevel2ID]['children']
            .push(oItem);
        await updateItemsDocument(aItems);
        return len - 1;
    }
    catch(err){
        throw err;
    }
}

/*
 * 在Route-ItemID数据对象里，将一个条目ID添加到若干个路径上
 * 用于新创建条目以及为已有条目添加路径
 *
 * @param   {Array}  aItemID      条目ID
 * @param   {Array}  aRoutes      若干个路径数组组成的二维数组
 */
async function addItemIDToRoutes(aItemID, aRoutes){
    try{
        // 获得Route-ItemID映射对象
        let map = await getRouteItemIDData();

        // 添加的条目可能同时有多个路径，在上述映射对象中，为每个路径项添加该条目ID
        aRoutes.forEach(route=>{
            map[route].push(DU.itemIDArray2String(aItemID));
        });

        // 更新数据库
        await updateRouteItemIDDocument(map);
    }
    catch(err){
        throw err;
    }
}


/*
 * 获取数据库中完整的Items数据数组
 */
async function getItemsData(){
    try{
        const {client, db} = await connectDB(url, dbName);
        const itemsDocs = await findDocuments(db, 'items');
        const aItems = itemsDocs[0].data;
        client.close();
        return aItems;
    }
    catch(err){
        console.error(err);
    }
}

/*
 * 获取数据库中完整的Route-ItemID数据对象
 */
async function getRouteItemIDData(){
    try{
        const {client, db} = await connectDB(url, dbName);
        const docs = await findDocuments(db, 'Route-ItemID');
        const obj = docs[0].data;
        client.close();
        return obj;
    }
    catch(err){
        console.error(err);
    }
}


async function getItemIDs(aRoute){
    try{
        const {client, db} = await connectDB(url, dbName);
        const docs = await findDocuments(db, 'Route-ItemID');
        const map = docs[0].data;
        const aRouteStr = map[aRoute.join()];
        return aRouteStr.map(str=>{
            return DU.itemIDString2Array(str);
        });
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
        const itemsDocs = await findDocuments(db, 'items');
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
// async function removeItem(aItemID){
//     console.log('你大爷你大爷你大爷你大爷你大爷你大爷你大爷你大爷你大爷你大爷你大爷');
//     // try{
//     //     const [nLevel1ID, nLevel2ID, nInnerID] = aItemID;
//     //
//     //     // 获取条目对象
//     //     const aItems = await getItemsData();
//     //     const oItem = aItems[nLevel1ID].children[nLevel2ID].children[nInnerID];
//     //
//     //     // 获取该条目包含的所有主题的所有主题路径
//     //     const aRoutes = [];
//     //     oItem.subjects.forEach(subject=>{
//     //         aRoutes.push(subject.route);
//     //     });
//     //
//     //     // 标记该条目为删除状态
//     //     aItems[nLevel1ID].children[nLevel2ID].children[nInnerID] = null;
//     //
//     //     const sItemID = DU.itemIDArray2String(aItemID);
//     //
//     //     // 获取Route-ItemID对象数据
//     //     const oRouteItemID = await getRouteItemIDData();
//     //
//     //     // 从oRouteItemID删除所有的条目ID
//     //     aRoutes.forEach(route=>{
//     //         let sRoute = route.join();
//     //         let index = oRouteItemID[sRoute].indexOf(sItemID);
//     //         if (index===-1){
//     //             throw new Error('错误的条目ID字符串');
//     //         }
//     //         oRouteItemID[sRoute].splice(index, 1);
//     //     });
//     //
//     //     // 更新数据库
//     //     updateItemsDocument(aItems);
//     //     updateRouteItemIDDocument(oRouteItemID);
//     // }
//     // catch(err){
//     //     console.error(err);
//     // }
// }

module.exports = {
    connectDB,
    // connectDB1,
    closeDB,
    findDocuments,
    updateItemsDocument,
    updateRouteItemIDDocument,
    getItemsData,
    getRouteItemIDData,
    addItem,
    addItemIDToRoutes,
    // removeItem,
    getItem,
    getItemIDs,
};
