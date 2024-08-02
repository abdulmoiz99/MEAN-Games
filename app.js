require("dotenv").config();
require("./data/db")
const express = require("express");
const path = require("path");
const routes = require("./router");

const app = express();
const env = process.env;

app.listen(env.PORT);

app.use(express.static(path.join(__dirname, env.PUBLIC_DIRECTORY)))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/", function(req, res, next){
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
    next();
});

app.use("/", routes);

console.log("Server is listening on http://localhost:" + env.PORT)

