import React, { useState, useEffect } from "react";

interface StockDetailsData {
  Symbol: string;
  Name: string;
  MarketCapitalization: string;
  AnalystTargetPrice: string;
  PERatio: string;
  "52WeekHigh": string;
  "52WeekLow": string;
  DividendYield: string;
}

interface StockDetailsProps {
  symbol: string;
  onPriceFetch?: (price: number) => void;
}

const StockDetails: React.FC<StockDetailsProps> = ({
  symbol,
  onPriceFetch,
}) => {
  const [stockDetails, setStockDetails] = useState<StockDetailsData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!symbol) {
      setLoading(false);
      setError("No stock symbol provided.");
      return;
    }

    async function fetchDetails() {
      setLoading(true);
      setError(null);
      setStockDetails(null);

      try {
        const response = await fetch(`/fetchStockDetails?symbol=${symbol}`);
        const data = await response.json();
        console.log("Stock details response:", data);
        if (response.ok) {
          setStockDetails(data);
          if (onPriceFetch && data.AnalystTargetPrice !== undefined) {
            onPriceFetch(Number(data.AnalystTargetPrice));
          }
        } else {
          setError(data.error || "An error occurred fetching stock details.");
        }
      } catch (err) {
        console.error("Error fetching stock details:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [symbol]);

  if (loading) {
    return (
      <div className="text-gray-600">Loading stock details for {symbol}...</div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!stockDetails) {
    return (
      <div className="text-gray-500">No details available for {symbol}.</div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-lg p-4 max-w-sm shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">{stockDetails.Name}</h2>
      <div className="space-y-2 text-gray-800">
        <p>
          <strong>Symbol:</strong> {stockDetails.Symbol}
        </p>
        <p>
          <strong>Market Cap:</strong> $
          {Number(stockDetails.MarketCapitalization).toLocaleString()}
        </p>
        <p>
          <strong>Target Price:</strong> ${stockDetails.AnalystTargetPrice}
        </p>
        <p>
          <strong>P/E Ratio:</strong> {stockDetails.PERatio}
        </p>
        <p>
          <strong>52-Week High:</strong> ${stockDetails["52WeekHigh"]}
        </p>
        <p>
          <strong>52-Week Low:</strong> ${stockDetails["52WeekLow"]}
        </p>
        <p>
          <strong>Dividend Yield:</strong>{" "}
          {Number(stockDetails.DividendYield).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default StockDetails;
