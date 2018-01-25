const Koa = require('koa');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const app = new Koa();


const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler());


app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost');
    await next();
});


// 返回静态文件
app.use(serve('static'));


// 判断是否是api请求，如果是则添加统一的回应的函数
const rest = require('./middlewares/forREST');
app.use(rest.restify());


app.use(bodyParser());


// 根据请求的方法和路径，将不同类型的请求分发至不同的controller
const dispatcher = require('./reqDispatcher');
app.use(dispatcher());




app.listen(3000);
console.log('app started at port 3000...');
