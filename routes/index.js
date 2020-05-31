const { getAllCubes } = require('../controllers/cubes');
const { getCube } = require('../controllers/database');
const Cube = require('../models/cube');

module.exports = (app) => {
    app.get('/', (req, res) => {
        getAllCubes((cubes) => {
            res.render('index', {
                title: 'Cube Workshop',
                cubes
            });
        })
    })

    app.get('/about', (req, res) => {
        res.render('about', {
            title: 'About Cube Workshop'
        });
    })

    app.get('/create', (req, res) => {
        res.render('create', {
            title: 'Create Cube'
        });
    })

    app.post('/create', (req, res) => {
        const {
            name,
            description,
            imageUrl,
            difficultyLevel
        } = req.body;

        const cube = new Cube(name, description, imageUrl, difficultyLevel);

        cube.save(() => {
            res.redirect('/');
        })
    })

    app.get('/details/:id', (req, res) => {

        getCube(req.params.id, (cube) => {
            res.render('details', {
                title: 'Cube Details',
                ...cube
            });
        })
    })

    app.get('*', (req, res) => {
        res.render('404', {
            title: 'Cube 404'
        });
    })
};