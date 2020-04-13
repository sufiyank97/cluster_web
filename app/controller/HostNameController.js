const HostModel = require('../models/hostName')
var clustercs1 = new HostModel(
    {
        dc: 'dc1',
        hostName: 'dc1 host Name',

    })
var clustercs2 = new HostModel(
    {
        dc: 'dc2',
        hostName: 'dc2 host Name',

    })


module.exports.list = (req, res) => {
    const runn = () => {
        HostModel.find()
            .then(data => res.json(data))
            .catch(err => res.json(err))
    }
    HostModel.find()
        .then(clusters => {
            if (clusters.length === 0) {
                clustercs1.save()
                clustercs2.save()
                setTimeout(() => {
                    runn()
                }, 1000)
            } else {
                res.json(clusters)
            }
        })
        .catch(err => res.json(err))
}

// module.exports.create = (req, res) => {
//     const body = req.body
//     console.log(body)
//     const clusterData = new HostModel(body)
//     clusterData.save()
//         .then(cluster => res.json(cluster))
//         .catch(err => res.json(err))
// }

// upsert: true, used in put method if item doesnt exist
module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    HostModel.findByIdAndUpdate({ _id: id }, body, { new: true, runValidators: true })
        .then(data => res.json(data))
        .catch(err => res.json(err))
}