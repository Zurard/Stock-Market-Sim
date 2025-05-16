"use client";

import { useUser } from "@clerk/nextjs";
import { addUser } from "@/lib/actions/user";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const { isSignedIn, user } = useUser();
  const addUserAttempted = useRef(false);

  useEffect(() => {
    if (
      isSignedIn &&
      user &&
      user.id &&
      user.primaryEmailAddress?.emailAddress &&
      user.createdAt &&
      !addUserAttempted.current
    ) {
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
        }
      };

      addUserData();
    }
  }, [isSignedIn, user]);

  if (!isSignedIn) {
    return <div>Please sign in.</div>;
  }

  const userId = user.id;

  return (
    <main className="flex min-h-screen flex-col items-center justify-items-center p-24">
      <p className="font-semibold text-7xl mb-3">Welcome to Stock - Market</p>
      <div className="text-2xl mb-3 text-center">
        This is a simple stock market application that allows you to track and manage your stock portfolio. No real money involved!
      </div>
      <Link href={`/dashboard?userId=${userId}`}>
       <button
          className="mt-10 text-4xl bg-green-500 border-gray-100 hover:border-black-400 hover:bg-green-700 text-black hover:text-white font-bold py-10 px-20 rounded-3xl transition-colors duration-500 border-4"
        >
          Let’s Get Started
        </button>
      </Link>
    </main>
  );
}
