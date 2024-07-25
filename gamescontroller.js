const { ObjectId } = require("mongodb");
const dbConnection = require("./data/dbConnection");
const env = process.env;

const getAll = function (req, res) {
    console.log("getAll controller");
    let offset = 0;
    let count = 5;
    const db = dbConnection.get();
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    const gameCollection = db.collection(env.COLLECTION_GAMES);
    gameCollection.find().skip(offset).limit(count).toArray(function (error, games) {
        res.status(200).json(games);
    });
}

const getOne = function (req, res) {
    console.log("getOne controller");
    const db = dbConnection.get();
    const gameId = req.params.Id
    const gameCollection = db.collection(env.COLLECTION_GAMES);
    gameCollection.findOne({ _id: ObjectId(gameId) }, function (error, game) {
        res.status(200).json(game);
    })
}

const addOne = function (req, res) {
    console.log("addOne controller");
    const db = dbConnection.get();
    const gameCollection = db.collection(env.COLLECTION_GAMES);
    let newGame = {};

    if (req.body && req.body.title && req.body.price) {
        newGame = {
            "title": req.body.title,
            "price": req.body.price
        }
        gameCollection.insertOne(newGame, function(error, response){
            res.status(200).json(response);
        })
    }
    else {
        res.status(401).json("Missing parameters in request body")
    }
}
module.exports = {
    getAll,
    getOne,
    addOne
}