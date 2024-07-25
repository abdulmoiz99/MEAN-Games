require("dotenv").config();
require("./data/dbConnection").open();
const express = require("express");
const path = require("path");
const routes = require("./router");

const app = express();
const env = process.env;

app.listen(env.PORT);

app.use(express.static(path.join(__dirname, env.PUBLIC_DIRECTORY)))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/", routes);

console.log("Server is listening on http://localhost:" + env.PORT)
