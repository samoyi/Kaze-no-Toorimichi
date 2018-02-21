'use strict';

const fs = require('fs');

let oYoukai = JSON.parse(fs.readFileSync('Youkai0.json', 'utf8'));
let oYiwen = JSON.parse(fs.readFileSync('yiwen.json', 'utf8'));

let ch = '';
oYoukai.children.forEach(youkai=>{
    ch = oYiwen[youkai.name[0]] ;
    youkai['ch'] = ch ? ch : '';
})
fs.writeFileSync('Youkai0.json', JSON.stringify(oYoukai, null, 4), 'utf8');
