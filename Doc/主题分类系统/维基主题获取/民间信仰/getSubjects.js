

// 检查是否是合理的title
function validTitle(sTitle){
    if(sTitle.includes('編集')
        || sTitle.includes('の一覧')
        || sTitle.includes('Category')
        || sTitle==='拡大')
    {
        return false;
    }

    let str = sTitle.replace(/\(.+\)/g, '').trim();

    let result = null;
    if(aIncludeTitleEndChars.length){
        result = aIncludeTitleEndChars.some(chars=>{
            return str.endsWith(chars);
        });
    }
    else{
        result = !aExcludedTitleEndChars.some(chars=>{
            return str.endsWith(chars);
        });
    }
    return result;
}

// 获取一个节点自身和它后代的所有title
function getTitles(node){
    let aTitle = [];
    function get(node){
        // 该节点有title
        if( node.title ){
            aTitle.push(node.title.replace(/\(存在しないページ\)/g, '').trim());
        }
        // 该节点有子节点
        if(node.children.length){
            [...node.children].forEach(child=>{
                get(child);
            });
        }
    }
    get(node);
    return aTitle;
}



// 直接按照类别分类
function cataMode(aNode){

    let oCata = {}; // 分类后的结果。类别是h2中的标题
    let sCata = ''; // 遍历过程中，当前的类别名
    aNode.forEach(node=>{
        if(node.nodeName === cata_node_name){
            sCata = node.textContent.slice(0, -4);
            oCata[sCata] = [];
        }
        else{
            let titles = getTitles(node);
            // 过滤掉不合理的title
            titles = titles.filter((title)=>{
                return validTitle(title);
            });
            oCata[sCata] = oCata[sCata].concat(titles);
        }
    });
    return oCata;
}

// 不分类，而是添加类别属性
function attrMode(aNode){
    let aItem = [], // 所有的主题
        oItem = {}, // 每一个主题
        sCata = ''; // 遍历过程中，当前的类别名

    aNode.forEach(node=>{
        if(node.nodeName === cata_node_name){
        // if(node.className === 'h2'){
            // 如果当前节点是类别名节点
            sCata = node.textContent.slice(0, -4);
            oItem.cata = sCata;
        }
        else{
            // 当前节点是主题节点
            // 当前节点下所有的title
            let titles = getTitles(node);
            let items = titles.filter((title)=>{
                // 过滤掉不合理的title
                return validTitle(title);
            }).map((title)=>{
                // 每一个合理的title保存为一个主题的name
                oItem.name = title;
                // 新加一个对象
                return JSON.parse(JSON.stringify(oItem));
            });
            // 将当前节点下所有合理的title合并进aItem
            aItem = aItem.concat(items);
        }
    });
    return aItem;
}

function removeDuplicateForAttrMode(aItem){
    let aIndexes = [],
        nIndex = null,
        nLastIndex = null;

    // 由于数组项是对象，所以不能直接去重，先转换为字符串
    aItemStr = aItem.map(item=>item[cata_node_name]+'-'+item.name);

    aItemStr.forEach((item, index)=>{
        nIndex = aItemStr.indexOf(item);
        nLastIndex = aItemStr.lastIndexOf(item);
        if( (nIndex===index) && (nIndex!==nLastIndex) ){ // 该项存在重复
            // 重复项第二次出现时的index。由于重复项可能不止重复了一次，所以
            // nNextIndex不一定等于nLastIndex
            // 循环找出所有除了第一个和最后一个以外的重复索引
            let nNextIndex = aItemStr.indexOf(item, index+1);
            while(nNextIndex!==nLastIndex){
                aIndexes.push(nNextIndex);
                nNextIndex = aItemStr.indexOf(item, nNextIndex+1);
            }
            aIndexes.push(nLastIndex); // 将若干个重复的最后一项的index加入aIndexes
        }
    });
    return aItem.filter((item,index)=>{
        return !aIndexes.includes(index);
    });
}
