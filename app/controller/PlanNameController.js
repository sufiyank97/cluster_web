const PlanName = require('../models/PlanName')



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