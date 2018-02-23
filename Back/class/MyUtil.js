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

module.exports = {
    findDuplicateIndexes
};
