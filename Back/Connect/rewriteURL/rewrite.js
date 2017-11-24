'use strict';

const url = require('url');


function rewrite(req, res, next) {
    var match = url.parse(req.url).pathname.match(/^\/blog\/posts\/(.+)/)
    if (match) {
        findPostIdBySlug(match[1], function(err, id) {
            if (err) return next(err);
            if (!id) return next(new Error('User not found'));
            req.url = '/blog/posts/' + id;  //重写req.url属性，以便后续中间件可以使用真实的ID
            next();
        });
    } else {
        next();
    }
}

function findPostIdBySlug(title, callback){
    callback(null, 666);
}

module.exports = rewrite;
