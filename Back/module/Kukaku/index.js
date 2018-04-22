'use strict';

// 构造函数
/**
* @param  {Object}  oToCityLevel    地方——县——市 三级行政区划数据
* @param  {Array}   aValidDivision  合理的市级区划名称组成的数组
*/
function Kukaku(oToCityLevel, aValidDivision){

    // Freeze datas
    Object.freeze(oToCityLevel);
    Object.freeze(aValidDivision);


    // Check arguments
    // Check types
    let sArg1Type = Object.prototype.toString
        .call(oToCityLevel).slice(8,-1);
    if(sArg1Type!=='Object'){
        throw new TypeError('Argument "oToCityLevel" expects a plain object, '
        +sArg1Type+  ' given.');
    }
    let sArg2Type = Object.prototype.toString
        .call(aValidDivision).slice(8,-1);
    if(sArg2Type!=='Array'){
        throw new TypeError('Argument "aValidDivision" expects an array, '
            +sArg2Type+  ' given.');
    }

    // Check duplicate cities
    for(let chihou in oToCityLevel){
        for(let ken in oToCityLevel[chihou]){
            let aDuplicate = oToCityLevel[chihou][ken].filter(
                (place,index,arr)=>{
                    if(index===arr.indexOf(place)
                    && index!==arr.lastIndexOf(place)){
                        return true;
                    }
                });
            if(aDuplicate.length){
                throw new Error('Duplicate place: ' + aDuplicate.toString());
            }
        }
    }


    // Define properties
    // 获得所有的地方名称。“北海道”、“东北”、“四国”等。
    function getChihous(){
        return Object.keys(oToCityLevel);
    }
    // 按地方分类，获得每个地方之下的省级行政区划名称
    function getProvinceNames(){
        let obj = {};
        for(let chihou in oToCityLevel){
            obj[chihou] = Object.keys(oToCityLevel[chihou]);
        }
        return obj;
    }
    // 按省级行政区划名称分类，获得每个省级行政区划之下的市级行政区划名称
    function getCityNames(){
        let obj = {};
        for(let chihou in oToCityLevel){
            for(let pro in oToCityLevel[chihou]){
                obj[pro] = oToCityLevel[chihou][pro];
            }
        }
        return obj;
    }
    // 所有省级行政区划名称组成的数组
    function getAllProvinceNames(){
        let arr = [];
        for(let chihou in oToCityLevel){
            arr = arr.concat( Object.keys(oToCityLevel[chihou]) );
        }
        return arr;
    }
    Object.defineProperties(Kukaku.prototype, {
        toCityLevel: {value: oToCityLevel},
        validDivision: {value: aValidDivision},
        chihouNames: {get: getChihous},
        provinceNames: {get: getProvinceNames},
        cityNames: {get: getCityNames},
        allProvinceNames: {get: getAllProvinceNames},
    });
}



// 私有方法
/**
    * 分析一个地名是属于aValidDivision中哪个行政区划的
    * 用来匹配oToCityLevel中aValidDivision的地名
    *
    * @param  {String}  sPlace          aValidDivision级别的地名
    * @return {Object}                  该地名的区划字符在aValidDivision中的序号
    */
function whichCityLevelDivision(sPlace, aValidDivision){
    let aPlace = [...sPlace];
    let nBracket = aPlace.indexOf('(');
    let nIndex = nBracket===-1 ? aPlace.length-1 : nBracket-1;
    let sDivision = aPlace[nIndex];
    return aValidDivision.indexOf(sDivision);
}



// 原型
Kukaku.prototype = {
    constructor: Kukaku,

    /**
        * 对oToCityLevel参数中的市级再按照aValidDivision分类
        *
        * @return {Object}    分类后的对象。不改变oToCityLevel和this.toCityLevel
        */
    allPlaces(){
        let oResult = {};
        // let total = 0;
        for(let chihou in this.toCityLevel){
            oResult[chihou] = {};
            for(let ken in this.toCityLevel[chihou]){
                oResult[chihou][ken] = {};
                this.validDivision.forEach(division=>{
                    oResult[chihou][ken][division] = [];
                });
                this.toCityLevel[chihou][ken].forEach(place=>{
                    let index = whichCityLevelDivision(place, this.validDivision);
                    if(index === -1){
                        throw new Error(place + ' is not a valid place');
                    }
                    oResult[chihou][ken][this.validDivision[index]].push(place);
                });
            }
        }
        return oResult;
    },


    /**
        * 根据省级名获得所在地方名
        *
        * @param  {String}  sProvince    省级名
        * @return {String}               省级名所在的地方名。如果没有找到返回空字符串
        */
    getChihouByProvince(sProvince){
        sProvince = sProvince.trim();
        let result = '';
        for(let chihou in this.provinceNames){
            if(this.provinceNames[chihou].includes(sProvince)){
                result = chihou;
            }
        }
        return result;
    },


    /**
        * 分析一个地名的地方——省——市三级行政区划
        *
        * @param  {String}  sPlace    地名字符串
        * @return {Object|Null}       如果匹配到则返回 地方——省——市 三级行政区划键值对
        *                               对象，如果没有匹配到则返回null
        */
    getDivisions(sPlace){

        // 要返回的三项数据
        let sChihou = '';
        let sProvince = '';
        let sCity = '';

        // 获取地方名
        // 如果sPlace中包含一个地方名，则暂定该地方名
        // 如果没有地方名，则暂时不决定
        // 如果有多个地方名，则返回null
        let aMatchChihou =  this.chihouNames.filter(name=>sPlace.includes(name));
        if(aMatchChihou.length===1) sChihou=aMatchChihou[0];
        if(aMatchChihou.length>1) return null;

        // 获取省级名
        // 如果sPlace中包含一个省级名，则暂定该省级名
        // 如果没有省级名，则暂时不决定
        // 如果有多个省级名，则返回null
        let aMatchProvince = this.allProvinceNames.filter(
            name=>sPlace.includes(name));
        if(aMatchProvince.length===1) sProvince=aMatchProvince[0];
        if(aMatchProvince.length>1) return null;
        // 如果地方名和省级名冲突，则返回null
        if(sChihou && sProvince){
            if(!(this.provinceNames[sChihou].includes(sProvince))){
                return null;
            }
        }

        // 获取市级名
        // 如果有省级名，则从该省级之下的市级区划名称匹配
        if(sProvince){
            let aMatchCity = this.cityNames[sProvince]
                .filter(name=>sPlace.includes(name));
            if(aMatchCity.length===1) sCity=aMatchCity[0];
            if(aMatchCity.length>1) return null;
            if(!sChihou){ // 如果之前没有获得地方名，这里可以根据省级名获得
                sChihou = this.getChihouByProvince(sProvince);
            }
            // 去掉括号再匹配一次，有可能待匹配的地名没有带应该带的括号
            if(aMatchCity.length===0){
                aMatchCity = this.cityNames[sProvince].filter(name=>{
                    return sPlace.includes(name.replace(/\(.+\)/, ''));
                });
                if(aMatchCity.length===1) sCity=aMatchCity[0];
            }
        }
        // 如果没有省级名只有地方名，则从该地方之下的所有市级名中匹配
        else if(sChihou){
            // 因为可能有多个省级有同名市级的情况，所以结果不一定只有一个
            let oMatch = {};
            this.provinceNames[sChihou].forEach(pro=>{
                let aCitiesInProvince = []; // pro省级之下的所有市级名
                aCitiesInProvince = this.cityNames[pro]
                    .filter(city=>sPlace.includes(city));
                // 如果当前省级中有两个及以上市级名都包含在测试字符串中
                if(aCitiesInProvince.length>1) return null;
                // sChihou地方的pro省级有该市级名
                if(aCitiesInProvince.length===1){
                    oMatch[pro] = aCitiesInProvince[0];
                }
            });
            // 有些省有同名市，则oMatch会包含多个省，则不能确定
            let aProvinces = Object.keys(oMatch);
            if(aProvinces.length>1) return null;
            if(aProvinces.length===1){
                sProvince = aProvinces[0];
                sCity = oMatch[sProvince];
            }
        }
        else{ // 省级名和地方名都没有
            let oMatch = {};
            for(let pro in this.cityNames){
                let aCitiesInProvince = []; // pro省级之下的所有市级名
                aCitiesInProvince = this.cityNames[pro]
                    .filter(city=>sPlace.includes(city));
                // 如果当前省级中有两个及以上市级名都包含在测试字符串中
                if(aCitiesInProvince.length>1) return null;
                // pro省级有该市级名
                if(aCitiesInProvince.length===1){
                    oMatch[pro] = aCitiesInProvince[0];
                }
            }
            // 有些省有同名市，则oMatch会包含多个省，则不能确定
            let aProvinces = Object.keys(oMatch);
            if(aProvinces.length>1) return null;
            if(aProvinces.length===0) return null;
            if(aProvinces.length===1){
                sProvince = aProvinces[0];
                sChihou = this.getChihouByProvince(sProvince);
                sCity = oMatch[sProvince];
            }
        }

        return {
            chihou: sChihou,
            province: sProvince,
            city: sCity,
        };
    },
};



module.exports = Kukaku;
