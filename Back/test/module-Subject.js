'use strict';

// TODO: get chidlren IDs by ID 的测试里面的四个主题ID写的是固定的


const nSubjectID = 6; // 测试主题ID  该主题为名为 お盆



const assert = require('assert');
const Subject = require('../module/Subject');



describe('subject module', ()=>{
    describe('get subject', ()=>{
        it('get subject by ID', async ()=>{
            const oSubject = await Subject.getSubjectByID(nSubjectID);
            assert.strictEqual(oSubject.name[0], 'お盆');
        });
        it('get subject routes by ID', async ()=>{
            const aRoutes = await Subject.getSubjectRoutesByID(nSubjectID);
            const result = aRoutes.every(route=>{
                return route[0] === 0
                    && route[route.length - 1] === nSubjectID;
            });
            assert.ok(result);
        });
        it('get chidlren IDs by ID', async ()=>{
            const aChildrenID = await Subject.getChildrenIDByID(0);
            assert.deepStrictEqual(aChildrenID, [1, 1315, 4394, 5572]);
        });
    });

    // describe('get subject route', ()=>{
    //     it('have correct reference properties', ()=>{
    //         const aRoutes = keywords.getSubjectRoutes(6382);
    //         console.log(aRoutes);
    //     });
    // });
});
