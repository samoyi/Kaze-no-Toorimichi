'use strict';

const assert = require('assert');
const Tree = require('../class/Tree');
const myUtil = require('../class/MyUtil');

const fs = require('fs');
const oTree = JSON.parse(fs.readFileSync('./test/data/tree.json'));



const tree = new Tree(oTree);
// console.log(tree.getAllSubjectNames().length)
// console.log(tree.getAllSubjectNames1().length)




// 生成ID和主题映射
// {
//     let result = tree.getAllSubjectNames();
//     console.log(result.length);
//     let set = new Set(result);
//     console.log(set.size);
//     let aSubject = [...set].map(name=>{
//         let subject = tree.getSubjectByFirstName(name)[0];
//         if(!subject){
//             console.log(name);
//             console.log(tree.getSubjectByFirstName(name));
//         }
//         return {
//             name: subject.name,
//             ch: subject.ch,
//             intro: subject.intro,
//             reference: subject.reference,
//         };
//     });
//     console.log(aSubject.length);
//     fs.writeFileSync('../DataBase/ID-Subject.json', JSON.stringify(aSubject, null, 4), 'utf8');
// }


// 生成ID和首名称映射
// {
//     const aIDSubject = JSON.parse(fs.readFileSync('../DataBase/ID-Subject.json', 'utf8'));
//     fs.writeFileSync('../DataBase/ID-FirstName.json',
//                         JSON.stringify(aIDSubject.map(subject=>subject.name[0])),
//                         'utf8');
// }


// 生成ID树
// {
//     const aIDFirstName= JSON.parse(fs.readFileSync('../DataBase/ID-FirstName.json', 'utf8'));
//     tree.traverseBranch(tree.tree, (node)=>{
//         let index = aIDFirstName.indexOf(node.name[0]);
//         if(index===-1) throw new Error();
//
//         node.id = index;
//         delete node.name;
//         delete node.ch;
//         delete node.intro;
//         delete node.reference;
//     });
//
//     fs.writeFileSync('../DataBase/IDTree.json',
//                             JSON.stringify(tree.tree), 'utf8');
// }



describe('Tree', ()=>{
    describe('getAllSubjectNames', ()=>{
        it('getAllSubjectNames结果的length应该为非负整数', ()=>{
            let len = tree.getAllSubjectNames().length;
            assert.ok( Number.isInteger(len) && len>0);
        });
        // it('正逆顺序', ()=>{
        //     let len = tree.getAllSubjectNames1().length;
        //     assert.ok( Number.isInteger(len) && len>0);
        // });
    });
    // describe('getSubjectByFirstName', ()=>{
    //     it('getAllSubjectNames结果的length应该为非负整数', ()=>{
    //         tree.getSubjectByFirstName('宗教体系') = [{
    //             name: ['宗教体系'],
    //             ch: '',
    //             intro: ['', ''],
    //             reference: {},
    //             children: [ [Object], [Object] ] } ]
    //     });
    // });
});
