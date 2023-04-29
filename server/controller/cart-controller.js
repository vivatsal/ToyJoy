import express from "express";
import Cart from "../model/cartSchema.js";

const cartRouter = express.Router();

cartRouter.post("/addItem", async (req, res) => {
  const username = req.body.username;
  const id = req.body.id;
  const title = req.body.title;
  const quantity = req.body.quantity;
  const url = req.body.url;
  const price = req.body.price;

  console.log(
    "username: " + username + " quantity: " + quantity + " id: " + id
  );

  let cartItem = await Cart.findOne({ username: `${username}` });

  let present = 0;

  if (cartItem) {
    cartItem.products.map((product) => {
      if (product.id === id) {
        present = 1;
      }
    });

    if (present) {
      cartItem.products.map((product) => {
        if (product.id == id) {
          product.quantity += quantity;
        }
      });
    } else {
      cartItem.products.push({
        id: id,
        title: title,
        url: url,
        price: price,
        quantity: quantity,
      });
    }

    await Cart.updateOne(
      { username: `${username}` },
      { $set: { products: cartItem.products } }
    );

    res.end("Updated Products");
  } else {
    const newItem = new Cart({
      username: username,
      products: [
        {
          id: id,
          title: title,
          url: url,
          price: price,
          quantity: quantity,
        },
      ],
    });

    const result = await newItem.save();

    res.end("Cart created Sucessfully");
  }
});

cartRouter.post("/removeItem", async (req, res) => {
  const username = req.body.username;
  const id = req.body.id;

  const cartItem = await Cart.findOne({ username: `${username}` });

  let newProducts = [];

  cartItem.products.filter((product) => {
    if (product.id !== id) {
      newProducts.push(product);
    }
  });

  await Cart.updateOne(
    { username: `${username}` },
    { $set: { products: newProducts } }
  );
  res.end("Removed product");
});

cartRouter.get("/getItems/:username", async (req, res) => {
  const username = req.params.username;

  console.log("username for get ", username);

  const cartItems = await Cart.findOne({ username: `${username}` });
  if (cartItems) {
    console.log(cartItems);
    res.send(cartItems.products);
  } else {
    res.send("ok");
  }
});

export default cartRouter;
