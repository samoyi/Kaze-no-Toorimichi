'use strict';

const fs = require('fs');
const assert = require('assert');

const oIDTree = JSON.parse(fs.readFileSync('../DataBase/IDTree.json'));
const aIDSubject = JSON.parse(fs.readFileSync('../DataBase/ID-Subject.json'));
const aIDFirstName = JSON.parse(
                            fs.readFileSync('../DataBase/ID-FirstName.json'));
const aIDRoutes = JSON.parse(fs.readFileSync('../DataBase/ID-Routes.json'));
const mRouteItemID = new Map(JSON.parse(
                            fs.readFileSync('../DataBase/Route-ItemID.json')));

const Tree = require('../module/Tree');
const idTree = new Tree(oIDTree);

const nSubjectAmount = aIDSubject.length;


describe('检查数据结构', ()=>{
    describe('数据条数应该相等的各数据结构', ()=>{
        it('各主题ID相关映射数组的长度应该相等', ()=>{
            assert.ok( aIDSubject.length === aIDFirstName.length
                        &&
                        aIDFirstName.length === aIDRoutes.length
                        &&
                        aIDRoutes.length === nSubjectAmount
                    );
        });
        it('各路径相关映射的总路径数应该相等', ()=>{
            let nRouteAmountInIDRoutes = 0;
            aIDRoutes.forEach((routes, index)=>{
                routes.forEach(route=>{
                    nRouteAmountInIDRoutes++;
                });
            });
            assert.strictEqual(mRouteItemID.size, nRouteAmountInIDRoutes);
        });
    });
    describe('各个数据结构中同一个ID的对应关系应该正确', ()=>{
        it('ID-FirstName应该和ID-Subject中对应的主题首名称相同', ()=>{
            let bHasWrong = false;
            for(let i=0; i<100; i++){
                let index = Math.floor( Math.random() * nSubjectAmount );
                if( aIDFirstName[index] !== aIDSubject[index].name[0] ){
                    bHasWrong = true;
                    break;
                }
            }
            assert.ok(!bHasWrong);
        });
        it('ID-Routes中每条路径的最后一项应该是其ID', ()=>{
            let bHasWrong = false;
            for(let i=0; i<100; i++){
                let index = Math.floor( Math.random() * nSubjectAmount );
                bHasWrong = aIDRoutes[index].some(route=>{
                    return route[route.length-1] !== index;
                });
                if(bHasWrong){
                    break;
                }
            }
            assert.ok(!bHasWrong);
        });
    });
});
