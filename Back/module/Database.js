const ItemsDoc = '../DataBase/Items.json';
const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function addItem(oItem, nLevel1ID, nLevel2ID){
    try{
        let data = await readFile(ItemsDoc, 'utf8');
        let oItems = JSON.parse(data);
        oItems[nLevel1ID]['children'][nLevel2ID]['children'].push(oItem);
        console.log(oItems);
        await writeFile(ItemsDoc, JSON.stringify(oItems));
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
    removeItem,
};
