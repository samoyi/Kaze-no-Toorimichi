const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const root = '../Public';

let server = http.createServer(function(req, res){
    let oUrl = url.parse(req.url);
    let sFilePath = path.join(root, oUrl.pathname);

    fs.stat(sFilePath, (err, stat)=>{
        if(err){
            if(err.code==='ENOENT'){
                res.statusCode = 404;
                res.end('Not found');
            }
            else{
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        }
        else{
            res.setHeader('Content-Length', stat.size);
            let stream = fs.createReadStream(sFilePath);
            stream.pipe(res);
            stream.on('error', err=>{
                res.statusCode = 500;
                res.end('Internal Server Error');
            });
        }
    });
});

server.listen(3000);
