'use strict';


function pets(req, res, next) {
    console.log(req.url);
    let match = req.url.match(/^\/pet\/(.+)/);
    console.log(match);
    if (match) {
        foo();
    } else {
        next();
    }
}

module.exports = pets;
