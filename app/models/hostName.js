const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hostSchema = new Schema({
    dc: {
        type: String,
        required: true
    },
    hostName: {
        type: String,
        required: true
    }
})

const HostModel = mongoose.model('HostModel', hostSchema)
module.exports = HostModel
