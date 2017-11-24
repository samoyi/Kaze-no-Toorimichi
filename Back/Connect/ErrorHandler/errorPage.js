'use strict';

function errorPage(err, req, res, next) {
    res.end(JSON.stringify({ error: 'Hello Error' }));
}

module.exports = errorPage;
