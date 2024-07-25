let gamesData = require("./data/games.json")

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
    const data = gamesData.slice(offset, offset + count)

    res.status(200).json(data);
}

const getOne = function (req, res) {
    console.log("getOne controller");
    const index = req.params.index + 1
    res.status(200).json(gamesData[index]);
}

const addOne = function (req, res) {
    console.log("addOne controller");
    console.log(req.body);
}
module.exports = {
    getAll,
    getOne,
    addOne
}