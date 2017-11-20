'use strict';

const connect = require('connect');
const app = connect();
const router = require('./middleware/router');

let oRoutesConfig = {
    GET: {
        '/users': (req, res)=>res.end('tobi, loki, ferret'),
        '/user/:id': (req, res, id)=>res.end('user ' + id),
    },
    POST: {
        '/user/:id': (req, res, id)=>res.end('deleted user ' + id),
    },
};

app
.use(router(oRoutesConfig))
.listen(3000);
