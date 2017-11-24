'use strict';

const connect = require('connect'),
      url = require('url'),
      app = connect();

const rewrite = require('./rewrite');

app
.use(rewrite)
.use(showPost)
.listen(3000);


function showPost(req, res){
    res.end('Need to route to ' + req.url);
}
