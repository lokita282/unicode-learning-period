import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../../models/User.js';
import Artwork from '../../models/Artwork.js';
import Orders from '../../models/Order.js';
import dotenv from 'dotenv';
dotenv.config();

const userOneID = new mongoose.Types.ObjectId();
const artworkID = new mongoose.Types.ObjectId();
const orderID = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneID,
  name: 'Anish M Jaiswal',
  email: 'anishjaiswal0000@gmail.com',
  password: 'Login677',
  contact: 9999999999,
  role: 'admin',
  token: jwt.sign({ _id: userOneID.toString() }, process.env.TOKEN_SECRET),
};

const artOne = {
  price: '5000',
  description: 'great',
  _id: artworkID,
};
const orderOne = {
  _id: orderID,
  orderedBy: userOne._id,
  artworks: [artOne._id],
  paymentMode: 'Card',
};

const databaseReq = async () => {
  await User.deleteMany();
  await Artwork.deleteMany();
  await Orders.deleteMany();
  await new User(userOne).save();
  await new Artwork(artOne).save();
  await new Orders(orderOne).save();
};

export { userOne, artOne, orderOne, databaseReq };
