import React, { useState } from "react";
import {
  Grid,
  Box,
  CircularProgress,
  Typography,
  Hidden,
  Button,
} from "@mui/material";
import TableComponent from "./TableComponent";
import Carousel from "./Carousel";
import Sidebar from "./Sidebar";
import { useCoins } from "./contexts/CoinsContext";
import DashboardPage from "./Pages/DashboardPage";

function Dashboard() {
  const [title, setTitle] = useState("🔥 Top Coins");
  const { coins } = useCoins();

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
    <DashboardPage>
      <Grid container>
        <Hidden lgDown>
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
        <Hidden lgUp>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {title === "🔥 Top Coins" && (
              <Carousel title="🔥 Top Coins" coins={topCoins} />
            )}
            {title === "💪 Top Gainers" && (
              <Carousel title="💪 Top Gainers" coins={biggestGainers} />
            )}
            {title === "📉 Top Losers" && (
              <Carousel title="📉 Top Losers" coins={biggestLosers} />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "25px",
              gap: "20px",
            }}
          >
            <Button
              variant="outlined"
              disableRipple
              onClick={() => setTitle("🔥 Top Coins")}
            >
              🔥
            </Button>
            <Button
              variant="outlined"
              disableRipple
              onClick={() => setTitle("💪 Top Gainers")}
            >
              💪
            </Button>
            <Button
              variant="outlined"
              disableRipple
              onClick={() => setTitle("📉 Top Losers")}
            >
              📉
            </Button>
          </Grid>
        </Hidden>
        <Grid item xs={12}>
          <TableComponent data={coins} />
        </Grid>
      </Grid>
    </DashboardPage>
  );
}

export default Dashboard;
