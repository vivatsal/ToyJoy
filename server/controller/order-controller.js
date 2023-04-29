import express from "express";
import Order from "../model/orderSchema.js";
import Cart from "../model/cartSchema.js";

const orderRouter = express.Router();

orderRouter.post("/create", async (req, res) => {
  console.log("Ok");
  const username = req.body.username;
  const products = req.body.products;
  let price = 0;

  products.map((product) => {
    price += product.price.cost * product.quantity;
    console.log(product.price.cost, " ", product.quantity);
  });

  const newOrder = new Order({
    username: username,
    products: products,
    amount: price,
  });
  await newOrder.save();

  await Cart.updateOne({ username: `${username}` }, { $set: { products: [] } });

  res.end("Successfully Created Order");
});

export default orderRouter;
