import { Box, Button, styled } from "@mui/material";
import { useContext, useState } from "react";
import { ShoppingCart as Cart, FlashOn as Flash } from "@mui/icons-material";
import axios from "axios";

import { DataContext } from "../../context/ContextProvider";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const LeftContainer = styled(Box)(({ theme }) => ({
  minWidth: "40%",
  padding: "40px 0 0 80px",
  [theme.breakpoints.down("lg")]: {
    padding: 0,
  },
}));

const Image = styled("img")({
  padding: "15px 20px",
  border: "1px solid #f2f2f2",
  boxShadow: "5px 2px 15px 5px #888888",
  width: "90%",
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: "10px",
  width: "48%",
  height: "50px",
  borderRadius: "2px",
  [theme.breakpoints.down("lg")]: {
    width: "44%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "48%",
  },
}));

export const ActionItem = ({ product }) => {
  const { account, setAccount } = useContext(DataContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const { id } = product;

  const addItemToCart = async () => {
    if (account) {
      await axios.post(`http://localhost:8000/cart/addItem`, {
        username: account,
        id: product.id,
        title: {
          shortTitle: product.title.shortTitle,
          longTitle: product.title.longTitle,
        },
        url: product.url,
        price: {
          cost: product.price.cost,
          mrp: product.price.mrp,
          discount: product.price.discount,
        },
        quantity: quantity,
      });
    }
  };

  return (
    <LeftContainer>
      <Image src={product.url} />
      <StyledButton
        variant="contained"
        style={{ marginRight: "15px", backgroundColor: "#b87333" }}
        onClick={() => addItemToCart()}
      >
        <Cart /> Add to Cart{" "}
      </StyledButton>
      <StyledButton variant="contained" style={{ backgroundColor: "#ad343e" }}>
        <Flash /> Buy Now{" "}
      </StyledButton>
    </LeftContainer>
  );
};
