const service = require("./gamesService");

const getAll = service.getAll

const getOne = service.getOne

const addOne = service.addOne

const deleteOne = service.deleteOne

module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne
}