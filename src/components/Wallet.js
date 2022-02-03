import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import DashboardPage from "./Pages/DashboardPage";
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
import MuiAlert from "@mui/material/Alert";
import { CoinList, SingleCoinPrice } from "../config/api";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const valueReducer = (value) => {
  if (value / 1000000000 >= 1) {
    return `${(value / 1000000000).toFixed(2).replace(/(\.0+|0+)$/, "")}B`;
  }
  if (value / 1000000 >= 1) {
    return `${(value / 1000000).toFixed(2).replace(/(\.0+|0+)$/, "")}M`;
  }
  if (value / 100000 >= 1) {
    return `${((value * 100) / 100000).toFixed(2).replace(/(\.0+|0+)$/, "")}K`;
  }
  if (value / 1 >= 1) {
    return `${value.toFixed(3).replace(/(\.0+|0+)$/, "")}`;
  } else {
    return `${value.toFixed(8).replace(/(\.0+|0+)$/, "")}`;
  }
};

const CoinItem = ({ coin, snackbar, price }) => {
  const { amount, image, symbol, name } = coin;
  const value = price * amount;
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
        <Typography variant="h5">
          {name?.length > 7 ? symbol.toUpperCase() : name}
        </Typography>
        <Box
          component="img"
          src={image}
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
          coinImg={image}
          coinName={name}
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
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [actualCoinPrice, setActualCoinPrice] = useState(0);
  const [loadingFetchPrice, setLoadingFetchPrice] = useState(false);
  const [snackbar, setSnackbar] = useState({
    state: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        let data = await fetch(CoinList());
        let coins = await data.json();
        setData(coins);
      } catch (e) {
        console.log("error", e);
      }
    };
    const id = setInterval(() => {
      fetchCoins();
    }, 60000);
    fetchCoins();
    return () => clearInterval(id);
  }, []);

  const snackbarClose = () => setSnackbar(false);

  const snackbarOpen = (message, severity = "success") =>
    setSnackbar({ state: true, message, severity });

  const navigate = useNavigate();

  const userCoins = currentUserData?.coins || [];

  const findCoinValue = (coinId) => {
    if (data.length !== 0) {
      let coin = data.find(({ id }) => id === coinId);
      return coin?.current_price;
    }
  };
  const fetchActualPrice = async (id) => {
    try {
      setLoadingFetchPrice(true);
      let fetchedPrice = await fetch(SingleCoinPrice(id));
      let coinPrice = await fetchedPrice.json();
      setActualCoinPrice(coinPrice[id].usd);
      let updatedData = data.map((coin) => {
        if (coin.id === id) {
          return { ...coin, current_price: coinPrice[id].usd };
        } else {
          return coin;
        }
      });
      setData(updatedData);
      setLoadingFetchPrice(false);
    } catch (e) {
      console.log("Error!", e?.message);
    }
  };

  const totalUserValue = () => {
    const totalArr = [];
    userCoins.forEach((coin) => {
      const value = findCoinValue(coin.id);
      const total = coin.amount * value;
      totalArr.push(total);
    });
    return totalArr.reduce((a, b) => {
      return a + b;
    }, 0);
  };

  return (
    <DashboardPage>
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
            {userCoins.map((coin) => (
              <CoinItem
                coin={coin}
                key={coin.symbol}
                price={findCoinValue(coin.id)}
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
