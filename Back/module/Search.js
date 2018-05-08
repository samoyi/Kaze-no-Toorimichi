// 根据关键词进行搜索

'use strict';

const myUtil = require('./MyUtil');
const DB = require('./Database');
const MU = require('./MyUtils');
const Routes = require('./Routes');

// 搜索涉及4个数据doc，应该使用内存中的缓存
function Search(keyword, aIDSubject, aIDRoutes, aItems){
    this.keyword = keyword;

    // this.IDFirstName = aIDFirstName;
    this.IDSubject = aIDSubject;
    this.IDRoutes = aIDRoutes;
    // this.routeItemID = mRouteItemID;
    this.items = aItems;
    // myUtil.deepFreeze(this.IDFirstName);
    myUtil.deepFreeze(this.IDSubject);
    myUtil.deepFreeze(this.IDRoutes);
    // myUtil.deepFreeze(this.routeItemID);
    myUtil.deepFreeze(this.items);
}

Search.prototype = {
    constructor: Search,

    /*
     * 根据关键词搜索匹配的主题的ID，返回结果根据相关性分组
     *
     * @return {Array}               匹配到的五组主题ID数组
     */
    getIDGroup(){
        // 按照与关键词的5种匹配模式，记录匹配的主题
        let aMatch1 = []; // 主名称与关键词完全符合的主题
        let aMatch2 = []; // 别称或译名与关键词完全符合的主题
        let aMatch3 = []; // 主名称与关键词部分符合的主题
        let aMatch4 = []; // 别名或译名与关键词部分符合的主题
        let aMatch5 = []; // 描述中包含关键词的主题

        // 主题主名称，即主题name数组的第一项
        let sFirstName = '';
        // 主题名别称或译名。包括主题name属性主名称以外的名称，以及ch属性的中文名
        let aAlias = [];
        // 主题简介。两项数组，分别为日文简介和中文简介
        let aIntro = [];

        // 遍历所有的主题
        this.IDSubject.forEach((subject, id)=>{
            // 获取主题主名称
            sFirstName = subject.name[0];
            // 获取主题别称或译名
            if(subject.ch){
                aAlias = subject.name.slice(1).concat(subject.ch);
            }
            else{
                aAlias = subject.name.slice(1);
            }
            // 获取主题简介
            aIntro = subject.intro;

            // 检查主题是否匹配
            // 5种匹配模式相关性由高到低，一个主题不重复匹配，只匹配相关性最高的模式
            if(sFirstName === this.keyword){
                aMatch1.push(id);
            }
            else if(aAlias.includes(this.keyword)){
                aMatch2.push(id);
            }
            else if(sFirstName.includes(this.keyword)){
                aMatch3.push(id);
            }
            else if(this.keyword.includes(sFirstName)
                && sFirstName.length!==1){
                aMatch3.push(id);
            }
            else if(aAlias.some(alias=>alias.includes(this.keyword))){
                aMatch4.push(id);
            }
            else if(aAlias.some(alias=>this.keyword.includes(alias)
                                                 && alias.length!==1)){
                aMatch4.push(id);
            }
            else if(aIntro[0].includes(this.keyword)
                || aIntro[1].includes(this.keyword)){
                aMatch5.push(id);
            }
        });
        return [aMatch1, aMatch2, aMatch3, aMatch4, aMatch5];
    },

    /*
     * 根据关键词搜索主题
     *
     * @return {Array}                匹配到的主题对象组成的数组
     */
    getSubjects(){
        // 获取所有匹配的ID
        const aIDs = this.getIDGroup(this.keyword);
        const aID = aIDs.reduce((acc, cur)=>acc.concat(cur), []);
        if(aID.length===0){
            return [];
        }
        // 根据ID返回所有的主题
        return aID.map(id=>this.IDSubject[id]);
    },

    /*
     * 根据getIDGroup的返回结果，查找对应的主题路径
     *
     * @return {Array}      分组主题路径
     */
    getRouteGroup(){
        const aIDGroup = this.getIDGroup();
        return aIDGroup.map(group=>{
            return group.map(id=>{
                return {
                    id,
                    routes: this.IDRoutes[id],
                };
            });
        });
    },

    /*
     * 根据getRouteGroup返回的路径，查找对应的条目ID
     *
     * @return {Array}    若干个条目ID数组组成的数组
     */
     async getItemIDsByRouteGroup(){
         const aRouteGroup = this.getRouteGroup();


         let aAllRoute = [];
         let aAllItemID = [];

         // 获取所有的主题路径
         aRouteGroup.forEach(group=>{
             group.forEach(subject=>{
                 subject.routes.forEach(route=>{
                     aAllRoute.push(route);
                 });
             });
         });
        // 获取每一条主题路径对应的若干条条目ID
         await MU.forEachAsync(aAllRoute, async (route)=>{
             const aItemIDs = await Routes.getItemIDsByRoute(route);
             aAllItemID = aAllItemID.concat(aItemIDs);
         });

         // 因为可能多个主题路径都有同样的条目ID（即一个条目有多个主题），因此要对获取
         // 到的条目ID去重
         return MU.arrayDeduplicationForItemIDorRouteArray(aAllItemID);
     },


     /*
      * 根据getItemIDsByRouteGroup返回的条目ID，查找对应的条目对象
      *
      * @return {Array}    条目对象数组
      */
      async getItems(){
          const aItemIDs = await this.getItemIDsByRouteGroup();
          let aItem = [];
          aItemIDs.forEach(itemID=>{
              aItem.push(this.items[itemID[0]].children[itemID[1]].children
                  [itemID[2]]);
          });
          return aItem;
      },
};


module.exports = Search;
