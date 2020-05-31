const { v4 } = require('uuid');
const { saveCube } = require('../controllers/database');

const databaseFile = path.join(__dirname, '..', 'config/database.json');

class Cube {
    constructor(name, description, imageUrl, difficulty) {
        this.id = v4(),
            this.name = name || 'No name',
            this.description = description,
            this.imageUrl = imageUrl || 'placeholder',
            this.difficulty = Number(difficulty) || 0
    }

    // saveCube
    save() {
        const newCube = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty
        };

        saveCube(newCube);
    }
}

module.exports = Cube