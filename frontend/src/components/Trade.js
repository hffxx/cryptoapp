import React, { useState, useMemo } from "react";
import { Button, Paper, Box, Grid, TextField, Typography } from "@mui/material";
import DashboardPage from "./Pages/DashboardPage";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useAuth } from "./contexts/AuthContext";
import { useCoins } from "./contexts/CoinsContext";
import { valueReducer } from "./Wallet";
import TradeModal from "./TradeModal";
import Spinner from "./Spinner";

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

const CoinItem = ({ coin }) => {
  return (
    <Grid
      item
      xs={6}
      sm={6}
      md={4}
      lg={3}
      xl={2}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Paper
        elevation={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "10px",
          width: "200px",
        }}
      >
        <Typography variant="h4">
          {coin.name.length > 8 ? coin.symbol.toUpperCase() : coin.name}
        </Typography>
        <Box
          component="img"
          src={coin.image}
          sx={{ width: "50px", marginTop: "10px" }}
        ></Box>
        <Box sx={{ margin: "10px 0px" }}>
          <Typography variant="h5">{`$${coin.current_price}`}</Typography>
          <TradeModal coin={coin}>Buy </TradeModal>
        </Box>
      </Paper>
    </Grid>
  );
};

function Trade() {
  const [coinName, setCoinName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUserId, currentUserData } = useAuth();
  const { coinsPriceList, coins } = useCoins();
  // const handleBitcoin = async (cName, cAmount) => {
  //   setLoading(true);
  //   const wallet = currentUserData.coins;
  //   const docRef = doc(db, "users", currentUserId);
  //   if (!wallet.some(({ coinName }) => coinName === cName)) {
  //     let payload = { coinName: cName, amount: cAmount };
  //     await setDoc(docRef, { ...currentUserData, coins: [...wallet, payload] });
  //   } else {
  //     let payload = wallet.map((coin) => {
  //       if (coin.coinName === cName) {
  //         return { coinName: cName, amount: coin.amount + cAmount };
  //       } else {
  //         return coin;
  //       }
  //     });
  //     await setDoc(docRef, { ...currentUserData, coins: payload });
  //   }
  //   setLoading(false);
  // };
  const memoCoinList = useMemo(
    () => coins.map((coin, index) => <CoinItem coin={coin} key={index} />),
    [coins]
  );
  return (
    <DashboardPage>
      {coins && currentUserData ? (
        <Grid container justifyContent={"center"} alignItems={"center"}>
          <Grid
            item
            xs={12}
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
              placeholder="Search coin"
              value={coinName}
              onChange={(e) => setCoinName(e.target.value)}
            ></TextField>
          </Grid>
          <Grid container item spacing={2} xs={10.5} marginTop={2}>
            {memoCoinList}
          </Grid>
        </Grid>
      ) : (
        <Spinner />
      )}
    </DashboardPage>
  );
}

export default Trade;
