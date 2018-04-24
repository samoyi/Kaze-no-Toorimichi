exports.common = {
    strArr(arg){
        if(!Array.isArray(arg) || arg.length===0){
            return false;
        }
        return arg.every(item=>typeof item === 'string');
    },
    numArr(arg){
        if(!Array.isArray(arg) || arg.length===0){
            return false;
        }
        return arg.every(item=>typeof item === 'number'
                            && !Number.isNaN(item));
    },
    intArr(arg){
        if(!Array.isArray(arg) || arg.length===0){
            return false;
        }
        return arg.every(item=>Number.isInteger(item));
    },
    int(arg){
        return Number.parseInt(arg) === arg;
    },
    decimalNumStr(arg){
        let num = Number.parseFloat(arg);
        if(num===0 && !Object.is(num, 0)){ // -0
            return  '-0' === arg;
        }
        return num + '' === arg;
    },
    decimalIntStr(arg){
        let num = Number.parseInt(arg, 10);
        if(num===0 && !Object.is(num, 0)){ // -0
            return  '-0' === arg;
        }
        return num + '' === arg;
    },
    nonEmptyOrBlankStr(arg){
        if(typeof arg !== 'string') return false;
        return arg.trim().length !== 0;
    },
    arrayHas3Items(arg){
        return Array.isArray(arg) && arg.length===3;
    },
    arrayHas3NumberItems(arg){
        try{
            this.get([arg]).types(['arrayHas3Items']);
            arg.forEach(item=>{
                this.get([item]).types(['number']);
            });
        }
        catch(err){
            return false;
        }
        return true;
    },
};
