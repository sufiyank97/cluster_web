const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment');
const clusterSchema = new Schema({

    name: {
        type: String
    },
    fqdn: {
        type: String
    },
    status: {
        type: String
    }
})
autoIncrement.initialize(mongoose.connection);
// clusterSchema.plugin(autoIncrement.plugin, { ClusterModel });
const ClusterModel = mongoose.model('ClusterModel', clusterSchema)
module.exports = ClusterModel
