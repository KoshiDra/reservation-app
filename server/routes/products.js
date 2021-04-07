const express = require('express');
const router = express.Router();
const Product = require('../model/product');

router.get('', (req, res) => {
  Product.find({}, (err, foundProducts) => {
    return res.json({ 'OK': foundProducts });  
  });
});

router.get('/:productId', (req, res) => {
  const productId = req.params.productId; 
  Product.findById(productId, (err, foundProduct) => {
    if(err) {
      return res.status(422).send({errors: [{title: 'Product error', detaile: 'Product not found'}]});
    }
    return res.json({ 'OK': foundProduct });  
  });
});

module.exports = router;
