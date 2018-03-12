'use strict';

function findDuplicateIndexes(arr){
    let oSameIndexes = {};
    arr.forEach((item,index)=>{
        let firstIndex = arr.indexOf(item),
            lastIndex = arr.lastIndexOf(item);
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
    Object.freeze(obj);
    Object.keys(obj).forEach(key=>{
        if(typeof obj[key] === 'object'){
          deepFreeze( obj[key] );
        }
    });
}



module.exports = {
    findDuplicateIndexes,
    deepFreeze,
};
