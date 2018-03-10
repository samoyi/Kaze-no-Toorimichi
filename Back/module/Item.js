// 条目操作类

'use strict';

const MyUtil = require('./MyUtil');
const DB = require('./Database');
const checker = new MyUtil.ArgumentsChecker();


function Item(){

}

// 对已有条目的修改，包括添加subject
Item.prototype = {
    contructor: Item,

    isISBNExists(sISBN){ // 链接ISBN数据接口进行查询
        checker.get(arguments).types(['isbn']);

    },

    // addItem
    addBookItem(sISBN, aTitle, aSubject, aAuthor, sOfficialSite=''){
        checker.get(arguments)
                        .types(['isbn', 'strArr', 'array', 'strArr', 'string']);

        let item = {
            ISBN: sISBN.trim(),
            title: aTitle.map(title=>title),
            author: aAuthor,
            sOfficialSite: sOfficialSite,
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

        DB.addItemToDB(item, 0, 0);
    },
    addPeriodicalItem(aTitle, aSubject, sIssue='', sOfficialSite=''){
        // {
        //     title: [''],
        //     sIssue:'',
        //     sOfficialSite: '',
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
        //                  issue: '2017年9月',
        //                  des: '',
        //             },
        //         }
        //     ]
        // }

    },
    addVideoItem(aTitle, aSubject, sCataID, sIMDb='', sOfficialSite=''){
        // {
        //     IMDb: '',
        //     title: [''],
        //     sOfficialSite: '',
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

    addMusicItem(aTitle, aSubject, aMusician, sOfficialSite=''){
        // {
        //     title: [''],
        //     aMusician: [''],
        //     sOfficialSite: '',
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
        //     sOfficialSite: '',
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
        //     sOfficialSite: '',
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
        //     sOfficialSite: '',
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
