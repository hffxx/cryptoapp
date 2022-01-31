import React, { useState, useMemo } from "react";
import {
  Paper,
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Snackbar,
} from "@mui/material";
import DashboardPage from "./Pages/DashboardPage";
import { useAuth } from "./contexts/AuthContext";
import { useCoins } from "./contexts/CoinsContext";
import { valueReducer } from "./Wallet";
import Spinner from "./Spinner";
import ModalTrade from "./ModalTrade";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CoinItem = ({ coin, openModal, setModalData }) => {
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
          justifyContent: "space-between",
          padding: "10px",
          width: "200px",
          gap: "10px",
        }}
      >
        <Typography variant="h5">
          {coin.name.length > 8 ? coin.symbol.toUpperCase() : coin.name}
        </Typography>
        <Box
          component="img"
          src={coin.image}
          sx={{ width: "50px", marginTop: "10px" }}
        ></Box>
        <Typography variant="h5">{`$${coin.current_price}`}</Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            openModal();
            setModalData(coin);
          }}
        >
          Buy
        </Button>
      </Paper>
    </Grid>
  );
};

function Trade() {
  const [coinName, setCoinName] = useState("");
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({ state: false });
  const [snackbar, setSnackbar] = useState({
    state: false,
    message: "",
    severity: "",
  });
  const snackbarClose = () => setSnackbar(false);
  const snackbarOpen = (message, severity = "success") =>
    setSnackbar({ state: true, message, severity });
  const handleOpenModal = () => setModalData({ ...modalData, state: true });
  const handleCloseModal = () => setModalData({ ...modalData, state: false });
  const { currentUserData } = useAuth();
  const { coins } = useCoins();

  const filteredCoinList = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(coinName.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(coinName.toLowerCase())
  );
  const memoCoinList = useMemo(
    () =>
      filteredCoinList.map((coin, index) => (
        <CoinItem
          coin={coin}
          key={index}
          openModal={handleOpenModal}
          setModalData={setModalData}
        />
      )),
    [coins, coinName]
  );
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
      <ModalTrade
        modal={modalData.state}
        coin={modalData}
        closeModal={handleCloseModal}
        openSnackbar={snackbarOpen}
      />
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
            {filteredCoinList.length === 0 &&
            currentUserData.coin?.length !== 0 ? (
              <Grid item xs={12} mt={20}>
                <Typography variant="h5"> Sorry, coin not found :(</Typography>
              </Grid>
            ) : (
              memoCoinList
            )}
          </Grid>
        </Grid>
      ) : (
        <Spinner />
      )}
    </DashboardPage>
  );
}

export default Trade;