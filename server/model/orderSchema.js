import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      index: true,
      lowercase: true,
    },
    products: { type: Array, default: [] },
    amount: { type: String, default: 0 },
  },
  { timestamps: true }
);

const Order = new mongoose.model("Order", orderSchema);

export default Order;
