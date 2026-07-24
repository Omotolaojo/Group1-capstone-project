"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Claim } from "@/types/claims";

export default function AdminPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Fetch pending claims from Express backend
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/claims`
        );

        setClaims(res.data);
      } catch (err) {
        console.error("Failed to fetch claims:", err);
        toast.error("Failed to load claims");
      }
    };

    fetchClaims();
  }, []);

  // Approve / Reject handler
  const updateStatus = async (
    id: string,
    status: Claim["status"]
  ) => {
    setLoadingId(id);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/approve`,
        {
          id,
          status,
        }
      );

      // Remove from UI immediately
      setClaims((prev) =>
        prev.filter((c) => c.id !== id)
      );

      toast.success(`Claim ${status}`);
    } catch (err) {
      console.error(
        "Failed to update claim:",
        err
      );

      toast.error(
        "Action failed. Try again."
      );
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Admin Panel
      </h1>

      <div className="grid gap-4">
        {claims.length === 0 ? (
          <p className="text-gray-500">
            No pending claims 🎉
          </p>
        ) : (
          claims.map((c) => (
            <div
              key={c.id}
              className="card bg-base-100 shadow p-4 border"
            >
              <div className="flex justify-between items-center">
                {/* Left side */}
                <div>
                  <h2 className="font-bold text-lg">
                    {c.vendor}
                  </h2>

                  <p className="text-gray-600">
                    ${c.amount}
                  </p>
                </div>

                {/* Right side buttons */}
                <div className="flex gap-2">
                  {/* Approve */}
                  <button
                    disabled={
                      loadingId === c.id
                    }
                    onClick={() =>
                      updateStatus(
                        c.id,
                        "approved"
                      )
                    }
                    className="px-3 py-1 text-sm font-semibold text-green-600 border border-green-500 rounded-md transition-all duration-200 hover:bg-green-500 hover:text-white disabled:opacity-50"
                  >
                    {loadingId === c.id
                      ? "Processing..."
                      : "✓ Approve"}
                  </button>

                  {/* Reject */}
                  <button
                    disabled={
                      loadingId === c.id
                    }
                    onClick={() =>
                      updateStatus(
                        c.id,
                        "rejected"
                      )
                    }
                    className="px-3 py-1 text-sm font-semibold text-red-600 border border-red-500 rounded-md transition-all duration-200 hover:bg-red-500 hover:text-white disabled:opacity-50"
                  >
                    {loadingId === c.id
                      ? "Processing..."
                      : "✕ Reject"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}