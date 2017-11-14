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
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        respondGetItem(res, oQuery.index);
    }
    else if( sMethod==='POST' && oQuery.act==='addItem' ){
        addItem(req, oQuery, (bAddResult)=>{
            res.statusCode = 200;
            res.write( bAddResult?'success':'fail' );
            res.end();
        });
    }
    else if(sMethod==='POST' && oQuery.act==='deleteItem'){
        respondDeleteItem(req, res);
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


 function addItem(req, oQuery,callback){

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

     receiveData(req, (sData)=>{
         let nIndex =Number.parseInt( qs.parse(sData).index );
         let result = deleteItem(nIndex);
         respond(res, result);
     });

     function deleteItem(nIndex){
         if( Number.isNaN(nIndex) ){
             return NaN;
         }
         else if(aItems[nIndex]===undefined){
             return null;
         }
         else{
             aItems.splice(nIndex, 1);
             fs.writeFile('items.json', JSON.stringify(aItems), (err)=>{
                 if(err){
                     console.log(err);
                 }
             });
             return true;
         }
     }

     function respond(res, result){
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
