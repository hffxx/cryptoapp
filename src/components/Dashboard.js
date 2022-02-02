import React, { useState, useEffect } from "react";
import { Grid, Hidden, Button } from "@mui/material";
import Table from "./Table";
import Carousel from "./Carousel";
import Spinner from "./Spinner";
import { useCoins } from "./contexts/CoinsContext";
import DashboardPage from "./Pages/DashboardPage";

function Dashboard() {
  const [title, setTitle] = useState("🔥 Top Coins");
  const [coinsList, setCoinsList] = useState([]);
  const { coins } = useCoins();

  useEffect(() => {
    setCoinsList(coins);
  }, [coins]);

  const topCoins = coinsList.slice(0, 10);

  const biggestGainers = [...coinsList]
    .sort((a, b) =>
      a.price_change_percentage_24h < b.price_change_percentage_24h ? 1 : -1
    )
    .slice(0, 10);
  const biggestLosers = [...coinsList]
    .sort((a, b) =>
      a.price_change_percentage_24h > b.price_change_percentage_24h ? 1 : -1
    )
    .slice(0, 10);

  return (
    <DashboardPage>
      {coinsList.length === 0 ? (
        <Spinner />
      ) : (
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
            <Table />
          </Grid>
        </Grid>
      )}
    </DashboardPage>
  );
}

export default Dashboard;
