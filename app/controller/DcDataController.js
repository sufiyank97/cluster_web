const DcDataModel = require('../models/DcData')

module.exports.list = (req, res) => {
    DcDataModel.find().populate('planName').populate('networkPolicy').populate('cluster')
        .then(datas => res.json(datas))
        .catch(err => res.json(err))
}

module.exports.create = (req, res) => {
    const body = req.body
    body.planName = String(body.planName)
    body.networkPolicy = String(body.networkPolicy)
    body.cluster = String(body.cluster)
    console.log(body)
    const dcData = new DcDataModel(body)
    dcData.save()
        .then(data => res.json(data))
        .catch(err => res.json(err))
}

module.exports.show = (req, res) => {
    const id = req.params.id
    DcDataModel.findOne({ _id: id }).populate('planName').populate('networkPolicy').populate('cluster')
        .then(data => res.json(data))
        .catch(err => res.json(err))
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    DcDataModel.findByIdAndUpdate({ _id: id }, body, { new: true, runValidators: true })
        .then(data => res.json(data))
        .catch(err => res.json(err))
}

module.exports.delete = (req, res) => {
    const id = req.params.id
    DcDataModel.findByIdAndDelete({ _id: id })
        .then(data => res.json(data))
        .catch(err => res.json(err))
}