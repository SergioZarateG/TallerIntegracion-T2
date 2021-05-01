const { restart } = require('nodemon');
const { Album } = require('../models/albums');
const { Artist } = require('../models/artists');

const getAlbums = async (req, res) => {
    try {
        const response = await Album.findAll();
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(405).end();
    } 
};

const getAlbumById = async (req, res) => {
    const { id } = req.params;
    try {
        const response =  await Album.findOne({ where: {
            id: id
        }})
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(405).end();
    }
}

const createAlbum = async (req, res) => {
    const { name, genre } = req.body;
    const { artist_id } = req.params;
    try {
        if (typeof(name) == 'string' && typeof(genre) == 'string' && name != null && genre != null) {
            const artist = await Artist.findOne({
                where: {
                    id: artist_id
                }
            })
            if (artist) {
                const id_album = name.concat(':', toString(artist_id));
                let name_token = Buffer.from(id_album).toString('base64');
                if (name_token.length > 22) {
                    name_token = name_token.substr(0,22);
                } 
                const album = await Album.findOne({
                    where: {
                        id: name_token
                    }
                });
                if (album) {
                    res.status(409).end();
                } else {
                    const artist = 'http://localhost:3000/artists/'+artist_id;
                    const tracks = 'http://localhost:3000/albums/'+name_token+'/tracks';
                    const self = 'http://localhost:3000/albums/'+name_token;
                    const response = await Album.create({
                        id: name_token,
                        artist_id: artist_id,
                        name: name,
                        genre: genre,
                        artist: artist,
                        tracks: tracks,
                        self: self
                    }, { fields: ['id', 'artist_id','name', 'genre', 'artist', 'tracks', 'self'] });
                    res.status(201).json(response);
                }
            } else {
                res.status(422).end();
            }
        } else {
            res.status(400).end();
        }
    } catch(err) {
        res.status(400).end();
    }
};

const deleteAlbums = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Album.destroy({
            where: {
                id: id
            }
        });
        if (response == 0) {
            res.status(404).end();
        } else {
            res.status(204).end();
        }
    } catch (err) {
        console.log(err);
        res.status(405).end();
    }
}

const getAlbumsOfArtist = async (req, res) => {
    try {
        const { artist_id } = req.params;
        const response = await Album.findAll({
            where: {
                artist_id: artist_id
            }
        });
        if (response.length > 0) {
            res.status(200).json(response);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        console.log(err);
        res.status(405).end();
    }
}

module.exports = {
    getAlbums, 
    createAlbum,
    getAlbumById,
    deleteAlbums,
    getAlbumsOfArtist
}