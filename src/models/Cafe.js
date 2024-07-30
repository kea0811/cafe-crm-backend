const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const { v4: uuidv4 } = require('uuid');

const cafeSchema = new mongoose.Schema({
  id: { type: String, default: () => `UI${uuidv4().replace(/\-/g, '').slice(0, 7).toUpperCase()}` },
  name: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String },
  location: { type: String, required: true },
  employees: [{ type: Schema.Types.ObjectId, ref: 'Employee' }]
}, { collection: 'cafes', versionKey: false });

const Cafe = mongoose.model('Cafe', cafeSchema);

module.exports = Cafe;
