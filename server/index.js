import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import autoRoutes from './routes/auto.js';
import propertyRoutes from './routes/property.js';
dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} failed to connect`));

const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/autos', autoRoutes);
app.use('/properties', propertyRoutes)

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, '/client/build')));
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/client/build/index.html'))
// );
