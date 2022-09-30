import mongoose from 'mongoose';

const autoSchema = mongoose.Schema(
  {
    autoName: { type: String, required: true },
    mainCategory: { type: String, required: true },
    autoCategory: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    year: { type: Number, required: true },
    km: { type: Number, required: true },
    carosery: { type: String, required: true },
    fuel: { type: String, required: true },
    engine: { type: Number, required: true },
    horsePower: { type: Number, required: true },
    steeringWheel: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    colour: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

var Auto = mongoose.model('Auto', autoSchema);

export default Auto;
