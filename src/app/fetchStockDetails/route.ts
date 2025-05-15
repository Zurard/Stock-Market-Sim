import { NextResponse } from 'next/server';

// This function will handle GET requests to /api/fetchStockDetails
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');

    // Access server-side environment variable for API key
    // Note: No NEXT_PUBLIC_ prefix
    
     const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
     console.log("API Key:", process.env.ALPHA_VANTAGE_API_KEY); // Log the API key for debugging (remove in production)
     console.log("API Key:", apiKey); // Log the API key for debugging (remove in production)

    if (!symbol) {
        return NextResponse.json({ error: 'Stock symbol is required' }, { status: 400 });
    }

    if (!apiKey) {
        console.error("Alpha Vantage API key is not set on the server.");
        return NextResponse.json({ error: 'Server configuration error: API key missing' }, { status: 500 });
    }

    try {
        // Using the Company Overview endpoint
        const alphaVantageResponse = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`);
        const data = await alphaVantageResponse.json();

        // Check for specific error messages from Alpha Vantage or empty data
        if (data && data["Error Message"]) {
            console.error("Alpha Vantage API Error:", data["Error Message"]);
            return NextResponse.json({ error: data["Error Message"] }, { status: 500 });
        } else if (data && Object.keys(data).length === 0) {
            console.warn(`No detailed information found for symbol: ${symbol}.`);
             return NextResponse.json({ error: `No detailed information found for symbol: ${symbol}. It might be invalid or not supported.` }, { status: 404 }); // 404 for not found
         }
        else if (data) {
            // Successfully fetched data, return it
            return NextResponse.json(data, { status: 200 });
        } else {
             console.error("Alpha Vantage returned unexpected empty data.");
             return NextResponse.json({ error: "Could not fetch stock details." }, { status: 500 });
         }

    } catch (error) {
        console.error("Error fetching stock details in API route:", error);
        return NextResponse.json({ error: 'Server error fetching stock details.' }, { status: 500 });
    }
}

