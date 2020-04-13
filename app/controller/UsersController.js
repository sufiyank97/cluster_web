const _ = require('lodash')

const { User } = require('../models/User')

module.exports.register = function (req, res) {
    const body = req.body
    const user = new User(body)
    user.save()
        .then(function (user) {

            const { _id, username, email } = user
            res.send({
                _id, username, email
            })
        })
        .catch(function (err) {
            res.send(err)
        })
}


module.exports.login = function (req, res) {
    const body = req.body
    let user
    User.findByCredentials(body.email, body.password)
        .then(function (userFound) {
            user = userFound
            return user.generateToken()

        })
        .then(function (token) {

            user = _.pick(user, ['id', 'username', 'email'])
            res.json({
                token,
                user
            })
        })
        .catch(function (err) {
            res.send(err)
        })

}

module.exports.account = function (req, res) {
    const { user } = req
    res.send(user)

}

module.exports.logout = function (req, res) {
    console.log(req, 'fdsdfdsfdsfs')
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
        .then(function () {
            res.send({ notice: 'successfully log out' })
        })
        .catch(err => {
            res.send(err)
        })
}
