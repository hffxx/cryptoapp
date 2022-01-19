import React from "react";
import DashboardPage from "./Pages/DashboardPage";
import { useAuth } from "./contexts/AuthContext";
import { useCoins } from "./contexts/CoinsContext";
import Spinner from "./Spinner";
import { Box } from "@mui/material";

function Wallet() {
  const { currentUserData } = useAuth();
  const { coinsPriceList } = useCoins();
  const coins = currentUserData?.coins || [];
  //this function needs new implementation
  const totalCoinValue = (coinName) => {
    if (coinsPriceList) {
      let { coinPrice } =
        coinsPriceList.find((el) => el.coinName === coinName) || 0;
      let { amount } = coins.find((el) => el.coinName === coinName) || 0;
      return (coinPrice * amount).toFixed(2);
    }
  };
  return (
    <DashboardPage>
      {!currentUserData && coins ? (
        <Spinner />
      ) : (
        <Box>
          <div>{`Your current balance is: ${currentUserData?.balance}$`}</div>
          <div>Coins:</div>
          {coins.map((coin, index) => {
            return (
              <div key={index}>{`Coin name: ${coin.coinName} --- amount: ${
                coin.amount
              } value is:${totalCoinValue(coin.coinName)}`}</div>
            );
          })}
        </Box>
      )}
    </DashboardPage>
  );
}

export default Wallet;
