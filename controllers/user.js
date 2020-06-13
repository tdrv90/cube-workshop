const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')

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

    await user.save()

    return true
}

module.exports = {
    saveUser
}