'use strict';



let db = {
    users: [
        'tobi',
        'loki',
        'jane'
    ]
};

function users(req, res, next) {
    let match = req.url.match(/^\/user\/(.+)/)
    if (match) {
        let bHasUser = db.users.includes(match[1]);
        if (bHasUser) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(match[1]));
        } else {
            let err = new Error('User not found');
            err.notFound = true;
            next(err);
        }
    }
    else {
        next();
    }
}

module.exports = users;
