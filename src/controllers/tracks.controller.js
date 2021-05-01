const { restart } = require('nodemon');
const { Album } = require('../models/albums');
const { Artist } = require('../models/artists');
const { Track } = require('../models/tracks');

const getTracks = async (req, res) => {
    try {
        const response = await Track.findAll();
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(405).end();
    } 
};

const getTrackById = async (req, res) => {
    const { id } = req.params;
    try {
        const response =  await Track.findOne({ where: {
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

const createTrack = async (req, res) => {
    const { name, duration } = req.body;
    const { album_id } = req.params;
    try {
        if (typeof(name) == 'string' && typeof(duration) == 'number' && name != null && duration != null) {
            var albun = await Album.findOne({
                where: {
                    id: album_id
                }
            });
            if (albun) {
                const id_track = name.concat(':', toString(album_id));
                let name_token = Buffer.from(id_track).toString('base64');
                if (name_token.length > 22) {
                    name_token = name_token.substr(0,22);
                } 
                const track = await Track.findOne({
                    where: {
                        id: name_token
                    }
                });
                if (track) {
                    res.status(409).end();
                } else {
                    console.log(albun);
                    const artist = 'http://localhost:3000/artists/'+albun.dataValues.artist_id;
                    const album = 'http://localhost:3000/albums/'+album_id;
                    const self = 'http://localhost:3000/tracks/'+name_token;
                    const response = await Track.create({
                        id: name_token,
                        album_id: album_id,
                        name: name,
                        duration: duration,
                        times_played: 0,
                        artist: artist,
                        album: album,
                        self: self
                    }, { fields: ['id', 'album_id','name', 'duration', 'times_played', 'artist', 'album', 'self'] });
                    res.status(201).json(response);
                }
            } else {
                res.status(422).end();
            }
        } else {
            res.status(400).end();
        }
    } catch(err) {
        console.log(err);
        res.status(400).end();
    }
};

const deleteTracks = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Track.destroy({
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
        res.status(405).end();
    }
}

const getTracksOfAlbum = async (req, res) => {
    try {
        const { album_id } = req.params;
        const response = await Track.findAll({
            where: {
                album_id: album_id
            }
        });
        if (response.length > 0) {
            res.status(200).json(response);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(405).end();
    }
}

const updateTrack = async (req, res) => {
    const { track_id } = req.params;
    try {
        const track = await Track.findOne({
            attributes: ['times_played'],
            where: {
                id: track_id
            }
        });
        if (track) {
            const updatetrack = await Track.update({
                times_played: track.dataValues.times_played + 1
            }, {
                where: {id: track_id}
            });
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(405).end();
    }
}

async function updateForTrack(tracks) {
    await tracks.forEach(async track => {
        const response = await Track.update({
            times_played: track.dataValues.times_played + 1
        }, {
            where: {id: track.dataValues.id}
        });
    });
};

const updateTracksOfArtist = async (req, res) => {
    const { artist_id } = req.params;
    try {
        const my_albums = await Album.findAll({
            where: {
                artist_id: artist_id
            }
        });
        console.log(my_albums);
        if (my_albums){
            const len_albums = my_albums.length;
            let t = 1;
            my_albums.forEach( async albun => {
                const cancion = await Track.findAll({
                    where: {
                        album_id: albun.dataValues.id
                    }
                });
                await updateForTrack(cancion);
                t += 1;
                if (t = len_albums){
                    res.status(200).end();
                }
            });
        } else {
            res.status(404).end();
        }
    } catch (err) 
    {
        res.status(405).end()
    }
}

const updateTracksofAlbum = async (req, res) => {
    const { album_id } = req.params;
    try {
        const my_album = await Track.findAll({
            where: {
                album_id: album_id
            }
        });
        if (my_album.length > 0){
            updateForTrack(my_album).then(() => {
                res.status(200).end();
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(405).end()
    }
}

const getTracksOfArtist = async (req, res) => {
    const { artist_id } = req.params;
    try {
        const my_albums = await Album.findAll({
            where: {
                artist_id: artist_id
            }
        });
        if (my_albums.length > 0) {
            let list_final = [];
            const len_albums = my_albums.length;
            if (len_albums > 1) {
                let t = 1;
                await my_albums.forEach( async elem => {
                    let my_album = elem.dataValues.id;
                    const response = await Track.findAll({
                        where : {
                            album_id: my_album
                        }
                    });
                    response.forEach(elem => {
                        list_final.push(elem.dataValues);
                    });
                    t += 1
                    if (t == len_albums) {
                        res.status(200).json(list_final);
                    }
                });
            } else {
                let my_album = my_albums[0].dataValues.id;
                const response = await Track.findAll({
                    where: {
                        album_id: my_album
                    }
                });
                res.status(200).json(response);
            }
        } else {
            res.status(404).end();
        }
    } catch (err) {
        console.log(err);
        res.status(405).end();
    }
}

module.exports = {
    getTracks,
    getTrackById,
    createTrack,
    deleteTracks,
    getTracksOfAlbum,
    getTracksOfArtist,
    updateTrack,
    updateTracksofAlbum,
    updateTracksOfArtist
}