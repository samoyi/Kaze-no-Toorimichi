// 主题相关操作模块

const DB = require('./Database');



/*
 * 根据主题ID获取主题
 *
 * @param  {Number}  nID            主题ID
 * @return {Array|Null|Undefined}   如果主题已删除，返回null；如果主题不存在，
 *                                  返回undefined；主题正常，则返回主题对象
 */
async function getSubjectByID(nID){
    const aIDSubject = await DB.getIDSubjectData();
    return aIDSubject[nID];
}


/*
 * 根据主题ID获取主题路径
 *
 * @param  {Number}  nID            主题ID
 * @return {Array|Null|Undefined}   如果主题已删除，返回null；如果主题不存在，
 *                                  返回undefined；主题正常，则返回对应的若干条
 *                                  路径数组组成的数组
 */
async function getSubjectRoutesByID(nID){
    const aIDRoutes = await DB.getIDRoutesData();
    return aIDRoutes[nID];
}


/*
 * 获取一个主题的所有子主题ID
 *
 * @param  {Number}  nID            主题ID
 * @return {Array|Null|Undefined}   如果主题已删除，返回null；如果主题不存在，
 *                                  返回undefined；主题正常，则返回对应的若干条
 *                                  路径数组组成的数组
 */
async function getChildrenIDByID(nID){
    const oIDTree = await DB.getIDTreeData();

    function checkSubject(oSubject){
        const aChildren = oSubject.children;
        if (oSubject.id === nID){ // 当前主题就是要搜索的主题
            return aChildren.map(child=>child.id);
        }
        else if (aChildren.length === 0){ // 当前主题没有子主题
            return false;
        }
        else { // 遍历当前主题的子主题
            // 如果找到了要搜索的主题，使用该变量引用其子主题
            let oMatchedChildren = false;

            aChildren.some(child=>{
                const children = checkSubject(child);
                if (children !== false){
                    oMatchedChildren = children;
                    return true;
                }
            });

            return oMatchedChildren.map(child=>child.id);
        }
    }
    return checkSubject(oIDTree);
}



module.exports = {
    getSubjectByID,
    getSubjectRoutesByID,
    getChildrenIDByID,
};
