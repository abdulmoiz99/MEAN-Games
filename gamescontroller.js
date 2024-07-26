const service = require("./gamesService");

const getAll = service.getAll

const getOne = service.getOne

const addOne = service.addOne

const getGames = service.getGames

module.exports = {
    getAll,
    getOne,
    addOne,
    getGames
}