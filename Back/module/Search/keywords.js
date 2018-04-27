// 根据关键词进行搜索

'use strict';

const myUtil = require('../MyUtil');

// 搜索涉及4个数据doc，应该使用内存中的缓存
function Search(aIDSubject, aIDRoutes){
    // this.IDFirstName = aIDFirstName;
    this.IDSubject = aIDSubject;
    this.IDRoutes = aIDRoutes;
    // this.routeItemID = mRouteItemID;
    // this.items = oItems;
    // myUtil.deepFreeze(this.IDFirstName);
    myUtil.deepFreeze(this.IDSubject);
    myUtil.deepFreeze(this.IDRoutes);
    // myUtil.deepFreeze(this.routeItemID);
    // myUtil.deepFreeze(this.items);
}

Search.prototype = {
    constructor: Search,

    /*
     * 根据关键词搜索匹配的主题的ID
     *
     * @param  {String}  sKeyword    关键词
     * @return {Array}               匹配到的五组主题ID数组
     */
    getIDs(sKeyword){
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
            if(sFirstName===sKeyword){
                aMatch1.push(id);
            }
            else if(aAlias.includes(sKeyword)){
                aMatch2.push(id);
            }
            else if(sFirstName.includes(sKeyword)){
                aMatch3.push(id);
            }
            else if(sKeyword.includes(sFirstName) && sFirstName.length!==1){
                aMatch3.push(id);
            }
            else if(aAlias.some(alias=>alias.includes(sKeyword))){
                aMatch4.push(id);
            }
            else if(aAlias.some(alias=>sKeyword.includes(alias)
                                                 && alias.length!==1)){
                aMatch4.push(id);
            }
            else if(aIntro[0].includes(sKeyword) || aIntro[1].includes(sKeyword)){
                aMatch5.push(id);
            }
        });
        return [aMatch1, aMatch2, aMatch3, aMatch4, aMatch5];
    },

    /*
     * 根据关键词搜索主题
     *
     * @param  {String}  sKeyword     关键词
     * @return {Array}                匹配到的主题对象组成的数组
     */
    // getSubjects(sKeyword){
    //     // 获取所有匹配的ID
    //     const aIDs = this.getIDs(sKeyword);
    //     const aID = aIDs.reduce((acc, cur)=>acc.concat(cur), []);
    //     if(aID.length===0){
    //         return [];
    //     }
    //     // 根据ID返回所有的主题
    //     return aID.map(id=>this.IDSubject[id]);
    // },
};


module.exports = Search;
