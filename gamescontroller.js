const mongoose = require("mongoose");
const validate = require("./gamesValidation");

const env = process.env;
const Game = mongoose.model(env.GAME_MODEL)
const callbackify = require("util").callbackify

const GameFindSkipLimitExec_Callback = callbackify(function (offset, count) {
    return Game.find().skip(offset).limit(count).exec();
})

const GameFindByIdExec_Callback = callbackify(function (gameId) {
    return Game.findById(gameId).exec();
})
const GameDeleteOneExec_Callback = callbackify(function (gameId) {
    return Game.deleteOne({ _id: gameId }).exec()
})

const GameCreate_Callback = callbackify(function (newGame) {
    return Game.create(newGame)
})
const gameSave_Callback = callbackify(function (game) {
    return game.save()
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
    GameFindSkipLimitExec_Callback(offset, count, function (error, games) {
        res.status(200).json(games);
    })
}

const getOne = function (req, res) {
    console.log("getOne controller");
    const gameId = req.params.Id
    GameFindByIdExec_Callback(gameId, function (error, games) {
        res.status(200).json(games);
    })
}

const addOne = function (req, res) {
    console.log("addOne controller");
    let newGame = validate.addOneRequest(req, res);
    if (newGame) {
        GameCreate_Callback(newGame, function (error, game) {
            if (error) {
                console.log(error);
                res.status(400).json(error.message);

            }
            else res.status(200).json(game);
        })
    }
}

const deleteOne = function (req, res) {
    console.log("deleteOne controller");
    const gameId = req.params.Id
    GameDeleteOneExec_Callback(gameId, function (error, games) {
        if (error) {
            console.log(error);
        }
        else res.status(200).json(games);
    })
}
const fullUpdate = function (req, res) {
    console.log("fullUpdate controller");
    const gameId = req.params.Id
    GameFindByIdExec_Callback(gameId, function (error, game) {
        game.title = req.body.title;
        game.price = req.body.price;
        game.minPlayers = req.body.minPlayers;
        game.minAge = req.body.minAge;
        game.publisher = {}
        game.reviews = [];
        
        gameSave_Callback(game, function (error, gameResponse) {
            if (error) {
                console.log(error)
                res.status(500).json(error);
            }
            else res.status(200).json(gameResponse);

        })
    })

}
module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne,
    fullUpdate,
}