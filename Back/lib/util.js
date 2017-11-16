

function receiveData(req, fnCallback){
    let sData = '';
    req.on('data', chunk=>{
        sData += chunk;
    });
    req.on('end', ()=>{
        fnCallback(sData);
    });
}


module.exports = {
    receiveData,
};
