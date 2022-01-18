import React from "react";
import DashboardPage from "./Pages/DashboardPage";
import { useAuth } from "./contexts/AuthContext";

function Wallet() {
  const { currentUserData } = useAuth();
  const coins = currentUserData?.coins || [];
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
