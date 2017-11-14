const http = require('http'),
      https = require('https'),
      url = require('url'),
      fs = require('fs'),
      qs = require('querystring');

sItems = fs.readFileSync('items.json', 'utf8');
aItems = JSON.parse(sItems);


let server = http.createServer(function(req, res){
    let sMethod = req.method,
        oURL = url.parse(req.url, true),
        oQuery = oURL.query;


    if( sMethod==='GET' && oQuery.item!==undefined ){
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        let item = fetchItem(req, oQuery.item);
        if(item){
            res.setHeader('Content-Length', Buffer.byteLength(item));
            res.statusCode = 200;
            res.write( item );
        }
        else{
            res.statusCode = 404;
            res.write( 'Not found' );
        }
        res.end();
    }
    else if( sMethod==='POST' && oQuery.act==='addItem' ){
        addItem(req, oQuery, (bAddResult)=>{
            res.statusCode = 200;
            res.write( bAddResult?'success':'fail' );
            res.end();
        });
    }
    else if(sMethod==='POST' && oQuery.act==='deleteItem'){
        respondDeleteItem(req);
    }
    else{
        res.end();
    }

    // if("req.url === '/favicon.ico'"){
    //     res.setHeader('Content-Type', 'image/x-icon');
    //
    //     https.get('https://www.zhihu.com/favicon.ico', (icoRes)=>{
    //
    //         let data = '';
    //         icoRes.on('data', function (chunk) {
    //             console.log( chunk.length);
    //             data += chunk;
    //         });
    //         icoRes.on('end', function(){
    //             console.log( data);
    //             res.write( data );
    //             res.end();
    //         })
    //     })
    // }

});




server.listen(3000);
console.log('server start');



function fetchItem(req, index){
    return aItems[index] ? aItems[index] : null;
}


function addItem(req, oQuery, callback){
    req.setEncoding('utf8');

    let sData = '';

    req.on('data', chunk=>{
        sData += chunk;
    });
    req.on('end', ()=>{
        aItems.push(qs.parse(sData).item);
        fs.writeFile('items.json', JSON.stringify(aItems), (err)=>{
            if(err){
                callback(false);
            }
            else{
                callback(true);
            }
        });
    });
}


function respondDeleteItem(req, res){
    let result = deleteItem(req, result=>{
        if(result){
            res.end('success');
        }
        else if(result===null){
            res.end('Item not found');
        }
        else if(result===NaN){
            res.status = 400;
            res.end('Invalid item id');
        }
        else{
            res.status = 500;
            res.end('Server Error');
        }
    });

    function deleteItem(req, fnCallback){
        let sData = '';
        req.on('data', chunk=>{
            sData += chunk;
        });
        req.on('end', ()=>{
            let nIndex = Number.parseInt( qs.parse(sData).index );
            if( Number.isNaN(nIndex) ){
                fnCallback(NaN);
            }
            else if(aItems[nIndex]===undefined){
                fnCallback(null);
            }
            else{
                aItems.splice(nIndex, 1);
                console.log('aItems');
                console.log(aItems);
                fs.writeFile('items.json', JSON.stringify(aItems), (err)=>{
                    if(err){
                        console.log(err);
                    }
                });
                fnCallback(true);
            }
        });
    }
}
