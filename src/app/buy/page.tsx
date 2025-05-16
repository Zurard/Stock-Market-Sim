'use client';

import React, { useEffect, useState } from 'react';
import StockDetails from '../components/stockDetails';
import { useSearchParams } from "next/navigation";
import { buyStock } from '@/lib/actions/transactions';

export default function Buy() {
    const [selectedStock, setSelectedStock] = useState('');
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);

     const searchParams = useSearchParams();
     const userId = searchParams.get("userId");

    const stockList = [
        { symbol: 'AAPL', companyName: 'Apple Inc.' },
        { symbol: 'MSFT', companyName: 'Microsoft Corporation' },
        { symbol: 'GOOGL', companyName: 'Alphabet Inc. (Google)' },
        { symbol: 'AMZN', companyName: 'Amazon.com, Inc.' },
        { symbol: 'TSLA', companyName: 'Tesla, Inc.' },
        { symbol: 'META', companyName: 'Meta Platforms, Inc.' },
        { symbol: 'NFLX', companyName: 'Netflix, Inc.' },
        { symbol: 'NVDA', companyName: 'NVIDIA Corporation' },
        { symbol: 'AMD', companyName: 'Advanced Micro Devices, Inc.' },
        { symbol: 'INTC', companyName: 'Intel Corporation' },
        { symbol: 'IBM', companyName: 'International Business Machines Corporation' },
        { symbol: 'ORCL', companyName: 'Oracle Corporation' },
        { symbol: 'DIS', companyName: 'The Walt Disney Company' },
        { symbol: 'PYPL', companyName: 'PayPal Holdings, Inc.' },
        { symbol: 'ADBE', companyName: 'Adobe Inc.' },
        { symbol: 'CRM', companyName: 'Salesforce, Inc.' },
        { symbol: 'UBER', companyName: 'Uber Technologies, Inc.' },
        { symbol: 'LYFT', companyName: 'Lyft, Inc.' },
        { symbol: 'SHOP', companyName: 'Shopify Inc.' },
        { symbol: 'SQ', companyName: 'Block, Inc. (formerly Square)' },
    ];

   const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStock(e.target.value);
    setPrice(0); // Reset price when changing stock
    setQuantity(0); // Optional: reset quantity too
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const totalAmount = (quantity && price) ? (quantity * price).toFixed(2) : '0.00';


  const handleBuyStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStock || !quantity || !price) {
      alert("Please select a stock, enter quantity, and fetch the price.");
      return;
    }
     try {
    buyStock({
      userId: userId as string,
      stockSymbol: selectedStock,
      quantityToBuy: quantity,
      pricePerUnit: price,
    });
    console.log("Transaction added successfully");
    // optionally reset form fields here
  } catch (error) {
    console.error("Error adding transaction:", error);
  }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <div className="text-4xl font-bold mb-4 text-center text-blue-700">Buying a Stock</div>
      <hr className="mb-6" />
      <form className="flex flex-col gap-6">
        <div className="text-lg font-medium text-gray-700">
          Select the Company you want to buy shares from
        </div>
        <select
          id="stock"
          value={selectedStock}
          onChange={handleSelect}
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-- Select a Stock --</option>
          {stockList.map((stock) => (
            <option key={stock.symbol} value={stock.symbol}>
              {stock.symbol} — {stock.companyName}
            </option>
          ))}
        </select>

        <div>
          {selectedStock ? (
            <StockDetails
              symbol={selectedStock}
              onPriceFetch={(fetchedPrice) => setPrice(fetchedPrice)}
            />
          ) : (
            <div className="mt-4 text-gray-500 text-center">
              Select a stock to see details.
            </div>
          )}
        </div>

        <input
          type="number"
          min="0"
          value={quantity}
          onChange={handleQuantityChange}
          placeholder="Enter the number of shares"
          className="border text-black border-gray-300 p-2 rounded w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleBuyStock}
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors mt-2"
        >
          Buy Shares
        </button>
      </form>

      <div className="mt-6 text-lg font-semibold text-gray-800">
        Total Amount: <span className="text-blue-700">${totalAmount}</span>
      </div>
    </div>
  );
}