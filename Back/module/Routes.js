'use strict';

const DB = require('./Database');

async function getItemIDsByRoute(aRoute){
    try {
        const aID = await DB.getItemIDs(aRoute);
        return aID;
    }
    catch (err){
        console.log('private: ', err);
    }
}

getItemIDsByRoute([0, 4394, 4395]);
