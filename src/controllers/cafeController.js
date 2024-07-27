const Cafe = require('../models/Cafe');

exports.createCafe = async (req, res) => {
  try {
    const cafe = new Cafe(req.body);
    await cafe.save();
    res.status(201).send(cafe);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.listCafes = async (req, res) => {
  try {
    const { location } = req.query;
    const matchStage = {};
    if (location) {
      matchStage.location = location;  // Filter cafes by location if it's specified
    }

    const cafes = await Cafe.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: "employees",  // Ensure this is the correct collection name for employees in your MongoDB
          localField: "_id",  // The field from the Cafe collection
          foreignField: "cafe",  // The corresponding field in the Employee collection
          as: "employeeDetails"
        }
      },
      {
        $addFields: {
          employeesCount: { $size: "$employeeDetails" }
        }
      },
      {
        $project: {
          name: 1,  // Include cafe name
          description: 1,  // Include cafe description
          logo: 1,  // Include cafe logo if necessary
          location: 1,  // Include cafe location
          id: 1,  // Include cafe id
          employeesCount: 1  // Include the counted employees
        }
      },
      { $sort: { employeesCount: -1 } }  // Sort cafes by the count of employees, descending
    ]);

    res.status(200).json(cafes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCafe = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCafe = await Cafe.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCafe) {
      return res.status(404).json({ message: 'Café not found' });
    }
    res.status(200).json(updatedCafe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCafe = async (req, res) => {
  const { id } = req.params;
  try {
    const cafe = await Cafe.findById(id);
    if (!cafe) {
      return res.status(404).json({ message: 'Café not found' });
    }
    await Employee.deleteMany({ cafe: cafe._id });
    await cafe.remove();
    res.status(200).json({ message: 'Café and associated employees deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};