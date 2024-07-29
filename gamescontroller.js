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

let _response = {
    status: 200,
    message: null
};

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

const partialUpdate = function (req, res) {
    console.log("partialUpdate controller");

    _update(req, res, updatePartialGameMapping)
}

const fullUpdate = function (req, res) {
    console.log("fullUpdate controller");

    _update(req, res, updateFullGameMapping)
}

const _update = function (req, res, updateGameMappingCallback) {

    const gameId = req.params.Id

    if (!mongoose.Types.ObjectId.isValid(gameId)) {
        return res.status(400).json("Please provide valid game Id");
    }

    GameFindByIdExec_Callback(gameId, function (error, game) {

        if (error) {
            console.log(error)
            _response = {
                status: 500,
                message: error
            };
        }
        else if (!game) {
            _response = {
                status: 404,
                message: "Game not found"
            };
        }
        else {
            updateGameMappingCallback(req, game);

            gameSave_Callback(game, function (error, gameResponse) {
                if (error) {
                    console.log(error)
                    _response = {
                        status: 500,
                        message: error
                    };
                }
                else {
                    _response = {
                        status: 200,
                        message: gameResponse
                    };
                }
            })
        }
        res.status(_response.status).json(_response.message);

    })
}
const updatePartialGameMapping = function (req, game) {
    if (req.body && req.body.title) { game.title = req.body.title; }
    if (req.body && req.body.year) { game.year = req.body.year; }
    if (req.body && req.body.rate) { game.rate = req.body.rate; }
    if (req.body && req.body.price) { game.price = req.body.price; }
    if (req.body && req.body.minPlayers) { game.minPlayers = req.body.minPlayers; }
    if (req.body && req.body.maxPlayers) { game.maxPlayers = req.body.maxPlayers; }
    if (req.body && req.body.minAge) { game.minAge = req.body.minAge; }
    if (req.body && req.body.publisher) { game.publisher = {}; }
    if (req.body && req.body.reviews) { game.reviews = []; }
    if (req.body && req.body.designers) { game.designers = []; }
}

const updateFullGameMapping = function (game, req) {
    game.title = req.body.title;
    game.year = req.body.year;
    game.rate = req.body.rate;
    game.price = req.body.price;
    game.minPlayers = req.body.minPlayers;
    game.maxPlayers = req.body.maxPlayers;
    game.minAge = req.body.minAge;
    game.publisher = {};
    game.reviews = [];
    game.designers = [];
}


module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne,
    fullUpdate,
    partialUpdate,
}

