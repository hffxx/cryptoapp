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
  Button,
} from "@mui/material";
import SellModal from "./SellModal";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const amountReducer = (value) => {
  if (value / 1000000000 >= 1) {
    return `${(value / 1000000000).toFixed(2).replace(/(\.0+|0+)$/, "")}B`;
  } else if (value / 1000000 >= 1) {
    return `${(value / 1000000).toFixed(2).replace(/(\.0+|0+)$/, "")}M`;
  } else if (value / 100000 >= 1) {
    return `${((value * 100) / 100000).toFixed(2).replace(/(\.0+|0+)$/, "")}K`;
  } else {
    return `${value.toFixed(8).replace(/(\.0+|0+)$/, "")}`;
  }
};
export const valueReducer = (value) => {
  if (value / 1000000000 >= 1) {
    return `${(value / 1000000000).toFixed(2).replace(/(\.0+|0+)$/, "")}B`;
  } else if (value / 1000000 >= 1) {
    return `${(value / 1000000).toFixed(2).replace(/(\.0+|0+)$/, "")}M`;
  } else if (value / 100000 >= 1) {
    return `${((value * 100) / 100000).toFixed(2).replace(/(\.0+|0+)$/, "")}K`;
  } else {
    return `${value.toFixed(2).replace(/(\.0+|0+)$/, "")}`;
  }
};

const CoinItem = ({ coin, snackbar, price }) => {
  const { amount, image, symbol, name } = coin;
  let value = price * amount;
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
        <Typography variant="h5">{name?.length > 7 ? symbol : name}</Typography>
        <Box
          component="img"
          src={image}
          sx={{ width: "50px", marginTop: "10px" }}
        ></Box>
        <Box sx={{ margin: "10px 0px" }}>
          <Typography color="darkred">{`Amount: ${amountReducer(
            amount
          )}`}</Typography>
          <Typography color="darkblue">{`Price: $${amountReducer(
            Number(price)
          )}`}</Typography>
          <Typography color="green">{`Value: $${valueReducer(
            Number(value)
          )}`}</Typography>
        </Box>
        <SellModal
          coinPrice={price}
          coinImg={image}
          coinName={coin.coinName}
          userCoinAmount={amount}
          snackbar={snackbar}
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
  const [snackbar, setSnackbar] = useState({
    state: false,
    message: "",
    severity: "",
  });
  const snackbarClose = () => setSnackbar(false);
  const snackbarOpen = (message, severity = "success") =>
    setSnackbar({ state: true, message, severity });
  const userCoins = currentUserData?.coins || [];
  const findCoinValue = (name) => {
    if (coinsPriceList) {
      let { price } = coinsPriceList.find((coin) => coin.name === name) || 0;
      return price;
    }
  };
  const totalUserValue = () => {
    let totalArr = [];
    userCoins.forEach((coin) => {
      let value = findCoinValue(coin.name);
      let total = coin.amount * value;
      totalArr.push(total);
    });
    return totalArr.reduce((a, b) => {
      return a + b;
    }, 0);
  };
  let navigate = useNavigate();
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
                open={snackbar.state}
                autoHideDuration={3000}
                onClose={snackbarClose}
              >
                <Alert
                  onClose={snackbarClose}
                  severity={snackbar.severity}
                  sx={{ width: "100%" }}
                >
                  {snackbar.message}
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
            {userCoins.map((coin) => (
              <CoinItem
                coin={coin}
                key={coin.symbol}
                price={findCoinValue(coin.name)}
                snackbar={snackbarOpen}
              />
            ))}
          </Grid>
          {!userCoins.length && currentUserData && (
            <Grid
              item
              mt={20}
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "25px",
              }}
            >
              <Typography variant="h5">You don't have any coins</Typography>
              <Button
                variant="contained"
                color="success"
                onClick={() => navigate("/trade")}
              >
                Buy crypto
              </Button>
            </Grid>
          )}
        </Grid>
      )}
    </DashboardPage>
  );
}

export default Wallet;
