// 条目操作类

'use strict';

// const AC = require('./ArgumentsChecker/index');
// const checker = new AC();

const DB = require('./Database');

// Private methods
// 这个函数调用DB，修改Items和Route-ItemID
async function addItem(oItem, aRoutes, nLevel1ID, nLevel2ID){
    try {
        const nIndex = await DB.addItem(oItem, nLevel1ID, nLevel2ID);
        console.log('index', nIndex);
        const sLevel1ID = nLevel1ID<10 ? '0' + nLevel1ID : '' + nLevel1ID;
        const sLevel2ID = nLevel2ID<10 ? '0' + nLevel2ID : '' + nLevel2ID;
        const sItemID = sLevel1ID + sLevel2ID + '' + nIndex;
        await DB.addItemIDToRoute(sItemID, aRoutes);
        return true;
    }
    catch (err){
        console.log('private: ', err);
    }
}
// 这个函数调用DB，修改Items和Route-ItemID
// function removeItem(){
//
// }

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
    // addItem
    addBookItem: async function(sISBN, aTitle, aSubject, aAuthor, sOfficialSite=''){
        const oItem = {
            ISBN: sISBN.trim(),
            title: aTitle,
            author: aAuthor,
            officialSite: sOfficialSite,
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
            // return await DB.addItem(oItem, 0, 0);
            return await addItem(oItem, aRoutes, 0, 0);
        }
        catch (err){
            console.log('outer: ', err);
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

    modifyItem(){

    },

    removeItem:  async function(nLevel1ID, nLevel2ID, nInnerID){
        try {
            await DB.removeItem(nLevel1ID, nLevel2ID, nInnerID);
            return true;
        }
        catch (err){
            console.log('outer: ', err);
        }
    },
};

module.exports = Item;
