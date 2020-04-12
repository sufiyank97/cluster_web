const mongoose = require('mongoose')
const configureDB = () => {
    mongoose.Promise = global.Promise;
    const CONNECTION_URI =
        process.env.MONGODB_URI || "mongodb://localhost:27017/clusterweb";

    mongoose
        .connect(CONNECTION_URI, { useCreateIndex: true, useNewUrlParser: true })
        .then(() => {
            console.log("successfully connected to db");
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = configureDB;