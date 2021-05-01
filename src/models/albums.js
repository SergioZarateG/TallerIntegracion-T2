const Sequelize = require('sequelize');
const { sequelize } = require('../database/database');
const { Track } = require('./tracks');

 const Album = sequelize.define('albunes', {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true
    },
    artist_id: {
        type: Sequelize.TEXT
    },
    name: {
        type: Sequelize.TEXT
    },
    genre: {
        type: Sequelize.TEXT
    },
    artist: {
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

Album.hasMany(Track, {foreignKey: 'album_id', sourceKey: 'id'});
Track.belongsTo(Album, {foreignKey: 'album_id', sourceKey: 'id', onDelete: 'SET NULL|CASCADE'});

module.exports = {
    Album
}