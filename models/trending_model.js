'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let trendingSchema = new Schema({
    date: {
        type: String,
        unique: true
    },
    request_time: {
        type: String
    },
    timezone: {
        type: String
    },
    trendRepo: {
        type: Array
    }
});

const Trending = mongoose.model('Trending', trendingSchema);

module.exports = Trending;