'use strict';

const assert = require('assert');
const Tree = require('../class/Tree');

const fs = require('fs');
const oTree = JSON.parse(fs.readFileSync('./test/data/tree.json'));



const tree = new Tree(oTree);


// let re = tree.getAllSubjectNames();
// console.log(re.length);
// re.every(node=>{
//     if(Object.prototype.toString.call(node) !== '[object Object]'){
//         console.log(node);
//         return false;
//     }

// })
// console.log(tree.getAllSubjects().length);
// console.log(tree.traverseBranch(oTree).length);
describe('Tree', ()=>{
    describe('getAllSubjectNames', ()=>{
        it('getAllSubjectNames结果的length应该为非负整数', ()=>{
            let len = tree.getAllSubjectNames().length;
            assert.ok( Number.isInteger(len) && len>0);
        });
    });
});
