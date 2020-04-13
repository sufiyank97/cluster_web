const PlanName = require('../models/PlanName')


var clustercs1 = new PlanName(
    {
        name: 'mini',

    })
var clustercs2 = new PlanName(
    {
        name: 'small',

    })
var clustercs3 = new PlanName(
    {
        name: 'large',
    })


module.exports.list = (req, res) => {
    const runn = () => {
        PlanName.find()
            .then(plans1 => res.json(plans1))
            .catch(err => res.json(err))
    }
    PlanName.find()
        .then(plans => {
            if (plans.length === 0) {
                console.log(clustercs1)
                clustercs1.save()
                clustercs2.save()
                clustercs3.save()
                setTimeout(() => {
                    runn()
                }, 1000)
            } else {
                res.json(plans)
            }

        })
        .catch(err => res.json(err))
}