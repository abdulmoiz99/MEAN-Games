const env = process.env

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
            res.status(env.STATUS_BAD_REQUEST).json(env.ERROR_MIN_PLAYERS);
        }
        else if (req.body.minAge < 7 || req.body.minAge > 99) {
            res.status(env.STATUS_BAD_REQUEST00).json(env.ERROR_MIN_AGE);
        }
        else {
            newGame = {
                title: req.body.title,
                price: req.body.price,
                minPlayers: req.body.minPlayers,
                minAge: req.body.minAge

            }
        }
    }
    else {
        res.status(env.STATUS_BAD_REQUEST).json(env.ERROR_MISSING_PARAMETERS)
    }
    return newGame;
}
module.exports = {
    getGamesRequest,
    addOneRequest
}