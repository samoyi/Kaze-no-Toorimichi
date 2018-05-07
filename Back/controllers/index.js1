const {APIError} = require('../middlewares/forREST');

var fn_index = async (ctx, next) => {
    ctx.response.body = `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8">
        <meta name="viewport"
			content="width=device-width, user-scalable=no, initial-scale=1.0" >
        <title>風之甬道 | 風の通り道</title>
        </head>
        <body>
            <h1>風之甬道 | 風の通り道</h1>
        </body>
        </html>
        `;
};

var fn_signin = async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
        a
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
        // throw new APIError('auth:user_not_found', 'user not found');
    }
};

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
};
