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


    if( sMethod==='GET' && oQuery.index!==undefined ){
        respondGetItem(res, oQuery.index);
    }
    else if( sMethod==='POST' && oQuery.act==='addItem' ){
        respondAddItem(req, res);
    }
    else if(sMethod==='POST' && oQuery.act==='deleteItem'){
        respondDeleteItem(req, res);
    }
    else if(sMethod==='POST' && oQuery.act==='modifyItem'){
        respondModifyItem(req, res);
    }
    else if(sMethod==='POST' && oQuery.act==='upload'){
        respondUpload(req, res);
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


function respondGetItem(res, index){
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    let result = fetchItem(index);
    respond(result);

    function fetchItem(index){
        return aItems[index] ? aItems[index] : null;
    }

    function respond(result){
        if(result){
            res.setHeader('Content-Length', Buffer.byteLength(result));
            res.statusCode = 200;
            res.write( result );
        }
        else{
            res.statusCode = 404;
            res.end( 'Not found' );
        }
    }
}


function respondAddItem(req, res){

    req.setEncoding('utf8');

    receiveData(req, (sData)=>{
        aItems.push(qs.parse(sData).item);
        fs.writeFile('items.json', JSON.stringify(aItems), (err)=>{
            if(err){
                aItems.pop();
                respond(false);
            }
            else{
                respond(true);
            }
        });
    });

    function respond(bAddResult){
        if(bAddResult){
            res.statusCode = 200;
            res.write( 'success' );
        }
        else{
            res.statusCode = 400;
            res.write( 'fail' );
        }
        res.end();
    }
}


function respondDeleteItem(req, res){

    receiveData(req, (sData)=>{
        let nIndex =Number.parseInt( qs.parse(sData).index );
        deleteItem(nIndex, (result)=>{
            respond(res, result);
        });
    });

    function deleteItem(nIndex, callback){
        if( Number.isNaN(nIndex) ){
            callback(NaN);
        }
        else if(aItems[nIndex]===undefined){
            callback(null);
        }
        else{
            let aDelete = aItems.splice(nIndex, 1);
            fs.writeFile('items.json', JSON.stringify(aItems), (err)=>{
                if(err){
                    aItems.splice(nIndex, 0, aDelete[0]);
                    callback(err);
                }
                callback(true);
            });
        }
    }

    function respond(res, result){
        if(result===true){
            res.end('success');
        }
        else if(result===null){
            res.end('Item not found');
        }
        else if(Number.isNaN(result)){
            res.status = 400;
            res.end('Invalid item id');
        }
        else{
            res.status = 500;
            res.end('Internal Server Error');
            console.log(result);
        }
    }
}

function respondModifyItem(req, res){
    receiveData(req, (sData)=>{
        let oData = qs.parse(sData),
            nIndex = Number.parseInt( oData.index ),
            sValue = oData.value;

        modifyItem(nIndex, sValue, (result)=>{
            respond(res, result);
        });
    });

    function modifyItem(nIndex, sValue, callback){
        if( Number.isNaN(nIndex) ){
            callback(NaN);
        }
        else if(aItems[nIndex]===undefined){
            callback(null);
        }
        else{
            let sOldValue = aItems[nIndex];
            aItems[nIndex] = sValue;
            fs.writeFile('items.json', JSON.stringify(aItems), (err)=>{
                if(err){
                    aItems[nIndex] = sOldValue;
                    callback(err);
                }
                callback(true);
            });
        }
    }

    function respond(res, result){
        if(result===true){
            res.end('success');
        }
        else if(result===null){
            res.end('Item not found');
        }
        else if(Number.isNaN(result)){
            res.status = 400;
            res.end('Invalid item id');
        }
        else{
            res.status = 500;
            res.end('Internal Server Error');
            console.log(result);
        }
    }
}

function respondUpload(req, res){

    const formidable = require('formidable');

    upload(req, res);

    function upload(req, res) {
        if (!isFormData(req)) {
            res.statusCode = 400;
            res.end('Bad Request: expecting multipart/form-data');
            return;
        }

        let form = new formidable.IncomingForm();

        form.on('field', function(field, value){

        });

        form.on('file', function(name, file){

        });

        let nPercent = null;
        form.on('progress', function(bytesReceived, bytesExpected){
            nPercent = Math.floor(bytesReceived / bytesExpected * 100);
            console.log(nPercent + '%');
        });

        form.on('end', function(){
            res.end('upload complete!');
        });

        form.parse(req, function(err, fields, files){
            if(err) res.end(err);

            res.end('upload complete!');
        });
    }

    function isFormData(req) {
        let type = req.headers['content-type'] || '';
        // return 0 === type.indexOf('multipart/form-data');
        return type.includes('multipart/form-data');
    }
}


function receiveData(req, fnCallback){
    let sData = '';
    req.on('data', chunk=>{
        sData += chunk;
    });
    req.on('end', ()=>{
        fnCallback(sData);
    });
}
