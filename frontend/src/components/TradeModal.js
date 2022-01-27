import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useAuth } from "./contexts/AuthContext";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
const inputStyle = {
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
};

function decimalAdjust(type, value, exp) {
  if (typeof exp === "undefined" || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;

  if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
    return NaN;
  }

  value = value.toString().split("e");
  value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));

  value = value.toString().split("e");
  return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
}
const floor10 = (value, exp) => decimalAdjust("floor", value, exp);

function TradeModal({ children, coin }) {
  const { currentUserId, currentUserData } = useAuth();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setAmount("");
  };
  const handleMax = () => {
    setAmount(floor10(currentUserData.balance / coin.current_price, -7));
  };
  const handleBuyCrypto = async (cName, cAmount) => {
    setLoading(true);
    const wallet = currentUserData.coins;
    const docRef = doc(db, "users", currentUserId);
    const userBalance = currentUserData.balance;
    if (!wallet.some(({ coinName }) => coinName === cName)) {
      let payload = { coinName: cName, amount: cAmount };
      await setDoc(docRef, {
        ...currentUserData,
        balance: (userBalance - coin.current_price * Number(amount)).toFixed(2),
        coins: [...wallet, payload],
      });
    } else {
      let payload = wallet.map((coin) => {
        if (coin.coinName === cName) {
          return { coinName: cName, amount: coin.amount + cAmount };
        } else {
          return coin;
        }
      });
      await setDoc(docRef, {
        ...currentUserData,
        balance: (userBalance - coin.current_price * Number(amount)).toFixed(2),
        coins: payload,
      });
    }
    setAmount("");
    setLoading(false);
    setOpen(false);
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="success"
        disableRipple
        onClick={handleOpen}
      >
        {children}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Box component="img" src={coin.image} sx={{ width: "50px" }}></Box>
            <Typography variant="h2">
              {coin.name.length > 6 ? coin.symbol.toUpperCase() : coin.name}
            </Typography>
            <Box component="img" src={coin.image} sx={{ width: "50px" }}></Box>
          </Box>
          {coin.name.length > 6 && (
            <Typography variant="subtitle1" color="gray">
              {coin.name}
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Typography
              noWrap
              variant="h6"
            >{`Price: $${coin.current_price}`}</Typography>
            <TextField
              sx={inputStyle}
              placeholder="Amount"
              value={amount}
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              InputProps={{
                endAdornment: (
                  <Button
                    sx={{
                      color: "green",
                      margin: "0px",
                      padding: "0px",
                      minWidth: "0px",
                      "&:hover": {
                        background: "none",
                      },
                    }}
                    onClick={handleMax}
                    disableRipple
                    disabled={currentUserData.balance <= 0}
                  >
                    Max
                  </Button>
                ),
              }}
            ></TextField>
            <Typography
              color={
                currentUserData.balance > 0 &&
                currentUserData.balance < coin.current_price * amount &&
                "red"
              }
            >{`Total price: $${(coin.current_price * amount).toFixed(
              2
            )}`}</Typography>
            <Button
              color="success"
              disabled={
                loading ||
                amount <= 0 ||
                currentUserData.balance < coin.current_price * amount
              }
              variant="contained"
              onClick={() => handleBuyCrypto(coin.id, amount)}
            >{`Buy ${coin.symbol}`}</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default TradeModal;
