'use strict';

const fs = require('fs');

let sFile = '神社0.json';
let aName = [ '隠津島神社',
  '雄琴神社',
  '春日神社',
  '吉備津神社',
  '貴船神社',
  '水天宮',
  '御霊神社',
  '黄金山神社',
  '児玉神社',
  '猿田彦神社',
  '山王神社',
  '塩竈神社',
  '神明神社',
  '松陰神社',
  '水無神社',
  '住吉神社',
  '諏訪神社',
  '玉祖神社',
  '田村神社',
  '豊国神社',
  '西宮神社',
  '二宮神社',
  '乃木神社',
  '聖神社',
  '日枝神社',
  '物部神社' ]


let aSubject = JSON.parse(fs.readFileSync(sFile, 'utf8'));

aSubject.forEach(subject=>{
    if( subject.name.length===1 && !subject.name[0].includes('（')
        &&  !subject.name[0].includes('）') && aName.includes(subject.name[0])){
        subject.name = [
            subject.name[0]+'（'+subject.city+'）',
            subject.name[0]
        ];
    }
});

fs.writeFileSync(sFile, JSON.stringify(aSubject, null, 4), 'utf8');
