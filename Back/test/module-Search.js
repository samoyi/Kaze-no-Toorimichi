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
const oItems = JSON.parse(fs.readFileSync('../DataBase/Items.json'));

const Search = require('../module/Search');
const search = new Search(aIDFirstName, aIDSubject, mRouteItemID, oItems);


// console.log(aIDRoutes[aIDFirstName.indexOf('雛祭り')]);
// let result = search.getSubjects('荒川');
// console.log(JSON.stringify(result, null, 4));

// describe('检查数据结构', ()=>{
//     describe('每种数据结构应该结构完整且类型正确', ()=>{
//         it('ID-FirstName映射', ()=>{
//             // 整体为一个非空数组，且每个数组项为非空字符串
//             assert.ok((()=>{
//                 if( !Array.isArray(aIDFirstName) || aIDFirstName.length===0 ){
//                     console.log('ID-FirstName映射必须是非空数组');
//                     return false;
//                 }
//                 return aIDFirstName.every((item, index)=>{
//                     if( typeof item !== 'string' || item.trim().length===0 ){
//                         console.log('ID-FirstName映射数组的数组项必须为非空非空白'
//                                         + '字符串，但第' +index+ '项为'
//                                         , inspect(item));
//                         return false;
//                     }
//                     return true;
//                 });
//             })());
//         });
//
//         it('ID-Routes映射', ()=>{
//             // 整体为一个数组（A)，每个数组项也为一个数组（B），B数组内部是一个或多个
//             // 数组（C），每个C数组的数组项为一个或多个不小于0的整数
//             assert.ok((()=>{
//                 if( !Array.isArray(aIDRoutes) || aIDRoutes.length===0){
//                     console.log('ID-Routes映射必须是非空数组');
//                     return false;
//                 }
//
//                 return aIDRoutes.every((B, indexB)=>{
//                     if(!Array.isArray(B) || B.length===0){
//                         console.log('ID-Routes映射数组的数组项必须为非空数组，但第'
//                                         +indexB+ '项为：', inspect(B));
//                         return false;
//                     }
//                     return B.every(C=>{
//                         if(!Array.isArray(C) || C.length===0){
//                             console.log('ID-Routes映射数组的第' +indexB+ '项内部'
//                                             + '的数组项必须为非空数组，实际为：'
//                                             , inspect(C));
//                             return false;
//                         }
//                         return C.every(n=>{
//                             if(!Number.isInteger(n) || (n<0)){
//                                 console.log('ID-Routes映射数组的第' +indexB+ '项'
//                                                 + '内部的路径节点必须为非负整数，'
//                                                 + '实际为：', inspect(n));
//                                 return false;
//                             }
//                             return true;
//                         });
//                     })
//                 });
//             })());
//         });
//
//         it('ID-Subject映射', ()=>{
//             // 整体为一个非空数组，每个数组项为plain object，每个plain object包含4
//             // 个属性：
//             // name属性为一个数组，数组项至少一个，全部为非空非空白字符串
//             // ch属性为字符串，可以为空，但不能为空白
//             // intro属性为一个两项数组，每一项都是字符串。可以为空但不能为空白
//             // reference属性为plain object
//             assert.ok((()=>{
//                 if( !Array.isArray(aIDSubject) || aIDSubject.length===0 ){
//                     console.log('ID-Subject映射必须是非空数组');
//                     return false;
//                 }
//                 return aIDSubject.every((item, index)=>{
//                     if(Object.prototype.toString.call(item)!=='[object Object]'){
//                         console.log('ID-Subject映射数组项必须是Plain Object类型。'
//                                     + '出错的数组项为：', inspect(item));
//                         return false;
//                     }
//                     if(Array.isArray(item.name) && item.name.length>0){
//                         let bNamesRight = item.name.every(name=>{
//                             if(typeof name !== 'string'
//                                 || name.trim().length===0){
//                                     console.log('ID-Subject映射数组项的name属性'
//                                                 + '数组的项必须是非空字符串。出错'
//                                                 + '的数组项为：', inspect(item));
//                                     return false;
//                             }
//                             return true;
//                         });
//                         if(!bNamesRight){
//                             return false;
//                         }
//                     }
//                     else{
//                         console.log('ID-Subject映射数组项的name属性必须是非空数组'
//                                     + '。出错的数组项为：', inspect(item));
//                         return false;
//                     }
//                     if(typeof item.ch !== 'string' || item.ch.trim()!==item.ch){
//                         console.log('ID-Subject映射数组项的ch属性的值必须为字符串'
//                                     + '。出错的数组项为：'
//                                     , inspect(item));
//                         return false;
//                     }
//                     if(Array.isArray(item.intro) && item.intro.length===2){
//                         let bIntrosRight = item.intro.every(intro=>{
//                             if(typeof intro !== 'string'
//                                 || intro.trim()!==intro){
//                                     console.log('ID-Subject映射数组项的intro属性'
//                                                 + '数组的项必须是字符串。可以为空'
//                                                 + '但不能为空白。出错的数组项为：'
//                                                 , inspect(item));
//                                     return false;
//                             }
//                             return true;
//                         });
//                         if(!bIntrosRight){
//                             return false;
//                         }
//                     }
//                     else{
//                         console.log('ID-Subject映射数组项的intro属性必须是两项数'
//                                     + '组。出错的数组项为：', inspect(item));
//                         return false;
//                     }
//                     if(Object.prototype.toString.call(item.reference)
//                         !=='[object Object]'){
//                         console.log('ID-Subject映射数组项的reference属性必须是'
//                                         + 'Plain Object类型。出错的数组项为：'
//                                         , inspect(item));
//                         return false;
//                     }
//                     return true;
//                 });
//             })());
//         });
//
//         it('IDTree对象', ()=>{
//             // 整体为一个plain object，每个节点都有id属性和children属性。id属性必须
//             // 是非负整数，children属性必须是数组，且数组项都为plain object
//             assert.ok((()=>{
//                 if(Object.prototype.toString.call(oIDTree)!=='[object Object]'){
//                     console.log('IDTree对象必须是Plain Object类型');
//                     return false;
//                 }
//                 return traverse(oIDTree);
//                 function traverse(oNode){
//                     if(checkNode(oNode)){
//                         return oNode.children.every(child=>traverse(child));
//                     }
//                     else{
//                         return false;
//                     }
//                 }
//                 function checkNode(oNode){
//                     if(!Number.isInteger(oNode.id) || (oNode.id<0)){
//                         console.log('IDTree对象的节点必须包含id属性，'
//                                         + '且值为非负整数。出错节点为：'
//                                         , inspect(oNode));
//                         return false;
//                     }
//                     if(Array.isArray(oNode.children)){
//                         return oNode.children.every(child=>{
//                             if(Object.prototype.toString.call(child)
//                                     !=='[object Object]'){
//                                 console.log('IDTree对象的节点children属性数组的'
//                                                 +'数组项必须是Plain Object类型。'
//                                                 +'出错节点为：', inspect(oNode));
//                                 return false;
//                             }
//                             return true;
//                         });
//                     }
//                     else{
//                         console.log('IDTree对象的节点必须包含children属性，'
//                                     + '且值为数组。出错节点为：'
//                                     , inspect(oNode));
//                         return false;
//                     }
//                 }
//             })());
//         });
//
//     });
//
//
//     describe('不应该出现重复值的情况', ()=>{
//         it('ID-FirstName映射的数组项不应该有重复值', ()=>{
//             assert.strictEqual(aIDFirstName.length
//                                 , (new Set(aIDFirstName)).size);
//         });
//     });
//
//
//     describe('数据条数应该相等或有确定大小关系的各数据结构', ()=>{
//         it('各主题ID相关映射数组的长度应该相等', ()=>{
//             assert.ok( aIDSubject.length === aIDFirstName.length
//                         &&
//                         aIDFirstName.length === aIDRoutes.length
//                         &&
//                         aIDRoutes.length === nSubjectAmount
//                     );
//         });
//         it('各路径相关映射的总路径数应该相等', ()=>{
//             const nRouteAmountInIDRoutes = aIDRoutes.reduce((acc, cur)=>{
//                 return acc+cur.length;
//             }, 0);
//             assert.strictEqual(mRouteItemID.size, nRouteAmountInIDRoutes);
//         });
//         it('主题路径数量应该大于主题ID数量', ()=>{
//             // 虽然理论上可以等于，但实际上肯定要大于
//             assert.ok(mRouteItemID.size > aIDSubject.length);
//         });
//     });
//
//
//     describe('各个数据结构中同一个ID的对应关系应该正确', ()=>{
//         it('ID-FirstName应该和ID-Subject中对应的主题首名称相同', ()=>{
//             let bHasWrong = false;
//             for(let i=0; i<100; i++){
//                 let index = Math.floor( Math.random() * nSubjectAmount );
//                 if( aIDFirstName[index] !== aIDSubject[index].name[0] ){
//                     bHasWrong = true;
//                     break;
//                 }
//             }
//             assert.ok(!bHasWrong);
//         });
//         it('ID-Routes中每条路径的最后一项应该是其ID', ()=>{
//             let bHasWrong = false;
//             for(let i=0; i<100; i++){
//                 let index = Math.floor( Math.random() * nSubjectAmount );
//                 bHasWrong = aIDRoutes[index].some(route=>{
//                     return route[route.length-1] !== index;
//                 });
//                 if(bHasWrong){
//                     break;
//                 }
//             }
//             assert.ok(!bHasWrong);
//         });
//     });
// });
