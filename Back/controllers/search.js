const path = require('path');
const nunjucks = require('nunjucks');

const viewsDir = path.resolve(__dirname, '../views');
nunjucks.configure(viewsDir, { autoescape: true });

const fn_result = async (ctx, next) => {
    try {
        const DB = require('../module/Database');
        const aIDSubject = await DB.getIDSubjectData();
        const aIDRoutes = await DB.getIDRoutesData();
        const aItems = await DB.getItemsData();
        const Search = require('../module/Search');
        const search = new Search(ctx.params.keyword, aIDSubject, aIDRoutes, aItems);
        const result = await search.getItems();
        ctx.response.body = nunjucks.render('search.html', {
            keyword: ctx.params.keyword,
            amount: result.length,
            result: result.map(item=>JSON.stringify(item)),
        });
    }
    catch (err){
        console.error(err);
    }
};

module.exports = {
    'GET /search/:keyword': fn_result,
};
