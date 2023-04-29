import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    products: { type: Array, default: [] },
  },
  { timestamps: true }
);

const Cart = new mongoose.model("Cart", cartSchema);

export default Cart;
