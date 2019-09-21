// jshint esversion:6
// require node packages
import mongoose from 'mongoose';

const timestamps = {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}};
const Schema = mongoose.Schema;

// Create schemas
const vendorSchema = Schema({
  name: {type: String, max: 60},
  street: {type: String, max: 100},
  city: {type: String, max: 30},
  telephone: {type: String, max: 12},
  email: {type: String, max: 60}
}, timestamps);

// Create model
const Vendor = mongoose.model('Vendor', vendorSchema);

export default Vendor;
