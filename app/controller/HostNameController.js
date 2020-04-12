const HostModel = require('../models/hostName')


module.exports.list = (req, res) => {
    HostModel.find()
        .then(clusters => res.json(clusters))
        .catch(err => res.json(err))
}

module.exports.create = (req, res) => {
    const body = req.body
    console.log(body)
    const clusterData = new HostModel(body)
    clusterData.save()
        .then(cluster => res.json(cluster))
        .catch(err => res.json(err))
}


module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    HostModel.findByIdAndUpdate({ _id: id }, body, { new: true, runValidators: true })
        .then(data => res.json(data))
        .catch(err => res.json(err))
}