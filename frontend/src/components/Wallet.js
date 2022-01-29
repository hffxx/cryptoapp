import React, { useState } from "react";
import DashboardPage from "./Pages/DashboardPage";
import { useAuth } from "./contexts/AuthContext";
import { useCoins } from "./contexts/CoinsContext";
import Spinner from "./Spinner";
import {
  Box,
  Paper,
  Grid,
  Typography,
  Divider,
  Snackbar,
  IconButton,
} from "@mui/material";
import SellModal from "./SellModal";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const valueReducer = (value) => {
  if (value / 1000000000 >= 1) {
    return `${(value / 1000000000).toFixed(2).replace(/(\.0+|0+)$/, "")}B`;
  } else if (value / 1000000 >= 1) {
    return `${(value / 1000000).toFixed(2).replace(/(\.0+|0+)$/, "")}M`;
  } else if (value / 100000 >= 1) {
    return `${((value * 100) / 100000).toFixed(2).replace(/(\.0+|0+)$/, "")}K`;
  } else {
    return `${value}`;
  }
};
const CoinItem = ({ coin, price, img, openSnackbar }) => {
  const { amount } = coin;
  const { coins } = useCoins();
  let value = price * amount;
  const getCoinFullName = (coinName) => {
    let coin = coins.find((el) => el.name === coinName);
    if (coin?.name.length > 7) {
      return coin?.symbol.toUpperCase();
    } else {
      return coin?.name;
    }
  };
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
        <Typography variant="h5">{getCoinFullName(coin.coinName)}</Typography>
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
            Number(price)
          )}`}</Typography>
          <Typography color="green">{`Value: $${valueReducer(
            Number(value)
          )}`}</Typography>
        </Box>
        <SellModal
          coinPrice={price}
          coinImg={img}
          coinName={coin.coinName}
          userCoinAmount={amount}
          openSnackbar={openSnackbar}
        >
          Sell
        </SellModal>
      </Paper>
    </Grid>
  );
};

function Wallet() {
  const { currentUserData } = useAuth();
  const { coinsPriceList } = useCoins();
  const { coins } = useCoins();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const snackbarClose = () => setOpenSnackbar(false);
  const snackbarOpen = () => setOpenSnackbar(true);
  const userCoins = currentUserData?.coins || [];
  const findCoinValue = (coinName) => {
    if (coinsPriceList) {
      let { coinPrice } =
        coinsPriceList.find((el) => el.coinName === coinName) || 0;
      return coinPrice;
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
    let img = coins.find((el) => el.name === coinName);
    return img?.image;
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
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={snackbarClose}
              >
                <Alert
                  onClose={snackbarClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  This is a success message!
                </Alert>
              </Snackbar>
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
                openSnackbar={snackbarOpen}
              />
            ))}
          </Grid>
        </Grid>
      )}
    </DashboardPage>
  );
}

export default Wallet;
