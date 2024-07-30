const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const employeeSchema = new mongoose.Schema({
  id: { type: String, default: () => uuidv4() },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: String, required: true, match: /^[89]\d{7}$/ },
  gender: { type: String, required: true, enum: ['Male', 'Female'] },
  cafe: { type: Schema.Types.ObjectId, ref: 'Cafe' },
  start_date: { type: Date, required: true }
}, { collection: 'employees', versionKey: false });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
