const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hostSchema = new Schema({
    hostName: {
        type: String
    },
    dc: {
        type: String
    }
})

const HostModel = mongoose.model('HostModel', hostSchema)
module.exports = HostModel
