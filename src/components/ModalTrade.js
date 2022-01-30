import React, { useState } from "react";
import { Box, Modal, Typography, TextField, Button } from "@mui/material";
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

function ModalTrade({ modal, closeModal, coin, openSnackbar }) {
  const { currentUserId, currentUserData } = useAuth();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const handleMax = () => {
    setAmount(floor10(currentUserData.balance / coin.current_price, -7));
  };
  const handleBuyCrypto = async (cName) => {
    setLoading(true);
    let numberAmount = Number(amount);
    let totalAmount = +(coin.current_price * amount).toFixed(2);
    const wallet = currentUserData.coins;
    const docRef = doc(db, "users", currentUserId);
    const userBalance = currentUserData.balance;
    try {
      if (!wallet.some(({ name }) => name === cName)) {
        let payload = {
          name: cName,
          image: coin.image,
          id: coin.id,
          symbol: coin.symbol,
          amount: numberAmount,
        };
        await setDoc(docRef, {
          ...currentUserData,
          balance: userBalance - totalAmount,
          coins: [...wallet, payload],
        });
      } else {
        let payload = wallet.map((coin) => {
          if (coin.name === cName) {
            return { ...coin, amount: coin.amount + numberAmount };
          } else {
            return coin;
          }
        });
        await setDoc(docRef, {
          ...currentUserData,
          balance: userBalance - totalAmount,
          coins: payload,
        });
      }
      openSnackbar(
        `Bought ${coin?.name} for $${(coin.current_price * amount).toFixed(2)}`
      );
    } catch (e) {
      console.log("Error", e);
      openSnackbar(`Error, check console`, "error");
    }
    setLoading(false);
    closeModal();
  };

  return (
    <Modal
      open={modal}
      onClose={() => {
        closeModal();
        setAmount("");
      }}
    >
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
          <Typography variant="h4">
            {coin.name?.length > 6 ? coin.symbol.toUpperCase() : coin.name}
          </Typography>
          <Box component="img" src={coin.image} sx={{ width: "50px" }}></Box>
        </Box>
        {coin.name?.length > 6 && (
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
                  disabled={currentUserData?.balance <= 0}
                >
                  Max
                </Button>
              ),
            }}
          ></TextField>
          <Typography
            color={
              currentUserData?.balance > 0 &&
              currentUserData?.balance + 0.01 < coin.current_price * amount &&
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
              currentUserData.balance + 0.01 < coin.current_price * amount ||
              (coin.current_price * amount).toFixed(2) <= 0
            }
            variant="contained"
            onClick={() => handleBuyCrypto(coin.name)}
          >{`Buy ${coin.symbol}`}</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ModalTrade;
