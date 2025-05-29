"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define price trends data for different properties
const priceTrendsData: Record<string, { month: string; price: number }[]> = {
  "1": [
    { month: "Jan", price: 2400000 },
    { month: "Feb", price: 2450000 },
    { month: "Mar", price: 2480000 },
    { month: "Apr", price: 2520000 },
    { month: "May", price: 2550000 },
    { month: "Jun", price: 2600000 },
  ],
  "2": [
    { month: "Jan", price: 3200000 },
    { month: "Feb", price: 3250000 },
    { month: "Mar", price: 3300000 },
    { month: "Apr", price: 3350000 },
    { month: "May", price: 3400000 },
    { month: "Jun", price: 3450000 },
  ],
  "3": [
    { month: "Jan", price: 1800000 },
    { month: "Feb", price: 1850000 },
    { month: "Mar", price: 1900000 },
    { month: "Apr", price: 1950000 },
    { month: "May", price: 2000000 },
    { month: "Jun", price: 2050000 },
  ],
};

export default function PriceTrends() {
  const params = useParams();
  const id = params.id as string; // Convert ID to string
  const data = priceTrendsData[id] || priceTrendsData["1"]; // Default to ID 1 if invalid

  return (
    <div className="space-y-4 px-4 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Price Trends</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
   </div>
  );
}
