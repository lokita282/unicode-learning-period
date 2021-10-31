import express from 'express'
import auth from '../middleware/auth.js'
import isAdmin from '../middleware/isAdmin.js'
import {
  createArtwork,
  addImage,
  getArtworks,
  updateArtwork,
  deleteArtwork
} from '../controllers/artwork.js'

const router = new express.Router()

//Create new artwork
router.post('/new', auth, isAdmin, createArtwork)

//Add image of artwork
router.post('/image', auth, isAdmin,  addImage)

//Get artworks
router.get('/get', getArtworks)

//update artwork
router.put('/update/:id', auth, isAdmin, updateArtwork)

//Delete artwork
router.delete('/delete/:id', auth, isAdmin, deleteArtwork)

export default router