import React from "react";
import { Grid, Box, CircularProgress, Typography, Hidden } from "@mui/material";
import TableComponent from "./TableComponent";
import Carousel from "./Carousel";
import Sidebar from "./Sidebar";
import { useCoins } from "./contexts/CoinsContext";

function Dashboard() {
  const { coins } = useCoins();
  console.log(coins);

  const topCoins = coins.slice(0, 10);

  const biggestGainers = [...coins]
    .sort((a, b) =>
      a.price_change_percentage_24h < b.price_change_percentage_24h ? 1 : -1
    )
    .slice(0, 10);
  const biggestLosers = [...coins]
    .sort((a, b) =>
      a.price_change_percentage_24h > b.price_change_percentage_24h ? 1 : -1
    )
    .slice(0, 10);

  return coins.length === 0 ? (
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
      <Grid item xs={10.5} mt={4}>
        <Grid container>
          <Hidden xlDown>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Carousel title="🔥 Top Coins" coins={topCoins} />
              <Carousel title="💪 Top Gainers" coins={biggestGainers} />
              <Carousel title="📉 Top Losers" coins={biggestLosers} />
            </Grid>
          </Hidden>
          <Hidden xlUp>
            <Grid item xs={12}>
              <Carousel title="🔥 Top Coins" coins={topCoins} />
            </Grid>
          </Hidden>
          <Grid item xs={12}>
            <TableComponent data={coins} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
