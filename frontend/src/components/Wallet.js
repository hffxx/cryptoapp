import React from "react";
import DashboardPage from "./Pages/DashboardPage";
import { useAuth } from "./contexts/AuthContext";

function Wallet() {
  const { balance } = useAuth();
  return (
    <DashboardPage>
      <div>{`Current balance is: ${balance}$`}</div>
    </DashboardPage>
  );
}

export default Wallet;
