import { useEffect, useContext, useState } from "react";

import { Box, Typography, Button, Grid, styled } from "@mui/material";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";

import { DataContext } from "../../context/ContextProvider";

import TotalView from "./TotalView";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import axios from "axios";

const Component = styled(Grid)(({ theme }) => ({
  padding: "30px 135px",
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    padding: "15px 0",
  },
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
  paddingRight: 15,
  [theme.breakpoints.down("sm")]: {
    marginBottom: 15,
  },
}));

const Header = styled(Box)`
  padding: 15px 24px;
  background: #fff;
`;

const BottomWrapper = styled(Box)`
  padding: 16px 22px;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
  display: flex;
  margin-left: auto;
  background: #fb641b;
  color: #fff;
  border-radius: 2px;
  width: 250px;
  height: 51px;
`;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const { account, setAccount } = useContext(DataContext);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/cart/getItems/${account}`)
      .then((response) => {
        setCartItems(response.data);
      });
  }, []);

  const createOrder = async () => {
    axios
      .post(`http://localhost:8000/order/create`, {
        username: account,
        products: cartItems,
      })
      .then((response) => {
        setCartItems([]);
      });
  };

  return (
    <>
      {console.log("Logging cart items ", cartItems)}
      {cartItems.length ? (
        <Component container>
          <LeftComponent item lg={9} md={9} sm={12} xs={12}>
            <Header>
              <Typography style={{ fontWeight: 600, fontSize: 18 }}>
                MyCart ({cartItems.length})
              </Typography>
            </Header>
            {cartItems.map((item) => {
              return <CartItem item={item} />;
            })}
            <BottomWrapper>
              <StyledButton variant="contained" onClick={() => createOrder()}>
                Place Order
              </StyledButton>
            </BottomWrapper>
          </LeftComponent>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TotalView cartItems={cartItems} />
          </Grid>
        </Component>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default Cart;
