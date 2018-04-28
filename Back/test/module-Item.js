// 测试Item模块

'use strict';

const assert = require('assert');

const Item = require('../module/Item');
const Routes = require('../module/Routes');



// 测试数据 --------------------------------------------------------------------
// 这里不要使用以下四个主题路径，会和Routes的测试数据冲突
// [0, 1, 2, 3, 4]
// [0, 1, 2, 3, 5]
// [0, 1, 2, 3, 7]
// [0, 1, 2, 3, 8]

// 该本次测试添加一个条目后它的类别内ID
const nExpectedInnerID = 10;

// 定义一个已删除的条目的类别内ID，用于查询时返回null
const nRemovedInnerID = 0;

// 添加的条目信息
const route1 = [0, 4394, 4395];
const route2 = [0, 1, 17, 18, 83, 170];
const oInfo = {
    ISBN: '9784048839266',
    title: ['日本妖怪大事典'],
    author: ['水木しげる', '村上健司 '],
    officialSite: 'https://book.douban.com/subject/6023928/',
};
const aSubject = [
    {
        route: route1,
        isWhole: true,
        des: '11',
    },
    {
        route: route2,
        isWhole: false,
        part: '第二章',
        des: '22',
    },
];
const oExpectedItem = {
    info: oInfo,
    subjects: aSubject,
};
// 测试数据结束 -----------------------------------------------------------------


describe('module-Item', ()=>{
    describe('addItem', ()=>{
        it('add an item', ()=>{
            assert.doesNotThrow(()=>{
                Item.addItem(oInfo, aSubject, 0, 0)
                    .then((nInnerID)=>{
                        assert.strictEqual(nInnerID, nExpectedInnerID);
                    })
                    .catch((err)=>{
                        throw err;
                    });
            });
        });
    });

    describe('getItem', ()=>{
        it('get a book item', async ()=>{
            const oItem = await Item.getItem([0, 0, nExpectedInnerID]);
            assert.deepStrictEqual(oItem, oExpectedItem);
        });
    });

    describe('modifyItemInfo', ()=>{
        const oNewInfo = {
            ISBN: '9784048839266',
            title: ['日本妖怪大事典-new'],
            author: ['水木しげる', '村上健司 '],
            officialSite: 'https://book.douban.com/subject/6023928/',
        };
        it('modify for a removed item', async ()=>{
            const result = await Item.modifyItemInfo([0, 0, nRemovedInnerID]
                , oNewInfo);
            assert.strictEqual(result, null);
        });
        it('modify for a undefined item', async ()=>{
            const result = await Item.modifyItemInfo([0, 0, nExpectedInnerID + 1]
                , oNewInfo);
            assert.strictEqual(result, undefined);
        });
        it('modify for current item', async ()=>{
            const result = await Item.modifyItemInfo([0, 0, nExpectedInnerID]
                , oNewInfo);
            assert.strictEqual(result, true);
        });
        it('check modification', async ()=>{
            const oItem = await Item.getItem([0, 0, nExpectedInnerID]);
            assert.deepStrictEqual(oItem.info, oNewInfo);
        });
    });

    describe('addSubject', ()=>{
        it('sucject already exists', async ()=>{
            const subject = {
                route: [0, 4394, 4395],
                info: {
                     isWhole: true,
                     des: 'add a subject',
                },
            };
            const result = await Item.addSubject([0, 0, nExpectedInnerID]
                , subject);
            assert.strictEqual(result, false);
        });
        it('item dose not exists', async ()=>{
            const subject = {
                route: [0,1,2],
                info: {
                     isWhole: true,
                     des: 'add a subject',
                },
            };
            const result = await Item.addSubject([0, 0, nExpectedInnerID + 1]
                , subject);
            assert.strictEqual(result, undefined);
        });
        it('item has been removed', async ()=>{
            const subject = {
                route: [0,1,2],
                info: {
                     isWhole: true,
                     des: 'add a subject',
                },
            };
            const result = await Item.addSubject([0, 0, nRemovedInnerID]
                , subject);
            assert.strictEqual(result, null);
        });
        it('add a subject', async ()=>{
            const subject = {
                route: [0,1,2],
                info: {
                     isWhole: true,
                     des: 'add a subject',
                },
            };
            const result =await Item.addSubject([0, 0, nExpectedInnerID]
                , subject);
            assert.strictEqual(result, true);
        });
        it('check added', async ()=>{
            const aItemIDs = await Routes.getItemIDsByRoute([0,1,2]);
            const [aActualItemID] = aItemIDs.slice(-1);
            assert.deepStrictEqual(aActualItemID, [0, 0, nExpectedInnerID]);
        });
    });

    describe('removeSubject', ()=>{
        it('sucject dose not exists', async ()=>{
            const result = await Item.removeSubject([0, 0, nExpectedInnerID]
                , [0,1,3]);
            assert.strictEqual(result, false);
        });
        it('item dose not exists', async ()=>{
            const result = await Item.removeSubject([0, 0, nExpectedInnerID + 1]
                , [0,1,2]);
            assert.strictEqual(result, undefined);
        });
        it('item has been removed', async ()=>{
            const result = await Item.removeSubject([0, 0, nRemovedInnerID]
                , [0,1,2]);
            assert.strictEqual(result, null);
        });
        it('remove a subject', async ()=>{
            const result = await Item.removeSubject([0, 0, nExpectedInnerID]
                , [0,1,2]);
            assert.strictEqual(result, true);
        });
        it('check removal', async ()=>{
            const aItemIDs = await Routes.getItemIDsByRoute([0,1,2]);
            aItemIDs.forEach(aItem=>{
                assert.notDeepStrictEqual(aItem, [0, 0, nExpectedInnerID]);
            });
        });
    });

    describe('removeItem', ()=>{
        it('item dose not exists', async ()=>{
            const result = await Item.removeItem([0, 0, nExpectedInnerID + 1]);
            assert.strictEqual(result, undefined);
        });
        it('item has been removed', async ()=>{
            const result = await Item.removeItem([0, 0, nRemovedInnerID]);
            assert.strictEqual(result, null);
        });
        it('remove an item', async ()=>{
            const result = await Item.removeItem([0, 0, nExpectedInnerID]);
            assert.strictEqual(result, true);
        });
        it('check removal', async ()=>{
            const result = await Item.removeItem([0, 0, nExpectedInnerID]);
            assert.strictEqual(result, null);
            const aItemIDs1 = await Routes.getItemIDsByRoute(route1);
            aItemIDs1.forEach(aItem=>{
                assert.notDeepStrictEqual(aItem, [0, 0, nExpectedInnerID]);
            });
            const aItemIDs2 = await Routes.getItemIDsByRoute(route2);
            aItemIDs2.forEach(aItem=>{
                assert.notDeepStrictEqual(aItem, [0, 0, nExpectedInnerID]);
            });
        });
    });
});
