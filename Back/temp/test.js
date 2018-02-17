'use strict';


const Kukaku = require('../class/Kukaku/index');

const util = require('util');
const fs = require('fs');
const oToCityLevel = JSON.parse(fs.readFileSync('./oToCityLevel.json'));
const aValidDivision = ['市', '郡', '区', '庁'];
const kukaku = new Kukaku(oToCityLevel, aValidDivision);

let aJinja = JSON.parse(fs.readFileSync('./jinja.json'));
let aNoSpace = [];

aJinja.forEach(jinja=>{
    let oSpace = kukaku.getDivisions(jinja['市级区划']),
        sChihou = '',
        sCity = '';
    if(!oSpace || !oSpace.chihou || !oSpace.city){
        aNoSpace.push(jinja);
    }
    if(oSpace && oSpace.chihou) { sChihou = oSpace.chihou }
    if(oSpace && oSpace.city) { sCity = oSpace.city }

    jinja['行政区划'] = sChihou;
    jinja['市级区划'] = sCity;
});
console.log(aNoSpace.length);
fs.writeFileSync('aNoSpace.json', JSON.stringify(aNoSpace), 'utf8');
// console.log(aJinja.length);
// console.log(aJinja);
// fs.writeFileSync('rightJinja.json', JSON.stringify(aJinja), 'utf8');
