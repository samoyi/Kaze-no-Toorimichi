'use strict';

const connect = require('connect'),
      url = require('url'),
      app = connect();

app
.use(rewrite)
.use(showPost)
.listen(3000);
