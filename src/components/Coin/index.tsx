import React from "react";
import "./coin.css";

interface CoinProps {
  name: string;
  image: string;
  symbol: string;
  price?: number;
  volume?: number;
  priceChange?: number;
  marketCap?: number;
  lastUpdated?: string;
  high24h?: number;
  low24h?: number;
}

const Coin: React.FC<CoinProps> = ({
  name,
  image,
  symbol,
  price,
  // volume,
  priceChange,
  marketCap,
  lastUpdated,
  high24h,
  low24h,
}) => {
  return (
    <div className="coin">
      <div className="row">
        <img src={image} alt={name} className="coin_box_imgs"/>
        <h1 className="coinbox_h1">{name}</h1>
        <p className="symbol">{symbol}</p>
        <p className="price">{price ? `${price} INR` : ""}</p>
        {priceChange !== undefined ? (
          <p className={priceChange < 0 ? "red" : "green"}>
            {priceChange.toFixed(2)}%
          </p>
        ) : (
          ""
        )}
        <p className="market-cap">
          {marketCap !== undefined ? `$ ${marketCap.toLocaleString()} INR` : ""}
        </p>
        <p className="high_24h red">{high24h}</p>
        <p className="low_24h green">{low24h}</p>
        <p className="last_updated">{lastUpdated ? lastUpdated : ""}</p>
      </div>
    </div>
  );
}

export default Coin;
