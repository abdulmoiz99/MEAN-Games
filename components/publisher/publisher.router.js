const express = require("express");
const router = express.Router();
const publisherController = require("./publisher.controller");


router.route("/games/:gameId/publisher")
    .post(publisherController.addOne)

module.exports = router;
