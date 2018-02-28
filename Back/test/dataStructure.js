'use strict';

const fs = require('fs');
const assert = require('assert');
const {inspect} = require('util');

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
    describe('每种数据结构应该结构完整且类型正确', ()=>{
        it('ID-FirstName映射', ()=>{
            // 整体为一个非空数组，且每个数组项为非空字符串
            assert.ok((()=>{
                if( !Array.isArray(aIDFirstName) || aIDFirstName.length===0 ){
                    console.log('ID-FirstName映射必须是非空数组');
                    return false;
                }
                return aIDFirstName.every((item, index)=>{
                    if( typeof item !== 'string' || item.trim().length===0 ){
                        console.log('ID-FirstName映射数组的数组项必须为非空非空白'
                                        + '字符串，但第' +index+ '项为'
                                        , inspect(item));
                        return false;
                    }
                    return true;
                });
            })());
        });
        it('ID-Routes映射', ()=>{
            // 整体为一个数组（A)，每个数组项也为一个数组（B），B数组内部是一个或多个
            // 数组（C），每个C数组的数组项为一个或多个不小于0的整数
            assert.ok((()=>{
                if( !Array.isArray(aIDRoutes) || aIDRoutes.length===0){
                    console.log('ID-Routes映射必须是非空数组');
                    return false;
                }

                return aIDRoutes.every((B, indexB)=>{
                    if(!Array.isArray(B) || B.length===0){
                        console.log('ID-Routes映射数组的数组项必须为非空数组，但第'
                                        +indexB+ '项为：', inspect(B));
                        return false;
                    }
                    return B.every(C=>{
                        if(!Array.isArray(C) || C.length===0){
                            console.log('ID-Routes映射数组的第' +indexB+ '项内部'
                                            + '的数组项必须为非空数组，实际为：'
                                            , inspect(C));
                            return false;
                        }
                        return C.every(n=>{
                            if(!Number.isInteger(n) || (n<0)){
                                console.log('ID-Routes映射数组的第' +indexB+ '项'
                                                + '内部的路径节点必须为非负整数，'
                                                + '实际为：', inspect(n));
                                return false;
                            }
                            return true;
                        });
                    })
                });
            })());
        });
    });
    describe('不应该出现重复值的情况', ()=>{
        it('ID-FirstName映射的数组项不应该有重复值', ()=>{
            assert.strictEqual(aIDFirstName.length
                                , (new Set(aIDFirstName)).size);
        });
    });
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
