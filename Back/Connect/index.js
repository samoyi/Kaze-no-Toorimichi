'use strict';

const connect = require('connect');
const app =connect();

app
.use(logger)
.use('/admin', restrict)
.use('/admin', admin)
.use(hello)
.listen(3000);


function logger(req, res, next){
    console.log(req.method, req.url);
    next();
}

function restrict(req, res, next) {
    let authorization = req.headers.authorization;
    if (!authorization) return next(new Error('Unauthorized'));

    let parts = authorization.split(' '),
        scheme = parts[0],
        auth = new Buffer(parts[1], 'base64').toString().split(':'),
        user = auth[0],
        pass = auth[1];
        
    authenticateWithDatabase(user, pass, function (err) {
        if (err) return next(err);
        next();
    });
}

function admin(req, res, next) {
    switch (req.url) {
        case '/':
            res.end('try /users');
            break;
        case '/users':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(['tobi', 'loki', 'jane']));
            break;
    }
}

function hello(req, res){
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
}
