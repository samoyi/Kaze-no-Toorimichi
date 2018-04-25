'use strict';
const fs = require('fs');
const assert = require('assert');
const {inspect} = require('util');

const Item = require('../module/Item');


// const sISBN = '9784048839266';
// const aTitle = ['日本妖怪大事典'];
// const aAuthor = ['水木しげる', '村上健司 '];
// const sOfficialSite = 'https://book.douban.com/subject/6023928/';


// 填写
let nExpectedInnerID = 8; // 本次测试添加一个条目后它的类别内ID


// 通过添加这个方法，使得promise的错误可以被抛出到外部。否则现阶段的Nodejs不会抛出
// Promise的错误，导致无法被断言。
Promise.prototype.done = function (onFulfilled, onRejected) {
    this.then(onFulfilled, onRejected)
    .catch(function (reason) {
        // 抛出一个全局错误
        setTimeout(() => { throw reason });
    });
};


const oInfo = {
    ISBN: '9784048839266',
    title: ['日本妖怪大事典'],
    author: ['水木しげる', '村上健司 '],
    officialSite: 'https://book.douban.com/subject/6023928/',
};
const aSubject = [
    {
        route: [ 0, 4394, 4395 ],
        isWhole: true,
        des: '11',
    },
    {
        route: [0,1,17,18,83,170],
        isWhole: false,
        part: '第二章',
        des: '22',
    },
];

const oExpectedItem = {
    info: oInfo,
    subjects: aSubject,
};


let nActualInnerID = -1;

describe('module-Item', ()=>{
    // describe('addItem', ()=>{
    //     it('add a book', ()=>{
    //         assert.doesNotThrow(()=>{
    //             Item.addItem(oInfo, aSubject, 0, 0)
    //                 .then((nInnerID)=>{
    //                     nActualInnerID = nInnerID;
    //                     assert.strictEqual(nActualInnerID, nExpectedInnerID);
    //                 })
    //                 .catch((err)=>{
    //                     throw err;
    //                 });
    //         });
    //     });
    // });

    describe('getItem', ()=>{
        it('get a book item', ()=>{
            assert.doesNotThrow(()=>{
                Item.getItem([0, 0, 19])
                    .then((item)=>{
                        nani
                        assert.deepStrictEqual(item, oExpectedItem)
                    })
                    .catch((err)=>{
                        throw new Error(err);
                    });
            });
        });
    });

    // describe('modifyItemInfo', ()=>{
    //     it('4', ()=>{
    //         const expected = [0, Math.PI/2, Math.PI, Math.PI*1.5];
    //         assert.deepStrictEqual(radiansOnRing(4), expected);
    //     });
    //
    // });
    //
    // describe('addSubject', ()=>{
    //     it('4', ()=>{
    //         const expected = [0, Math.PI/2, Math.PI, Math.PI*1.5];
    //         assert.deepStrictEqual(radiansOnRing(4), expected);
    //     });
    //
    // });
    //
    // describe('removeSubject', ()=>{
    //     it('4', ()=>{
    //         const expected = [0, Math.PI/2, Math.PI, Math.PI*1.5];
    //         assert.deepStrictEqual(radiansOnRing(4), expected);
    //     });
    //
    // });
    //
    // describe('removeItem', ()=>{
    //     it('4', ()=>{
    //         const expected = [0, Math.PI/2, Math.PI, Math.PI*1.5];
    //         assert.deepStrictEqual(radiansOnRing(4), expected);
    //     });
    // });
});



// Item.modifyItemInfo([0, 0, 6], oInfo)
// .catch((err)=>{
//     throw err;
// });



// Item.addBookItem(sISBN, aTitle, aSubject, aAuthor, sOfficialSite)
// .then((index)=>{
//     console.log(index);
// })
// .catch((err)=>{
//     throw err;
// });

// Item.getItem([0, 0, 8])
// .then((item)=>{
//     console.log(item);
// })
// .catch((err)=>{
//     console.error(err);
// });

// const subject = {
//     route: [0,1,17,18,83,170],
//     info: {
//          isWhole: true,
//          des: '描述66666666',
//     },
// };
// Item.addSubject([0, 0, 20], subject)
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.error(err);
// });

// Item.removeSubject([0, 0, 6], [0,1,17,18,83,170])
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     throw new Error(err);
// });

// Item.removeItem([0, 0, 6])
// .then(res=>{
//     console.log('res');
//     console.log(res);
// })
// .catch(err=>{
//     console.error('err');
//     console.error(err);
// });



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
