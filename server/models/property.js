import mongoose from 'mongoose';

const propertySchema = mongoose.Schema(
  {
    propertyName: { type: String, required: true },
    mainCategory: { type: String, required: true },
    propertyCategory: { type: String, required: true },
    price: { type: Number, required: true },
    furnished: { type: String, required: true },
    year: { type: Number, required: true },
    usefulSurface: { type: Number, required: true },
    rooms: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

var Property = mongoose.model('Property', propertySchema);

export default Property;
