const express = require("express");
const router = express.Router();
const gamesController = require("./gamescontroller");

router.route("/games")
    .get(gamesController.getAll)
    .post(gamesController.addOne)

router.route("/games/:index")
    .get(gamesController.getOne)

module.exports = router;