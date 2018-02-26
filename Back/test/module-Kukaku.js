'use strict';

const assert = require('assert');
const Kukaku = require('../module/Kukaku/index');

// 从地方级别直到县下一级(aValidDivision)的所有区划单位
const fs = require('fs');
const oToCityLevel = JSON.parse(fs.readFileSync('./test/data/oToCityLevel.json'));
const aValidDivision = ['市', '郡', '区', '庁'];


const kukaku = new Kukaku(oToCityLevel, aValidDivision);


describe('检查Kukaku模块', ()=>{

    describe('getChihouByProvince', ()=>{
        it('局：上川総合振興局', ()=>{
            assert.strictEqual(
                kukaku.getChihouByProvince('上川総合振興局'), '北海道');
        });
        it('県：青森県', ()=>{
            assert.strictEqual(
                kukaku.getChihouByProvince('青森県'), '東北');
        });
        it('都：東京都', ()=>{
            assert.strictEqual(
                kukaku.getChihouByProvince('東京都'), '関東');
        });
        it('府：大阪府', ()=>{
            assert.strictEqual(
                kukaku.getChihouByProvince('大阪府'), '近畿');
        });
        it('不匹配：鹿児島市', ()=>{
            assert.strictEqual(
                kukaku.getChihouByProvince('鹿児島市'), '');
        });
    });

    describe('getDivisions', ()=>{
        // 匹配到完整的三个行政区划的
        it('最正规加“地方”的——可以完全匹配：東北地方青森県東津軽郡', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('東北地方青森県東津軽郡'), {
                chihou: '東北',
                province: '青森県',
                city: '東津軽郡',
            });
        });
        // 匹配到两个行政区划的
        it('少地方级的——可以完全匹配：青森県東津軽郡', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('青森県東津軽郡'), {
                chihou: '東北',
                province: '青森県',
                city: '東津軽郡',
            });
        });
        it('少县级的——可以完全匹配：東北東津軽郡', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('東北東津軽郡'), {
                chihou: '東北',
                province: '青森県',
                city: '東津軽郡',
            });
        });
        it('少市级的——可以匹配地方和县级：这是一个東北青森県的故事', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('这是一个東北青森県的故事'), {
                chihou: '東北',
                province: '青森県',
                city: '',
            });
        });
        // 只匹配到一个行政区划的
        it('只有地方级的——只能匹配地方：東北一家亲', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('東北'), {
                chihou: '東北',
                province: '',
                city: '',
            });
        });
        it('只有県级的——可以匹配地方和县级：青森県某人', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('青森県某人'), {
                chihou: '東北',
                province: '青森県',
                city: '',
            });
        });
        it('只有市级的——可以完全匹配：横浜市的环境如何', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('横浜市的环境如何'), {
                chihou: '関東',
                province: '神奈川県',
                city: '横浜市',
            });
        });
        // 同级别匹配到多个的
        it('有好几个地方的——返回null：和歌山県属于近畿还是中国地方？', ()=>{
            assert.deepStrictEqual(
                kukaku.getDivisions('和歌山県属于近畿还是中国地方？'), null);
        });
        it('有好几个県级的——返回null：近畿的和歌山県和奈良県哪个环境更好？', ()=>{
            assert.deepStrictEqual(
                kukaku.getDivisions('近畿的和歌山県和奈良県哪个环境更好？'), null);
        });
        it('有好几个市级的——返回null：三重県有伊勢市和伊賀市', ()=>{
            assert.deepStrictEqual(
                kukaku.getDivisions('三重県有伊勢市和伊賀市'), null);
        });
        // 多省重名市
        it('多省重名市带多省的——返回null：東京都和広島県都有府中市', ()=>{
            assert.deepStrictEqual(
                kukaku.getDivisions('東京都和広島県都有府中市'), null);
        });
        it('多省重名市带多省带区分性地方的——返回null：東京都和広島県都有府中市。我说的是関東的', ()=>{
            assert.deepStrictEqual(
                kukaku.getDivisions('東京都和広島県都有府中市。我说的是関東的'), null);
        });
        it('多省重名市不带省不带地方的——返回null：府中市属于哪个県', ()=>{
            assert.deepStrictEqual(
                kukaku.getDivisions('府中市属于哪个県'), null);
        });
        it('多省重名市带一个省的——可以完全匹配：広島県也有府中市', ()=>{
            assert.deepStrictEqual(
                kukaku.getDivisions('広島県也有府中市'), {
                    chihou: '中国',
                    province: '広島県',
                    city: '府中市',
                });
        });
        it('多省重名市不带省带地方的——可以完全匹配：関東的府中市在哪个县', ()=>{
            assert.deepStrictEqual(
                kukaku.getDivisions('関東的府中市在哪个县'), {
                    chihou: '関東',
                    province: '東京都',
                    city: '府中市',
                });
        });
        // 带括号的
        it('同省重复带括号的市——可以完全匹配：上川総合振興局上川郡(石狩国)', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('上川総合振興局上川郡(石狩国)'), {
                chihou: '北海道',
                province: '上川総合振興局',
                city: '上川郡(石狩国)',
            });
        });
        it('同省重复应该带括号但没带的市——可以匹配到地方和省级：上川総合振興局上川郡', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('上川総合振興局上川郡'), {
                chihou: '北海道',
                province: '上川総合振興局',
                city: '',
            });
        });
        it('异省重复带括号的市——可以完全匹配：中川郡(天塩国)属于哪个振興局', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('中川郡(天塩国)属于哪个振興局'), {
                chihou: '北海道',
                province: '上川総合振興局',
                city: '中川郡(天塩国)',
            });
        });
        it('异省重复应该带括号但没带的市——返回null：中川郡属于哪个振興局', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('中川郡属于哪个振興局'), null);
        });
        it('异省重复没带括号但带省的——可以完全匹配：十勝総合振興局也有中川郡', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('十勝総合振興局也有中川郡'), {
                chihou: '北海道',
                province: '十勝総合振興局',
                city: '中川郡(十勝国)',
            });
        });
        // 完全不匹配
        it('完全不匹配的——返回null：美国圣何塞市', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('美国圣何塞市'), null);
        });
        // 匹配了中国国名的
        it('匹配中国国名的——只匹配到一个地方：中国上海市', ()=>{
            assert.deepStrictEqual(kukaku.getDivisions('中国上海市'), {
                chihou: '中国',
                province: '',
                city: '',
            });
        });
    });
});



// let result = kukaku.allPlaces();
// console.log(JSON.stringify(result, null, 2));
