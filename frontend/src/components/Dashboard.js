import React, { useState, useEffect } from "react";
import { Grid, Box, CircularProgress, Typography } from "@mui/material";
import TableComponent from "./Table/TableComponent";
import Carousel from "./Carousel";
import { CoinList } from "../config/api";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState([]);
  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList());
    setData(data);
  };
  useEffect(() => {
    fetchCoins();
  }, []);
  const topCoins = data.slice(0, 10);

  const biggestGainers = [...data]
    .sort((a, b) =>
      a.price_change_percentage_24h < b.price_change_percentage_24h ? 1 : -1
    )
    .slice(0, 10);
  const biggestLosers = [...data]
    .sort((a, b) =>
      a.price_change_percentage_24h > b.price_change_percentage_24h ? 1 : -1
    )
    .slice(0, 10);
  return data.length === 0 ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        width: "100vw",
        flexDirection: "column",
        gap: "25px",
      }}
    >
      <Typography>Data loading..</Typography>
      <CircularProgress />
    </Box>
  ) : (
    <Grid
      container
      sx={{
        justifyContent: "center",
        padding: "0px 50px",
        marginTop: "20px",
      }}
    >
      <Grid
        item
        lg
        sx={{ display: "flex", justifyContent: "center", gap: "75px" }}
      >
        <Carousel title="🔥 Top Coins" coins={topCoins} />
        <Carousel title="💪 Top Gainers" coins={biggestGainers} />
        <Carousel title="📉 Top Losers" coins={biggestLosers} />
      </Grid>
      <Grid item lg>
        <TableComponent data={data} />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
