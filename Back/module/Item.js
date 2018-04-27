// 条目操作模块

'use strict';

const assert = require('assert');
const DB = require('./Database');
const Routes = require('./Routes');
const MU = require('./MyUtils');



/*
 * 添加条目
 *
 * @param  {Object}  oItem          条目对象的info属性
 * @param  {Array}   aSubject       条目对象的subject属性
 * @param  {Number}  nLevel1ID      条目大类ID
 * @param  {Number}  nLevel2ID      条目子类ID
 * @return {Number}                 条目添加完成后的组内ID
 */
async function addItem(oInfo, aSubject, nLevel1ID, nLevel2ID){

    // 组建条目对象
    const oItem = {
        info: oInfo,
        subjects: aSubject,
    };

    // 获取条目关联的所有主题的路径，用于添加到Route-ItemID数据对象中
    let aRoutes = [];
    aSubject.forEach(subject=>{
        aRoutes.push(subject.route);
    });

    try {
        // 条目添加到Items数据数组
        const nInnerID = await DB.addItem(oItem, nLevel1ID, nLevel2ID);

        // 条目ID添加到Route-ItemID数据对象
        const aItemID = [nLevel1ID, nLevel2ID, nInnerID];
        await DB.addItemIDToRoutes(aItemID, aRoutes);

        // 返回添加完成后的条目组内ID
        return nInnerID;
    }
    catch (err){
        console.error(err);
    }
}


/*
 * 查找条目对象
 *
 * @param  {Array}   aItemID          条目ID
 * @return {Object|Null|Undefined}    如果条目存在则条目对象，如果不存在返回
 *                                    undefined，如果已删除则返回null
 */
async function getItem(aItemID){
    try {
        const [nLevel1ID, nLevel2ID, nInnerID] = aItemID;
        const aItems = await DB.getItemsData();
        const oItem = aItems[nLevel1ID].children[nLevel2ID].children[nInnerID];
        return oItem;
    }
    catch (err){
        console.error(err);
    }
}


/*
 * 修改条目自身信息
 * 不涉及条目对应的主题（路径）以及条目的类别
 *
 * @param  {Array}   aItemID          条目ID
 * @param  {Object}  oInfo            新的条目对象info属性
 * @return {Boolean|Null|Undefined}   如果修改成功则返回true，如果条目不存在返
 *                                    回undefined，如果条目已删除则返回null
 */
async function modifyItemInfo(aItemID, oInfo){
    try{
        const [nLevel1ID, nLevel2ID, nInnerID] = aItemID;
        let aItems = await DB.getItemsData();
        let oItem = aItems[nLevel1ID].children[nLevel2ID].children[nInnerID];
        if (!oItem){ // null表示条目已删除，undefined表示条目不存在
            return oItem;
        }
        oItem.info = oInfo;
        await DB.updateItemsDocument(aItems);
        return true;
    }
    catch(err){
        console.error(err);
    }
}


/*
 * 条目增加主题
 *
 * @param   {Array}   aItemID          条目ID
 * @param   {Object}  oSubject         新增加的主题对象，包含route和info两个属
 *                                     性
 * @return  {Boolean|Null|Undefined}   true表示添加成功，false表示该主题已存在
 *                                     null表示条目已删除，undefined表示条目不
 *                                     存在
 */
async function addSubject(aItemID, oSubject){
    try{
        const [nLevel1ID, nLevel2ID, nInnerID] = aItemID;
        let aItems = await DB.getItemsData();

        // 获取条目及其主题
        let oItem = aItems[nLevel1ID].children[nLevel2ID].children[nInnerID];
        if (!oItem){ // null表示条目已删除，undefined表示条目不存在
            return oItem;
        }
        let aSubject = aItems[nLevel1ID].children[nLevel2ID]
            .children[nInnerID].subjects;

        // 避免重复添加
        let bDuplicate = aSubject.some(subject=>{
            try{
                assert.notDeepStrictEqual(subject.route, oSubject.route);
            }
            catch(err){
                return true;
            }
        });

        if (bDuplicate){
            return false;
        }

        aSubject.push(oSubject);
        await Promise.all([
            DB.updateItemsDocument(aItems),
            DB.addItemIDToRoutes(aItemID, [oSubject.route]),
        ]);
        return true;
    }
    catch(err){
        console.error(err);
    }
}


/*
 * 条目删除主题
 *
 * @param   {Array}   aItemID          条目ID
 * @param   {Array}   aRoute           主题路径
 * @return  {Boolean|Null|Undefined}   true表示删除成功，false表示该主题不存在
 *                                     null表示条目已删除，undefined表示条目不
 *                                     存在
 */
async function removeSubject(aItemID, aRoute){
    try{
        const [nLevel1ID, nLevel2ID, nInnerID] = aItemID;

        // 获取条目及其主题
        let aItems = await DB.getItemsData();
        let oItem = aItems[nLevel1ID].children[nLevel2ID].children[nInnerID];
        if (!oItem){ // null表示条目已删除，undefined表示条目不存在
            return oItem;
        }
        let aSubject = oItem.subjects;

        // 检查待删除的是否存在，存在则删除
        let bSubjectExists = aSubject.some((subject, index)=>{
            try{
                assert.notDeepStrictEqual(subject.route, aRoute);
            }
            catch(err){
                aSubject.splice(index, 1);
                return true;
            }
        });

        if (!bSubjectExists){ // 待删除的主题不存在
            return false;
        }

        // 从Route-ItemID数据对象移除条目ID，并更新Items数据数组
        const aRoutes = [aRoute];
        await Promise.all([
            Routes.removeItemID(aRoutes, aItemID),
            DB.updateItemsDocument(aItems),
        ]);

        return true;
    }
    catch(err){
        console.error(err);
    }
}


/*
 * 删除条目
 *
 * @param  {Array}   aItemID           条目ID
 * @return  {Boolean|Null|Undefined}   true表示删除成功，null表示条目已删除，
 *                                     undefined表示条目不存在
 */
async function removeItem(aItemID){
    try {
        const [nLevel1ID, nLevel2ID, nInnerID] = aItemID;

        // 获取条目对象
        let aItems = await DB.getItemsData();
        const oItem = aItems[nLevel1ID].children[nLevel2ID].children[nInnerID];
        if (!oItem){ // null表示条目已删除，undefined表示条目不存在
            return oItem;
        }

        // 获取该条目包含的所有主题路径
        const aRoutes = [];
        oItem.subjects.forEach(subject=>{
            aRoutes.push(subject.route);
        });

        // 标记该条目为删除状态
        aItems[nLevel1ID].children[nLevel2ID].children[nInnerID] = null;

        // 从Route-ItemID数据对象移除条目ID，并更新Items数据数组
        await Promise.all([
            DB.updateItemsDocument(aItems),
            Routes.removeItemID(aRoutes, aItemID),
        ]);

        return true;
    }
    catch (err){
        console.error(err);
    }
}


module.exports = {
    addItem,
    getItem,
    modifyItemInfo,
    addSubject,
    removeSubject,
    removeItem,
};
