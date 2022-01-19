import React, { useEffect } from "react";
import DashboardPage from "./Pages/DashboardPage";
import { useAuth } from "./contexts/AuthContext";
import { useCoins } from "./contexts/CoinsContext";

function Wallet() {
  const { currentUserData } = useAuth();
  const { coinsPriceList } = useCoins();
  const coins = currentUserData?.coins || [];
  const totalCoinValue = (coinName) => {
    if (coinsPriceList) {
      let price = coinsPriceList.find((el) => el.coinName === coinName);
      let amount = coins.find((el) => el.coinName === coinName);
      if (price && amount) {
        return (price.coinPrice * amount.amount).toFixed(2);
      }
    }
  };

  console.log(totalCoinValue());
  return (
    <DashboardPage>
      <div>{`Your current balance is: ${currentUserData?.balance}$`}</div>
      <div>Coins:</div>
      {coins.map((coin, index) => {
        return (
          <div key={index}>{`Coin name: ${coin.coinName} --- amount: ${
            coin.amount
          } value is:${totalCoinValue(coin.coinName)}`}</div>
        );
      })}
    </DashboardPage>
  );
}

export default Wallet;
