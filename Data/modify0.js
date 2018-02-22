'use strict';

const fs = require('fs');

let aOnsen = JSON.parse(fs.readFileSync('onsen.json', 'utf8'));
aOnsen.forEach(onsen=>{
    onsen.name = [onsen.name];
    onsen.ch = '';
    onsen.intro = ['', ''];
    onsen.reference = {};
    onsen.children = [];
});

fs.writeFileSync('onsen.json', JSON.stringify(aOnsen), 'utf8');
