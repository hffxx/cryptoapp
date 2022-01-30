import React, { useState, useMemo } from "react";
import { Paper, Box, Grid, TextField, Typography, Button } from "@mui/material";
import DashboardPage from "./Pages/DashboardPage";
import { useAuth } from "./contexts/AuthContext";
import { useCoins } from "./contexts/CoinsContext";
import { valueReducer } from "./Wallet";
import Spinner from "./Spinner";
import ModalTrade from "./ModalTrade";

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
          Buy new
        </Button>
      </Paper>
    </Grid>
  );
};

function Trade() {
  const [coinName, setCoinName] = useState("");
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const handleOpenModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);
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
      <ModalTrade
        modal={modal}
        coin={modalData}
        closeModal={handleCloseModal}
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
            {(filteredCoinList.length === 0 && currentUserData) || !coins ? (
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
