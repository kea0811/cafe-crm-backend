const Employee = require('../models/Employee');
const { differenceInCalendarDays } = require('date-fns');

exports.createEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.listEmployees = async (req, res) => {
  const { cafe } = req.query;
  try {
    let query = {};
    if (cafe) {
        query.cafe = mongoose.Types.ObjectId(cafe); // Convert to ObjectId if necessary
    }

    let employees = await Employee.find(query).populate('cafe', 'name');
    employees = employees.map(emp => {
        const daysWorked = differenceInCalendarDays(new Date(), new Date(emp.start_date));
        return {
            ...emp.toObject(),
            days_worked: daysWorked,
            cafe: emp.cafe ? emp.cafe.name : ""  // Assuming cafe field exists and is populated
        };
    });

    // Sorting by days_worked
    employees.sort((a, b) => b.days_worked - a.days_worked);

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    await employee.remove();
    res.status(200).json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
