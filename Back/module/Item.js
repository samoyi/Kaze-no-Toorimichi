// 条目操作类

/*
 * 条目的添加
 *
 * 添加每种条目时，都会使用其对应的方法。例如添加书籍时，使用addBookItem方法。
 * 每个条目特定方法会根据条目的数据类型，检查数据、组装数据。
 * 然后会统一调用add方法，该方法执行两个数据库操作：
 *     1. 将一个条目对象和对应的路径添加到Item对象数据document中
 *     2. 将路径和条目ID的映射添加到Route-ItemID对象数据document中
 */

'use strict';

// const AC = require('./ArgumentsChecker/index');
// const checker = new AC();

const DB = require('./Database');


/*
 * 添加条目
 *
 * @param  {Object}  oItem          条目对象
 * @param  {Array}  aRoutes         该条目对应的路径。数组项为路径数组
 * @param  {Number}  nLevel1ID      条目大类ID
 * @param  {Number}  nLevel2ID      条目子类ID
 */
async function add(oItem, aRoutes, nLevel1ID, nLevel2ID){
    try {
        const nIndex = await DB.addItem(oItem, nLevel1ID, nLevel2ID);
        const sLevel1ID = nLevel1ID<10 ? '0' + nLevel1ID : '' + nLevel1ID;
        const sLevel2ID = nLevel2ID<10 ? '0' + nLevel2ID : '' + nLevel2ID;
        const sItemID = sLevel1ID + sLevel2ID + '' + nIndex;
        await DB.addItemIDToRoute(sItemID, aRoutes);
        return nIndex;
    }
    catch (err){
        throw new Error(err);
    }
}

// Constructor
function Item(){

}

// Prototype
// 对已有条目的修改，包括添加subject
Item.prototype = {
    contructor: Item,

    // isISBNExists(sISBN){ // 链接ISBN数据接口进行查询
    //     checker.get(arguments).types(['isbn']);
    // },
    // 0,4394,4395

    addBookItem: async function(sISBN, aTitle, aSubject, aAuthor, sOfficialSite=''){
        const oItem = {
            // ISBN: sISBN.trim(),
            // title: aTitle,
            // author: aAuthor,
            // officialSite: sOfficialSite,
            // subjects: aSubject,
            info: {
                ISBN: sISBN.trim(),
                title: aTitle,
                author: aAuthor,
                officialSite: sOfficialSite,
                subjects: aSubject,
            },
            subjects: aSubject,
            // subjects: [
            //     {
            //         route: [],
            //         info: {
            //              isWhole: true,
            //              des: '',
            //         },
            //     },
            //     {
            //         route: [],
            //         info: {
            //              isWhole: false,
            //              part: '第三章和第八章',
            //              des: '',
            //         },
            //     }
            // ]
        };
        let aRoutes = [];
        aSubject.forEach(subject=>{
            subject.routes.forEach(route=>{
                aRoutes.push(route);
            });
        });
        try {
            return await add(oItem, aRoutes, 0, 0);
        }
        catch (err){
            throw new Error(err);
        }
    },
    addPeriodicalItem(aTitle, aSubject, sOfficialSite=''){
        const item = {
            title: aTitle,
            officialSite: sOfficialSite,
            subjects: aSubject,
        };
        // {
        //     title: [''],
        //     sIssue:'',
        //     officialSite: '',
        //     subjects: [
        //         {
        //             route: [],
        //             info: {
        //                  isWhole: true,
        //                  des: '',
        //             },
        //         },
        //         {
        //             route: [],
        //             info: {
        //                  isWhole: false,
        //                  issue: '2017年9月', // 当期的副标题或期号
        //                  des: '',
        //             },
        //         }
        //     ]
        // }
        DB.addItem(item, 0, 1);
    },
    addLiveActionVideoItem(aTitle, aSubject, sIMDb='', sOfficialSite=''){
        const item = {
            title: aTitle,
            IMDb: sIMDb,
            officialSite: sOfficialSite,
            subjects: aSubject,
        };
        // {
        //     IMDb: '',
        //     title: [''],
        //     officialSite: '',
        //     subjects: [
        //         {
        //             route: [],
        //             info: {
        //                  isWhole: true,
        //                  des: '',
        //             },
        //         },
        //         {
        //             route: [],
        //             info: {
        //                  isWhole: false,
        //                  issue: '第一季第二集',
        //                  des: '',
        //             },
        //         }
        //     ]
        // }
        DB.addItem(item, 1, 0);
    },

    // addMusicItem(aTitle, aSubject, aMusician, sOfficialSite=''){
    //     // {
    //     //     title: [''],
    //     //     aMusician: [''],
    //     //     officialSite: '',
    //     //     subjects: [
    //     //         {
    //     //             route: [],
    //     //             info: '',
    //     //         },
    //     //         {
    //     //             route: [],
    //     //             info: '',
    //     //         }
    //     //     ]
    //     // }
    // },


    // addGameItem(aTitle, aSubject, sCataID, aDeveloper=[], sOfficialSite=''){
    //     // {
    //     //     title: [''],
    //     //     aDeveloper: [''],
    //     //     officialSite: '',
    //     //     subjects: [
    //     //         {
    //     //             route: [],
    //     //             info: '',
    //     //         },
    //     //         {
    //     //             route: [],
    //     //             info: '',
    //     //         }
    //     //     ]
    //     // }
    // },

    // 戏剧
    // addPerformanceItem(aTitle, aSubject, aPerformer, sOfficialSite=''){
    //     // {
    //     //     title: [''],
    //     //     aPerformer: [''],
    //     //     officialSite: '',
    //     //     subjects: [
    //     //         {
    //     //             route: [],
    //     //             info: '',
    //     //         },
    //     //         {
    //     //             route: [],
    //     //             info: '',
    //     //         }
    //     //     ]
    //     // }
    // },

    // 网络媒体
    // sURL和sAPP不能都为空
    // addInternetMediaItem(aTitle, aSubject, sURL='', sAPP=''){
    //     // {
    //     //     sURL: '',
    //     //     title: [''],
    //     //     sAPP: '',
    //     //     subjects: [
    //     //         {
    //     //             route: [],
    //     //             info: '',
    //     //         },
    //     //         {
    //     //             route: [],
    //     //             info: '',
    //     //         }
    //     //     ]
    //     // }
    // },

    // 绘画或摄影
    // addPaintingOrPhotographyItem(aTitle, aSubject, aCreator, sOfficialSite=''){
    //     // {
    //     //     title: [''],
    //     //     aCreator: [''],
    //     //     officialSite: '',
    //     //     subjects: [
    //     //         {
    //     //             route: [],
    //     //             info: '',
    //     //         },
    //     //         {
    //     //             route: [],
    //     //             info: '',
    //     //         }
    //     //     ]
    //     // }
    // },

    // 展览或展会
    // 展览时间、展会地址、官方网站，三个至少填一个

    /*
     * 查找条目对象
     *
     * @param  {Number}  nLevel1ID      条目大类ID
     * @param  {Number}  nLevel2ID      条目子类ID
     * @param  {Number}  nInnerID       条目类别内ID
     * @return {Object}                 条目对象
     */
    getItem: async function(nLevel1ID, nLevel2ID, nInnerID){
        try {
            return DB.getItem(nLevel1ID, nLevel2ID, nInnerID);
        }
        catch (err){
            throw new Error(err);
        }
    },


    /*
     * 修改条目自身信息
     * 不涉及条目对应的主题（路径）以及条目的类别
     *
     * @param  {Number}  nLevel1ID      条目大类ID
     * @param  {Number}  nLevel2ID      条目子类ID
     * @param  {Number}  nInnerID       条目类别内ID
     */
    modifyItemInfo(nLevel1ID, nLevel2ID, nInnerID){

    },

    /*
     * 删除条目
     *
     * @param  {Number}  nLevel1ID      条目大类ID
     * @param  {Number}  nLevel2ID      条目子类ID
     * @param  {Number}  nInnerID       条目类别内ID
     */
    removeItem: async function(nLevel1ID, nLevel2ID, nInnerID){
        try {
            DB.removeItem(nLevel1ID, nLevel2ID, nInnerID);
        }
        catch (err){
            throw new Error(err);
        }
    },
};

module.exports = Item;
