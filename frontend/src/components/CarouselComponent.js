import React, { useState, useEffect } from "react";
import { TrendingCoins } from "../config/api";
import axios from "axios";
import Carousel from "react-elastic-carousel";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function CarouselComponent() {
  const [trending, setTrending] = useState([]);
  const fetchTrendingCoings = async () => {
    const { data } = await axios.get(TrendingCoins());
    setTrending(data);
  };
  useEffect(() => {
    fetchTrendingCoings();
  }, []);
  console.log(trending);

  return (
    <div>
      <Carousel breakPoints={breakPoints}>
        {trending.map((coin) => (
          <img src={coin?.image}></img>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselComponent;
