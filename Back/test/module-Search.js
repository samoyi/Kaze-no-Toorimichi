'use strict';

const assert = require('assert');
const {inspect} = require('util');
const DB = require('../module/Database');


describe('keyword search', ()=>{
    let keywords = [];
    before(async ()=>{
        const aIDSubject = await DB.getIDSubjectData();
        const aIDRoutes = await DB.getIDRoutesData();
        const Keywords = require('../module/Search/keywords');
        keywords = new Keywords(aIDSubject, aIDRoutes);
    });

    describe('search subjects', ()=>{
        let aResult = [];
        before(()=>{
            aResult = keywords.getSubjects('淡路島');
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

    describe('get subject route', ()=>{
        it('have correct reference properties', ()=>{
            const aRoutes = keywords.getSubjectRoutes(6382);
            console.log(aRoutes);
        });

    });
});
