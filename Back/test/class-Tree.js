'use strict';

const assert = require('assert');
const Tree = require('../class/Tree');
const myUtil = require('../class/MyUtil');

const fs = require('fs');
const oTree = JSON.parse(fs.readFileSync('./test/data/tree.json'));



const tree = new Tree(oTree);


let aSubjectName = tree.getSubjectRouteByFirstName('宇賀神');
console.log(aSubjectName);


describe('Tree', ()=>{
    describe('getAllSubjectNames', ()=>{
        it('getAllSubjectNames结果的length应该为非负整数', ()=>{
            let len = tree.getAllSubjectNames().length;
            assert.ok( Number.isInteger(len) && len>0);
        });
    });
    // describe('getSubjectByFirstName', ()=>{
    //     it('getAllSubjectNames结果的length应该为非负整数', ()=>{
    //         tree.getSubjectByFirstName('宗教体系') = [{
    //             name: ['宗教体系'],
    //             ch: '',
    //             intro: ['', ''],
    //             reference: {},
    //             children: [ [Object], [Object] ] } ]
    //     });
    // });
});
