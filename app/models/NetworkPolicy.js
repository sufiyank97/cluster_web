const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment');
const networkSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

const NetworkPolicy = mongoose.model('NetworkPolicy', networkSchema)

module.exports = NetworkPolicy