// jshint esversion:6
// require node packages
const mongoose = require("mongoose");

const timestamps = {timestamps: { createdAt: "created_at", updatedAt: "updated_at" }};
const Schema = mongoose.Schema;

// Create schemas
const itemSchema = new Schema({ name: {type: String, max: 60}, price: Number, itemId: { type: Schema.Types.ObjectId, ref: "MenuItem"}, vendor: { type: Schema.Types.ObjectId, ref: "Vendor"}, vendorName: {type: String, max: 60}, message: {type: String, max: 150}, size: {type: String, max: 12}, userName: String, userId: { type: Schema.Types.ObjectId, ref: "User" }}, timestamps);

// Create model
const MenuItem = new mongoose.model("Item", itemSchema);

module.exports = MenuItem;
