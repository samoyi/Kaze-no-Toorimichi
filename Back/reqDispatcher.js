// 使用koa-router进行请求分发
// 这个模块会使用koa-router为所有预期的请求指定处理函数


const fs = require('fs');
const Router = require('koa-router');


// 向router添加一个controller中的映射
function addMapping(router, mapping) {
    for (let url in mapping) {
        if(url.startsWith('GET ')){
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        }
        else if (url.startsWith('POST ')){
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        }
        else{
            console.log(`invalid URL: ${url}`);
        }
    }
}


// 加载所有的controllers，获取所有的“请求方法请求路径——处理函数”路由映射，然后分别调用
// addMapping把映射添加进router
function loadMappings(router) {
    const js_files = fs.readdirSync(__dirname + '/controllers')
                        .filter(f=>f.endsWith('.js'));

    for (let f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping);
    }
}

const router = new Router();
loadMappings(router);
module.exports = router.routes();
