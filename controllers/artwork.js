import multer from 'multer';
import path from 'path';
import Artwork from '../models/Artwork.js';

//Create an artwork
const createArtwork = async (req, res) => {
  try{
     const artwork = new Artwork(req.body)
     await artwork.save()
     res.status(201).json({
       success: true,
       data: artwork
     })

  } catch(e) {
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
}

//Add image of the artwork
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname +'-'+ Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage
}).single('upload')

const addImage = (req, res) => {
  upload(req, res, (err)=> {
    if(err){
      res.json({
        success: false,
        error: err.message
      })
    }
    res.json({
      success: true
    })
  })
}

//Get all artworks
const getArtworks = async (req, res) => {
  try{
    const artworks = await Artwork.find({})
    res.json({
      success: true,
      data: artworks
    })
  } catch(e) {
    res.json({
      success: false,
      message: e.message
    })
  }	
}

//Update artwork details
const updateArtwork = async (req, res) => {
  try{
    const artwork = await Artwork.findByIdAndUpdate({_id: req.params.id} , req.body, {new: true})

    if(!artwork) {
      res.status(404).json({
        success: false,
        message: "Artwork not found"
      })
    }
    res.json({
      success: true,
      data: artwork
    })
  } catch(e) {
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
}

//Delete Artwork
const deleteArtwork = async (req, res) => {
  try{
    await Artwork.findByIdAndDelete(req.params.id)
    res.json({
      success: true,
      data: "Artwork deleted successfully"
    })
  } catch(e) {
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
}

export {
  createArtwork,
  addImage,
  getArtworks,
  updateArtwork,
  deleteArtwork
}

