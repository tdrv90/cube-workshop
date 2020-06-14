const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]

const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const generateToken = data => {
    const token = jwt.sign(data, config.privateKey)

    return token
}

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

    const token = generateToken({
        userId: userObject._id,
        username: userObject.username
    })

    res.cookie('autoid', token)
    console.log(token)
    return true
}

const verifyUser = async (req, res) => {
    const {
        username,
        password
    } = req.body

    // get User by username

    const user = await User.findOne({ username })

    const status = await bcrypt.compare(password, user.password)

    if (status) {
        const token = generateToken({
            userId: user._id,
            username: user.username
        })


        res.cookie('autoid', token)
    }

    return status;
}

const authAccess = (req, res, next) => {
    const token = req.cookies['autoid']

    if (!token) {
        return res.redirect('/')
    }

    try {
        const decodedObject = jwt.verify(token, config.privateKey)
        console.log('decoded: ', decodedObject)
        next()
    } catch (error) {
        res.redirect('/')
    }
}

const guestAccess = (req, res, next) => {
    const token = req.cookies['autoid']

    if (token) {
        return res.redirect('/')
    }

    next()
}

const getUserStatus = (req, res, next) => {
    const token = req.cookies['autoid']

    if (!token) {
        req.isLoggedIn = false
    }

    try {
        jwt.verify(token, config.privateKey)
        req.isLoggedIn = true
    } catch (error) {
        req.isLoggedIn = false
    }

    next()
}

const authAccessJSON = (req, res, next) => {
    const token = req.cookies['autoid']

    if (!token) {
        return res.json({
            error: 'Not authenticated'
        })
    }

    try {
        jwt.verify(token, config.privateKey)
        next()
    } catch (error) {
        return res.json({
            error: 'Not authenticated'
        })
    }
}

module.exports = {
    saveUser,
    verifyUser,
    authAccess,
    authAccessJSON,
    guestAccess,
    getUserStatus
}