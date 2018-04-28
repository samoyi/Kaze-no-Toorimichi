const Subject = require('./module/Subject');
const DB = require('./module/Database');
const Search = require('./module/Search');

async function getSubjectByID(){
    const subject1 = await Subject.getSubjectByID(4395);
    const subject2 = await Subject.getSubjectByID(170);
    console.log(subject1);
    console.log(subject2);
}

async function searchSubject(keyword){
    const aIDSubject = await DB.getIDSubjectData();
    const aIDRoutes = await DB.getIDRoutesData();
    search = new Search(keyword, aIDSubject, aIDRoutes);
    console.log(search.getSubjects());
}
// searchSubject('淡路島');

async function getRouteGroup(keyword){
    const aIDSubject = await DB.getIDSubjectData();
    const aIDRoutes = await DB.getIDRoutesData();
    search = new Search(keyword, aIDSubject, aIDRoutes);
    console.log(JSON.stringify(search.getRouteGroup(), null, 4));
}
// getRouteGroup('淡路島');
