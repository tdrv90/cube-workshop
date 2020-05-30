const Cube = require('../models/cube');

const newCube = new Cube('Default', 'This is the default cube', 'https://google.com', '1');

newCube.save();