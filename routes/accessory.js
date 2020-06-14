const express = require('express')
const router = express.Router()
const { getAccessories } = require('../controllers/accessories');
const { authAccess, getUserStatus, authAccessJSON } = require('../controllers/user')
const { getAllCubes, getCube, updateCube, getCubeWithAccessories } = require('../controllers/cubes');
const Accessory = require('../models/accessory');


router.get('/create/accessory', authAccess, getUserStatus, (req, res) => {
    res.render('createAccessory', {
        title: 'Create accessory',
        isLoggedIn: req.isLoggedIn
    })
})

router.post('/create/accessory', authAccessJSON, async (req, res) => {
    const {
        name,
        description,
        imageUrl
    } = req.body;

    const accessory = new Accessory({ name, description, imageUrl });

    await accessory.save();

    res.redirect(`/create/accessory`);
})

router.get('/attach/accessory/:id', authAccess, getUserStatus, async (req, res) => {
    const cube = await getCube(req.params.id);
    const accessories = await getAccessories();

    const cubeAccessories = cube.accessories.map(acc => acc._id.valueOf().toString())

    const notAttachedAccessories = accessories.filter(acc => {
        return !cubeAccessories.includes(acc._id.valueOf().toString());
    });


    const canAttachAccessory = cube.accessories.length !== accessories.length && accessories.length > 0

    res.render('attachAccessory', {
        title: 'Attach accessory',
        ...cube,
        accessories: notAttachedAccessories,
        canAttachAccessory,
        isLoggedIn: req.isLoggedIn
    })
})

router.post('/attach/accessory/:id', authAccessJSON, async (req, res) => {
    const {
        accessory
    } = req.body

    await updateCube(req.params.id, accessory)

    res.redirect(`/details/${req.params.id}`)
})

module.exports = router