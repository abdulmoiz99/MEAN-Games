const mongoose = require("mongoose");

const publisherSchema = mongoose.Schema({
    name: {
        type: String
    },
    country: String,
    establishedYear: Number,
    location: String
})
const reviewSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    postDate: {
        type: Date,
        default: Date.Now
    }
})
const gameSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: Number,
    rate: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    price: Number,
    minPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    maxPlayer: {
        type: Number,
        min: 1,
        max: 10
    },
    minAge: Number,
    designer: [String],
    publisher: publisherSchema
})


mongoose.model(process.env.GAME_MODEL, gameSchema, "games");