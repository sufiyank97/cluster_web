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
    },
    clusterName: {
        type: String,
        required: true
    },
    planName: {
        type: Schema.Types.ObjectId,
        ref: 'PlanName',
        required: true
    },
    networkPolicy: {
        type: Schema.Types.ObjectId,
        ref: 'NetworkPolicy',
        required: true
    },
    role: [
        String
    ],
    cluster: {
        type: Schema.Types.ObjectId,
        ref: 'ClusterModel'
    },
    createdAt: {
        type: Date,
        default: Date
    },
})

const DcDataModel = mongoose.model('DcDataModel', dcDataSchema)
module.exports = DcDataModel