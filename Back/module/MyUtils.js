// My common utility fns

const assert = require('assert');


// Conver itemID from array to string
function itemIDArray2String(aItemID){
    const sLevel1ID = aItemID[0]<10 ? '0' + aItemID[0] : '' + aItemID[0];
    const sLevel2ID = aItemID[1]<10 ? '0' + aItemID[1] : '' + aItemID[1];
    return sLevel1ID + sLevel2ID + aItemID[2];
}

// Conver itemID from string to array
function itemIDString2Array(sItemID){
    const nLevel1ID = Number.parseInt(sItemID.slice(0, 2), 10);
    const nLevel2ID = Number.parseInt(sItemID.slice(2, 4), 10);
    const nInnerID = Number.parseInt(sItemID.slice(4), 10);
    return [nLevel1ID, nLevel2ID, nInnerID];
}


// assert.throws for async function
async function assertThrowsAsync(asyncFn, regExp) {
    let f = ()=>{};
    try {
        await asyncFn();
    }
    catch(err) {
        f = () => {throw err};
    }
    finally {
        assert.throws(f, regExp);
    }
}

module.exports = {
    itemIDArray2String,
    itemIDString2Array,
    assertThrowsAsync,
};
