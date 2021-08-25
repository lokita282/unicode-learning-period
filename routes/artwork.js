const express = require('express')
const router = new express.Router()
const {
  createArtwork,
  getArtworks,
  updateArtwork,
  deleteArtwork
} = require('../controllers/artwork')

//Create new artwork
router.post('/new', createArtwork)

//Get artworks
router.get('/get', getArtworks)

//update artwork
router.put('/update/:id', updateArtwork)

//Delete artwork
router.delete('/delete/:id', deleteArtwork)

module.exports = router