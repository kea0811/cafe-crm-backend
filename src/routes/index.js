const express = require('express');
const router = express.Router();

const cafeRoutes = require('./cafeRoutes');
const employeeRoutes = require('./employeeRoutes');

router.use('/cafes', cafeRoutes);
router.use('/employees', employeeRoutes);

module.exports = router;
