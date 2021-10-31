import mongoose from 'mongoose';

const artworkSchema = new mongoose.Schema({
  image: {
    type: Buffer
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  size: {
    type: Array,
    description: 'Enter length and breadth'

  },
},{timestamps:true})

export default mongoose.model('Artwork', artworkSchema)