// jshint esversion:6
// require node packages
const mongoose = require("mongoose");

const timestamps = {timestamps: { createdAt: "created_at", updatedAt: "updated_at" }};
const Schema = mongoose.Schema;

// Create schemas
const cartSchema = new Schema({ name: {type: String, max: 60}, price: Number, itemId: { type: Schema.Types.ObjectId, ref: "MenuItem"}, vendorId: { type: Schema.Types.ObjectId, ref: "Vendor"}, vendorName: {type: String, max: 60}, message: {type: String, max: 150}, size: {type: String, max: 12}, userName: String, userId: { type: Schema.Types.ObjectId, ref: "User" } }, timestamps);

const Cart = new mongoose.model("Cart", cartSchema);

module.exports = Cart;
