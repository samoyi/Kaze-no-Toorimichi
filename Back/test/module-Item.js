'use strict';

const fs = require('fs');
const assert = require('assert');
const {inspect} = require('util');

const Item = require('../module/Item');
const item = new Item();


let sISBN = '9787563391882',
    aTitle = ['字解日本：十二岁时'],
    aSubject = [
        {
            route: [
                [0, 4394, 5532, 5567],
            ],
            info: {
                 isWhole: true,
                 des: '十二岁时年中行事',
            },
        }
    ],
    aAuthor = ['茂吕美耶'],
    sOfficialSite = 'https://book.douban.com/subject/4164041/';
    
let result = item.addBookItem(sISBN, aTitle, aSubject, aAuthor, sOfficialSite='');
// console.log(JSON.stringify(result, null, 4));
