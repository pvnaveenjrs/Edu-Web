const mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  contactNumber: { type: String },
  email: { type: String },
  logo: { type: String },  // path or URL to logo image
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Institution', institutionSchema);
