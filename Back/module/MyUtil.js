'use strict';

function findDuplicateIndexes(arr){
    let oSameIndexes = {};
    arr.forEach((item,index)=>{
        let firstIndex = arr.indexOf(item);
        let lastIndex = arr.lastIndexOf(item);
        if(index===firstIndex && firstIndex!==lastIndex){
            oSameIndexes[item] = [firstIndex];
            let nNextIndex = firstIndex + 1;
            while(nNextIndex!==lastIndex){
                if(arr[nNextIndex]===arr[firstIndex]){
                    oSameIndexes[item].push(nNextIndex);
                }
                nNextIndex++;
            }
            oSameIndexes[item].push(lastIndex);
        }
    });
    return oSameIndexes;
}


function deepFreeze(obj){
    const propNames = Object.getOwnPropertyNames(obj);
    propNames.forEach(name=>{
        const prop = obj[name];
        if (typeof prop === 'object' && prop !== null)
        deepFreeze(prop);
    });
    return Object.freeze(obj);
}


module.exports = {
    findDuplicateIndexes,
    deepFreeze,
};
