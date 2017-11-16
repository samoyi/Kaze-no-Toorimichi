'use strict';

const http = require('http'),
      url = require('url'),
      qs = require('querystring'),
      mysql = require('mysql'),
      oUtil = require('../lib/util'),
      MyltiBtye = require('../lib/MultiByte'),
      mb = new MyltiBtye();

const db = mysql.createConnection({
    host:     'localhost',
    user:     'root',
    password: 'root',
    database: 'test',
});
const table = 'nodejs';

const server = http.createServer((req, res)=>{
    let oURL = url.parse(req.url, true),
        oQuery = oURL.query;

    if(req.method==='GET'){

        let sID = oQuery.id;

        if(sID){
            respondRetrieve(sID, res);
        }
        else{
            res.statusCode = 404;
            res.end('Not Found');
        }
    }
    else if(req.method==='POST'){
        oUtil.receiveData(req, (sData)=>{
            let oData = qs.parse(sData);

            if(oData.act.trim()==='insert'){
                respondInsert(oData, res);
            }
            else if(oData.act==='remove'){
                respondRemove(oData, res);
            }
            else if(oData.act==='update'){
                respondUpdate(oData, res);
            }
            else{
                res.statusCode = 404;
                res.end('Not Found');
            }
        });
    }
    else{
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(3000);


function respondInsert(oData, res){

    let sName = oData.name.trim(),
        nAge = Number.parseInt(oData.age.trim());

    let checkResult = checkArgs(sName, nAge);

    if(checkResult===true){
        insert(sName, nAge, insertCallback);
    }
    else{
        res.statusCode = 400;
        res.end(checkResult);
    }

    function checkArgs(sName, nAge){
        let nNameLen = mb.length(sName);

        if(nNameLen<1 || nNameLen>20){
            return 'Wrong name length';
        }
        if(!Number.isInteger(nAge) || nAge<1 || nAge>150){
            return 'Wrong age';
        }
        return true;
    }

    function insert(name, age, insertCallback){
        db.query(
            'INSERT INTO ' +table+ ' (name, age)' + 'VALUES (?, ?)',
            [name, age],
            err=>{
                if(err){
                    insertCallback(err);
                }
                else{
                    insertCallback(true);
                }
            }
        );
    }

    function insertCallback(result){
        if(result===true){
            res.statusCode = 200;
            res.end('success');
        }
        else{
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
    }
}


function respondRemove(oData, res){
    let nID = Number.parseInt(oData.id.trim());

    if(!Number.isInteger(nID) || nID<1){
        res.statusCode = 400;
        res.end('Wrong ID');
    }
    else{
        remove(nID, removeCallback);
    }

    function remove(id, removeCallback){
        db.query(
            'DELETE FROM ' +table+ ' WHERE id=?',
            [id],
            (err, results)=>{
                if(err){
                    removeCallback(err);
                }
                else{
                    if(results.affectedRows){
                        removeCallback(true);
                    }
                    else{
                        removeCallback(false);
                    }
                }
            }
        );
    }

    function removeCallback(result){
        if(result===true){
            res.statusCode = 200;
            res.end('success');
        }
        else if(result===false){
            res.statusCode = 400;
            res.end("ID doesn't exist");
        }
        else{
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
    }
}


function respondUpdate(oData, res){

    let nID = Number.parseInt(oData.id.trim()),
        sName = oData.name.trim(),
        age = oData.age.trim()==='' ? '' : Number.parseInt(oData.age.trim());

    let handleResult = handleArgs(nID, sName, age);

    if(typeof handleResult === 'object'){
        update(handleResult, updateCallback);
    }
    else{
        res.statusCode = 400;
        res.end(handleResult);
    }

    function handleArgs(nID, sName, nAge){

        if(!Number.isInteger(nID) || nID<1){
            return 'Wrong ID';
        }
        if(sName==='' && age===''){
            return 'No modified item';
        }

        let oNewValue = {
            name: sName,
            age,
            id: nID
        };
        if(sName!==''){
            let nNameLen = mb.length(sName);
            if(nNameLen<1 || nNameLen>20){
                return 'Wrong name length';
            }
        }
        else{
            delete oNewValue.name;
        }

        if(age!==''){
            if(!Number.isInteger(age) || age<1 || age>150){
                return 'Wrong age';
            }
        }
        else{
            delete oNewValue.age;
        }

        return oNewValue;
    }


    function update(handleResult){
        let str = 'UPDATE ' +table+ ' SET ',
            arr = [];
        for(let key in handleResult){
            if(key!=='id'){
                str += key+'=?,';
                arr.push(handleResult[key]);
            }
            else{
                str = str.slice(0, -1);
                str += ' WHERE id=?';
            }
        }
        arr.push(handleResult.id);

        db.query(
            str,
            arr,
            (err, results)=>{
                if(err){
                    updateCallback(err);
                }
                else{
                    if(results.affectedRows){
                        updateCallback(true);
                    }
                    else{
                        updateCallback(false);
                    }
                }
            }
        );
    }

    function updateCallback(result){
        if(result===true){
            res.statusCode = 200;
            res.end('success');
        }
        else if(result===false){
            res.statusCode = 400;
            res.end("ID doesn't exist");
        }
        else{
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
    }
}


function respondRetrieve(sID, res){

    let nID = checkID(sID);
    if(nID){
        retrieve(nID, retrieveCallback);
    }
    else{
        res.statusCode = 400;
        res.end('Wrong ID');
    }

    function checkID(sID){
        let nID = Number.parseInt(sID.trim());
        if(Number.isInteger(nID) && nID>0){
            return nID;
        }
        else{
            return false;
        }
    }

    function retrieve(nID, retrieveCallback){
        db.query(
            'SELECT * FROM ' +table+ ' WHERE id=?',
            [nID],
            (err, results)=>{
                if(err){
                    retrieveCallback(err);
                }
                else{
                    if(results.length){
                        retrieveCallback(results[0]);
                    }
                    else{
                        retrieveCallback(false);
                    }
                }
            }
        );
    }

    function retrieveCallback(result){
        if(typeof result === 'object'){
            res.statusCode = 200;
            res.end(JSON.stringify(result));
        }
        else if(result===false){
            res.statusCode = 400;
            res.end("ID doesn't exist");
        }
        else{
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
    }

}
