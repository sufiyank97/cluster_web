const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const autoIncrement = require('mongoose-auto-increment');

// var CounterSchema = Schema({
//     _id: { type: String, required: true },
//     seq: { type: Number, default: 0 }
// });
// var counter = mongoose.model('counter', CounterSchema);
const planNameSchema = new Schema({

    name: {
        type: String,
        required: true
    }
})
const PlanName = mongoose.model('PlanName', planNameSchema)
module.exports = PlanName

// planNameSchema.pre('save', (next) => {
//     var doc = this
//     console.log('111')
//     counter.findByIdAndUpdate({ _id: 'entityId' }, { $inc: { seq: 1 } }, (err, counter) => {
//         if (error)
//             return next(error);
//         doc._id = counter.seq;
//         next();
//     })
// })