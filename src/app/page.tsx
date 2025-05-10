"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { addUser } from "@/lib/actions/user";
import { useEffect, useRef } from "react"; // Or useState for Option 1

export default function Home() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const addUserAttempted = useRef(false); // Or useState(false) for Option 1

  // Call Hooks unconditionally at the top level

  useEffect(() => {
    // Move the conditional logic inside useEffect
    if (isSignedIn && user && user.id && user.primaryEmailAddress?.emailAddress && user.createdAt && !addUserAttempted.current) {
      const userId = user.id;
      const email = user.primaryEmailAddress.emailAddress;
      const created_at = new Date(user.createdAt);

      const addUserData = async () => {
        try {
          await addUser(email, userId, created_at);
          addUserAttempted.current = true;
          console.log("User added successfully");
        } catch (error) {
          console.error("Error adding user:", error);
          // Handle the error
        }
      };
      addUserData();
    }
  }, [isSignedIn, user]); // Dependencies should include isSignedIn and the parts of user you rely on

  // Conditionally render content based on isSignedIn
  if (!isSignedIn) {
    return <div>Please sign in.</div>;
  }

  // Now you can access user data because the component only reaches here if isSignedIn is true
  const userId = user.id;
  const email = user.primaryEmailAddress?.emailAddress;
  const created_at = user.createdAt ? new Date(user.createdAt) : null;


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
            router.push("/dashboard");
           }}
       >
          Lets Get Started
        </button>
      </main>
    </ClerkProvider>
  );
}
