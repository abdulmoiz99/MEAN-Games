require("./data/dbConnection").open();
const express = require("express");
const path = require("path");
const routes = require("./router");


const app = express();

app.listen(3000);

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/", routes);

console.log("Server is listening on http://localhost:3000")
