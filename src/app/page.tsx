"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
export default function Home() {
 
  const router = useRouter();
   console.log(process.env.DATABASE_URL);
  return (
    <ClerkProvider>
      <main className="flex min-h-screen flex-col items-center justify-items-center p-24">
        <p className="font-semibold text-7xl mb-3">Welcome to Stock - Market </p>
        <div className="text-2xl mb-3 text-center">
          This is a simple stock market application that allows you to track and manage your stock portfolio. You can add, edit, and delete stocks, view real-time stock prices, and analyze your portfolio's performance.This is just for demonstration purposes and no real money is involved. Please do not use this application for real trading or investment decisions.
        </div>
        <button
          className="mt-10 text-4xl bg-green-500 border-gray-100  hover:border-black-400 hover:bg-green-700 text-black hover:text-white font-bold py-10  px-20 rounded-3xl transition-colors duration-500 border-4"
           onClick={() => {
            
            router.push("/buysell");
           }}
       >
          Lets Get Started
        </button>
         
      </main>
    </ClerkProvider>
    
  );
}
