'use strict';

const assert = require('assert');
const Kukaku = require('../class/Kukaku/index');

// 从地方级别直到县下一级(aValidDivision)的所有区划单位
const fs = require('fs');
const oToCityLevel = JSON.parse(fs.readFileSync('./test/data/oToCityLevel.json'));
const aValidDivision = ['市', '郡', '区', '庁'];


const kukaku = new Kukaku(oToCityLevel, aValidDivision);


describe('Kukaku', ()=>{

    describe('getDivisions', ()=>{
        // 带括号的
        // 有好几个地方的
        // 有好几个县的
        // 有好几个市的
        // 异省重复的 府中市
        // 同省重复的
        it('最正规的：北海道石狩振興局札幌市', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('北海道石狩振興局札幌市'), {
                chihou: '北海道',
                province: '石狩振興局',
                city: '札幌市',
            });
        });
        it('加“地方”的：東北地方青森県東津軽郡', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('東北地方青森県東津軽郡'), {
                chihou: '東北',
                province: '青森県',
                city: '東津軽郡',
            });
        });
        it('少地方级的：青森県東津軽郡', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('青森県東津軽郡'), {
                chihou: '東北',
                province: '青森県',
                city: '東津軽郡',
            });
        });
        it('少县级的：東北東津軽郡', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('東北東津軽郡'), {
                chihou: '東北',
                province: '青森県',
                city: '東津軽郡',
            });
        });
        it('少市级的：这是一个東北青森県的故事', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('这是一个東北青森県的故事'), {
                chihou: '東北',
                province: '青森県',
                city: '',
            });
        });
        it('只有地方级的：東北一家亲', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('東北'), {
                chihou: '東北',
                province: '',
                city: '',
            });
        });
        it('只有県级的：青森県某人', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('青森県某人'), {
                chihou: '東北',
                province: '青森県',
                city: '',
            });
        });
        it('只有市级的：横浜市的环境如何', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('横浜市的环境如何'), {
                chihou: '関東',
                province: '神奈川県',
                city: '横浜市',
            });
        });
        it('京都府京都', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('京都府京都市上京区'), {
                chihou: '近畿',
                province: '京都府',
                city: '京都市',
            });
        });
        it('関東東京都八王子市', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('関東東京都八王子市'), {
                chihou: '関東',
                province: '東京都',
                city: '八王子市',
            });
        });
        it('北海道中標津町', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('北海道中標津町'), {
                chihou: '北海道',
                province: '',
                city: '',
            });
        });
        it('飯能市', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('飯能市'), {
                chihou: '関東',
                province: '埼玉県',
                city: '飯能市',
            });
        });
        it('飯能', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('飯能'), null);
        });
        it('美国圣何塞市', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('美国圣何塞市'), null);
        });
        it('中国上海市', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('中国上海市'), {
                chihou: '中国',
                province: '',
                city: '',
            });
        });
        it('上海市', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('上海市'), null);
        });
    });
});



// let result = kukaku.allPlaces();
// console.log(JSON.stringify(result, null, 2));

// console.log(kukaku.getDivisions('滋賀県蒲生郡竜王町'));
// console.log(kukaku.getDivisions('京都府長岡京市'));
// console.log(kukaku.getDivisions('愛知県大府市'));
// console.log(kukaku.getDivisions('北海道中標津町'));
// console.log(kukaku.getDivisions('北海道愛知県'));
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
