

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
function attrMode(aNode, sTaxonomyName){
    let aItem = [], // 所有的主题
    oItem = {},
    sCata = ''; // 遍历过程中，当前的类别名
    aNode.forEach(node=>{
        if(node.nodeName === cata_node_name){
            sCata = node.textContent.slice(0, -4);
            oItem[sTaxonomyName] = sCata;
        }
        else{
            let titles = getTitles(node);
            let items = titles.filter((title)=>{
                // 过滤掉不合理的title
                return validTitle(title);
            }).map((title)=>{
                oItem.name = title;
                // 新加一个对象
                return JSON.parse(JSON.stringify(oItem));
            });
            aItem = aItem.concat(items);
        }
    });
    return aItem;
}

function removeDuplicateForAttrMode(aItem){
    let aIndexes = [],
        nIndex = null,
        nLastIndex = null;

    // 由于数组项是对象，所以不能直接去重
    aItemStr = aItem.map(item=>item['行政区划']+'-'+item.name);

    aItemStr.forEach((item, index)=>{
        nIndex = aItemStr.indexOf(item);
        nLastIndex = aItemStr.lastIndexOf(item);
        if( (nIndex===index) && (nIndex!==nLastIndex) ){
            aIndexes.push(nLastIndex);
        }
    });
    return aItem.filter((item,index)=>{
        return !aIndexes.includes(index);
    });
}
