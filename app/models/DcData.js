const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment');
const dcDataSchema = new Schema({
    dc: {
        type: String,
        required: true
    },
    env: {
        type: String,
        required: true
    }
})

const DcDataModel = mongoose.model('DcDataModel', dcDataSchema)
module.exports = DcDataModel