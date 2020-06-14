const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]

const express = require('express')
const router = express.Router()
const { checkAuthentication } = require('../controllers/user')
const { getAllCubes, getCube, updateCube, getCubeWithAccessories } = require('../controllers/cubes');
const Cube = require('../models/cube');
const jwt = require('jsonwebtoken')


router.get('/edit', (req, res) => {
    res.render('editCubePage')
})

router.get('/delete', (req, res) => {
    res.render('deleteCubePage')
})

router.get('/create', checkAuthentication, (req, res) => {
    res.render('create', {
        title: 'Create Cube'
    });
})

router.post('/create', (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

    const token = req.cookies['autoid']
    const decodedObject = jwt.verify(token, config.privateKey)

    const cube = new Cube({ name, description, imageUrl, difficulty: difficultyLevel, creatorId: decodedObject.userId });

    cube.save((err) => {
        if (err) console.error(err);
        res.redirect('/');
    })
})

router.get('/details/:id', checkAuthentication, async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id)

    res.render('details', {
        title: 'Cube Details',
        ...cube
    });
})

module.exports = router