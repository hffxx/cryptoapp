import React, { useState, useEffect } from "react";
import { Grid, Box, CircularProgress, Typography, Hidden } from "@mui/material";
import TableComponent from "./Table/TableComponent";
import Carousel from "./Carousel";
import { CoinList } from "../config/api";
import Sidebar from "./Sidebar";

function Dashboard() {
  const [data, setData] = useState([]);
  const fetchCoins = async () => {
    try {
      let data = await fetch(CoinList());
      let coins = await data.json();
      setData(coins);
    } catch (e) {
      console.log("error", e);
    }
  };
  // const fetchCoins = () => {
  //   fetch(CoinList())
  //     .then((res) => res.json())
  //     .then((data) => setData(data))
  //     .catch((e) => console.log("error", e));
  // };
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
    <Grid container sx={{ justifyContent: "center" }}>
      <Hidden xlDown>
        <Grid item xs={1.5}>
          <Sidebar />
        </Grid>
      </Hidden>
      <Grid item xs={10.5}>
        <Grid container>
          <Hidden xlDown>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "150px",
              }}
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
      </Grid>
    </Grid>
  );
}

export default Dashboard;
