const express = require('express')
const router = express.Router()
// const User = require('../models/user')
const { saveUser, verifyUser, guestAccess, getUserStatus } = require('../controllers/user')

router.get('/login', guestAccess, getUserStatus, (req, res) => {
    res.render('loginPage', {
        isLoggedIn: req.isLoggedIn
    })
})

router.get('/signup', guestAccess, getUserStatus, (req, res) => {
    res.render('registerPage', {
        isLoggedIn: req.isLoggedIn
    })
})

router.post('/signup', async (req, res) => {
    const status = await saveUser(req, res)

    res.redirect('/')
})

router.post('/login', async (req, res) => {
    const status = await verifyUser(req, res)

    if (status) {
        res.redirect('/')
    }

    res.redirect('/')
})

module.exports = router