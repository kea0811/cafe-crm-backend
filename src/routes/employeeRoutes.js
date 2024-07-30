const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// POST request to create a new employee
router.post('/', employeeController.createEmployee);

// GET request to list all employees
router.get('/', employeeController.listEmployees);

// GET request to fetch a specific employee by ID
router.get('/:id', employeeController.getEmployeeById);

// PUT request to update an employee by ID
router.put('/:id', employeeController.updateEmployeeById);

// DELETE request to remove an employee by ID
router.delete('/:id', employeeController.deleteEmployeeById);

module.exports = router;
