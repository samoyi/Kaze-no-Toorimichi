// Use the original subject data to build subject tree

'use strict';

const fs = require('fs');
const path = require('path');

// the directory where original subject data is stored
const dir = path.resolve(__dirname, './subject');

// Subject tree object, and root subject
let oTree = {
    name: ["日本自然文化"],
    ch: "日本自然文化",
    intro: ["", ""],
    reference: {},
};

let aFile = [];
buildTree(dir, oTree);
fs.writeFileSync('SubjectTree.json', JSON.stringify(oTree, null, 4));


// create an emtpy standard subject, which subject properties will be write into
function createItem(){
    return {
        name: [],
        ch: "",
        intro: ["", ""],
        reference: {},
        children: [],
    };
}

// build subject tree
function buildTree(dir, obj){
    obj.children = [];
    // traverse original subject data recursively
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
