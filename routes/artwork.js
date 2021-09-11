const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
const {
  createArtwork,
  getArtworks,
  updateArtwork,
  deleteArtwork
} = require('../controllers/artwork')

//Create new artwork
router.post('/new', auth, isAdmin, createArtwork)

//Get artworks
router.get('/get', getArtworks)

//update artwork
router.put('/update/:id', auth, isAdmin, updateArtwork)

//Delete artwork
router.delete('/delete/:id', auth, isAdmin, deleteArtwork)

module.exports = router