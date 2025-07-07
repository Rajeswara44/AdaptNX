const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Create an order from the user's cart
// @route   POST /api/orders
// @access  Customer
exports.createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      priceAtPurchase: item.product.price,
    }));

    const totalAmount = orderItems.reduce((acc, item) => acc + item.priceAtPurchase * item.quantity, 0);

    const order = new Order({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      status: 'pending',
    });

    await order.save();

    // Clear the cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get orders for the logged-in user
// @route   GET /api/orders
// @access  Customer/Admin
exports.getOrders = async (req, res) => {
  try {
    let orders;
    if (req.user.role === 'admin') {
      orders = await Order.find().populate('user', 'username').populate('items.product');
    } else {
      orders = await Order.find({ user: req.user._id }).populate('items.product');
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
