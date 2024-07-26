const getGamesRequest = function (req) {
    let count = 3;
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
        if (count > 7) count = 7
    }
    return count;
}

const addOneRequest = function (req, res) {
    let newGame = null;

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
        }
    }
    else {
        res.status(400).json("Missing parameters in request body")
    }
    return newGame;
}
module.exports = {
    getGamesRequest,
    addOneRequest
}