// const Subject = require('./module/Subject');
// Subject.getSubjectByID(5567)
// .then(res=>{
//     console.log(res);
// })
// .catch(err=>{
//     console.error(err);
// });
// Subject.getSubjectByID(4253)
// .then(res=>{
//     console.log(res);
// })
// .catch(err=>{
//     console.error(err);
// });
// Subject.getSubjectByID(1994)
// .then(res=>{
//     console.log(res);
// })
// .catch(err=>{
//     console.error(err);
// });


// const Item = require('./module/Item');
// const oInfo = {
//     ISBN: '9784048839266',
//     title: ['字解日本'],
//     author: ['茂吕美耶'],
//     officialSite: 'https://book.douban.com/subject/4164041/',
// };
// const aSubject = [
//     {
//         route: [0,4394,5532,5567],
//         isWhole: false,
//         part: '春——三月',
//         des: '22',
//     },
// ];
// Item.addItem(oInfo, aSubject, 0, 0);

// const Item = require('./module/Item');
// const oInfo = {
//     IMDb: "tt0100998",
//     title: ['夢', '梦'],
//     author: ['黒澤明'],
//     officialSite: 'http://www.imdb.com/title/tt0100998/',
// };
// const aSubject = [
//     {
//         route: [0,4394,5532,5567],
//         isWhole: false,
//         part: '第二个梦',
//         des: '22',
//     },
// ];
// Item.addItem(oInfo, aSubject, 1, 0);



const keyword = '雛祭り';
async function searchItems(keyword){
    const DB = require('./module/Database');
    const aIDSubject = await DB.getIDSubjectData();
    const aIDRoutes = await DB.getIDRoutesData();
    const aItems = await DB.getItemsData();
    const Search = require('./module/Search');
    const search = new Search(keyword, aIDSubject, aIDRoutes, aItems);
    const result = await search.getItems();
    return result;
}
searchItems(keyword)
.then(res=>{
    console.log(res);
})
.catch(err=>{
    console.error(err);
});
