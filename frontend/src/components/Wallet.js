import React from "react";
import DashboardPage from "./Pages/DashboardPage";
import { useAuth } from "./contexts/AuthContext";
import { useCoins } from "./contexts/CoinsContext";
import Spinner from "./Spinner";
import { Box, Paper, Grid, Typography, Button, Divider } from "@mui/material";

export const valueReducer = (value) => {
  if (value / 1000000000 >= 1) {
    return `${(value / 1000000000).toFixed(2).replace(/(\.0+|0+)$/, "")}B`;
  } else if (value / 1000000 >= 1) {
    return `${(value / 1000000).toFixed(2).replace(/(\.0+|0+)$/, "")}M`;
  } else if (value / 1000 >= 1) {
    return `${(value / 1000).toFixed(2).replace(/(\.0+|0+)$/, "")}K`;
  } else {
    return value;
  }
};
const CoinItem = ({ coin, price, img, name }) => {
  const { amount } = coin;
  let value = (price * amount).toFixed(2);
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
          gap: "10px",
        }}
      >
        <Typography variant="h4">{name}</Typography>
        <Box
          component="img"
          src={img}
          sx={{ width: "50px", marginTop: "10px" }}
        ></Box>
        <Box sx={{ margin: "10px 0px" }}>
          <Typography color="darkred">{`Amount: ${valueReducer(
            amount
          )}`}</Typography>
          <Typography color="darkblue">{`Price: $${valueReducer(
            price
          )}`}</Typography>
          <Typography color="green">{`Value: $${valueReducer(
            value
          )}`}</Typography>
        </Box>
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
  const findCoinValue = (coinName) => {
    if (coinsPriceList) {
      let { coinPrice } =
        coinsPriceList.find((el) => el.coinName === coinName) || 0;
      return coinPrice?.toFixed(2);
    }
  };
  const totalUserValue = () => {
    let totalArr = [];
    userCoins.forEach((el) => {
      let value = findCoinValue(el.coinName);
      let total = el.amount * value;
      totalArr.push(total);
    });
    return totalArr.reduce((a, b) => {
      return a + b;
    }, 0);
  };

  const getImage = (coinName) => {
    let img = coins.find((el) => el.id === coinName);
    return img?.image;
  };
  const getCoinFullName = (coinName) => {
    let coin = coins.find((el) => el.id === coinName);
    if (coin?.name.length > 7) {
      return coin?.symbol.toUpperCase();
    } else {
      return coin?.name;
    }
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Typography variant="h3" marginBottom={"15px"}>
                Wallet 👛
              </Typography>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Typography variant="h5">Crypto 💎:</Typography>
                <Typography variant="h5" sx={{ color: "green" }}>
                  {`$${valueReducer(totalUserValue())}`}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Typography variant="h5">Money 💵:</Typography>
                <Typography variant="h5" sx={{ color: "green" }}>
                  {`$${valueReducer(currentUserData?.balance)}`}
                </Typography>
              </Box>
              <Divider sx={{ width: "100%" }} />
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Typography variant="h5">Total 💰:</Typography>
                <Typography variant="h5" sx={{ color: "green" }}>
                  {`$${valueReducer(
                    currentUserData.balance + totalUserValue()
                  )}`}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid container item spacing={2} xs={10.5} marginTop={2}>
            {userCoins.map((coin, index) => (
              <CoinItem
                coin={coin}
                key={index}
                price={findCoinValue(coin.coinName)}
                img={getImage(coin.coinName)}
                name={getCoinFullName(coin.coinName)}
              />
            ))}
          </Grid>
        </Grid>
      )}
    </DashboardPage>
  );
}

export default Wallet;
