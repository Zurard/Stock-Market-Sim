"use client";

import { useSearchParams } from "next/navigation";
import StockDetails from "../components/stockDetails";
import { useState, useEffect } from "react";
import { sellStock } from "@/lib/actions/transactions";
import { useRouter } from "next/navigation";

type OwnedStock = { symbol: string; quantity: number };

export default function Sell() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [ownedStocks, setOwnedStocks] = useState<OwnedStock[]>([]);
  const [selectedStock, setSelectedStock] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  
  const router = useRouter();
   
  useEffect(() => {
    async function fetchOwnedStocks() {
      if (!userId) return;
      const res = await fetch(`ownedStocks?userId=${userId}`);
      const data = await res.json();
      setOwnedStocks(data.stocks ?? []);
    }
    fetchOwnedStocks();
  }, [userId]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedStock || quantity <= 0 || price <= 0) {
      window.alert("Please select a stock, enter quantity, and ensure price is available.");
      return;
    }

    const stock = ownedStocks.find((s) => s.symbol === selectedStock);
    if (!stock || quantity > stock.quantity) {
      window.alert(`You cannot sell more than you own (${stock?.quantity ?? 0}).`);
      return;
    }

    try {
      await sellStock({
        userId: userId as string,
        stockSymbol: selectedStock,
        quantityToSell: quantity,
        pricePerUnit: price,
      });
      window.alert("Stock sold successfully");
      // Optionally refresh the owned stocks list after selling
      setSelectedStock("");
      setQuantity(0);
      setPrice(0);
      
      router.push('/dashboard');
       
    } catch (error) {
      console.error("Error selling stock:", error);
      window.alert("Error selling stock: " + error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sell Stock
        </h2>
        <form className="space-y-5" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="stock" className="block mb-2 font-medium text-gray-700">
              Select the stock you want to sell
            </label>
            <select
              id="stock"
              value={selectedStock}
              onChange={(e) => {
                setSelectedStock(e.target.value);
                setPrice(0);
                setQuantity(0);
              }}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select a Stock --</option>
              {ownedStocks.map((stock) => (
                <option key={stock.symbol} value={stock.symbol}>
                  {stock.symbol} (Qty: {stock.quantity})
                </option>
              ))}
            </select>
          </div>

          <StockDetails
            symbol={selectedStock}
            onPriceFetch={(p) => setPrice(p)}
          />

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Quantity to sell
            </label>
            <input
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="Enter quantity to sell"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {selectedStock &&
            (() => {
              const stock = ownedStocks.find((s) => s.symbol === selectedStock);
              return stock && quantity > stock.quantity ? (
                <div className="text-red-500 mt-2 text-sm">
                  You cannot sell more than you own ({stock.quantity}).
                </div>
              ) : null;
            })()}

          {selectedStock && quantity > 0 && price > 0 && (
            <div className="mt-2 text-blue-600 font-semibold text-center">
              Total Amount: ₹{(quantity * price).toLocaleString()}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold"
          >
            Sell
          </button>
        </form>
      </div>
    </div>
  );
}
