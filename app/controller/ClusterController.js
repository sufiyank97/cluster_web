const ClusterModel = require('../models/Cluster')

module.exports.list = (req, res) => {
    ClusterModel.find().populate('planName').populate('networkPolicy').populate('dcData')
        .then(clusters => res.json(clusters))
        .catch(err => res.json(err))
}

module.exports.create = (req, res) => {
    const body = req.body
    console.log(body)
    const clusterData = new ClusterModel(body)
    clusterData.save()
        .then(cluster => res.json(cluster))
        .catch(err => res.json(err))
}


module.exports.show = (req, res) => {
    const id = req.params.id
    ClusterModel.findOne({ _id: id }).populate('planName').populate('networkPolicy').populate('dcData')
        .then(data => res.json(data))
        .catch(err => res.json(err))
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    ClusterModel.findByIdAndUpdate({ _id: id }, body, { new: true, runValidators: true })
        .then(data => res.json(data))
        .catch(err => res.json(err))
}

module.exports.delete = (req, res) => {
    const id = req.params.id
    ClusterModel.findByIdAndDelete({ _id: id })
        .then(data => res.json(data))
        .catch(err => res.json(err))
}