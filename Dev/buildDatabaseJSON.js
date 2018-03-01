'use strict';


const Tree = require('../Back/module/Tree');
const myUtil = require('../Back/module/MyUtil');

const fs = require('fs');
const oSubjectTree = JSON.parse(fs.readFileSync('./SubjectTree.json'));

const subjectTree = new Tree(oSubjectTree);

// console.log(subjectTree.getSubjectByFirstName)
buildIDSubjectMap();
// buildIDFirstNameMap();
// buildIDTree();
// buildIDRoutesMap();
// buildRouteItemIDMap();


// 生成ID和主题映射

function buildIDSubjectMap(){
    let result = subjectTree.getAllSubjectNames();
    let set = new Set(result);
    let aSubject = [...set].map(name=>{
        let subject = subjectTree.getSubjectByFirstName(name)[0];
        if(!subject){
            console.log(subjectTree.getSubjectByFirstName(name));
        }
        return {
            name: subject.name.filter(name=>name.trim()!==''),
            ch: subject.ch.trim(),
            intro: subject.intro.map(intro=>intro.trim()),
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
    subjectTree.traverseBranch(subjectTree.tree, (node)=>{
        let index = aIDFirstName.indexOf(node.name[0]);
        if(index===-1) throw new Error();

        node.id = index;
        delete node.name;
        delete node.ch;
        delete node.intro;
        delete node.reference;
    });

    fs.writeFileSync('./DataBaseJSON/IDTree.json',
                            JSON.stringify(subjectTree.tree), 'utf8');
}

// 生成ID和ID路径映射
function buildIDRoutesMap(){
    const oIDTree = JSON.parse(fs.readFileSync('./DataBaseJSON/IDTree.json'
                                                ,'utf8'));
    const aIDFirstName = JSON.parse(fs.readFileSync(
                                            './DataBaseJSON/ID-FirstName.json'
                                            ,'utf8'));
    const idTree = new Tree(oIDTree);
    const aRoute = aIDFirstName.map((item,index)=>{
        return idTree.getSubjectRouteByID(index);
    });
    fs.writeFileSync('./DataBaseJSON/ID-Routes.json', JSON.stringify(aRoute)
                                                    , 'utf8');
}

// 生成主题ID路径和条目ID映射
function buildRouteItemIDMap(){
    const aIDRoutes = JSON.parse(fs.readFileSync('./DataBaseJSON/ID-Routes.json'
                                                ,'utf8'));
    let mRouteItemIDMap = new Map();
    aIDRoutes.forEach(routes=>{
       routes.forEach(route=>{
           mRouteItemIDMap.set(route, []);
       })
    });
    fs.writeFileSync('./DataBaseJSON/Route-ItemID.json'
                        , JSON.stringify([...mRouteItemIDMap]), 'utf8');
}
