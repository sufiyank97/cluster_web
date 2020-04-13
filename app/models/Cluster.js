const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment');
const clusterSchema = new Schema({
    clusterName: {
        type: String,
        required: true
    },
    fdn: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date
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
    status: {
        type: String,
        default: "created"
    },
    role: [
        String
    ],
    dcData: {
        type: Schema.Types.ObjectId,
        ref: 'DcDataModel',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})
autoIncrement.initialize(mongoose.connection);
// clusterSchema.plugin(autoIncrement.plugin, { ClusterModel });
const ClusterModel = mongoose.model('ClusterModel', clusterSchema)
module.exports = ClusterModel
