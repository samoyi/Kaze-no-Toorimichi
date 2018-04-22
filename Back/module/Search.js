'use strict';

const myUtil = require('./MyUtil');

function Search(aIDFirstName, aIDSubject, mRouteItemID, oItems){
    this.IDFirstName = aIDFirstName;
    this.IDSubject = aIDSubject;
    this.routeItemID = mRouteItemID;
    this.items = oItems;
    myUtil.deepFreeze(this.IDFirstName);
    myUtil.deepFreeze(this.IDSubject);
    myUtil.deepFreeze(this.routeItemID);
    myUtil.deepFreeze(this.items);
}

Search.prototype = {
    constructor: Search,

    getIDs(sKeyword){
        if(typeof sKeyword !== 'string' || !sKeyword.trim()){
            return false;
        }
        sKeyword = sKeyword.trim();

        let aMatch1 = []; // 搜索词与主名称完全符合
        let aMatch2 = []; // 搜索词与别名或译名完全符合
        let aMatch3 = []; // 搜索词与主名称部分符合
        let aMatch4 = []; // 搜索词与别名或译名部分符合
        let aMatch5 = []; // 搜索词包含于主题或条目描述中

        let sFirstName = '';
        let aAlias = [];
        let aIntro = [];
        this.IDSubject.forEach((subject,id)=>{
            sFirstName = subject.name[0];
            if(subject.ch){
                aAlias = subject.name.slice(1).concat(subject.ch);
            }
            else{
                aAlias = subject.name.slice(1);
            }
            aIntro = subject.intro;

            if(subject.name[0]===sKeyword){
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

    getSubjects(sKeyword){
        let aID = this.getIDs(sKeyword);
        if(aID===false){
            return false;
        }

        aID = aID.reduce((acc, cur)=>acc.concat(cur), []);
        if(aID.length===0){
            return [];
        }

        let result = [];
        const aSub = aID.map(id=>this.IDSubject[id]);
        return result.concat(aSub);
    },

};


module.exports = Search;
