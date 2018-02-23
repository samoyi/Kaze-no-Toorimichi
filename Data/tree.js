'use strict';

const fs = require('fs');
const util = require('util');
const path = require('path');

let dir = './subject';

let oTree = {
    name: ["日本自然文化"],
    ch: "日本自然文化",
};

let aFile = [];
makeTree(dir, oTree);
// console.log(JSON.stringify(oTree, null, 4));
// fs.writeFileSync('tree.json', JSON.stringify(oTree));
fs.writeFileSync('tree.json', JSON.stringify(oTree, null, 4));
// console.log(aFile);
// console.log(aFile.length);

function createItem(){
    return {
        name: [],
        ch: "",
        intro: ["", ""],
        reference: {},
        children: [],
    };
}

function makeTree(dir, obj){
    obj.children = [];
    fs.readdirSync(dir).forEach(name=>{
        let oItem = createItem();

        if(fs.statSync(dir+'/'+name).isDirectory()){
            oItem.name.push(name);
            makeTree(dir+'/'+name, oItem);
        }
        else{
            oItem.name.push(path.basename(name, '.json'));
            console.log(name);
            oItem.children = JSON.parse(fs.readFileSync(dir+'/'+name))
        }
        obj.children.push(oItem);
    });
}
