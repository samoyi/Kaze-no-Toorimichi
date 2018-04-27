const fs = require('fs');

const sData = fs.readFileSync('../DataBase/IDTree.json', 'utf8');
const oData = JSON.parse(sData);
const sIndentData = JSON.stringify(oData, null, 4);
fs.writeFileSync('../DataBase/indentIDTree.json', sIndentData);
