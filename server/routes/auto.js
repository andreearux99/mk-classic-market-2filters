import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Auto from '../models/auto.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const autoName = req.query.autoName || '';
    const mainCategory = req.query.mainCategory || '';
    const autoCategory = req.query.autoCategory || '';
    const model = req.query.model || '';
    const fuel = req.query.fuel || '';
    const carosery = req.query.carosery || '';
    const steeringWheel = req.query.steeringWheel || '';
    const colour = req.query.colour || '';
    const status = req.query.status || '';
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

    const minEngine =
      req.query.minEngine && Number(req.query.minEngine) !== 0
        ? Number(req.query.minEngine)
        : 0;

    const maxEngine =
      req.query.maxEngine && Number(req.query.maxEngine) !== 0
        ? Number(req.query.maxEngine)
        : 0;

    const minHorsePower =
      req.query.minHorsePower && Number(req.query.minHorsePower) !== 0
        ? Number(req.query.minHorsePower)
        : 0;
    const maxHorsePower =
      req.query.maxHorsePower && Number(req.query.maxHorsePower) !== 0
        ? Number(req.query.maxHorsePower)
        : 0;

    const minKm =
      req.query.minKm && Number(req.query.minKm) !== 0
        ? Number(req.query.minKm)
        : 0;

    const maxKm =
      req.query.maxKm && Number(req.query.maxKm) !== 0
        ? Number(req.query.maxKm)
        : 0;

    const autoNameFilter = autoName ? { autoName: { $regex: autoName, $options: 'i' } } : {};
    const mainCategoryFilter = mainCategory ? { mainCategory } : {};
    const autoCategoryFilter = autoCategory ? { autoCategory } : {};
    const modelFilter = model ? { model } : {};
    const fuelFilter = fuel ? { fuel } : {};
    const caroseryFilter = carosery ? { carosery } : {};
    const steeringWheelFilter = steeringWheel ? { steeringWheel } : {};
    const colourFilter = colour ? { colour } : {};
    const statusFilter = status ? { status } : {};

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

    const engineFilter =
      minEngine && maxEngine
        ? { engine: { $gte: minEngine, $lte: maxEngine } }
        : minEngine
        ? { engine: { $gte: minEngine } }
        : maxEngine
        ? { engine: { $lte: maxEngine } }
        : {};

    const horsePowerFilter =
      minHorsePower && maxHorsePower
        ? { horsePower: { $gte: minHorsePower, $lte: maxHorsePower } }
        : minHorsePower
        ? { horsePower: { $gte: minHorsePower } }
        : maxHorsePower
        ? { horsePower: { $lte: maxHorsePower } }
        : {};

    const kmFilter =
      minKm && maxKm
        ? { km: { $gte: minKm, $lte: maxKm } }
        : minKm
        ? { km: { $gte: minKm } }
        : maxKm
        ? { km: { $lte: maxKm } }
        : {};

    const count = await Auto.countDocuments({
      ...autoNameFilter,
      ...mainCategoryFilter,
      ...autoCategoryFilter,
      ...modelFilter,
      ...fuelFilter,
      ...caroseryFilter,
      ...steeringWheelFilter,
      ...colourFilter,
      ...statusFilter,
      ...priceFilter,
      ...yearFilter,
      ...engineFilter,
      ...horsePowerFilter,
      ...kmFilter,
    });

    const autos = await Auto.find({
      ...autoNameFilter,
      ...mainCategoryFilter,
      ...autoCategoryFilter,
      ...modelFilter,
      ...fuelFilter,
      ...caroseryFilter,
      ...steeringWheelFilter,
      ...colourFilter,
      ...statusFilter,
      ...priceFilter,
      ...yearFilter,
      ...engineFilter,
      ...horsePowerFilter,
      ...kmFilter,
    });

    res.send({ autos, count });
  })
);

router.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const category = await Auto.find().distinct('category');
    res.send(category);
  })
);

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const auto = await Auto.findById(id);
    res.status(200).json(auto);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    autoName,
    mainCategory,
    autoCategory,
    model,
    price,
    year,
    km,
    carosery,
    fuel,
    engine,
    horsePower,
    steeringWheel,
    image,
    description,
    colour,
    status,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedAuto = {
    autoName,
    mainCategory,
    autoCategory,
    model,
    price,
    year,
    km,
    carosery,
    fuel,
    engine,
    horsePower,
    steeringWheel,
    image,
    description,
    colour,
    status,
    _id: id,
  };
  await Auto.findByIdAndUpdate(id, updatedAuto, { new: true });
  res.json(updatedAuto);
});

router.get('/complete/:id', async (req, res) => {
  const auto = await Auto.findById(req.params.id);
  auto.translated = !auto.translated;
  auto.save();
  res.json(auto);
});

router.post('/', async (req, res) => {
  const {
    autoName,
    mainCategory,
    autoCategory,
    model,
    price,
    year,
    km,
    carosery,
    fuel,
    engine,
    horsePower,
    steeringWheel,
    image,
    description,
    colour,
    status,
  } = req.body;
  const newAuto = new Auto({
    autoName,
    mainCategory,
    autoCategory,
    model,
    price,
    year,
    km,
    carosery,
    fuel,
    engine,
    horsePower,
    steeringWheel,
    image,
    description,
    colour,
    status,
  });
  try {
    await newAuto.save();
    res.status(201).json(newAuto);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No product with id: ${id}`);
  await Auto.findByIdAndRemove(id);
  res.json({ message: 'Product deleted successfully.' });
});

export default router;
