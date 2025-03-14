const Cart = require('../models/cart.model');
const Menu = require('../models/Menu.model');

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    const item = await Menu.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Find or create a cart for the user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the item is already in the cart
    const cartItem = cart.items.find((i) => i.itemId.toString() === itemId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.items.push({ itemId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const viewCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.itemId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const removeFromCart = async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the item from the cart
    cart.items = cart.items.filter((i) => i.itemId.toString() !== itemId);
    await cart.save();

    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports = { addToCart, viewCart, removeFromCart };