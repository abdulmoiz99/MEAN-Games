const express = require("express");
const path = require("path");

const app = express();

app.listen(3000);

app.use(express.static(path.join(__dirname, "public")))

app.get("/", function (req, res) {
    res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
});

console.log("Server is listening on http://localhost:3000")
