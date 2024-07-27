const mongoose = require("mongoose");
require("./game-model")
const env = process.env;


mongoose.connect(env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", function () {
    console.log("mongoose connected to", env.DB_URL);
})

mongoose.connection.on("disconnected", function () {
    console.log("mongoose disconnected");
})

mongoose.connection.on("error", function (error) {
    console.log("mongoose connection error", error);
})

process.on("SIGINT", function () {
    console.log("Reaching SIGINT")
    mongoose.disconnect(function () {
        process.exit();
    })
})
// process.on("SIGTERM", function () {
//     console.log("Reaching SIGTERM")
//     mongoose.disconnect(function () {
//         console.log("SIGTERM callback called");
//         process.exit();
//     })
// })
// process.once("SIGUSR2", function () {
//     console.log("Reaching SIGUSR2")
//     mongoose.connection.close(function () {
//         console.log("We are reaching here some how");
//         process.kill(process.pid, "SIGUSR2");
//     });
// });

