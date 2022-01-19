import React, { useEffect } from "react";
import DashboardPage from "./Pages/DashboardPage";
import { useAuth } from "./contexts/AuthContext";
import { useCoins } from "./contexts/CoinsContext";

function Wallet() {
  const { currentUserData } = useAuth();
  const { coinsPriceList } = useCoins();
  const coins = currentUserData?.coins || [];
  console.log(currentUserData);
  console.log(coinsPriceList);
  return (
    <DashboardPage>
      <div>{`Your current balance is: ${currentUserData?.balance}$`}</div>
      <div>Coins:</div>
      {coins.map((coin, index) => {
        return (
          <div
            key={index}
          >{`Coin name: ${coin.coinName} --- amount: ${coin.amount}`}</div>
        );
      })}
    </DashboardPage>
  );
}

export default Wallet;
