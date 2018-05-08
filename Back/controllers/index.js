const path = require('path');
const nunjucks = require('nunjucks');
const DB = require('../module/Database');
const Item = require('../module/Item');

const viewsDir = path.resolve(__dirname, '../views');
nunjucks.configure(viewsDir, { autoescape: true });

const fn_index = async (ctx, next) => {
    const oIDSubjectMap = await DB.getIDSubjectData();
    const nItemAmount = await Item.getItemAmount();
    ctx.response.body = nunjucks.render('home.html', {
        subjectNumber: oIDSubjectMap.length,
        itemNumber: nItemAmount,
    });
};

module.exports = {
    'GET /': fn_index,
};
