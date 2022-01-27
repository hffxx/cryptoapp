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

function SellModal({ children, coinPrice, coinImg, coinName, userCoinAmount }) {
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
    setAmount(userCoinAmount);
  };
  const handleSellCrypto = async (cName) => {
    setLoading(true);
    let numberAmount = Number(amount);
    let totalAmount = (coinPrice * numberAmount).toFixed(2);
    const docRef = doc(db, "users", currentUserId);
    const userBalance = currentUserData.balance;
    const wallet = currentUserData.coins;
    if (userCoinAmount > numberAmount) {
      let payload = wallet.map((coin) => {
        if (coin.coinName === cName) {
          return { ...coin, amount: coin.amount - numberAmount };
        } else {
          return coin;
        }
      });
      await setDoc(docRef, {
        ...currentUserData,
        balance: Math.floor(userBalance + Number(totalAmount)),
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
            <Box component="img" src={coinImg} sx={{ width: "50px" }}></Box>
            <Typography variant="h2">{coinName}</Typography>
            <Box component="img" src={coinImg} sx={{ width: "50px" }}></Box>
          </Box>
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
            <Typography noWrap variant="h6">{`Price: $${Number(
              coinPrice
            )}`}</Typography>
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
                  >
                    Max
                  </Button>
                ),
              }}
            ></TextField>
            <Typography
              color={amount > userCoinAmount && "red"}
            >{`Total price: $${(coinPrice * amount).toFixed(2)}`}</Typography>
            <Button
              color="success"
              disabled={loading || amount <= 0 || amount > userCoinAmount}
              variant="contained"
              onClick={() => handleSellCrypto(coinName)}
            >{`Sell`}</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default SellModal;
