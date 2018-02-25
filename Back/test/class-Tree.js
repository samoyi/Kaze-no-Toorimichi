'use strict';

const assert = require('assert');
const Tree = require('../class/Tree');
const myUtil = require('../class/MyUtil');

const fs = require('fs');
const oTree = JSON.parse(fs.readFileSync('./test/data/tree.json'));



const tree = new Tree(oTree, true);

describe('Tree', ()=>{
    describe('getAllSubjectNames', ()=>{
        it('getAllSubjectNames结果的length应该为非负整数', ()=>{
            let len = tree.getAllSubjectNames().length;
            assert.ok( Number.isInteger(len) && len>0);
        });
    });
});
