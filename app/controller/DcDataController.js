const DcDataModel = require('../models/DcData')


const dcData1 = new DcDataModel({
    dc: "dc1",
    env: "development"
})
const dcData2 = new DcDataModel({
    dc: "dc2",
    env: "development"
})
const dcData3 = new DcDataModel({
    dc: "dc1",
    env: "production"
})
const dcData4 = new DcDataModel({
    dc: "dc2",
    env: "production"
})

module.exports.list = (req, res) => {
    const runn = () => {
        DcDataModel.find()
            .then(data => res.json(data))
            .catch(err => res.json(err))
    }
    DcDataModel.find()
        .then(datas => {
            if (datas.length === 0) {
                dcData1.save()
                dcData2.save()
                dcData3.save()
                dcData4.save()
                setTimeout(() => {
                    runn()
                }, 1000)
            } else {
                res.json(datas)
            }

        })
        .catch(err => res.json(err))
}

module.exports.create = (req, res) => {
    const body = req.body
    const dcData = new DcDataModel(body)
    dcData.save()
        .then(data => res.json(data))
        .catch(err => res.json(err))
}

module.exports.show = (req, res) => {
    const id = req.params.id
    DcDataModel.findOne({ _id: id })
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