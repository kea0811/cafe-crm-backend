const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, match: /^UI\d+$/ },
  name: { type: String, required: true },
  email_address: { type: String, required: true },
  phone_number: { type: String, required: true, match: /^[89]\d{7}$/ },
  gender: { type: String, required: true, enum: ['Male', 'Female'] },
  cafe: { type: Schema.Types.ObjectId, ref: 'Cafe' },
  start_date: { type: Date, required: true }
}, { collection: 'employees', versionKey: false });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
