'use strict';
const util = require('util');
const myUtil = require('./MyUtil');

function Tree(oTree){
    this.tree = oTree;


    // 检查有没有不符合规则的主题
    let getBadSubjects = (oTree)=>{
        let badSubject = [];
        this.traverseBranch(this.tree, (subject)=>{
            if(
                ( Object.prototype.toString.call(subject['children'])
                        !== '[object Array]' )
                ||
                ( Object.prototype.toString.call(subject['ch'])
                        !== '[object String]' )
                ||
                ( Object.prototype.toString.call(subject['intro'])
                        !== '[object Array]' )
                ||
                ( Object.prototype.toString.call(subject['reference'])
                        !== '[object Object]' )
                ||
                ( Object.prototype.toString.call(subject['name'])
                        !== '[object Array]' )
                ||
                ( subject['name'].length === 0 )
            ){
                badSubject.push(subject);
            }
        });
        return badSubject;
    };
    let aBadSubjects = getBadSubjects(oTree);
    if(aBadSubjects.length>0){
        throw new Error('Subject tree has bad subjects: '
                            + util.inspect(aBadSubjects));
    }


}


// 私有

// aName.forEach((name,index)=>{
//     let firstIndex = aName.indexOf(name),
//         lastIndex = aName.lastIndexOf(name);
//     if(index===firstIndex && firstIndex!==lastIndex){
//         oSame[name] = [aChildren[firstIndex]];
//         let nNextIndex = firstIndex + 1;
//         while(nNextIndex!==lastIndex){
//             if(aName[nNextIndex]===aName[firstIndex]){
//                 oSame[name].push(aChildren[nNextIndex]);
//             }
//             nNextIndex++;
//         }
//         oSame[name].push(aChildren[lastIndex]);
//     }
// });



Tree.prototype = {
    constructor: Tree,

    traverseBranch(oNode, fn){
        let aSubject = [];
        function traverse(oNode, fn){
            oNode.children.forEach(child=>{
                fn(child);
                traverse(child, fn);
            });
        }
        traverse(oNode, fn);
        return aSubject;
    },

    getAllSubjectNames(){
        let aName = [];
        this.traverseBranch(this.tree, (subject)=>{
            aName.push(subject.name[0]);
        });
        return aName;
    },

    getSubjectByID(){

    },

    getSubjectByFirstName(sFirstName){
        sFirstName = sFirstName.trim();
        let aSubject = [];
        this.traverseBranch(this.tree, (subject)=>{
            if(subject.name[0]===sFirstName){
                aSubject.push(subject);
            }
        });
        return aSubject;
    },

    findSameNameChildren(oNode){
        let oSame = {},
            aChildren = oNode.children;
        let aName = aChildren.map(child=>child.name[0]);
        let oSameIndexes = myUtil.findDuplicateIndexes(aName);
        for(let key in oSameIndexes){
            oSame[key] = oSameIndexes[key].map(i=>aChildren[i]);
        }
        return oSame;
    },

    getSubjectRouteByFirstName(sFirstName){
        let aRoutes = [];

        foo(this.tree, sFirstName);
        function foo(oNode, sFirstName, aCurRoute=[]){
            aCurRoute.push(oNode.name[0]);
            if(oNode.name[0]===sFirstName){
                aRoutes.push(aCurRoute);
                return true;
            }
            else if(oNode.children.length){
                let result = oNode.children.some(child=>{
                    return foo(child, sFirstName, aCurRoute);
                });
                if(result){
                    return true;
                }
                else{
                    aCurRoute.pop();
                    return false;
                }
            }
            else{
                aCurRoute.pop();
                return false;
            }
        }
        return aRoutes;
    },
}


module.exports = Tree;
