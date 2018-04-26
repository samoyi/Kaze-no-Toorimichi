'use strict';

const DB = require('./Database');
const DU = require('./DataUtils');

async function getItemIDsByRoute(aRoute){
    try {
        const aID = await DB.getItemIDs(aRoute);
        return aID;
    }
    catch (err){
        console.log('private: ', err);
    }
}

/*
 * 从若干个主题路径里面删除某条目ID
 *
 * @param   {Array}   aRoute         主题路径
 * @param   {Array}   aItemID        条目ID
 * @return  {Array}                  没有找到该条目ID的若干个主题路径。正常都找到的
 *                                   话，返回的就是空数组。
 */
async function removeItemID(aRoutes, aItemID){
    // 获取Route-ItemID对象数据
    const oRouteItemID = await DB.getRouteItemIDData();

    const sItemID = DU.itemIDArray2String(aItemID);

    // 从oRouteItemID删除所有的条目ID
    aRoutes.forEach(route=>{
        let sRoute = route.join();
        let index = oRouteItemID[sRoute].indexOf(sItemID);

        if (index!==-1){
            oRouteItemID[sRoute].splice(index, 1);
        }
        else {
            throw new Error('路径[' + sRoute + ']中没有找到该条目ID');
        }
    });

    // 更新数据库
    await DB.updateRouteItemIDDocument(oRouteItemID);
}


// getItemIDsByRoute([0,1,17,18,83,170])
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
    removeItemID,
    getItemIDsByRoute,
};
