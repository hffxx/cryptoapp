import React, { createContext, useContext, useState, useEffect } from "react";
import { CoinList } from "../../config/api";
const CoinsContext = createContext();

export function useCoins() {
  return useContext(CoinsContext);
}

export function CoinsProvider({ children }) {
  const [coins, setCoins] = useState([]);
  const fetchCoins = async () => {
    try {
      let data = await fetch(CoinList());
      let coins = await data.json();
      setCoins(coins);
    } catch (e) {
      console.log("error", e);
    }
  };
  useEffect(() => {
    fetchCoins();
  }, []);
  const value = {
    coins,
  };
  return (
    <CoinsContext.Provider value={value}>{children}</CoinsContext.Provider>
  );
}
