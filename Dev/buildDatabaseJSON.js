'use strict';


const Tree = require('../Back/class/Tree');
const myUtil = require('../Back/class/MyUtil');

const fs = require('fs');
const oTree = JSON.parse(fs.readFileSync('./subjectTree.json'));

const tree = new Tree(oTree);


buildIDSubjectMap();
buildIDFirstNameMap();
buildIDTree();



// 生成ID和主题映射
function buildIDSubjectMap(){
    let result = tree.getAllSubjectNames();
    let set = new Set(result);
    let aSubject = [...set].map(name=>{
        let subject = tree.getSubjectByFirstName(name)[0];
        if(!subject){
            console.log(tree.getSubjectByFirstName(name));
        }
        return {
            name: subject.name,
            ch: subject.ch,
            intro: subject.intro,
            reference: subject.reference,
        };
    });
    fs.writeFileSync('./DataBaseJSON/ID-Subject.json', JSON.stringify(aSubject)
                                                                    ,'utf8');
}


// 生成ID和首名称映射
function buildIDFirstNameMap(){
    const aIDSubject = JSON.parse(fs.readFileSync(
                                                './DataBaseJSON/ID-Subject.json'
                                                ,'utf8'));
    fs.writeFileSync('./DataBaseJSON/ID-FirstName.json',
                        JSON.stringify(aIDSubject.map(subject=>subject.name[0])),
                        'utf8');
}


// 生成ID树
function buildIDTree(){
    const aIDFirstName = JSON.parse(fs.readFileSync(
                                            './DataBaseJSON/ID-FirstName.json'
                                            ,'utf8'));
    tree.traverseBranch(tree.tree, (node)=>{
        let index = aIDFirstName.indexOf(node.name[0]);
        if(index===-1) throw new Error();

        node.id = index;
        delete node.name;
        delete node.ch;
        delete node.intro;
        delete node.reference;
    });

    fs.writeFileSync('./DataBaseJSON/IDTree.json',
                            JSON.stringify(tree.tree), 'utf8');
}
