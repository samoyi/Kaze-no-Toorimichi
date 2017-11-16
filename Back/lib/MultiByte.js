function MB(){
    'use strict';

    const check = function(str){
        let arr = [...str];
        if(str.length === arr.length) return [];
        let aMBCharIndex = [],
            i = 0, j = 0,
            len = str.length;
        for(; i<len-1; i++,j++){
            if(str[i] !== arr[j]){
                aMBCharIndex.push(j);
                i++;
            }
        }

        return aMBCharIndex;
    };

    const pad = (str, direction, targetLength, padString=" ")=>{
        let fnOrigin = direction==='end' ? ''.padEnd.bind(str) : ''.padStart.bind(str);

        if(padString===" ") return fnOrigin(targetLength, padString);

        let aMBCharIndexInStr = check(str),
            aMBCharIndexInPadStr = check(padString);

        if(aMBCharIndexInStr.length || aMBCharIndexInPadStr.length){
            let aPadStr = [...padString],
                nPadStrLen = aPadStr.length,
                nPadLen = targetLength - [...str].length,
                nRepeatTimes = Math.floor(nPadLen/nPadStrLen),
                mod = nPadLen%nPadStrLen,
                sPad = padString.repeat(nRepeatTimes) + aPadStr.slice(0, mod).join('');

            return direction==='end' ? str + sPad : sPad + str;
        }
        else{
            return fnOrigin(targetLength, padString);
        }
    }




    this.check = str=>check(str);


    this.length = str=>[...str].length;


    this.charAt = (str, index)=>[...str][index];


    this.charCodeAt = (str, index)=>[...str][index].codePointAt(0);


    this.fromCharCode = nCode=>String.fromCodePoint(nCode);


    this.indexOf = (str, substr)=>{
        let index = str.indexOf(substr),
            num = check(str.slice(0, index)).length;
        return index - num;
    };


    this.lastIndexOf = (str, substr)=>{
        let index = str.lastIndexOf(substr),
            num = check(str.slice(0, index)).length;
        return index - num;
    };


    this.match = (str, re)=>{
        let result = str.match(re);

        if(result && result[0]!=='' && result.index!==undefined){
            let substr = str.slice(0, result.index),
                aMBCharIndex = check(substr);
            result.index -= aMBCharIndex.length;
        }
        return result;
    };


    this.padEnd = (str, targetLength, padString=" ")=>{
        return pad(str, 'end', targetLength, padString);
    };


    this.padStart = (str, targetLength, padString=" ")=>{
        return pad(str, 'start', targetLength, padString);
    };


    this.search = (str, re)=>{
        let index = str.search(re);
        if(index>1){
            index -= check(str.slice(0, index) ).length;
        }
        return index;
    };


    this.slice = (str, beginIndex, endIndex=undefined)=>[...str].slice(beginIndex, endIndex).join('');


    this.split = str=>[...str];


    this.substr = (str, start, length=undefined)=>{
        if(length<1) return '';
        let len = length ? start+length : undefined;
        return [...str].slice(start, len).join('');
    };


    this.substring = (str, start, end)=>{
        if(!start || start<0){ // NaN, null or negative
            start = 0;
        }
        if( (end!==undefined) && (!end || end<0) ){ // NaN, null or negative
            end = 0;
        }
        if(start>end){
            return [...str].slice(end, start).join('');
        }
        return [...str].slice(start, end).join('');
    };
}

module.exports = MB;
