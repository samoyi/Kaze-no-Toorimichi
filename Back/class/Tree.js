'use strict';
const util = require('util');

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

Tree.prototype = {
    constructor: Tree,

    traverseBranch(oNode, fn){
        let aSubject = [];
        function traverse(oNode, fn){

            // if(!oNode.children) console.log(oNode);
            //
            // if(typeof oNode.children.forEach !== 'function') {
            //     console.log(oNode.name);
            //     console.log(Object.prototype.toString.call(oNode.children));
            // };
            //
            // if(!Array.isArray(oNode.name)) console.log(oNode.name);


            oNode.children.forEach(child=>{

                // if(!child.name) console.log(child);

                // aSubject.push(child.name[0]);
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
}


module.exports = Tree;
