const express = require('express');
const router = express.Router();
const cafeController = require('../controllers/cafeController');

// POST request to create a new café
router.post('/', cafeController.createCafe);

// GET request to fetch unique café locations
router.get('/locations', cafeController.listLocations);

// GET request to fetch all cafés
router.get('/', cafeController.listCafes);

// GET request to fetch a specific café by ID
router.get('/:id', cafeController.getCafeById);

// PUT request to update a café by ID
router.put('/:id', cafeController.updateCafe);

// DELETE request to delete a café by ID
router.delete('/:id', cafeController.deleteCafe);



module.exports = router;
