// 测试Routes模块

'use strict';

const assert = require('assert');
const Routes = require('../module/Routes');
const MU = require('../module/MyUtils');



// 测试数据 --------------------------------------------------------------------
// 这里不要使用以下三个主题路径，会和Item的测试数据冲突
// [0, 4394, 4395]
// [0, 1, 17, 18, 83, 170]
// [0, 1, 2]

const aRoutes = [ // 用来存入ItemID的主题路径
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 5],
];
const aItemID = [99, 88, 77]; // 测试用条目ID，实际不会有这么大的一二级条目分类

const aRoutesWithoutItemID = [ // 用来测试 不存在ItemID的主题路径
    [0, 1, 2, 3, 7],
    [0, 1, 2, 3, 8],
];
// 测试数据结束 -----------------------------------------------------------------


describe('module-Routes', ()=>{
    describe('addItemIDToRoutes', ()=>{
        it('add item id to 2 given routes', async ()=>{
            const result = await Routes.addItemIDToRoutes(aRoutes, aItemID);
            assert.strictEqual(result, true);
        });
        it('undefined route',()=>{
            MU.assertThrowsAsync(
                async ()=>{
                    await Routes.addItemIDToRoutes(aRoutes.concat([[0, 0, 0]]), aItemID);
                }
            );
        });
    });

    describe('getItemIDsByRoute', ()=>{
        it('get item id from the 2 given routes', async ()=>{
            const aItemID1 = await Routes.getItemIDsByRoute(aRoutes[0]);
            const aItemID2 = await Routes.getItemIDsByRoute(aRoutes[1]);
            assert.deepStrictEqual(aItemID1, aItemID2);
            assert.deepStrictEqual(aItemID1, [[99, 88, 77]]);
        });
        it('routes without item id', async ()=>{
            const aItemID1 = await Routes.getItemIDsByRoute(aRoutesWithoutItemID[0]);
            const aItemID2 = await Routes.getItemIDsByRoute(aRoutesWithoutItemID[1]);
            assert.deepStrictEqual(aItemID1, aItemID2);
            assert.deepStrictEqual(aItemID1, []);
        });
        it('undefined route', ()=>{
            MU.assertThrowsAsync(async ()=>{
                Routes.getItemIDsByRoute([0, 0, 0]);
            });
        });
    });

    describe('removeItemID', ()=>{
        it('some routes without item id', async ()=>{
            const result = await Routes.removeItemID(
                aRoutes.concat(aRoutesWithoutItemID), aItemID);
            assert.deepStrictEqual(result, aRoutesWithoutItemID);
        });
        it('remove item id from the 2 given routes', async ()=>{
            const result = await Routes.removeItemID(aRoutes, aItemID);
            assert.deepStrictEqual(result, true);
        });
        it('no route has this item id now', async ()=>{
            const result = await Routes.removeItemID(
                aRoutes.concat(aRoutesWithoutItemID), aItemID);
            assert.deepStrictEqual(result, aRoutes
                .concat(aRoutesWithoutItemID));
        });
        it('undefined route', ()=>{
            MU.assertThrowsAsync(async ()=>{
                Routes.removeItemID(aRoutes.concat([0, 0, 0]), aItemID);
            });
        });
    });
});
