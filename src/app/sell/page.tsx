"use client";

import { useSearchParams } from "next/navigation";
import StockDetails from "../components/stockDetails";
import { useState, useEffect } from "react";

type OwnedStock = { symbol: string; quantity: number };

export default function Sell() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [ownedStocks, setOwnedStocks] = useState<OwnedStock[]>([]);
  const [selectedStock, setSelectedStock] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  console.log("User ID:", userId);

useEffect(() => {
  async function fetchOwnedStocks() {
    if (!userId) return;
    const res = await fetch(`ownedStocks?userId=${userId}`);
    const data = await res.json();
    setOwnedStocks(data.stocks ?? []);
  }

  fetchOwnedStocks();
}, [userId]);

  return (
    <div>
      <div>Sell some stock</div>

    <form>
      <div>Select the stock you wanna sell </div>
      <select
        id="stock"
        value={selectedStock}
        onChange={(e) => setSelectedStock(e.target.value)}
        className="border border-gray-300 rounded-md p-2"
      >
        <option value="">-- Select a Stock --</option>
        {ownedStocks.map((stock) => (
        <option key={stock.symbol} value={stock.symbol}>
          {stock.symbol} (Qty: {stock.quantity})
        </option>
        ))}
      </select>
      <StockDetails symbol={selectedStock} onPriceFetch={(p) => setPrice(p)} />
      <input
        type="number"
        min="0"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        placeholder="Enter quantity to sell"
        className="border border-gray-300 rounded-md p-2"
      />
      {selectedStock && (() => {
        const stock = ownedStocks.find(s => s.symbol === selectedStock);
        return stock && quantity > stock.quantity ? (
        <div className="text-red-500 mt-2">
          You cannot sell more than you own ({stock.quantity}).
        </div>
        ) : null;
      })()}
    </form>
    </div>
  );
}
