'use strict';

const fs = require('fs');
const path = require('path');

let dir = './subject';

let oTree = {
    name: ["日本自然文化"],
    ch: "日本自然文化",
    intro: ["", ""],
    reference: {},
};

let aFile = [];
buildTree(dir, oTree);
fs.writeFileSync('subjectTree.json', JSON.stringify(oTree, null, 4));


function createItem(){
    return {
        name: [],
        ch: "",
        intro: ["", ""],
        reference: {},
        children: [],
    };
}

function buildTree(dir, obj){
    obj.children = [];
    fs.readdirSync(dir).forEach(name=>{
        let oItem = createItem();

        if(fs.statSync(dir+'/'+name).isDirectory()){
            oItem.name.push(name);
            buildTree(dir+'/'+name, oItem);
        }
        else{
            oItem.name.push(path.basename(name, '.json'));
            oItem.children = JSON.parse(fs.readFileSync(dir+'/'+name))
        }
        obj.children.push(oItem);
    });
}
