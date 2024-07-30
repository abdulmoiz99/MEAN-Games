const express = require("express");
const router = express.Router();
const gamesController = require("./controllers/gamescontroller");
const publisherController = require("./controllers/publishercontroller");



router.route("/games")
    .get(gamesController.getAll)
    .post(gamesController.addOne)

router.route("/games/:Id")
    .get(gamesController.getOne)
    .put(gamesController.fullUpdate)
    .patch(gamesController.partialUpdate)
    .delete(gamesController.deleteOne)


router.route("/games/:gameId/publisher")
    .post(publisherController.addOne)

module.exports = router;