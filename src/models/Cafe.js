const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const cafeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String },
  location: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  employees: [{ type: Schema.Types.ObjectId, ref: 'Employee' }]
}, { collection: 'cafes', versionKey: false });

const Cafe = mongoose.model('Cafe', cafeSchema);

module.exports = Cafe;
