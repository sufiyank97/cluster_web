const HostModel = require('../models/hostName')
var clustercs1 = new HostModel(
    {
        dc: 'dc1',
        name: 'dc1 host Name',

    })
var clustercs1 = new HostModel(
    {
        dc: 'dc2',
        name: 'dc2 host Name',

    })
clustercs1.save()
clustercs2.save()
clustercs3.save()
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