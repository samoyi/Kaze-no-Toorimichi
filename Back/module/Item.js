// 条目操作类

'use strict';

const assert = require('assert');
const DB = require('./Database');
const Routes = require('./Routes');
const DU = require('./DataUtils');


// Constructor
function Item(){

}

// Prototype
// 对已有条目的修改，包括添加subject
Item.prototype = {
    contructor: Item,

    getItem: async function (nLevel1ID, nLevel2ID, nInnerID){
        try{
            const {client, db} = await DB.connectDB();
            const itemsDocs = await DB.findDocuments(db, 'items');
            const aItems = itemsDocs[0].data;
            const oItem = aItems[nLevel1ID].children[nLevel2ID].children[nInnerID];
            client.close();
            return oItem;
        }
        catch(err){
            console.error(err);
        }
    },

    /*
     * 添加条目
     *
     * @param  {Object}  oItem          条目对象的info属性
     * @param  {Array}   aSubject       条目对象的subject属性
     * @param  {Number}  nLevel1ID      条目大类ID
     * @param  {Number}  nLevel2ID      条目子类ID
     * @return {Number}                 条目添加完成后的组内ID
     */
    addItem: async function(oInfo, aSubject, nLevel1ID, nLevel2ID){

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
    },

    /*
     * 查找条目对象
     *
     * @param  {Number}  nLevel1ID      条目大类ID
     * @param  {Number}  nLevel2ID      条目子类ID
     * @param  {Number}  nInnerID       条目类别内ID
     * @return {Object}                 条目对象
     */
    getItem: async function(nLevel1ID, nLevel2ID, nInnerID){
        try {
            return DB.getItem(nLevel1ID, nLevel2ID, nInnerID);
        }
        catch (err){
            console.error(err);
        }
    },


    /*
     * 修改条目自身信息
     * 不涉及条目对应的主题（路径）以及条目的类别
     *
     * @param  {Number}  nLevel1ID      条目大类ID
     * @param  {Number}  nLevel2ID      条目子类ID
     * @param  {Number}  nInnerID       条目类别内ID
     */
    modifyItemInfo: async function(nLevel1ID, nLevel2ID, nInnerID, oInfo){
        try{
            let aItems = await DB.getItemsData();
            aItems[nLevel1ID].children[nLevel2ID].children[nInnerID].info = oInfo;
            await DB.updateItemsDocument(aItems);
        }
        catch(err){
            console.error(err);
        }
    },

    /*
     * 条目增加主题
     *
     * @param   {Number}  nLevel1ID      条目大类ID
     * @param   {Number}  nLevel2ID      条目子类ID
     * @param   {Number}  nInnerID       条目类别内ID
     * @param   {Object}  oSubject       新增加的主题对象，包含route和info两个属性
     * @return  {Boolean}                true表示添加成功，false表示该主题已存在
     */
    addSubject: async function(nLevel1ID, nLevel2ID, nInnerID, oSubject){
        try{
            let aItems = await DB.getItemsData();
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
            await DB.updateItemsDocument(aItems);
            const sItemID = DU.itemIDArray2String([nLevel1ID, nLevel2ID, nInnerID]);
            await DB.addItemIDToRoutes(sItemID, [oSubject.route]);
            return true;
        }
        catch(err){
            console.error(err);
        }
    },

    /*
     * 条目删除主题
     *
     * @param   {Number}  nLevel1ID      条目大类ID
     * @param   {Number}  nLevel2ID      条目子类ID
     * @param   {Number}  nInnerID       条目类别内ID
     * @param   {Array}   aRoute         主题路径
     * @return  {Boolean}                true表示删除成功，false表示该主题不存在
     */
    removeSubject: async function(nLevel1ID, nLevel2ID, nInnerID, aRoute){
        try{
            let aItems = await DB.getItemsData();
            let aSubject = aItems[nLevel1ID].children[nLevel2ID]
                .children[nInnerID].subjects;

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

            await DB.updateItemsDocument(aItems);

            const aItemID = [nLevel1ID, nLevel2ID, nInnerID];
            const aRoutes = [aRoute];
            await Routes.removeItemID(aRoutes, aItemID);
            return true;
        }
        catch(err){
            console.error(err);
        }
    },

    /*
     * 删除条目
     *
     * @param  {Number}  nLevel1ID      条目大类ID
     * @param  {Number}  nLevel2ID      条目子类ID
     * @param  {Number}  nInnerID       条目类别内ID
     */
    removeItem: async function(aItemID){
        try {
            // DB.removeItem(aItemID);

            const [nLevel1ID, nLevel2ID, nInnerID] = aItemID;

            // 获取条目对象
            const aItems = await DB.getItemsData();
            const oItem = aItems[nLevel1ID].children[nLevel2ID].children[nInnerID];

            // 获取该条目包含的所有主题的所有主题路径
            const aRoutes = [];
            oItem.subjects.forEach(subject=>{
                aRoutes.push(subject.route);
            });

            // 标记该条目为删除状态
            aItems[nLevel1ID].children[nLevel2ID].children[nInnerID] = null;

            const sItemID = DU.itemIDArray2String(aItemID);

            // 获取Route-ItemID对象数据
            const oRouteItemID = await DB.getRouteItemIDData();

            // 从oRouteItemID删除所有的条目ID
            aRoutes.forEach(route=>{
                let sRoute = route.join();
                let index = oRouteItemID[sRoute].indexOf(sItemID);
                if (index===-1){
                    throw new Error('错误的条目ID字符串');
                }
                oRouteItemID[sRoute].splice(index, 1);
            });

            // 更新数据库
            DB.updateItemsDocument(aItems);
            DB.updateRouteItemIDDocument(oRouteItemID);
        }
        catch (err){
            console.error(err);
        }
    },
};

module.exports = Item;
