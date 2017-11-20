'use strict';

const url = require('url');

function route(oRoutesConfig){
    return function (req, res, next){
        if(!oRoutesConfig[req.method]){
            next();
            return;
        }

        let oRoutes = oRoutesConfig[req.method],
            oURL = url.parse(req.url),
            aPaths = Object.keys(oRoutes);

        aPaths.forEach(path=>{
            let fn = oRoutes[path];
            console.log(path);
            path = path.replace(/\//g, '\\/').replace(/:(\w+)/g, '([^\\/]+)');
            console.log(path);
            let re = new RegExp('^' + path + '$'),
                captures = oURL.pathname.match(re);
            console.log(oURL.pathname);
            console.log(re);
            console.log(captures);
            if(captures){
                let args = [req, res].concat(captures.slice(1));
                console.log(args.length);
                console.log(args[2]);
                console.log('*************************');
                fn.apply(null, args);
                return;
            }
        });
        next();
    };
}

module.exports = route;
