// 条目操作类

'use strict';

const AC = require('./ArgumentsChecker/index');
const checker = new AC();

const DB = require('./Database');


function Item(){

}

// 对已有条目的修改，包括添加subject
Item.prototype = {
    contructor: Item,

    isISBNExists(sISBN){ // 链接ISBN数据接口进行查询
        checker.get(arguments).types(['isbn']);

    },

    removeItem: async function(nLevel1ID, nLevel2ID, nInnerID){
        console.log('itemljs');
        // try{
        //     await DB.removeItem(nLevel1ID, nLevel2ID, nInnerID);
        //     return true;
        // }
        // catch(err){
        //     console.log('outer: ', err);
        // }
    },

    // addItem
    addBookItem: async function(sISBN, aTitle, aSubject, aAuthor, sOfficialSite=''){
        const item = {
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
        try{
            await DB.addItem(item, 0, 0);
            return true;
        }
        catch(err){
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

    addMusicItem(aTitle, aSubject, aMusician, sOfficialSite=''){
        // {
        //     title: [''],
        //     aMusician: [''],
        //     officialSite: '',
        //     subjects: [
        //         {
        //             route: [],
        //             info: '',
        //         },
        //         {
        //             route: [],
        //             info: '',
        //         }
        //     ]
        // }
    },

    addGameItem(aTitle, aSubject, sCataID, aDeveloper=[], sOfficialSite=''){
        // {
        //     title: [''],
        //     aDeveloper: [''],
        //     officialSite: '',
        //     subjects: [
        //         {
        //             route: [],
        //             info: '',
        //         },
        //         {
        //             route: [],
        //             info: '',
        //         }
        //     ]
        // }
    },

    addPerformanceItem(aTitle, aSubject, aPerformer, sOfficialSite=''){
        // {
        //     title: [''],
        //     aPerformer: [''],
        //     officialSite: '',
        //     subjects: [
        //         {
        //             route: [],
        //             info: '',
        //         },
        //         {
        //             route: [],
        //             info: '',
        //         }
        //     ]
        // }
    },

    addInternetMediaItem(aTitle, aSubject, sURL='', sAPP=''){
        // {
        //     sURL: '',
        //     title: [''],
        //     sAPP: '',
        //     subjects: [
        //         {
        //             route: [],
        //             info: '',
        //         },
        //         {
        //             route: [],
        //             info: '',
        //         }
        //     ]
        // }
    },

    addPaintingOrPhotographyItem(aTitle, aSubject, aCreator, sOfficialSite=''){
        // {
        //     title: [''],
        //     aCreator: [''],
        //     officialSite: '',
        //     subjects: [
        //         {
        //             route: [],
        //             info: '',
        //         },
        //         {
        //             route: [],
        //             info: '',
        //         }
        //     ]
        // }
    },

    modifyItem(){

    },

    removeItem(){

    }
};

module.exports = Item;
