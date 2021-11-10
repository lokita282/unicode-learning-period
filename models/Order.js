import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    orderedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please add the User who is ordering'],
    },
    artworks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artwork',
        required: [true, 'Please add the artwork Id'],
      },
    ],
    paymentMode: {
      type: String,
      required: [true, 'Please enter the payment mode'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
