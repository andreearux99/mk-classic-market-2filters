import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Property from '../models/property.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const propertyName = req.query.propertyName || '';
    const mainCategory = req.query.mainCategory || '';
    const propertyCategory = req.query.propertyCategory || '';
    const furnished = req.query.furnished || '';
    const rooms = req.query.rooms || '';

    const minPrice =
      req.query.minPrice && Number(req.query.minPrice) !== 0
        ? Number(req.query.minPrice)
        : 0;
    const maxPrice =
      req.query.maxPrice && Number(req.query.maxPrice) !== 0
        ? Number(req.query.maxPrice)
        : 0;

    const minYear =
      req.query.minYear && Number(req.query.minYear) !== 0
        ? Number(req.query.minYear)
        : 0;
    const maxYear =
      req.query.maxYear && Number(req.query.maxYear) !== 0
        ? Number(req.query.maxYear)
        : 0;

    const minUsefulSurface =
      req.query.minUsefulSurface && Number(req.query.minUsefulSurface) !== 0
        ? Number(req.query.minUsefulSurface)
        : 0;

    const maxUsefulSurface =
      req.query.maxUsefulSurface && Number(req.query.maxUsefulSurface) !== 0
        ? Number(req.query.maxUsefulSurface)
        : 0;

    const propertyNameFilter = propertyName ? { propertyName: { $regex: propertyName, $options: 'i' } } : {};
    const mainCategoryFilter = mainCategory ? { mainCategory } : {};
    const propertyCategoryFilter = propertyCategory ? { propertyCategory } : {};
    const furnishedFilter = furnished ? { furnished } : {};   
    const roomsFilter = rooms ? { rooms } : {};   

    const priceFilter =
      minPrice && maxPrice
        ? { price: { $gte: minPrice, $lte: maxPrice } }
        : minPrice
        ? { price: { $gte: minPrice } }
        : maxPrice
        ? { price: { $lte: maxPrice } }
        : {};

    const yearFilter =
      minYear && maxYear
        ? { year: { $gte: minYear, $lte: maxYear } }
        : minYear
        ? { year: { $gte: minYear } }
        : maxYear
        ? { year: { $lte: maxYear } }
        : {};

    const usefulSurfaceFilter =
      minUsefulSurface && maxUsefulSurface
        ? { usefulSurface: { $gte: minUsefulSurface, $lte: maxUsefulSurface } }
        : minUsefulSurface
        ? { usefulSurface: { $gte: minUsefulSurface } }
        : maxUsefulSurface
        ? { usefulSurface: { $lte: maxUsefulSurface } }
        : {};

    const count = await Property.countDocuments({
      ...propertyNameFilter,
      ...mainCategoryFilter,
      ...propertyCategoryFilter,
      ...furnishedFilter,
      ...priceFilter,
      ...yearFilter,
      ...usefulSurfaceFilter,
      ...roomsFilter,
    });

    const properties = await Property.find({
      ...propertyNameFilter,
      ...mainCategoryFilter,
      ...propertyCategoryFilter,
      ...furnishedFilter,
      ...priceFilter,
      ...yearFilter,
      ...usefulSurfaceFilter,
      ...roomsFilter,
    });

    res.send({ properties, count });
  })
);

router.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const category = await Property.find().distinct('category');
    res.send(category);
  })
);

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findById(id);
    res.status(200).json(property);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    propertyName,
    mainCategory,
    propertyCategory,
    furnished,
    price,
    year,
    usefulSurface,
    rooms,
    image,
    description,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedProperty = {
    propertyName,
    mainCategory,
    propertyCategory,
    furnished,
    price,
    year,
    usefulSurface,
    rooms,
    image,
    description,
    _id: id,
  };
  await Property.findByIdAndUpdate(id, updatedProperty, { new: true });
  res.json(updatedProperty);
});

router.get('/complete/:id', async (req, res) => {
  const property = await Property.findById(req.params.id);
  property.translated = !property.translated;
  property.save();
  res.json(property);
});

router.post('/', async (req, res) => {
  const {
    propertyName,
    mainCategory,
    propertyCategory,
    furnished,
    price,
    year,
    usefulSurface,
    rooms,
    image,
    description,
  } = req.body;
  const newProperty = new Property({
    propertyName,
    mainCategory,
    propertyCategory,
    furnished,
    price,
    year,
    usefulSurface,
    rooms,
    image,
    description,
  });
  try {
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No product with id: ${id}`);
  await Property.findByIdAndRemove(id);
  res.json({ message: 'Product deleted successfully.' });
});

export default router;
