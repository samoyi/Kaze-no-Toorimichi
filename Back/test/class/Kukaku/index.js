const assert = require('assert');
const Kukaku = require('../../../class/Kukaku/index');

// 从地方级别直到县下一级(aValidDivision)的所有区划单位
const fs = require('fs');
const oToCityLevel = JSON.parse(fs.readFileSync('./data/oToCityLevel.json'));
const aValidDivision = ['市', '郡', '区', '庁'];


const kukaku = new Kukaku(oToCityLevel, aValidDivision);
let result = kukaku.allPlaces();
console.log(result);
// console.log(kukaku.getDivisions('滋賀県蒲生郡竜王町'));
// console.log(kukaku.getDivisions('京都府長岡京市'));
// console.log(kukaku.getDivisions('愛知県大府市'));
// console.log(kukaku.getDivisions('北海道中標津町'));
// console.log(kukaku.getDivisions('兵庫県神戸市'));
// console.log(kukaku.getDivisions('岡山県津山市'));
// console.log(kukaku.getDivisions('滋賀県大津市'));
// console.log(kukaku.getDivisions('愛知県名古屋市'));
// console.log(kukaku.getDivisions('京都府京都市上京区'));
// console.log(kukaku.getDivisions('沖縄県那覇市'));
// console.log(kukaku.getDivisions('愛知県名古屋市緑区'));
// console.log(kukaku.getDivisions('鳥取県西伯郡大山町'));
// console.log(kukaku.getDivisions('岐阜県垂井町'));
// console.log(kukaku.getDivisions('大分県中津市'));
// console.log(kukaku.getDivisions('長野県大町市'));
