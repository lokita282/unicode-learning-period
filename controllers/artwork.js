const Artwork = require('../models/Artwork')

//Create an artwork
exports.createArtwork = async (req, res) => {
  try{
     const artwork = new Artwork({
       ...req.body
     })
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

//Get all artworks
exports.getArtworks = async (req, res) => {
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
exports.updateArtwork = async (req, res) => {
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
exports.deleteArtwork = async (req, res) => {
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

