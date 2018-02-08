'use strict';

const fs = require('fs');

// 从地方级别直到县下一级(aValidDivision)的所有区划单位
const oToCityLevel = JSON.parse(fs.readFileSync('./data/oToCityLevel.json'));
const aValidDivision = ['市', '郡', '区', '庁'];



/**
 * 分析一个地名是属于aValidDivision中哪个行政区划的
 *
 * @param  {String}  sPlace          aValidDivision级别的地名
 * @param  {Array}   aValidDivision  合理的区划名称组成的数组。每个数组项为一个字符
 * @return {Object}                  该地名的区划字符在aValidDivision中的序号
 */
function getDivision(sPlace, aValidDivision){
    let aPlace = [...sPlace],
        nBracket = aPlace.indexOf('('),
        nIndex = nBracket===-1 ? aPlace.length-1 : nBracket-1,
        sDivision = aPlace[nIndex];
    return aValidDivision.indexOf(sDivision);
}




function JPGeo(oToCityLevel){

    // Check argument
    let sArgType = Object.prototype.toString
                        .call(oToCityLevel).slice(8,-1);
    if(sArgType!=='Object'){
        throw new TypeError('Argument expects a plain object, '
                                +sArgType+  ' given.')
    }

    // Check duplicate
    for(let chihou in oToCityLevel){
        for(let ken in oToCityLevel[chihou]){
            let aDuplicate = oToCityLevel[chihou][ken].filter((place,index,arr)=>{
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

    // Init
    // this.chihouNames = Object.keys(oToCityLevel);
    this.provinceNames = (()=>{
        let arr = [];
        for(let chihou in oToCityLevel){
            arr = arr.concat( Object.keys(oToCityLevel[chihou]) );
        }
        return arr;
    })();
    // console.log(this.chihouNames);
    // console.log(this.provinceNames);
}

JPGeo.prototype = {
    allPlaces(){
        let oResult = {},
            total = 0;
        for(let chihou in oToCityLevel){
            oResult[chihou] = {};
            for(let ken in oToCityLevel[chihou]){
                oResult[chihou][ken] = {};
                aValidDivision.forEach(division=>{

                    oResult[chihou][ken][division] = [];
                });
                oToCityLevel[chihou][ken].forEach(place=>{
                    let index = getDivision(place, aValidDivision);
                    if(index === -1){
                        throw new Error(place + ' is not a valid place');
                    }
                    oResult[chihou][ken][aValidDivision[index]].push(place);
                    ;
                });

            }
        }
        return oResult;
    },

    /**
     * 分析一个地名的行政区划，详细到aValidDivision级别
     *
     *
     */
    getDivisions(sPlace){
        // 算上带“地方”的地方名
        const aChihou = this.chihous.concat(this.chihous.map(item=>item+'地方'));

        // 不分类的省级行政区名
        let aProvince = [];
        for(let pro in this.provinces){
            aProvince = aProvince.concat(this.provinces[pro]);
        }


        let sChihou = '',
            sProvince = '',
            sCity = '';

        // 如果sPlace中包含一个地方名，则暂定该地方名
        // 如果没有地方名，则暂时不决定
        // 如果有多个地方名，则返回null
        let aMatchChihou = aChihou.filter(name=>sPlace.includes(name));
        if(aMatchChihou.length===1) sChihou=aMatchChihou[0];
        if(aMatchChihou.length>1) return null;


        // 如果sPlace中包含一个省级名，则暂定该省级名
        // 如果没有省级名，则暂时不决定
        // 如果有多个省级名，则返回null
        let aMatchProvince = aProvince.filter(name=>sPlace.includes(name));
        if(aMatchProvince.length===1) sProvince=aMatchProvince[0];
        if(aMatchProvince.length>1) return null;

        // 如果地方名和省级名冲突，则返回null
        if(sChihou && sProvince){
            if(!(sProvince in oToCityLevel[sChihou])){
                return null;
            }
        }

        // 下面匹配市级名
        // 如果有省级名，则从该省级之下的市匹配
        if(sProvince){
            let aMatchCity = this.provinceCata[sProvince]
                                        .filter(name=>sPlace.includes(name));
            if(aMatchCity.length===1){
                sCity=aMatchCity[0];
            };
            if(aMatchCity.length>1) return null;

            if(!sChihou){
                sChihou = getChihouByProvince(sProvince);
            }

        }
        // 如果没有省级名只有地方名，则从该地方之下的所有市中匹配
        else if(sChihou){
            let aCitiesInProvince = [],
                oMatch = {};
            this.provinces[sChihou].forEach(pro=>{
                // pro省的所有市
                aCitiesInProvince = oToCityLevel[sChihou][pro]
                                        .filter(city=>sPlace.includes(city));
                // 如果当前省中有两个城市都包含在测试字符串中
                if(aCitiesInProvince.length>1){
                    return null;
                }
                if(aCitiesInProvince.length===1){
                    oMatch[pro] = aCitiesInProvince[0];
                }
            });
            // 有些省有同名市，则oMatch会包含多个省，每个省都有该市，则不能确定
            let aProvinces = Object.keys(oMatch);
            if(aProvinces.length===1) {
                sProvince = aProvinces[0];
                sCity = oMatch[sProvince];

            };
            if(aProvinces.length>1) return null;
        }

        return {
            chihou: sChihou,
            province: sProvince,
            city: sCity,
        }
    },
};


// Define properties
function getChihous(){
    return Object.keys(oToCityLevel);
}
function getProvinces(){
    let obj = {};
    for(let chihou in oToCityLevel){
        obj[chihou] = Object.keys(oToCityLevel[chihou]);
    }
    return obj;
}
function getProvinceCata(){
    let obj = {};
    for(let chihou in oToCityLevel){
        for(let pro in oToCityLevel[chihou]){
            obj[pro] = oToCityLevel[chihou][pro];
        }
    }
    return obj;
}
Object.defineProperties(JPGeo.prototype, {
    chihous: {value: getChihous()},
    // chihouNames: {value: this.hihouNames.concat(Object.keys(this.hihouNames).map(item=>item+'地方')},
    provinces: {value: getProvinces()},
    provinceCata: {value: getProvinceCata()},
});



function getChihouByProvince(sProvince){
    sProvince = sProvince.trim();
//     if(sProvince.includes('地方'));{
//         sProvince = sProvince.slice(0, -2);
//     }
// console.log(sProvince);
    const oProvince = JPGeo.prototype.provinces;
    let result = '';
    for(let chihou in oProvince){
        if(oProvince[chihou].includes(sProvince)){
            result = chihou;
        }
    }
    return result;
}



const geo = new JPGeo(oToCityLevel);
// let result = geo.allPlaces();
console.log(geo.getDivisions('滋賀県蒲生郡竜王町'));
console.log(geo.getDivisions('京都府長岡京市'));
console.log(geo.getDivisions('愛知県大府市'));
console.log(geo.getDivisions('北海道中標津町'));
console.log(geo.getDivisions('兵庫県神戸市'));
console.log(geo.getDivisions('岡山県津山市'));
console.log(geo.getDivisions('滋賀県大津市'));
console.log(geo.getDivisions('愛知県名古屋市'));
console.log(geo.getDivisions('京都府京都市上京区'));
console.log(geo.getDivisions('沖縄県那覇市'));
console.log(geo.getDivisions('愛知県名古屋市緑区'));
console.log(geo.getDivisions('鳥取県西伯郡大山町'));
console.log(geo.getDivisions('岐阜県垂井町'));
console.log(geo.getDivisions('大分県中津市'));
console.log(geo.getDivisions('長野県大町市'));



// console.log(geo.chihous);
// console.log(geo.provinces);
// console.log(geo.provinceCata);
// console.log(geo.chihouNames);

// fs.writeFileSync('cities.json', JSON.stringify(geo.provinceCata), 'utf-8');
