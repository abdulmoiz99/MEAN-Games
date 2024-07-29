const express = require("express");
const router = express.Router();
const gamesController = require("./gamescontroller");

router.route("/games")
    .get(gamesController.getAll)
    .post(gamesController.addOne)

router.route("/games/:Id")
    .get(gamesController.getOne)
    .put(gamesController.fullUpdate)
    .patch(gamesController.partialUpdate)
    .delete(gamesController.deleteOne)

module.exports = router;