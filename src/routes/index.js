const { Router } = require('express');
const router = Router();

const {createArtist, getArtists, getArtistById, deleteArtists} = require('../controllers/artists.controller');
const { createAlbum, getAlbums, getAlbumById, deleteAlbums, getAlbumsOfArtist } = require('../controllers/albums.controller');
const { createTrack, getTracks, getTrackById, deleteTracks, getTracksOfAlbum, getTracksOfArtist, updateTrack, updateTracksofAlbum, updateTracksOfArtist } = require('../controllers/tracks.controller');

router.get('/artists', getArtists);
router.get('/artists/:id', getArtistById);
router.post('/artists', createArtist);
router.delete('/artists/:id', deleteArtists);

router.get('/albums', getAlbums);
router.get('/albums/:id', getAlbumById);
router.post('/artists/:artist_id/albums', createAlbum);
router.delete('/albums/:id', deleteAlbums);
router.get('/artists/:artist_id/albums', getAlbumsOfArtist);

router.get('/tracks', getTracks);
router.get('/tracks/:id', getTrackById);
router.post('/albums/:album_id/tracks', createTrack);
router.delete('/tracks/:id', deleteTracks);
router.get('/albums/:album_id/tracks', getTracksOfAlbum);
router.get('/artists/:artist_id/tracks', getTracksOfArtist);
router.put('/tracks/:track_id/play', updateTrack);
router.put('/albums/:album_id/tracks/play', updateTracksofAlbum);
router.put('/artists/:artist_id/albums/play', updateTracksOfArtist);
 
module.exports = router;