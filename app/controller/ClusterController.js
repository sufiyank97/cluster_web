const ClusterModel = require('../models/Cluster')
var clustercs1 = new ClusterModel(
    {
        name: 'cs-1',
        fqdn: 'cs1.domain.com',
        status: 'created'
    })
var clustercs2 = new ClusterModel(
    {
        name: 'cs-2',
        fqdn: 'cs2.domain.com',
        status: 'updated'
    }
)
var clustercs3 = new ClusterModel(
    {
        name: 'cs-3',
        fqdn: 'cs3.domain.com',
        status: 'in-progress'
    }
)

clustercs1.save()
clustercs2.save()
clustercs3.save()

module.exports.list = (req, res) => {

    ClusterModel.find()
        .then(clusters => res.json(clusters))
        .catch(err => res.json(err))
}

// module.exports.create = (req, res) => {
//     const body = req.body
//     console.log(body)
//     const clusterData = new ClusterModel(body)
//     clusterData.save()
//         .then(cluster => res.json(cluster))
//         .catch(err => res.json(err))
// }

module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    ClusterModel.findByIdAndUpdate({ _id: id }, body, { new: true, runValidators: true })
        .then(data => res.json(data))
        .catch(err => res.json(err))
}