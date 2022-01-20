import React from "react";
import DashboardPage from "./Pages/DashboardPage";
import { useAuth } from "./contexts/AuthContext";
import { useCoins } from "./contexts/CoinsContext";
import Spinner from "./Spinner";
import { Box, Paper, Grid, Typography, Button } from "@mui/material";

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

const CoinItem = ({ coin, price, img }) => {
  const { coinName, amount } = coin;
  console.log(img);
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
          width: "200px",
          height: "200px",
          padding: "10px",
        }}
      >
        <Typography variant="h4">{capitalize(coinName)}</Typography>
        <Box component="img" src={img} sx={{ width: "50px" }}></Box>
        <Typography>{`Amount: ${amount}`}</Typography>
        <Typography>{`Price: $${price}`}</Typography>
        <Button variant="contained">Sell</Button>
      </Paper>
    </Grid>
  );
};

function Wallet() {
  const { currentUserData } = useAuth();
  const { coinsPriceList } = useCoins();
  const { coins } = useCoins();
  const userCoins = currentUserData?.coins || [];
  const totalCoinValue = (coinName) => {
    if (coinsPriceList) {
      let { coinPrice } =
        coinsPriceList.find((el) => el.coinName === coinName) || 0;
      let { amount } = userCoins.find((el) => el.coinName === coinName) || 0;
      return (coinPrice * amount).toFixed(2);
    }
  };

  const getImage = (coinName) => {
    let img = coins.find((el) => el.id === coinName);
    return img.image;
  };
  return (
    <DashboardPage>
      {!currentUserData && userCoins ? (
        <Spinner />
      ) : (
        <Grid container justifyContent={"center"} alignItems={"center"}>
          <Grid
            item
            xs={12}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography variant="h3">{`Wallet of player: ${currentUserData.nick}`}</Typography>
          </Grid>
          <Grid container item spacing={2} xs={12} marginTop={2}>
            {userCoins.map((coin) => (
              <CoinItem
                coin={coin}
                key={coin.coinName}
                price={totalCoinValue(coin.coinName)}
                img={getImage(coin.coinName)}
              />
            ))}
          </Grid>
        </Grid>
      )}
    </DashboardPage>
  );
}

export default Wallet;

//  <div>{`Your current balance is: ${currentUserData?.balance}$`}</div>
//<div>Coins:</div>
//{coins.map((coin, index) => {
//return (
//<div key={index}>{`Coin name: ${coin.coinName} --- amount: ${
//coin.amount
//} value is:${totalCoinValue(coin.coinName)}`}</div>
//);
//})}
