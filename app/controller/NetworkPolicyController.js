const NetworkPolicy = require('../models/NetworkPolicy')
var clustercs1 = new NetworkPolicy(
    {
        name: 'network 1',

    })
var clustercs2 = new NetworkPolicy(
    {
        name: 'network 2',

    })
var clustercs3 = new NetworkPolicy(
    {
        name: 'network 3',

    })


module.exports.list = (req, res) => {
    const runn = () => {
        NetworkPolicy.find()
            .then(nwks => res.json(nwks))
            .catch(err => res.json(err))
    }
    NetworkPolicy.find()
        .then(nwks => {
            if (nwks.length === 0) {
                clustercs1.save()
                clustercs2.save()
                clustercs3.save()
                setTimeout(() => {
                    runn()
                }, 1000)
            } else {
                res.json(nwks)
            }
        })
        .catch(err => res.json(err))
}

