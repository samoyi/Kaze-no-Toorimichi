'use strict';

const fs = require('fs');
const assert = require('assert');
const {inspect} = require('util');

const Item = require('../module/Item');
const item = new Item();


const sISBN = '9784048839266',
    aTitle = ['日本妖怪大事典?'],
    aSubject = [
        {
            routes: [
                [ 0, 4394, 4395 ], // 妖鬼霊
            ],
            info: {
                 isWhole: true,
                 des: '',
            },
        }
    ],
    aAuthor = ['水木しげる', '村上健司 '],
    sOfficialSite = 'https://book.douban.com/subject/6023928/';


let promise = item.addBookItem(sISBN, aTitle, aSubject, aAuthor
                                            , sOfficialSite);
promise.then((index)=>{
    // item.removeItem(0, 0, index);
    console.log(index);
    console.log('done');
})
.catch((err)=>{
    throw err;
});



// 所有的添加条目测试都是添加成功之后再删除
// describe('检查条目操作类 Item.js', ()=>{
//     describe('添加书刊', ()=>{
//         it('添加书籍，整本符合某主题', ()=>{
//             const sISBN = '9784048839266',
//                 aTitle = ['日本妖怪大事典'],
//                 aSubject = [
//                     {
//                         routes: [
//                             [ 0, 4394, 4395 ], // 妖鬼霊
//                         ],
//                         info: {
//                              isWhole: true,
//                              des: '',
//                         },
//                     }
//                 ],
//                 aAuthor = ['水木しげる', '村上健司 '],
//                 sOfficialSite = 'https://book.douban.com/subject/6023928/';
//
//             assert.doesNotThrow(()=>{
//                 let promise = item.addBookItem(sISBN, aTitle, aSubject, aAuthor
//                                                             , sOfficialSite);
//                 promise.then((index)=>{
//                     item.removeItem(0, 0, index);
//                 })
//                 .catch((err)=>{
//                     throw err;
//                 });
//             });
//         });
//         it('添加书籍，部分章节符合某主题', ()=>{
//             const sISBN = '9787563391882',
//                 aTitle = ['字解日本：十二岁时'],
//                 aSubject = [
//                     {
//                         routes: [
//                             [0, 4394, 5532, 5567], // 雛祭り
//                         ],
//                         info: {
//                              isWhole: false,
//                              des: '春篇，三月，雛祭り',
//                         },
//                     }
//                 ],
//                 aAuthor = ['茂吕美耶'],
//                 sOfficialSite = 'https://book.douban.com/subject/4164041/';
//
//             assert.doesNotThrow(()=>{
//                 let promise = item.addBookItem(sISBN, aTitle, aSubject, aAuthor
//                                                             , sOfficialSite);
//                 promise.then((index)=>{
//                     item.removeItem(0, 0, index);
//                 })
//                 .catch((err)=>{
//                     throw err;
//                 });
//             });
//         });
//     });
// });



// let aTitle = ['知日'],
//     aSubject = [
//         {
//             routes: [[ 0, 1315, 1980, 1981, 1982, 1994 ]],
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
//             routes: [[ 0, 1, 17, 18, 83 ]],
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
//             routes: [
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
