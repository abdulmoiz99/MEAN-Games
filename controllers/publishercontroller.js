const mongoose = require("mongoose");

const env = process.env;
const Game = mongoose.model(env.GAME_MODEL)
const callbackify = require("util").callbackify


const GameFindByIdExec_Callback = callbackify(function (gameId) {
    return Game.findById(gameId).exec();
})

const gameSave_Callback = callbackify(function (game) {
    return game.save()
})



let _response = {
    status: 200,
    message: null
};


const addOne = function (request, response) {
    console.log("publisher addOne controller");

    const gameId = request.params.gameId

    if (!mongoose.Types.ObjectId.isValid(gameId)) {
        return response.status(400).json("Please provide valid game Id");
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
        game.publisher.name = request.body.name
        game.publisher.country = request.body.country
        game.publisher.establishedYear = request.body.establishedYear


        gameSave_Callback(game, function (error, publisher) {
            if (error) {
                console.log(error);
                _response = {
                    status: 500,
                    message: error
                };
            }
            else{
                _response = {
                    status: 200,
                    message: "Publisher updated successfully."
                };
            }

        })

        response.status(_response.status).json(_response.message);

    })



}

module.exports = {
    addOne,
}