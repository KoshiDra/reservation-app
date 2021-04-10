const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/index');
const FakeDB = require('./fake-db');
const path = require('path');

const productRoutes = require('./routes/products');

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(
  () => {
    if(process.env.NODE_ENV !== 'production') {
      // new FakeDB().initDB();
    }
  }
);

const app = express();

app.use('/api/v1/products', productRoutes);

if(process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'dist', 'reservation-app');
  app.use(express.static(appPath));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}

const PORT = process.env.PORT || '3001';

app.listen(PORT, () => {
  console.log('I am running!');
});
