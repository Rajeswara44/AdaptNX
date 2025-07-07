const express = require('express');
const router = express.Router();
const {
  getCart,
  addOrUpdateCartItem,
  removeCartItem,
} = require('../controllers/cartController');
const { protect, authorizeRoles } = require('../middleware/auth');

router.use(protect);
router.get('/', authorizeRoles('customer', 'admin'), getCart);
router.post('/', authorizeRoles('customer', 'admin'), addOrUpdateCartItem);
router.delete('/:productId', authorizeRoles('customer', 'admin'), removeCartItem);

module.exports = router;
