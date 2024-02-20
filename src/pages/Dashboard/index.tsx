import React, { useEffect, useState, ChangeEvent } from "react";
import { Input, Table, Spin, message, Skeleton } from "antd";
import axios, { AxiosResponse } from "axios";
import Coin from "../../components/Coin";
import "./dashboard.css";

interface CoinData {
  id: string;
  name: string;
  image: string;
  symbol: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap: number;
  high_24h: number;
  low_24h: number;
  last_updated: number;
  total_volume: number;
}

const DashBoard: React.FC = () => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [latestCoins, setLatestCoins] = useState<CoinData[]>([]);
  const [highVolumeCoins, setHighVolumeCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredCoins, setFilteredCoins] = useState<CoinData[]>([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then((res: AxiosResponse<CoinData[]>) => {
        setCoins(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const sortedCoins = [...coins].sort((a, b) => b.last_updated - a.last_updated);
    const latestThreeCoins = sortedCoins.slice(0, 3);
    setLatestCoins(latestThreeCoins);
  }, [coins]);

  useEffect(() => {
    const sortedCoins = [...coins].sort((a, b) => b.total_volume - a.total_volume);
    const highVolumeThreeCoins = sortedCoins.slice(0, 3);
    setHighVolumeCoins(highVolumeThreeCoins);
  }, [coins]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleChangeTable = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase();
    const filteredData = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchText)
    );
    setFilteredCoins(filteredData);
  };

  const filterCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedCoins = filterCoins.slice(0, 3);

  const columns = [
    {
      title: "Coin",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: CoinData) => <Coin name={text} image={record.image} symbol={record.symbol} />,
      fixed: "left",
      width: 50,
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      render: (text: string) => (
        <span style={{ textTransform: "uppercase", fontWeight: "normal" }}>
          {text.toUpperCase()}
        </span>
      ),
      key: "symbol",
    },
    {
      title: "Price",
      dataIndex: "current_price",
      key: "current_price",
    },
    {
      title: "24h",
      dataIndex: "price_change_24h",
      key: "price_change_24h",
      render: (priceChange24h: number) => (
        <span className={priceChange24h < 0 ? "red" : "green"}>
          {priceChange24h.toFixed(2)}%
        </span>
      ),
    },
    {
      title: "24h %",
      dataIndex: "price_change_percentage_24h",
      key: "price_change_percentage_24h",
      render: (priceChangePercentage24h: number) => (
        <span className={priceChangePercentage24h < 0 ? "red" : "green"}>
          {priceChangePercentage24h.toFixed(2)}%
        </span>
      ),
    },
    {
      title: "Market Cap",
      dataIndex: "market_cap",
      key: "market_cap",
    },
    {
      title: "High 24h",
      dataIndex: "high_24h",
      key: "high_24h",
    },
    {
      title: "Low 24h",
      dataIndex: "low_24h",
      key: "low_24h",
    },
    {
      title: "Last Updated",
      dataIndex: "last_updated",
      key: "last_updated",
    },
  ];

  useEffect(() => {
    if (coins.length > 0) {
      setLoading(false);
    }
  }, [coins]);

  useEffect(() => {
    document.title = "Dashboard - Alvin AI";
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard_overview">
        <h2 className="dashboard_overview_h2">
          <i className="bx bx-stats title_icons"></i> Markets Overview
        </h2>
        <div className="dashboard_overview_trending">
          {/* Your code for trending coins */}
        </div>
      </div>

      <div className="dashboard_table">
        <div className="dashboard_table_search">
          <h2 className="dashboard_overview_h2">
            <i className="bx bx-stats title_icons"></i> Coins
          </h2>
          <div className="inputGroup">
            <input
              type="text"
              required
              autoComplete="off"
              onChange={handleChangeTable}
            />
            <label htmlFor="name">Search</label>
          </div>
        </div>

        {/* Your code for table */}
      </div>
    </div>
  );
};

export default DashBoard;
