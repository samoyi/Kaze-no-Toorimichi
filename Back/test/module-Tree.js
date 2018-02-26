'use strict';

const fs = require('fs');
const assert = require('assert');

const Tree = require('../module/Tree');
const myUtil = require('../module/MyUtil');

const oIDTree = JSON.parse(fs.readFileSync('../DataBase/IDTree.json'));
const aIDSubject = JSON.parse(fs.readFileSync('../DataBase/ID-Subject.json'));
const aIDFirstName = JSON.parse(fs.readFileSync('../DataBase/ID-FirstName.json'));


const idTree = new Tree(oIDTree);


describe('检查Tree模块', ()=>{
    describe('getSubjectRouteByID', ()=>{
        it('查询“合掌造”的路径，然后与ID-FirstName对比', ()=>{
            const aRoutes = idTree.getSubjectRouteByID(
                                                aIDFirstName.indexOf('合掌造'));
            const aFirstNameRoute = aRoutes[0].map(id=>aIDFirstName[id]);
            assert.deepStrictEqual(aFirstNameRoute,
                    ['日本自然文化', '民俗', '建築', '民家', '形式', '合掌造']);
        });
        it('查询“神楽”的两条路径，然后与ID-FirstName对比', ()=>{
            const aRoutes = idTree.getSubjectRouteByID(
                                                aIDFirstName.indexOf('神楽'));
            const aFirstNameRoute = [
                aRoutes[0].map(id=>aIDFirstName[id]),
                aRoutes[1].map(id=>aIDFirstName[id])
            ];
            assert.deepStrictEqual(aFirstNameRoute,
                [
                    ['日本自然文化', '宗教体系', '神道', '神事', '神楽'],
                    ['日本自然文化', '民俗', '芸能', '舞踊', '神楽'] ]
                );
        });
    });
});
