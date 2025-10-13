"use client";

import Navbar from "../components/Navbar";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";


export default function Dashboard() {
    // --- Summary Data ---
    const totalIncome = 1200000;
    const totalExpenses = 850000;
  const remainingBalance = totalIncome - totalExpenses;

  const pieData = [
    { name: "Needs", value: 50 },
    { name: "Wants", value: 30 },
    { name: "Savings", value: 20 },
  ];

  const COLORS = ["#10B981", "#3B82F6", "#FBBF24"];

  const barData = [
    { month: "Jan", income: 500000, expenses: 300000 },
    { month: "Feb", income: 700000, expenses: 400000 },
    { month: "Mar", income: 800000, expenses: 500000 },
  ];

  const summaryCards = [
    { label: "💸 Total Income", value: `UGX ${totalIncome.toLocaleString()}` },
    { label: "💰 Total Expenses", value: `UGX ${totalExpenses.toLocaleString()}` },
    { label: "💵 Remaining Balance", value: `UGX ${remainingBalance.toLocaleString()}` },
  ];

  // --- Line Chart Timeframes ---
  const timeframeOptions = ["1M", "3M", "6M", "1Y", "5Y", "ALL"];
  const [selectedTimeframe, setSelectedTimeframe] = useState("1Y");

  // Dummy financial growth data
  const allTimeData = [
    { period: "2020", balance: 200000 },
    { period: "2021", balance: 450000 },
    { period: "2022", balance: 800000 },
    { period: "2023", balance: 1200000 },
    { period: "2024", balance: 1600000 },
    { period: "2025", balance: 2100000 },
  ];

  const oneYearData = [
    { period: "Jan", balance: 1200000 },
    { period: "Feb", balance: 1350000 },
    { period: "Mar", balance: 1420000 },
    { period: "Apr", balance: 1550000 },
    { period: "May", balance: 1600000 },
    { period: "Jun", balance: 1750000 },
    { period: "Jul", balance: 1820000 },
    { period: "Aug", balance: 1920000 },
    { period: "Sep", balance: 2050000 },
    { period: "Oct", balance: 2100000 },
  ];

  // --- 1M = past 4–5 weeks ---
  const oneMonthData = [
    { period: "Week 1", balance: 200000 },
    { period: "Week 2", balance: 350000 },
    { period: "Week 3", balance: 500000 },
    { period: "Week 4", balance: 650000 },
    { period: "Week 5", balance: 750000 },
  ];

  const sixMonthsData = oneYearData.slice(-6);
  const threeMonthsData = oneYearData.slice(-3);
  const fiveYearsData = allTimeData.slice(-5);

  const getDataByTimeframe = () => {
    switch (selectedTimeframe) {
      case "1M":
        return oneMonthData;
      case "3M":
        return threeMonthsData;
      case "6M":
        return sixMonthsData;
      case "1Y":
        return oneYearData;
      case "5Y":
        return fiveYearsData;
      default:
        return allTimeData;
    }
  };

  const lineData = getDataByTimeframe();

  return (
    <>
        <SignedIn>
            <Navbar />
            <div className="bg-stone-900 min-h-screen text-gray-100 p-6 md:p-10">
            <motion.h1
                className="text-3xl md:text-4xl font-bold mb-6 text-emerald-400"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                🏠 Dashboard
            </motion.h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {summaryCards.map((card, index) => (
                <motion.div
                    key={index}
                    className="bg-stone-800 rounded-2xl p-5 shadow-lg border border-stone-700"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <p className="text-gray-400">{card.label}</p>
                    <p className="text-2xl font-semibold text-white mt-2">{card.value}</p>
                </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Pie Chart */}
                <motion.div
                className="bg-stone-800 rounded-2xl p-6 shadow-lg border border-stone-700"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                >
                <h2 className="text-lg font-semibold mb-4 text-gray-300">Spending Categories</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {pieData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                </motion.div>

                {/* Bar Chart */}
                <motion.div
                className="bg-stone-800 rounded-2xl p-6 shadow-lg border border-stone-700"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                >
                <h2 className="text-lg font-semibold mb-4 text-gray-300">
                    Monthly Income vs Expenses
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="month" stroke="#aaa" />
                    <YAxis stroke="#aaa" />
                    <Tooltip />
                    <Bar dataKey="income" fill="#10B981" />
                    <Bar dataKey="expenses" fill="#F87171" />
                    </BarChart>
                </ResponsiveContainer>
                </motion.div>
            </div>

            {/* 📈 Cumulative Line Chart */}
            {/* 📈 Cumulative Line Chart */}
            <motion.div
            className="bg-stone-800 rounded-2xl p-6 shadow-lg border border-stone-700 mt-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                <h2 className="text-lg font-semibold text-gray-300">
                Financial Growth Over Time
                </h2>

                {/* Timeframe Buttons */}
                <div className="flex flex-wrap gap-2">
                {timeframeOptions.map((time) => (
                    <button
                    key={time}
                    onClick={() => setSelectedTimeframe(time)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition flex-1 sm:flex-auto ${
                        selectedTimeframe === time
                        ? "bg-emerald-500 text-white"
                        : "bg-stone-700 hover:bg-stone-600 text-gray-300"
                    }`}
                    >
                    {time}
                    </button>
                ))}
                </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="period" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                />
                </LineChart>
            </ResponsiveContainer>
            </motion.div>


            {/* Budget Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <motion.div
                className="bg-stone-800 rounded-2xl p-6 shadow-lg border border-stone-700 text-center"
                whileHover={{ scale: 1.05 }}
                >
                <p className="text-gray-400">Wants Spent</p>
                <p className="text-xl text-blue-400 font-semibold">70% of Budget Used</p>
                </motion.div>

                <motion.div
                className="bg-stone-800 rounded-2xl p-6 shadow-lg border border-stone-700 text-center"
                whileHover={{ scale: 1.05 }}
                >
                <p className="text-gray-400">Remaining Needs</p>
                <p className="text-xl text-green-400 font-semibold">UGX 40,000</p>
                </motion.div>

                <motion.div
                className="bg-stone-800 rounded-2xl p-6 shadow-lg border border-stone-700 text-center"
                whileHover={{ scale: 1.05 }}
                >
                <p className="text-gray-400">Savings Progress</p>
                <p className="text-xl text-yellow-400 font-semibold">UGX 150,000 Saved</p>
                </motion.div>
            </div>
            </div>
        </SignedIn>
      <SignedOut>
        <RedirectToSignIn redirectUrl="/" />
      </SignedOut>
    </>
  );
}
