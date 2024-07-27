const service = require("./gamesService");

const getAll = service.getAll

const getOne = service.getOne

const addOne = service.addOne

module.exports = {
    getAll,
    getOne,
    addOne
}