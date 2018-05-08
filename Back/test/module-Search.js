'use strict';

const keyword = '淡路島'; // 测试用关键词


const assert = require('assert');
const {inspect} = require('util');
const Item = require('../module/Item');
const DB = require('../module/Database');
const MU = require('../module/MyUtils');


describe('keyword search', ()=>{
    let search = null;
    before(async ()=>{
        const aIDSubject = await DB.getIDSubjectData();
        const aIDRoutes = await DB.getIDRoutesData();
        const aItems = await DB.getItemsData();
        const Search = require('../module/Search');
        search = new Search(keyword, aIDSubject, aIDRoutes, aItems);
    });

    describe('search subjects', ()=>{
        let aResult = [];
        before(()=>{
            aResult = search.getSubjects();
        });
        it('have correct name properties', ()=>{
            aResult.forEach(subject=>{
                assert.strictEqual(Array.isArray(subject.name), true);
            });
        });
        it('have correct ch properties', ()=>{
            aResult.forEach(subject=>{
                assert.strictEqual(typeof subject.ch, 'string');
            });
        });
        it('have correct intro properties', ()=>{
            aResult.forEach(subject=>{
                assert.strictEqual(Array.isArray(subject.intro), true);
            });
        });
        it('have correct reference properties', ()=>{
            aResult.forEach(subject=>{
                assert.strictEqual({}.toString.call(subject.reference)
                    , '[object Object]');
            });
        });
    });

    // describe('get subject route', ()=>{
    //     it('have correct reference properties', ()=>{
    //         const aRoutes = search.getSubjectRoutes(6382);
    //         console.log(aRoutes);
    //     });
    // });

    // describe('get route group', ()=>{
    //     it('getRouteGroup', ()=>{
    //         const aRouteGroup = search.getRouteGroup();
    //         console.log(JSON.stringify(aRouteGroup, null, 4));
    //     });
    // });

    describe('get item IDs by route group', ()=>{
        // 先添加两个用于测试的条目
        let nTestItemID1 = -1;
        let nTestItemID2 = -1;
        let oExpectedItem1 = null;
        let oExpectedItem2 = null;
        before(async ()=>{
            const route1 = [0, 5572, 6218, 6382];
            const route2 = [0, 1, 17, 788, 933, 1035];
            const route3 = [0, 1, 17, 788, 789, 845, 890, 892];

            const oInfo1 = {
                ISBN: '9784829506257',
                title: ['淡路島 神の国を背景にしたブランディング'],
                author: ['原田 保', '金澤 和夫'],
                press: '芙蓉書房出版',
                officialSite: '',
            };
            const aSubject1 = [
                {
                    route: route1,
                    isWhole: true,
                    des: '“環境未来島”をめざす淡路島がとるべき戦略を提言!橋によって「島」の独立性が喪失するなか、「日本の始まりの地」という悠久の過去を地域資産として活用し、新たな地域ブランディングを試みる。',
                },
                {
                    route: route2,
                    isWhole: true,
                    des: '淡路地域(淡路市・洲本市・南あわじ市)の地域ブランド戦略 (地域ブランドブックス) ',
                },
            ];
            oExpectedItem1 = {
                info: oInfo1,
                subjects: aSubject1,
            };

            const oInfo2 = {
                ISBN: '9784874355374',
                title: ['淡路史を見直す 村落の歴史'],
                author: [],
                press: ' 神戸新聞出版センター',
                officialSite: '',
            };
            const aSubject2 = [
                {
                    route: route1,
                    isWhole: true,
                    des: '近世淡路の村落史研究。',
                },
                {
                    route: route3,
                    isWhole: true,
                    des: '近世淡路の村文書を読み解きながら、庶民の生活史の中核である「村落の歴史」を追究する',
                },
            ];
            oExpectedItem2 = {
                info: oInfo2,
                subjects: aSubject2,
            };

            nTestItemID1 = await Item.addItem(oInfo1, aSubject1, 0, 0);
            nTestItemID2 = await Item.addItem(oInfo2, aSubject2, 0, 0);
            assert.strictEqual(nTestItemID1 + 1, nTestItemID2);
        });
        it('getItemIDsByRouteGroup', async ()=>{
            const aItemIDs = await search.getItemIDsByRouteGroup();
            const oItem1 = await Item.getItem(aItemIDs[0]);
            const oItem2 = await Item.getItem(aItemIDs[1]);
            // 断言查询到的两个条目和之前添加的两个条目相等，从而查询正确
            assert.deepStrictEqual(oItem1, oExpectedItem1);
            assert.deepStrictEqual(oItem2, oExpectedItem2);
        });
        // 测试完成后删除条目
        after(async ()=>{
            const result1 = await Item.removeItem([0, 0, nTestItemID1]);
            const result2 = await Item.removeItem([0, 0, nTestItemID2]);
            assert.strictEqual(result1, true);
            assert.strictEqual(result2, true);
        });
    });
});
