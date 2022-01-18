import React from "react";
import DashboardPage from "./Pages/DashboardPage";
import { useAuth } from "./contexts/AuthContext";

function Wallet() {
  const { currentUserData } = useAuth();
  return (
    <DashboardPage>
      <div>{`Current balance is: ${currentUserData?.balance}$`}</div>
    </DashboardPage>
  );
}

export default Wallet;
