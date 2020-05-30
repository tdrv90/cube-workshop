const { v4 } = require('uuid');
const fs = require('fs');
const path = require('path');

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
        }

        fs.readFile(databaseFile, (err, dbData) => {
            if (err) throw err;

            const cubes = JSON.parse(dbData);
            console.log(cubes);
            
            cubes.push(newCube)

            // fs.writeFile('./config/database.json', JSON.stringify(cubes), (err) => {
            fs.writeFile(databaseFile, JSON.stringify(cubes), (err) => {
                if (err) throw err;

                console.log('New cube is successfully stored.');
            })
        })

    }
}

module.exports = Cube