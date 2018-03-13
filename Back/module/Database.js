const ItemsDoc = '../DataBase/Items.json';
const RouteItemIDDoc = '../DataBase/Route-ItemID.json';
const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// 添加条目成功后返回条目的类别内ID
async function addItem(oItem, nLevel1ID, nLevel2ID){
    try{
        let data = await readFile(ItemsDoc, 'utf8');
        let oItems = JSON.parse(data);
        const len = oItems[nLevel1ID]['children'][nLevel2ID]['children']
                                                                .push(oItem);
        await writeFile(ItemsDoc, JSON.stringify(oItems));
        return len-1;
    }
    catch(err){
        throw err;
    }
}

async function addItemIDToRoute(sItemID, aRoutes){
    try{
        let data = await readFile(RouteItemIDDoc, 'utf8');
        let map = new Map(JSON.parse(data));
        console.log(map.get([0,4394,4395]));
        aRoutes.forEach(route=>{
            console.log(Array.isArray(route));
            const aItemID = map.get(route).push(sItemID);
            map.set(route, aItemID);
        });
    }
    catch(err){
        throw err;
    }
}

async function removeItem(nLevel1ID, nLevel2ID, nInnerID){
    try{
        let data = await readFile(ItemsDoc, 'utf8');
        let oItems = JSON.parse(data);
        let children = oItems[nLevel1ID]['children'][nLevel2ID]['children'];
        if(children[nInnerID]){
            children.splice(nInnerID, 1);
            await writeFile(ItemsDoc, JSON.stringify(oItems));
        }
        else{
            throw new RangeError('No such inner ID');
        }
    }
    catch(err){
        throw err;
    }
}

// async function addItemToDB(oItem, nLevel1ID, nLevel2ID, nCataID){
//     fs.readFile(ItemsDoc, 'utf8', (err, data)=>{
//         if (err) throw err;
//         let oItems = JSON.parse(data);
//         oItems[nLevel1ID]['children'][nLevel2ID]['children'].push(oItem);
//         fs.writeFile(ItemsDoc, JSON.stringify(oItems), (err) => {
//             if (err) throw err;
//         });
//     });
// }

function getBookByISBN(sISBN){
    // fs.readFile(ItemsDoc, 'utf8', (err, data)=>{
    //     if (err) throw err;
    //     let oItems = JSON.parse(data);
    //     oItems[nLevel1ID]['children'][nLevel2ID]['children'].filter(book=>{
    //         book.ISBN ===
    //     });
    //     fs.writeFile(ItemsDoc, JSON.stringify(oItems), (err) => {
    //         if (err) throw err;
    //     });
    // });
}

module.exports = {
    addItem,
    addItemIDToRoute,
    removeItem,
};
