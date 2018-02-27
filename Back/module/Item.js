'use strict';

function Item(){

}

Item.prototype = {
    contructor: Item,

    // addItem
    addBookItem(sISBN, sTitle, sAuthor, sOfficialSite='', aSubjects){
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
    addPeriodicalItem(sTitle, sIssue='', sOfficialSite='', aSubjects){
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
    addVideoItem(sTitle, aSubjects, sCataID, sIMDb='', sOfficialSite=''){
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

    addMusic(sTitle, aSubjects, sCataID, sIMDb='', sOfficialSite=''){
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

    modifyItem(){

    },

    removeItem(){

    }
};
