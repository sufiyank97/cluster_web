const NetworkPolicy = require('../models/NetworkPolicy')
var clustercs1 = new NetworkPolicy(
    {
        name: 'small',

    })
var clustercs1 = new NetworkPolicy(
    {
        name: 'large',

    })
var clustercs1 = new NetworkPolicy(
    {
        name: 'large1',

    })

clustercs1.save()
clustercs2.save()
clustercs3.save()
module.exports.list = (req, res) => {
    NetworkPolicy.find()
        .then(nwks => res.json(nwks))
        .catch(err => res.json(err))
}

module.exports.create = (req, res) => {
    const body = req.body
    const nwk = new NetworkPolicy(body)
    nwk.save()
        .then(nwks => res.json(nwks))
        .catch(err => res.json(err))
}