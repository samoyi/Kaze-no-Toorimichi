const fs = require('fs');
const MyUtil = require('./MyUtil');
const argumentsChecker = new MyUtil.ArgumentsChecker();
const ItemsDoc = '../DataBase/Items.json';

function addItemToDB(oItem, nLevel1ID, nLevel2ID){
    fs.readFile(ItemsDoc, 'utf8', (err, data)=>{
        if (err) throw err;
        let oItems = JSON.parse(data);
        // console.log(oItems[nLevel1ID][nLevel2ID]);
        oItems[nLevel1ID]['children'][nLevel2ID]['children'].push(oItem);
        // console.log(oItems[nLevel1ID][nLevel2ID]);
        fs.writeFile(ItemsDoc, JSON.stringify(oItems), (err) => {
            if (err) throw err;
        });
    });
}

function getBookByISBN(sISBN){
    fs.readFile(ItemsDoc, 'utf8', (err, data)=>{
        if (err) throw err;
        let oItems = JSON.parse(data);
        oItems[nLevel1ID]['children'][nLevel2ID]['children'].filter(book=>{
            book.ISBN === 
        });
        fs.writeFile(ItemsDoc, JSON.stringify(oItems), (err) => {
            if (err) throw err;
        });
    });
}

module.exports = {
    addItemToDB,
};
