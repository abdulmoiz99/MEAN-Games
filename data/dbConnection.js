const MongoClient = require("mongodb").MongoClient;

let _connection = null

const open = function () {
    MongoClient.connect("mongodb://127.0.0.1:27017/", function (error, client) {
        if (error) {
            console.log("DB connection failed");
            return;
        }
        else {
            _connection = client.db("meanGames");
            console.log("DB connection open");
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