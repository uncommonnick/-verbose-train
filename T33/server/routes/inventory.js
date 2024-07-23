const router = require('express').Router();
const Inventory = require('../models/inventory');

// GET all inventory items
router.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new inventory item
router.post('/', async (req, res) => {
  const inventoryItem = new Inventory({
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
  });

  try {
    const newItem = await inventoryItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update inventory item
router.put('/:id', async (req, res) => {
  try {
    const inventoryItem = await Inventory.findById(req.params.id);
    if (inventoryItem == null) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    inventoryItem.name = req.body.name;
    inventoryItem.category = req.body.category;
    inventoryItem.quantity = req.body.quantity;

    const updatedItem = await inventoryItem.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE inventory item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
    if (deletedItem == null) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.json({ message: 'Inventory item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
