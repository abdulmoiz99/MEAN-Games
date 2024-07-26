const { ObjectId } = require("mongodb");
const dbConnection = require("./data/dbConnection");
const env = process.env;
const callbackify = require("util").callbackify
const validate = require("./gamesValidation");

const getGameCollection = function () {
    const db = dbConnection.get();
    return db.collection(env.COLLECTION_GAMES);
}
const gameCollection_Find_Skip_Limit_ToArrayCallback = callbackify(function (offset, count) {
    return getGameCollection().find().skip(offset).limit(count).toArray();
})

const gameCollection_FindOneCallback = callbackify(function (gameId) {
    return etGameCollection().findOne({ _id: new ObjectId(gameId) })
})

const gameCollection_InsertOneCallback = callbackify(function (newGame) {
    return etGameCollection().insertOne(newGame);
})

const gameCollection_FindLimit_ToArrayCallback = callbackify(function (count) {
    return getGameCollection().find().limit(count).toArray();
})


const getAll = function (req, res) {
    console.log("getAll controller");
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    gameCollection_Find_Skip_Limit_ToArrayCallback(offset, count, function (error, games) {
        res.status(200).json(games);
    });
}

const getOne = function (req, res) {
    console.log("getOne controller");
    const gameId = req.params.Id
    gameCollection_FindOneCallback(gameId, function (error, game) {
        res.status(200).json(game);
    })
}
const addOne = function (req, res) {
    console.log("addOne controller");
    let newGame = validate.addOneRequest(req, res);
    if (newGame) {
        gameCollection_InsertOneCallback(newGame, function (error, response) {
            res.status(200).json(response);
        })
    }
}

const getGames = function (req, res) {
    console.log("getGames controller");
    const count = validate.getGamesRequest(req);
    gameCollection_FindLimit_ToArrayCallback(count, function (error, games) {
        res.status(200).json(games);
    });
}
module.exports = {
    getAll,
    getOne,
    addOne,
    getGames
}