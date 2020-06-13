const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { saveUser } = require('../controllers/user')

router.get('/login', (req, res) => {
    res.render('loginPage')
})

router.get('/signup', (req, res) => {
    res.render('registerPage')
})

router.post('/signup', async (req, res) => {
    const status = await saveUser(req, res)

    if (status) {
        res.redirect('/')
    }

    res.redirect('/')
})

module.exports = router