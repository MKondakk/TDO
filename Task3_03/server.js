const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 8080;
const dbUrl = process.env.DB_URI;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const itemSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
});

const Item = mongoose.model('Item', itemSchema, 'example');

app.get('/', async (req, res) => {
  try {
    const items = await Item.find(); 
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
