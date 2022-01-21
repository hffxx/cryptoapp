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
    if (!wallet.some(({ coinName }) => coinName === cName)) {
      let payload = { coinName: cName, amount: cAmount };
      await setDoc(docRef, { ...currentUserData, coins: [...wallet, payload] });
    } else {
      let payload = wallet.map((coin) => {
        if (coin.coinName === cName) {
          return { coinName: cName, amount: coin.amount + cAmount };
        } else {
          return coin;
        }
      });
      await setDoc(docRef, { ...currentUserData, coins: payload });
    }
  };
  return (
    <DashboardPage>
      <div>Trade</div>
      <Button variant="contained" onClick={() => handleBitcoin("dogecoin", 10)}>
        Buy Crypto
      </Button>
    </DashboardPage>
  );
}

export default Trade;
