'use client';
import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Dashboard() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");
    console.log("User ID:", userId);
    return (

        <div>
            <div className="flex max-h-screen flex-col items-center justify-items-center"> Welcome to the Dashboard </div>
            <div className="flex max-h-screen flex-col items-center justify-items-center p-10">
             Ready to start your stock trading journey? 
             <div>
                <Link href={`/buy?userId=${userId}`}>
                <button
                    
                    className="border border-white rounded-2xl px-3 py-1 mt-5 hover:cursor-pointer"
                >
                    Buy a Stock
                </button>
                </Link>
               <Link href={`/sell?userId=${userId}`}>
                <button
                    
                    className="border border-white rounded-2xl px-3 py-1 mt-5 hover:cursor-pointer"
                >
                    Sell a Stock
                </button>
                </Link>
             </div>
            </div>
        </div>
    );
}
