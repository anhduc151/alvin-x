import React, { useEffect, useState, ChangeEvent, Fragment } from "react";
import { Skeleton, Table } from "antd";
import axios, { AxiosResponse } from "axios";
import Coin from "../../components/Coin";
import "./dashboard.css";
import type { TableProps } from "antd";
import DarkMode from "../../components/DarkMode";

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
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res: AxiosResponse<CoinData[]>) => {
        setCoins(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const sortedCoins = [...coins].sort(
      (a, b) => b.last_updated - a.last_updated
    );
    const latestThreeCoins = sortedCoins.slice(0, 3);
    setLatestCoins(latestThreeCoins);
  }, [coins]);

  useEffect(() => {
    const sortedCoins = [...coins].sort(
      (a, b) => b.total_volume - a.total_volume
    );
    const highVolumeThreeCoins = sortedCoins.slice(0, 3);
    setHighVolumeCoins(highVolumeThreeCoins);
  }, [coins]);

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value);
  // };

  const handleChangeTable = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase();
    setSearch(searchText);
    const filteredData = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchText)
    );
    setFilteredCoins(filteredData);
  };

  const filterCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedCoins = filterCoins.slice(0, 3);

  const columns: TableProps<CoinData>["columns"] = [
    {
      title: "Coin",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: CoinData) => (
        <Coin name={text} image={record.image} symbol={record.symbol} />
      ),
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
    <>
      <DarkMode layout={Fragment} />
      <div className="dashboard">
        <div className="dashboard_overview">
          <h2 className="dashboard_overview_h2">
            <i className="bx bx-stats title_icons"></i> Markets Overview
          </h2>
          <div className="dashboard_overview_trending">
            <div className="dashboard_overview_box">
              <p className="dashboard_overview_box_p">🔥Hot Coins</p>
              {loading ? (
                <Skeleton
                  avatar={{ size: "large" }}
                  title={false}
                  paragraph={{
                    rows: 4,
                    width: ["100%", "80%", "60%", "40%"],
                  }}
                  active
                />
              ) : (
                <>
                  {selectedCoins.map((coin) => (
                    <div key={coin.id} className="coin_info_box">
                      <Coin
                        name={coin.name}
                        image={coin.image}
                        symbol={coin.symbol}
                      />
                      <p
                        className={coin.price_change_24h < 0 ? "red" : "green"}
                      >
                        {coin.current_price}
                      </p>
                      <p
                        className={coin.price_change_24h < 0 ? "red" : "green"}
                      >
                        {coin.price_change_24h.toFixed(2)}%
                      </p>
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="dashboard_overview_box">
              <p className="dashboard_overview_box_p">🚀Top Gainer Coin</p>
              {loading ? (
                // <div className="loading_circle">
                //   <div className="ui-loader loader-blk">
                //     <svg viewBox="22 22 44 44" className="multiColor-loader">
                //       <circle
                //         cx="44"
                //         cy="44"
                //         r="20.2"
                //         fill="none"
                //         strokeWidth="3.6"
                //         className="loader-circle loader-circle-animation"
                //       ></circle>
                //     </svg>
                //   </div>
                // </div>
                <Skeleton
                  avatar={{ size: "large" }}
                  title={false}
                  paragraph={{
                    rows: 4,
                    width: ["100%", "80%", "60%", "40%"],
                  }}
                  active
                />
              ) : (
                <>
                  {latestCoins.map((coin) => (
                    <div key={coin.id} className="coin_info_box">
                      <Coin
                        name={coin.name}
                        image={coin.image}
                        symbol={coin.symbol}
                      />
                      <p
                        className={coin.price_change_24h < 0 ? "red" : "green"}
                      >
                        {coin.current_price}
                      </p>
                      <p
                        className={coin.price_change_24h < 0 ? "red" : "green"}
                      >
                        {coin.price_change_24h.toFixed(2)}%
                      </p>
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="dashboard_overview_box">
              <p className="dashboard_overview_box_p">🔈Top Volume Coin</p>
              {loading ? (
                //
                <Skeleton
                  avatar={{ size: "large" }}
                  title={false}
                  paragraph={{
                    rows: 4,
                    width: ["100%", "80%", "60%", "40%"],
                  }}
                  active
                />
              ) : (
                <>
                  {highVolumeCoins.map((coin) => (
                    <div key={coin.id} className="coin_info_box">
                      <Coin
                        name={coin.name}
                        image={coin.image}
                        symbol={coin.symbol}
                      />
                      <p
                        className={coin.price_change_24h < 0 ? "red" : "green"}
                      >
                        {coin.current_price}
                      </p>
                      <p
                        className={coin.price_change_24h < 0 ? "red" : "green"}
                      >
                        {coin.price_change_24h.toFixed(2)}%
                      </p>
                      {/* <p>{coin.total_volume}</p> */}
                    </div>
                  ))}
                </>
              )}
            </div>
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

          {loading ? (
            <>
              <Skeleton
                title={false}
                paragraph={{
                  rows: 10,
                  width: [
                    "100%",
                    "90%",
                    "80%",
                    "70%",
                    "60%",
                    "50%",
                    "40%",
                    "30%",
                    "20%",
                    "10%",
                  ],
                }}
                active
              />
            </>
          ) : (
            <>
              <Table
                columns={columns}
                dataSource={filteredCoins.length > 0 ? filteredCoins : coins}
                rowKey={(record) => record.id}
                scroll={{ x: true }}
                pagination={{
                  position: ["bottomCenter"],
                  showSizeChanger: true,
                }}
                className="centered-pagination-table"
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DashBoard;
