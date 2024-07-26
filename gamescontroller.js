const { ObjectId } = require("mongodb");
const dbConnection = require("./data/dbConnection");
const env = process.env;
const callbackify = require("util").callbackify


const gameCollection_Find_Skip_Limit_ToArrayCallback = callbackify(function (offset, count) {
    const db = dbConnection.get();
    const gameCollection = db.collection(env.COLLECTION_GAMES);
    return gameCollection.find().skip(offset).limit(count).toArray();
})

const gameCollection_FindOneCallback = callbackify(function (gameId) {
    const db = dbConnection.get();
    const gameCollection = db.collection(env.COLLECTION_GAMES);
    return gameCollection.findOne({ _id: new ObjectId(gameId) })
})

const gameCollection_InsertOneCallback = callbackify(function (newGame) {
    const db = dbConnection.get();
    const gameCollection = db.collection(env.COLLECTION_GAMES);
    return gameCollection.insertOne(newGame);
})

const gameCollection_FindLimit_ToArrayCallback = callbackify(function (count) {
    const db = dbConnection.get();
    const gameCollection = db.collection(env.COLLECTION_GAMES);
    return gameCollection.find().limit(count).toArray();
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
    let newGame = {};

    if (req.body && req.body.title && req.body.price && req.body.minPlayers && req.body.minAge) {

        if (req.body.minPlayers < 1 || req.body.minPlayers > 10) {
            res.status(400).json("Minimum numbers of players must be in between 1 and 10");
        }
        else if (req.body.minAge < 7 || req.body.minAge > 99) {
            res.status(400).json("Minimum age must be in between 7 and 99");
        }
        else {
            newGame = {
                "title": req.body.title,
                "price": req.body.price,
                "minPlayers": req.body.minPlayers,
                "minAge": req.body.minAge

            }
            gameCollection_InsertOneCallback(newGame, function (error, response) {
                res.status(200).json(response);
            })
        }
    }
    else {
        res.status(400).json("Missing parameters in request body")
    }
}

const getGames = function (req, res) {
    console.log("getGames controller");
    let count = 3;
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
        if (count > 7) count = 7
    }
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