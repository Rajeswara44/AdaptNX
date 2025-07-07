const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, authorizeRoles } = require('../middleware/auth');

router.route('/')
  .get(getProducts)
  .post(protect, authorizeRoles('admin'), createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, authorizeRoles('admin'), updateProduct)
  .delete(protect, authorizeRoles('admin'), deleteProduct);

module.exports = router;
