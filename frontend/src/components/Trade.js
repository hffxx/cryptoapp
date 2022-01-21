import { Button } from "@mui/material";
import React from "react";
import DashboardPage from "./Pages/DashboardPage";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useAuth } from "./contexts/AuthContext";

function Trade() {
  const { currentUserId, currentUserData } = useAuth();
  const handleBitcoin = async (cName, cAmount) => {
    const wallet = currentUserData.coins;
    const docRef = doc(db, "users", currentUserId);
    let payload = { coinName: "", amount: 0 };
    if (wallet.some(({ coinName }) => coinName === cName)) {
      return (payload = { coinName: cName, amount: cAmount });
    }
    await setDoc(docRef, { ...currentUserData, coins: [...wallet, payload] });
  };
  return (
    <DashboardPage>
      <div>Trade</div>
      <Button variant="contained" onClick={() => handleBitcoin("dogecoin", 10)}>
        Buy 1 Crypto
      </Button>
    </DashboardPage>
  );
}

export default Trade;
