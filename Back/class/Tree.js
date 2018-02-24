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


    /**
     * 根据一个主题的首名称，查询该主题在主题树的路径。路径的格式是从根主题到查询主题
     * 每个主题的首名称组成的数组
     * 如果该主题在主题树中占据多个节点，则返回多条路径数组。
     *
     * @param  {String}  sFirstName     主题首名称
     * @return {Array}                  如果主题树中没有该主题，则返回空数组；如果
     *                                    找到一条或多条路径，则返回的数组中包含相
     *                                    应条数的路径数组
     */
     getSubjectRouteByFirstName(sFirstName, oStartNode=this.tree){
         // checkFirstName函数检查一个主题的首名称是否与提供的相同。
         // 第一次执行该函数时，还没有路径，使用默认的空数组。之后递归时，会把当前的路
         // 径数组作为第三个参数传入。
         function checkFirstName(oNode, sFirstName, aCurRoute=[]){
             aCurRoute.push(oNode.name[0]); // 把当前节点加入路径尾部
             if(oNode.name[0]===sFirstName){ // 当前节点就是查找的节点
                 // 因为之后还会不断修改路径，所以这里要独立拷贝一份存入结果数组中
                 aRoutes.push(JSON.parse(JSON.stringify(aCurRoute)));
             }
             else if(oNode.children.length){ // 继续遍历子主题
                 oNode.children.forEach(child=>{
                     // 一次递归的结尾要么是找到查询主题，要么是找到一个没有子主题的
                     // 主题。
                     // 如果找到了查询主题则会往aRoutes里添加一个路径数组，然后从
                     // aCurRoute中弹出该主题，forEach继续查看它的同级主题，如果没
                     // 有同级主题则会再弹出一次,查看它父主题的同级主题，以此类推。
                     // 如果没找到查询主题则会找到一个没有子主题的主题，函数返回后也
                     // 会弹出该主题。并继续查看它的同级或父级的同级，以此类推。
                     checkFirstName(child, sFirstName, aCurRoute);
                     aCurRoute.pop();
                 });
             }
         }
         
         let aRoutes = [];
         checkFirstName(oStartNode, sFirstName);
         return aRoutes;
     },
    // getSubjectRouteByFirstName(sFirstName, oStartNode=this.tree){
    //     let aRoutes = [];
    //
    //     checkFirstName(oStartNode, sFirstName);
    //
    //     // checkFirstName函数检查一个主题的首名称是否与提供的相同。
    //     // 如果相同，则把记录的路径数组aCurRoute作为一个合理的结果加入aRoutes，同时
    //     //   返回true。
    //     // 如果不同，则检查该主题是否有子主题。如果没有则返回false，如果有则递归每个
    //     //   子主题。
    //     // 第一次执行该函数时，还没有路径，使用默认的空数组。之后递归时，会把当前的路
    //     //   径数组作为第三个参数传入。
    //     function checkFirstName(oNode, sFirstName, aCurRoute=[]){
    //         aCurRoute.push(oNode.name[0]); // 把当前节点加入路径尾部
    //         if(oNode.name[0]===sFirstName){ // 当前节点就是查找的节点
    //             // 因为之后还会不断修改路径，所以这里要独立拷贝一份存入结果数组中
    //             aRoutes.push(JSON.parse(JSON.stringify(aCurRoute)));
    //             // return true;
    //         }
    //         else if(oNode.children.length){ // 继续遍历子主题
    //             let bHasMath = false; // 递归到最后是否找到了查询主题
    //             oNode.children.forEach(child=>{
    //                 // if(checkFirstName(child, sFirstName, aCurRoute)){
    //                 //     // 匹配到查询主题后，也要将其弹出路径数组，返回上一级继续遍
    //                 //     // 历是否还有其他匹配的路径
    //                 //     // aCurRoute.pop();
    //                 //     bHasMath = true;
    //                 // }
    //                 checkFirstName(child, sFirstName, aCurRoute);
    //                 aCurRoute.pop();
    //             });
    //             if(bHasMath){
    //                 // 如果该主题的若干子分支中有一条或多条最终找到了查询主题，则该主
    //                 // 题及其子分支都遍历完成。向上返回true
    //                 // return true;
    //             }
    //             else{
    //                 // 如果该主题的若干子分支都没有找到查询主题，则从路径数组中弹出
    //                 // 该该子主题。forEach继续检查下一个同级主题。
    //                 // aCurRoute.pop();
    //                 // return false;
    //             }
    //         }
    //         else{ // 该主题既不匹配也没有子主题可遍历，
    //             // aCurRoute.pop(); // 将该主题弹出路径数组，返回上一级主题
    //             // return false;
    //         }
    //     }
    //     return aRoutes;
    // },
}


module.exports = Tree;
