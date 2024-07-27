const mongoose = require("mongoose");
const validate = require("./gamesValidation");

const env = process.env;
const Game = mongoose.model(env.GAME_MODEL)

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
    Game.find().skip(offset).limit(count).exec(function (error, games) {
        res.status(200).json(games);
    })
}

const getOne = function (req, res) {
    console.log("getOne controller");
    const gameId = req.params.Id
    Game.findById(gameId).exec(function (error, games) {
        res.status(200).json(games);
    })
}
const addOne = function (req, res) {
    console.log("addOne controller");
    let newGame = validate.addOneRequest(req, res);
    if (newGame) {
        Game.create(newGame, function (error, game) {
            if (error) {
                console.log(error);
                res.status(400).json(error.message);

            }
            else res.status(200).json(game);
        })
    }
}

module.exports = {
    getAll,
    getOne,
    addOne,
}