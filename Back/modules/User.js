
const {promisify} = require('util');
const fs = require('fs');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const sendMail = require('./sendMail');

let aAllUser = fs.readdirSync('./database/users')
                    .map(filename=>filename.slice(0, -5));


function hasUser(sUserID){
    return aAllUser.includes(sUserID);
}

class User{

    constructor(sUserID){

        if(this.hasUser(sUserID)){
            this.userID = sUserID;
        }

        this.fileUrl = './database/users/' + this.userID + '.json';
    }

    hasUser(sUserID){
        return aAllUser.includes(sUserID);
    }

    mailVerification(sEmail){
        if(true){ // 邮箱正则

        }
        else{
            return
        }

        if(this.hasUser(sEmail)){
            // sendMail()
        }
        else{

        }
    }


    // signIn(sEmail){
    //     if(this.hasUser(sEmail)){
    //         let oUser = {
    //             "email": sEmail,
    //         };
    //         this.userID = sEmail;
    //
    //         aAllUser.push(oUser);
    //     }
    //     else{
    //
    //     }
    // },

    async createUser(){
        aAllUser.includes()
        if(fs.existsSync(this.fileUrl)){
            return JSON.parse( await readFile(this.fileUrl, 'utf8') );
        }
        else{ // 根本没有该用户。有用户但没项目是空数组
            return null;
        }
    }



    async getProjects(){
        if(fs.existsSync(this.fileUrl)){
            return JSON.parse( await readFile(this.fileUrl, 'utf8') );
        }
        else{ // 根本没有该用户。有用户但没项目是空数组
            return null;
        }
    }


    async addProject(sName, sImg=''){
        let err = '';

        if(typeof sImg === 'string'){
            sImg = sImg.trim();
        }
        else{
            sImg = '';
        }

        if(typeof sName === 'string'){
            sName = sName.trim();
            if(sName===''){
                return {err: 'Wrong project name'};
            }
        }
        else{
            return {err: 'Wrong project name'};
        }

        return this.getProjects()
            .then((res)=>{
                if( res.map(p=>p.name).some(name=>name===sName) ){
                    return {err: 'Duplicate project name'};
                }
                else{
                    res.unshift({
                        img: sImg,
                        name: sName,
                        id: res.length,
                        catas:{},
                    });
                    fs.writeFileSync(this.fileUrl, JSON.stringify(res));
                }
                return {err};
            })
            .catch(error=>{err: error});
    }
}

module.exports = User;
