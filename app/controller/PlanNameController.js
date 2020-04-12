const PlanName = require('../models/PlanName')


var clustercs1 = new PlanName(
    {
        name: 'network 1',

    })
var clustercs2 = new PlanName(
    {
        name: 'network 2',

    })
var clustercs3 = new PlanName(
    {
        name: 'network 3',

    })

clustercs1.save()
clustercs2.save()
clustercs3.save()
module.exports.list = (req, res) => {
    PlanName.find()
        .then(plans => res.json(plans))
        .catch(err => res.json(err))
}

module.exports.create = (req, res) => {
    const body = req.body
    const plan = new PlanName(body)
    plan.save()
        .then(plans => res.json(plans))
        .catch(err => res.json(err))
}