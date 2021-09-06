const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const {
  createArtwork,
  getArtworks,
  updateArtwork,
  deleteArtwork
} = require('../controllers/artwork')

//Create new artwork
router.post('/new', auth, createArtwork)

//Get artworks
router.get('/get', auth, getArtworks)

//update artwork
router.put('/update/:id', auth, updateArtwork)

//Delete artwork
router.delete('/delete/:id', auth, deleteArtwork)

module.exports = router