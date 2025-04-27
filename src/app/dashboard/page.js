"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.push("/signin");
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    getUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/signin");
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to FreshAI Dashboard
        </h1>
        <p className="text-gray-600 mb-8">Logged in as: {user.email}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Conversations</h2>
            <p className="mt-2 text-sm">Track and respond to customer interactions.</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Analytics</h2>
            <p className="mt-2 text-sm">View engagement metrics and AI performance.</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">CRM</h2>
            <p className="mt-2 text-sm">Manage your customer database efficiently.</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Email Automation</h2>
            <p className="mt-2 text-sm">Create and send automated email campaigns.</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleSignOut}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
} 
