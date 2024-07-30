const Cafe = require('../models/Cafe');
const Employee = require('../models/Employee');

exports.createCafe = async (req, res) => {
  try {
    const cafe = new Cafe(req.body);
    await cafe.save();
    res.status(201).send(cafe);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getCafeById = async (req, res) => {
  try {
      const cafe = await Cafe.findById(req.params.id);
      if (!cafe) {
          return res.status(404).send({ message: 'Cafe not found' });
      }
      res.send(cafe);
  } catch (error) {
      res.status(500).send({ message: 'Error retrieving cafe', error: error.message });
  }
};

exports.listLocations = async (req, res) => {
  try {
      const locations = await Cafe.distinct("location");
      res.send(locations);
  } catch (error) {
      res.status(500).send({ message: 'Error retrieving locations', error: error.message });
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
          name: 1,  
          description: 1, 
          logo: 1,  
          location: 1,  
          id: 1, 
          employeesCount: 1  
        }
      },
      { $sort: { employeesCount: -1 } }  
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
    await Employee.deleteMany({ cafe: id });

    const result = await Cafe.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Café not found' });
    }

    res.status(200).json({ message: 'Café and associated employees deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
