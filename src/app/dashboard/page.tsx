'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function Dashboard() {
    const router = useRouter();
    const [stocks, setStocks] = useState<any>(null);
    const [error, setError] = useState<string | null>(null); // Optional: Add error state

    const buyStock = () => {
        router.push("/buy");
    }

    const sellStock = () => {
        router.push("/sell");
    }



//   CODE BLOK ON HOW TO FETCH DATA FROM ALPHA VANTAGE API ===========>>>===========>>>
//---------------------------------------------------------------------------------------------------------
    // useEffect(() => {
    //     async function fetchStocks() {
    //         try { // Add try...catch for error handling
    //             const url = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_URL;
    //             const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
    //             if (!url) {
    //                 setError("API URL is not configured.");
    //                 return;
    //             }
    //             const res = await fetch((url) as string);

    //             if (!res.ok) { // Check for HTTP errors
    //                 const errorData = await res.text(); // Or res.json() if the API returns JSON errors
    //                 setError(`Failed to fetch stocks: ${res.status} - ${errorData}`);
    //                 return;
    //             }

    //             const data = await res.json();

    //             // Add a check here to see if the data structure is as expected
    //             if (data && data["Meta Data"] && data["Time Series (5min)"]) {
    //                 setStocks(data);
    //             } else {
    //                 setError("Received unexpected data format from API.");
    //                 console.error("Unexpected API data:", data);
    //                 setStocks(null); // Ensure state is null if data is bad
    //             }

    //         } catch (err: any) { // Catch network or parsing errors
    //             console.error("Error fetching stocks:", err);
    //             setError(`Error fetching stocks: ${err.message}`);
    //             setStocks(null); // Ensure state is null on error
    //         }
    //     }
    //     fetchStocks();
    // }, []); // Empty dependency array means this runs once on mount

    // console.log("Stocks data:", stocks);

    // // Add conditional check before accessing stocks properties
    // const symbol = stocks ? stocks["Meta Data"]?.["2. Symbol"] : null;
    // console.log("Symbol:", symbol); // Log the symbol or null
//---------------------------------------------------------------------------------------------------------

    return (

        <div>
            <div className="flex max-h-screen flex-col items-center justify-items-center"> Welcome to the Dashboard </div>
            <div className="flex max-h-screen flex-col items-center justify-items-center p-10">
             Ready to start your stock trading journey? 
             <div>
                <button
                    onClick={buyStock}
                    className="border border-white rounded-2xl px-3 py-1 mt-5 hover:cursor-pointer"
                >
                    Buy a Stock
                </button>
                <button
                    onClick={sellStock}
                    className="border border-white rounded-2xl px-3 py-1 mt-5 hover:cursor-pointer"
                >
                    Sell a Stock
                </button>
             </div>
            </div>

           
        </div>

        
        // <div className="flex min-h-screen flex-col items-center justify-items-center p-24">
        //     <div className="text-2xl mb-3 text-center">
        //         Get started with your stock trading journey
        //     </div>

        //     {/* Display error message if there is one */}
        //     {error && <div style={{ color: 'red' }}>{error}</div>}

        //     {/* Conditionally render the symbol if it exists */}
        //     {symbol && (
        //          <div className="text-2xl mb-3 text-center">
        //             Symbol: {symbol}
        //         </div>
        //     )}

        //     <div className="text-2xl mb-3 text-center">
        //         {/* Add a check for stocks and the nested Time Series property */}
        //         {stocks && stocks["Time Series (5min)"] ? (
        //             Object.keys(stocks["Time Series (5min)"]).map((key) => {
        //                 const stock = stocks["Time Series (5min)"][key];
        //                 return (
        //                     <div key={key} className="border-2 border-gray-200 p-4 m-2 rounded-lg">
        //                         <h3 className="text-xl font-bold">{key}</h3>
        //                         {/* Use optional chaining for nested properties in case they are missing */}
        //                         <p>Open: {stock?.["1. open"]}</p>
        //                         <p>High: {stock?.["2. high"]}</p>
        //                         <p>Low: {stock?.["3. low"]}</p>
        //                         <p>Close: {stock?.["4. close"]}</p>
        //                         <p>Volume: {stock?.["5. volume"]}</p>
        //                     </div>
        //                 );
        //             })
        //         ) : (
        //             // Display a loading message or a message if no data is available
        //             !error && <p>Loading time series data...</p>
        //         )}
        //     </div>
        // </div>
    );
}
