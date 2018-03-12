'use strict';

const fs = require('fs');
const assert = require('assert');
const {inspect} = require('util');

const Item = require('../module/Item');
const item = new Item();


let sISBN = '9787563391882',
    aTitle = ['字解日本：十二岁时'],
    aSubject = [
        {
            route: [
                [0, 4394, 5532, 5567],
            ],
            info: {
                 isWhole: true,
                 des: '十二岁时年中行事',
            },
        }
    ],
    aAuthor = ['茂吕美耶'],
    sOfficialSite = 'https://book.douban.com/subject/4164041/';

// let result = item.addBookItem(sISBN, aTitle, aSubject, aAuthor, sOfficialSite);
// let nSuccess = 0;
// result.then((res)=>{
//     nSuccess++;
// })
// .catch((err)=>{
//     throw err;
// });
console.log(666);
console.log(item.removeItem);
item.removeItem(0, 0, 1);
console.log(777);
// console.log(JSON.stringify(result, null, 4));

// let aTitle = ['知日'],
//     aSubject = [
//         {
//             route: [[ 0, 1315, 1980, 1981, 1982, 1994 ]],
//             info: {
//                  isWhole: false,
//                  issue: '妖怪',
//                  des: '《知日》杂志妖怪特集',
//             },
//         }
//     ],
//     sOfficialSite= 'https://book.douban.com/subject/20645157/';
// let result = item.addPeriodicalItem(aTitle, aSubject, sOfficialSite);

// let aTitle = ['假设一本关于神社的杂志'],
//     aSubject = [
//         {
//             route: [[ 0, 1, 17, 18, 83 ]],
//             info: {
//                  isWhole: true,
//                  des: '《假设一本关于神社的杂志》是假设的一本专门介绍神社的杂志',
//             },
//         }
//     ];
// let result = item.addPeriodicalItem(aTitle, aSubject);


// let aTitle = ['夢', '梦'],
//     aSubject = [
//         {
//             route: [
//                 [ 0, 4394, 5532, 5567 ],
//                 [ 0, 1315, 4221, 4222, 4226, 4253 ]
//             ],
//             info: {
//                 route: [],
//                 info: {
//                      isWhole: true,
//                      des: '黑泽明',
//                 },
//             },
//         }
//     ],
//     sIMDb = 'tt0100998',
//     sOfficialSite = 'http://www.imdb.com/title/tt0100998/';
// item.addLiveActionVideoItem(aTitle, aSubject, sIMDb, sOfficialSite);


// let aTitle = ['千と千尋の神隠し', '千与千寻'],
//     aSubject = [],
//     sIMDb = '',
//     sOfficialSite = '';
// item.addLiveActionVideoItem(aTitle, aSubject, sIMDb, sOfficialSite);
