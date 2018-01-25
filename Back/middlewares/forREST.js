const oErrCode = {
    'user_not_found': 'User not found by id',
};

module.exports = {
    APIError: function (code, message) {
        this.code = code || 'internal:unknown_error';
        this.message = message || '';
    },
    throwApiErr(ctx, sErrCode){
        let msg = {
            apiErrCode: sErrCode,
            apiErrMsg: oErrCode[sErrCode],
        };
        ctx.throw(400, JSON.stringify(msg));
    },
    restify: (pathPrefix) => {
        pathPrefix = pathPrefix || '/api/'; // api请求的路径
        return async (ctx, next) => {
            if (ctx.request.path.startsWith(pathPrefix)) {
                // 如果是api请求，则给ctx绑定rest()方法，方便之后统一处理
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                }
                await next();
                // try {
                //     await next();
                // }
                // catch (e) {
                //     // 返回错误:
                //     // ctx.response.status = 400;
                //     ctx.response.type = 'application/json';
                //     // ctx.response.body = {
                //     //     apiErrCode: e.code || 'internal:unknown_error',
                //     //     apiErrMessage: e.message || ''
                //     // };
                //     let msg = {
                //         apiErrCode: e.code || 'internal:unknown_error',
                //         apiErrMessage: e.message || ''
                //     };
                //     // console.log(msg)
                //     // ctx.throw(400, msg);
                //     throw new Error(msg)
                // }
            }
            else{
                await next();
            }
        };
    }
};
