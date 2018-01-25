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

// 加载所有的controller，然后分别调用addMapping把controller中的路由映射添加进router
function loadControllers(router, dir) {
    const js_files = fs.readdirSync(__dirname + '/' + dir)
                        .filter(f=>f.endsWith('.js'));

    for (let f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(router, mapping);
    }
}


module.exports = function (dir) {
    // 如果不传参数，扫描目录默认为'controllers'
    let controllers_dir = dir || 'controllers',
        router = new Router();

    loadControllers(router, controllers_dir);
    return router.routes();
};
