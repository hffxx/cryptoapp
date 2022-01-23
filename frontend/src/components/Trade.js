import React, { useState } from "react";
import { Button, Input, Box, Grid, TextField, Typography } from "@mui/material";
import DashboardPage from "./Pages/DashboardPage";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useAuth } from "./contexts/AuthContext";
import { useCoins } from "./contexts/CoinsContext";
import { valueReducer } from "./Wallet";
import TradeModal from "./TradeModal";

function Trade() {
  const [coinName, setCoinName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUserId, currentUserData } = useAuth();
  const { coinsPriceList } = useCoins();
  const handleBitcoin = async (cName, cAmount) => {
    setLoading(true);
    const wallet = currentUserData.coins;
    const docRef = doc(db, "users", currentUserId);
    if (!wallet.some(({ coinName }) => coinName === cName)) {
      let payload = { coinName: cName, amount: cAmount };
      await setDoc(docRef, { ...currentUserData, coins: [...wallet, payload] });
    } else {
      let payload = wallet.map((coin) => {
        if (coin.coinName === cName) {
          return { coinName: cName, amount: coin.amount + cAmount };
        } else {
          return coin;
        }
      });
      await setDoc(docRef, { ...currentUserData, coins: payload });
    }
    setLoading(false);
  };
  return (
    <DashboardPage>
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid
          item
          xs={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Typography variant="h3">Trade 🤑</Typography>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Typography variant="h5">Money amount:</Typography>
            <Typography variant="h5" sx={{ color: "green" }}>
              {`$${valueReducer(currentUserData?.balance)}`}
            </Typography>
          </Box>
          <TextField
            placeholder="Coin name"
            value={coinName}
            onChange={(e) => setCoinName(e.target.value)}
          ></TextField>
          <TextField
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></TextField>
          <Button
            variant="contained"
            onClick={() =>
              handleBitcoin(coinName.toLowerCase(), Number(amount))
            }
            disabled={loading}
          >
            Buy Crypto
          </Button>
          <TradeModal></TradeModal>
        </Grid>
      </Grid>
    </DashboardPage>
  );
}

export default Trade;
