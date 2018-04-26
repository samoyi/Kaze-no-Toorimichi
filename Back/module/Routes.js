
// 操作主题路径的模块，即操作Route-ItemID数据对象
// 由于没有直接操作主题路径的场景，所以该模块的方法都是在进行其他操作时所调用的。例如增
// 加条目或删除条目的同时，都会对对应的主题路径进行修改。

'use strict';

const DB = require('./Database');
const DU = require('./DataUtils');


/*
 * 将一个条目ID添加到若干个路径上
 * 用于新创建条目以及为已有条目添加主题路径
 *
 * @param   {Array}  aItemID    条目ID
 * @param   {Array}  aRoutes    若干个路径数组组成的数组
 * @return  {Boolean}           添加成功后返回true
 */
async function addItemIDToRoutes(aRoutes, aItemID){
    try{
        // 获得Route-ItemID数据对象
        let oRouteItem = await DB.getRouteItemIDData();

        // 为每个路径项添加该条目ID
        aRoutes.forEach(aRoute=>{
            // 虽然aRoute作为数组参数可以自动转型，但最好还是手动明确转型
            const aItemIDStr = oRouteItem[aRoute.join()];
            if (aItemIDStr === undefined){
                throw new Error('主题路径 ' + aRoute + ' 不存在');
            }
            else {
                aItemIDStr.push(DU.itemIDArray2String(aItemID));
            }
        });

        // 更新数据库
        await DB.updateRouteItemIDDocument(oRouteItem);

        return true;
    }
    catch(err){
        console.error(err);
    }
}


/*
 * 获得一个主题路径对应的所有条目ID
 *
 * @param   {Array}   aRoute      主题路径
 * @return  {Array}               数组项为条目ID数组。如果没有条目引用该主题路径，则
 *                                返回空数组。
 */
async function getItemIDsByRoute(aRoute){
    try {
        // Route-ItemID数据对象
        const oRouteItem = await DB.getRouteItemIDData();

        // 根据路径获取其对应的若干个条目ID字符串
        const aItemIDStr = oRouteItem[aRoute.join()];
        if (aItemIDStr === undefined){ // 给出的路径不存在
            throw new Error('主题路径 ' + aRoute + ' 不存在');
        }

        // 将若干个条目ID字符串转化为数组的形式并返回
        return aItemIDStr.map(str=>{
            return DU.itemIDString2Array(str);
        });
    }
    catch (err){
        console.error(err);
    }
}

/*
 * 从若干个主题路径里面删除某条目ID
 *
 * @param   {Array}   aRoutes     若干个主题路径数组组成的数组
 * @param   {Array}   aItemID     条目ID数组
 * @return  {Array|Boolean}       如果给出的主题路径中某些路径不包含传入的条目ID，则
 *                                返回这些路径组成的数组，其他存在的路径也不删除，即
 *                                不会更新数据库。如果都存在，则删除并更新后会返回
 *                                true。
 */
async function removeItemID(aRoutes, aItemID){
    // 获取Route-ItemID对象数据
    const oRouteItemID = await DB.getRouteItemIDData();

    const sItemID = DU.itemIDArray2String(aItemID);

    // 如果传入的某些主题路径不包含待删除条目ID，则保存这些路径并返回
    let aRoutesWithoutItemID = [];

    // 删除每条路径对应的条目ID
    aRoutes.forEach(aRoute=>{
        const sRoute = aRoute.join();
        const aItemIDStr = oRouteItemID[sRoute];
        if (aItemIDStr === undefined){
            throw new Error('主题路径 ' + aRoute + ' 不存在');
        }
        else {
            let nIndex = aItemIDStr.indexOf(sItemID);
            if (nIndex === -1){ // 该路径不包含传入的条目ID
                aRoutesWithoutItemID.push(aRoute);
            }
            else {
                oRouteItemID[sRoute].splice(nIndex, 1);
            }
        }
    });

    if (aRoutesWithoutItemID.length > 0){
        return aRoutesWithoutItemID;
    }
    else {
        // 更新数据库
        await DB.updateRouteItemIDDocument(oRouteItemID);
        return true;
    }
}


// getItemIDsByRoute([0,1,17,18,83,170])
// getItemIDsByRoute([0,1,2])
// getItemIDsByRoute([0, 4394, 4395])
// .then(res=>{
//     console.log(res);
// })
// .catch(err=>{
//     throw new Error(err);
// });


// const aRoutes = [
//     [0,1,17,18,83,170],
//     [0, 4394, 4395]
// ];
// const aItemID = [0, 0, 4];
// removeItemID(aRoutes, aItemID)
// .then(res=>{
//     console.log(res);
// })
// .catch(err=>{
//     throw new Error(err);
// });


module.exports = {
    addItemIDToRoutes,
    getItemIDsByRoute,
    removeItemID,
};
