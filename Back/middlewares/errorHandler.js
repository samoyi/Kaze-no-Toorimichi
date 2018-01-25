/**
 * 作为最外层的中间件，捕获所有的错误
 * 错误码400定义为API请求错误
 * 只有错误码是400时，才向response.body写入具体错误原因，
 * 其他错误一律写入 Internal Server Error
 */


module.exports = ()=>{
    return async function (ctx, next){
        try {
            await next();
        }
        catch (err) {
            console.log(2);
            ctx.response.status = err.status || 500;
            ctx.response.type = 'application/json';
            ctx.response.body = {
                errMsg: ctx.response.status===400
                ? JSON.parse(err.message) : 'Internal Server Error.',
            };
        }

    };
};
