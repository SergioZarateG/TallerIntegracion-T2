const Sequelize = require('sequelize');
const { sequelize } = require('../database/database');

 const Track = sequelize.define('canciones', {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true
    },
    album_id: {
        type: Sequelize.TEXT
    },
    name: {
        type: Sequelize.TEXT
    },
    duration: {
        type: Sequelize.FLOAT
    },
    times_played: {
        type: Sequelize.INTEGER
    },
    artist: {
        type: Sequelize.TEXT
    },
    album: {
        type: Sequelize.TEXT
    },
    self: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: false
});

module.exports = {
    Track
}