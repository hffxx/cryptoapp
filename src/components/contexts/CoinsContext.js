import React, { createContext, useContext, useState, useEffect } from "react";
import { CoinList } from "../../config/api";
const CoinsContext = createContext();

export function useCoins() {
  return useContext(CoinsContext);
}

export function CoinsProvider({ children }) {
  const [coins, setCoins] = useState([]);
  const [coinsPriceList, setCoinsPriceList] = useState([]);
  const fetchCoins = async () => {
    try {
      let data = await fetch(CoinList());
      let coins = await data.json();
      setCoins(coins);
    } catch (e) {
      console.log("error", e);
    }
  };
  const getCoinsPriceList = () => {
    if (!!coins) {
      let priceList = coins.map((coin) => ({
        name: coin.name,
        price: coin.current_price,
      }));
      setCoinsPriceList(priceList);
    }
  };
  useEffect(() => {
    getCoinsPriceList();
  }, [coins]);
  useEffect(() => {
    fetchCoins();
  }, []);
  const value = {
    coins,
    coinsPriceList,
  };
  return (
    <CoinsContext.Provider value={value}>{children}</CoinsContext.Provider>
  );
}
