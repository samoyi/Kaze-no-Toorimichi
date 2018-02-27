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
        //             des: '',
        //         },
        //         {
        //             route: [],
        //             des: '',
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
        //             des: '',
        //         },
        //         {
        //             route: [],
        //             des: '',
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
        //             des: '',
        //         },
        //         {
        //             route: [],
        //             des: '',
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
        //             des: '',
        //         },
        //         {
        //             route: [],
        //             des: '',
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
        //             des: '',
        //         },
        //         {
        //             route: [],
        //             des: '',
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
        //             des: '',
        //         },
        //         {
        //             route: [],
        //             des: '',
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
        //             des: '',
        //         },
        //         {
        //             route: [],
        //             des: '',
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
        //             des: '',
        //         },
        //         {
        //             route: [],
        //             des: '',
        //         }
        //     ]
        // }
    },

    modifyItem(){

    },

    removeItem(){

    }
};
