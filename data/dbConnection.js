const MongoClient = require("mongodb").MongoClient;
const callbackify = require("util").callbackify

let_connection = null
const env = process.env;

const MongoClientConnectWithCallBack = callbackify(function (url) {
    return MongoClient.connect(url);
})

const open = function () {
    MongoClientConnectWithCallBack(env.DB_URL, function (error, client) {
        if (error) {
            console.log(env.DB_CONNECTION_FAILED_MESSAGE);
            return;
        }
        else {
            _connection = client.db(env.COLLECTION_NAME);
            console.log(env.DB_CONNECTION_SUCCESS_MESSAGE);
        }
    })
}


const get = function () {
    return _connection;
}

module.exports = {
    open,
    get
}