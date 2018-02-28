'use strict';

function Item(){

}

Item.prototype = {
    contructor: Item,

    // addItem
    addBookItem(sISBN, sTitle, aSubject, aAuthor, sOfficialSite=''){
        // {
        //     ISBN: '',
        //     title: [''],
        //     author:[''],
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
        //                  part: '第三章和第八章',
        //                  des: '',
        //             },
        //         }
        //     ]
        // }

    },
    addPeriodicalItem(sTitle, aSubject, sIssue='', sOfficialSite=''){
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
    addVideoItem(sTitle, aSubject, sCataID, sIMDb='', sOfficialSite=''){
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

    addMusicItem(sTitle, aSubject, aMusician, sOfficialSite=''){
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

    addGameItem(sTitle, aSubject, sCataID, aDeveloper=[], sOfficialSite=''){
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

    addPerformanceItem(sTitle, aSubject, aPerformer, sOfficialSite=''){
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

    addInternetMediaItem(sTitle, aSubject, sURL='', sAPP=''){
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

    addPaintingOrPhotographyItem(sTitle, aSubject, aCreator, sOfficialSite=''){
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
