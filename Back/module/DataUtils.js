// 一些公用的数据处理函数


// 把itemID从数组转化为字符串形式
function itemIDArray2String(aItemID){
    const sLevel1ID = aItemID[0]<10 ? '0' + aItemID[0] : '' + aItemID[0];
    const sLevel2ID = aItemID[1]<10 ? '0' + aItemID[1] : '' + aItemID[1];
    return sLevel1ID + sLevel2ID + aItemID[2];
}

// 把itemID从字符串转化为数组形式
function itemIDString2Array(sItemID){
    const nLevel1ID = Number.parseInt(sItemID.slice(0, 2), 10);
    const nLevel2ID = Number.parseInt(sItemID.slice(2, 4), 10);
    const nInnerID = Number.parseInt(sItemID.slice(4), 10);
    return [nLevel1ID, nLevel2ID, nInnerID];
}

module.exports = {
    itemIDArray2String,
    itemIDString2Array,
};
