"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function IncomePage() {
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    date: "",
    notes: "",
  });

  const [incomes, setIncomes] = useState([
    { id: 1, source: "Freelance - Website", amount: 200000, date: "2025-10-06", notes: "Client payment" },
    { id: 2, source: "Salary", amount: 800000, date: "2025-09-30", notes: "September salary" },
    { id: 3, source: "Side Hustle - Tutoring", amount: 150000, date: "2025-09-10", notes: "Math tutoring" },
    { id: 4, source: "Freelance - Logo", amount: 100000, date: "2025-08-18", notes: "Logo design" },
    { id: 5, source: "Investment Dividends", amount: 50000, date: "2025-10-14", notes: "Q3 Stock dividends" },
    { id: 6, source: "Refund", amount: 15000, date: "2025-10-12", notes: "Software subscription refund" },
    { id: 7, source: "Salary", amount: 800000, date: "2025-10-31", notes: "October salary" },
    { id: 8, source: "Rental Income", amount: 350000, date: "2025-10-01", notes: "Apartment rent" },
    { id: 9, source: "Freelance - Consulting", amount: 250000, date: "2025-09-25", notes: "Project kickoff fee" },
    { id: 10, source: "Gift", amount: 50000, date: "2025-09-15", notes: "Birthday money" },
    { id: 11, source: "Side Hustle - Sales", amount: 75000, date: "2025-09-05", notes: "Online craft sales" },
    { id: 12, source: "Freelance - Article", amount: 60000, date: "2025-08-28", notes: "Tech blog post payment" },
    { id: 13, source: "Investment Interest", amount: 12000, date: "2025-08-20", notes: "Savings account interest" },
    { id: 14, source: "Salary", amount: 800000, date: "2025-08-31", notes: "August salary" },
    { id: 15, source: "Rental Income", amount: 350000, date: "2025-09-01", notes: "Apartment rent" },
    { id: 16, source: "Bonus", amount: 100000, date: "2025-07-25", notes: "Mid-year performance bonus" },
    { id: 17, source: "Freelance - Maintenance", amount: 30000, date: "2025-07-15", notes: "Website maintenance retainer" },
    { id: 18, source: "Side Hustle - Surveys", amount: 5000, date: "2025-10-03", notes: "Online survey payout" },
    { id: 19, source: "Salary", amount: 800000, date: "2025-07-31", notes: "July salary" },
    { id: 20, source: "Freelance - Ebook", amount: 95000, date: "2025-06-30", notes: "Ebook royalties/sales" }
  ]);

  const [filter, setFilter] = useState("ALL");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIncome = {
      id: Date.now(),
      source: formData.source || "Income",
      amount: Number(formData.amount) || 0,
      date: formData.date || new Date().toISOString().slice(0, 10),
      notes: formData.notes || "",
    };
    setIncomes((prev) => [newIncome, ...prev]);
    console.log("🧾 Income Added:", newIncome);
    setFormData({ source: "", amount: "", date: "", notes: "" });
  };

  // 🗑️ Delete income
  const handleDelete = (id) => {
    setIncomes((prev) => prev.filter((i) => i.id !== id));
  };

  const isThisMonth = (iso) => {
    const now = new Date();
    const d = new Date(iso);
    return now.getFullYear() === d.getFullYear() && now.getMonth() === d.getMonth();
  };

  const isLastMonth = (iso) => {
    const now = new Date();
    const d = new Date(iso);
    const last = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return d.getFullYear() === last.getFullYear() && d.getMonth() === last.getMonth();
  };

  const filteredIncomes = useMemo(() => {
    if (filter === "THIS") return incomes.filter((i) => isThisMonth(i.date));
    if (filter === "LAST") return incomes.filter((i) => isLastMonth(i.date));
    return incomes;
  }, [incomes, filter]);

  const lastIncome = filteredIncomes.length ? filteredIncomes[0] : null;

  const allocation = useMemo(() => {
    if (!lastIncome) return null;
    const amt = Number(lastIncome.amount || 0);
    return {
      needs: Math.round(amt * 0.5),
      wants: Math.round(amt * 0.3),
      savings: Math.round(amt * 0.2),
    };
  }, [lastIncome]);

  const formatUGX = (n) => `UGX ${Number(n || 0).toLocaleString("en-UG")}`;

  return (
    <>
        <SignedIn>
            <Navbar />
            <main className="min-h-screen bg-stone-900 text-white flex flex-col items-center px-4 py-10">
                <motion.h1
                    className="text-3xl font-bold mb-8 text-emerald-400 text-center sticky top-0 z-40 bg-stone-900/50 backdrop-blur-sm py-4 w-full"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    💼 Add New Income
                </motion.h1>

                <div className="w-full max-w-4xl grid grid-cols-1 gap-8">
                    {/* Form */}
                    <motion.form
                    onSubmit={handleSubmit}
                    className="w-full bg-stone-800 p-6 rounded-2xl shadow-lg border border-stone-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    >
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2 font-medium">Source</label>
                        <input
                        type="text"
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                        placeholder="e.g. Freelance project, Salary"
                        className="w-full p-3 rounded-lg bg-stone-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 outline-none"
                        required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2 font-medium">Amount (UGX)</label>
                        <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="e.g. 200000"
                        className="w-full p-3 rounded-lg bg-stone-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 outline-none"
                        required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2 font-medium">Date</label>
                        <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-stone-700 text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                        required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2 font-medium">Notes</label>
                        <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Optional: e.g. Client payment for website design"
                        className="w-full p-3 rounded-lg bg-stone-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 outline-none"
                        rows="3"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition font-semibold"
                    >
                        Save Income
                    </motion.button>
                    </motion.form>

                    {/* Summary + Filter + Table */}
                    <div className="w-full flex flex-col gap-6">
                    <motion.div
                        className="bg-stone-800 p-5 rounded-2xl shadow-lg border border-stone-700"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p className="text-gray-400 text-sm">Last Income Summary</p>
                        {lastIncome ? (
                        <>
                            <p className="text-white font-semibold mt-2">
                            Your last income was <span className="text-emerald-400">{formatUGX(lastIncome.amount)}</span>
                            </p>
                            <p className="text-gray-300 mt-2 text-sm">
                            Allocated: <span className="text-green-300">{formatUGX(allocation.needs)}</span> to Needs,{" "}
                            <span className="text-blue-300">{formatUGX(allocation.wants)}</span> to Wants,{" "}
                            <span className="text-yellow-300">{formatUGX(allocation.savings)}</span> to Savings.
                            </p>
                            <p className="text-gray-400 mt-2 text-xs italic">{lastIncome.source} — {new Date(lastIncome.date).toLocaleDateString()}</p>
                        </>
                        ) : (
                        <p className="text-gray-300 mt-2">No incomes yet.</p>
                        )}
                    </motion.div>

                    <motion.div
                        className="bg-stone-800 p-4 rounded-2xl shadow-lg border border-stone-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex gap-2 items-center">
                        <p className="text-gray-300 text-sm">Show:</p>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-stone-700 text-gray-200 p-2 rounded-md outline-none"
                        >
                            <option value="ALL">All</option>
                            <option value="THIS">This Month</option>
                            <option value="LAST">Last Month</option>
                        </select>
                        </div>

                        <div className="text-gray-400 text-sm">
                        <p>{filteredIncomes.length} result(s)</p>
                        </div>
                    </motion.div>

                    {/* Table with Delete */}
                    <motion.div
                        className="bg-stone-800 p-4 rounded-2xl shadow-lg border border-stone-700 overflow-x-auto"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <table className="w-full min-w-[720px] table-auto">
                        <thead>
                            <tr className="text-left text-gray-300 text-sm border-b border-stone-700">
                            <th className="py-2 px-3">Date</th>
                            <th className="py-2 px-3">Source</th>
                            <th className="py-2 px-3">Notes</th>
                            <th className="py-2 px-3 text-right">Amount</th>
                            <th className="py-2 px-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredIncomes.length ? (
                            filteredIncomes.map((inc) => (
                                <tr key={inc.id} className="border-b border-stone-800">
                                <td className="py-3 px-3 text-gray-200">{new Date(inc.date).toLocaleDateString()}</td>
                                <td className="py-3 px-3 text-gray-100">{inc.source}</td>
                                <td className="py-3 px-3 text-gray-400">{inc.notes || "-"}</td>
                                <td className="py-3 px-3 text-right text-emerald-400 font-medium">{formatUGX(inc.amount)}</td>
                                <td className="py-3 px-3 text-center">
                                    <button
                                    onClick={() => handleDelete(inc.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition"
                                    >
                                    Delete
                                    </button>
                                </td>
                                </tr>
                            ))
                            ) : (
                            <tr>
                                <td colSpan="5" className="py-6 text-center text-gray-400">No incomes for this filter.</td>
                            </tr>
                            )}
                        </tbody>
                        </table>
                    </motion.div>
                    </div>
                </div>
            </main>
        </SignedIn>
        <SignedOut>
            <RedirectToSignIn redirectUrl="/" />
       </SignedOut>
    </>
  );
}
