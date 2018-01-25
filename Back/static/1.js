const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost');
    await next();
});

// app.use((ctx, next) => {
//     ctx.set('Access-Control-Allow-Origin', 'http://localhost');
//     next();
// });



app.use(serve(__dirname + '/static'));

app.listen(3000);

console.log('listening on port 3000');
