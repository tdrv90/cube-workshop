const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const privateKey = 'CUBE-WORKSHOP'

const saveUser = async (req, res) => {
    const {
        username,
        password
    } = req.body

    // hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
        username,
        password: hashedPassword
    })

    const userObject = await user.save()

    const token = jwt.sign({
        userId: userObject._id,
        username: userObject.username
    }, privateKey)


    res.cookie('autoid', token)
    console.log(token)
    return true
}

module.exports = {
    saveUser
}