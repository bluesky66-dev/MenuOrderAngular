// jshint esversion:6
// require node packages
import mongoose from 'mongoose';

const timestamps = {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}};
const Schema = mongoose.Schema;

// Create schemas
const orderSchema = Schema({
  name: {type: String, max: 60},
  price: Number,
  itemId: {type: Schema.Types.ObjectId, ref: 'MenuItem'},
  vendorId: {type: Schema.Types.ObjectId, ref: 'Vendor'},
  vendorName: {type: String, max: 60},
  message: {type: String, max: 150},
  size: {type: String, max: 12},
  quantity: Number,
  userName: String,
  userId: {type: Schema.Types.ObjectId, ref: 'User'}
}, timestamps);

// Create model
const Order = mongoose.model('Order', orderSchema);

export default Order;
