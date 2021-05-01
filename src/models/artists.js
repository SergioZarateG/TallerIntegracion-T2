const Sequelize = require('sequelize');
const { sequelize } = require('../database/database');
const { Album } = require('./albums')

 const Artist = sequelize.define('artistas', {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true
    },
    name: {
        type: Sequelize.TEXT
    },
    age: {
        type: Sequelize.INTEGER
    },
    albums: {
        type: Sequelize.TEXT
    },
    tracks: {
        type: Sequelize.TEXT
    },
    self: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: false
});

Artist.hasMany(Album, {foreignKey: 'artist_id', sourceKey: 'id', onDelete: 'cascade'});
Album.belongsTo(Artist, {foreignKey: 'artist_id', sourceKey: 'id', onDelete: 'cascade'});

module.exports =  { Artist };