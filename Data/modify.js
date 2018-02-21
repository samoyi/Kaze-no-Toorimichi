'use strict';

const fs = require('fs');

let oYoukai = JSON.parse(fs.readFileSync('Youkai.json', 'utf8'));
oYoukai.children.forEach(youkai=>{
    youkai['reference'] = {};
    youkai['intro'] = ["", ""];
})
fs.writeFileSync('Youkai1.json', JSON.stringify(oYoukai, null, 4), 'utf8');
