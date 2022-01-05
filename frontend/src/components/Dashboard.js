import React, { useState, useEffect } from "react";
import { Grid, Box, CircularProgress, Typography, Hidden } from "@mui/material";
import TableComponent from "./Table/TableComponent";
import Carousel from "./Carousel";
import { CoinList } from "../config/api";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState([]);
  // const fetchCoins = async () => {
  //   const data = await fetch(CoinList()).then((res) => res.json());
  //   setData(data);
  // };
  const fetchCoins = () => {
    fetch(CoinList())
      .then((res) => res.json())
      .then((data) => setData(data));
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
        "@media only screen and (max-width: 1200px)": {
          padding: "10px",
        },
      }}
    >
      <Hidden xlDown>
        <Grid
          item
          xs={8}
          sx={{ display: "flex", justifyContent: "space-between", gap: "75px" }}
        >
          <Carousel title="🔥 Top Coins" coins={topCoins} />
          <Carousel title="💪 Top Gainers" coins={biggestGainers} />
          <Carousel title="📉 Top Losers" coins={biggestLosers} />
        </Grid>
      </Hidden>
      <Grid item xs={12}>
        <TableComponent data={data} />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
