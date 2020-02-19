'use strict';
const con = require('../utils/dbconn.js');
const User = require('../service/UserService');
const utils = require('../utils/writer.js');
/**
 * remove data the user uploaded
 * remove data the user uploaded
 *
 * data_id Integer data id of data to delete
 * session_token String session token of a user session
 * no response value expected for this operation
 **/
exports.deleteData = async function (data_id, session_token) {
    //todo make sure file is deleted with google cloud API
    const uid = await User.token2uid(session_token);
    if (uid === -1) {
        return utils.respondWithCode(401, {
            "error": 'unauthorized'
        });
    }
    const [d] = await con.promise().query('delete from data where owner = ? and id = ?', [uid, data_id]);
    if (d.affectedRows === 1) {
        return {};
    }
    return utils.respondWithCode(400, {
        "error": 'invalid data'
    });
};


/**
 * list all data the user owns
 * list all data the user owns
 *
 * session_token String session token of a user session
 * returns List
 **/
exports.getData = async function (session_token) {
    const uid = await User.token2uid(session_token);
    if (uid === -1) {
        return utils.respondWithCode(401, {
            "error": 'unauthorized'
        });
    }
    const [d] = await con.promise().query('select * from data where owner = ?', [uid]);
    return d;
};


/**
 * rename data
 * rename the uploaded data
 *
 * name String name of the dataset
 * data_id Integer data id of data to rename
 * session_token String session token of a user session
 * no response value expected for this operation
 **/
exports.modifyData = async function (name, data_id, session_token) {
    const uid = await User.token2uid(session_token);
    if (uid === -1) {
        return utils.respondWithCode(401, {
            "error": 'unauthorized'
        });
    }
    const [d] = await con.promise().query('update data set name = ?  where owner = ? and id = ?', [name, uid, data_id]);
    if (d.affectedRows === 1) {
        return {};
    }
    return utils.respondWithCode(400, {
        "error": 'invalid data'
    });
};


/**
 * upload new data
 * upload data
 *
 * name String name of the dataset
 * file byte[] content of the zip file
 * session_token String session token of a user session
 * returns inline_response_200_2
 **/
// eslint-disable-next-line no-unused-vars
exports.uploadData = function (name, file, session_token) {
    //todo LOADS OF WORK!!!!
    // eslint-disable-next-line no-unused-vars
    return new Promise(function (resolve, reject) {
        const examples = {};
        examples['application/json'] = {
            "data_id": 3
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
};

