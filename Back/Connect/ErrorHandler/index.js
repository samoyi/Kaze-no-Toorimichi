'use strict';

const connect = require('connect');
const errorHandler = require('./errorHandling');
const users = require('./users');
const pets = require('./pets');
const errorPage = require('./errorPage');


const api = connect()
.use(users)
.use(pets)
.use(errorHandler);

const app = connect()
.use(hello)
.use('/api', api)
.use(errorPage)
.listen(3000);



function hello(req, res, next) {
    a
    if (req.url.match(/^\/hello/)) {
        res.end('Hello World\n');
    } else {
        next();
    }
}
