const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/orderController');
const { protect, authorizeRoles } = require('../middleware/auth');

router.use(protect);

router.post('/', authorizeRoles('customer', 'admin'), createOrder);
router.get('/', authorizeRoles('customer', 'admin'), getOrders);

module.exports = router;
