const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
  mobile: {
    type: Number,
    min: 1000000000,
    max: 9999999999,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
module.exports = Vendor = mongoose.model('vendor', VendorSchema);
