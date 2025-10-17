"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import Navbar from "../components/Navbar";

//Remember to create logic to update expenses. Expenses will affect needs, wants and savings. Cater this the next time you program.

export default function ExpensesPage() {
  // ✅ Preloaded sample expenses
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      category: "Needs",
      description: "Bought groceries",
      amount: 45000,
      notes: "Included rice and cooking oil",
      date: new Date("2025-10-02T10:00:00").toLocaleString("en-UG", {
        timeZone: "Africa/Kampala",
      }),
    },
    {
      id: 2,
      category: "Wants",
      description: "Movie ticket",
      amount: 20000,
      notes: "Watched Deadpool 3 at Acacia Mall",
      date: new Date("2025-10-05T18:00:00").toLocaleString("en-UG", {
        timeZone: "Africa/Kampala",
      }),
    },
    {
      id: 3,
      category: "Savings",
      description: "Emergency fund deposit",
      amount: 100000,
      notes: "Monthly top-up",
      date: new Date("2025-10-10T09:30:00").toLocaleString("en-UG", {
        timeZone: "Africa/Kampala",
      }),
    },
  ]);

  const [formData, setFormData] = useState({
    category: "",
    description: "",
    amount: "",
    date: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.amount) return;

    const currentTime = new Date().toLocaleString("en-UG", {
      timeZone: "Africa/Kampala",
    });

    const newExpense = {
      id: Date.now(),
      ...formData,
      date: formData.date || currentTime,
    };

    setExpenses((prev) => [newExpense, ...prev]);
    console.log("🧾 Expense Recorded:", newExpense);

    setFormData({
      category: "",
      description: "",
      amount: "",
      date: "",
      notes: "",
    });
  };

  const handleDelete = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  return (
    <>
      <SignedIn>
        <Navbar />
        <div className="min-h-screen bg-stone-900 text-white flex flex-col items-center p-6">
          <motion.h1
            className="text-2xl font-semibold mb-6 text-emerald-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            🧾 Record Your Expenses
          </motion.h1>

          {/* ================= Expense Form ================= */}
          <motion.form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-stone-800 p-6 rounded-2xl shadow-lg border border-stone-700 space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category */}
            <div>
              <label className="block text-gray-300 mb-2 text-sm">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-stone-700 text-white border border-stone-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select Category</option>
                <option value="Needs">Needs</option>
                <option value="Wants">Wants</option>
                <option value="Savings">Savings</option>
              </select>
            </div>

            {/* Expenses */}
            <div>
              <label className="block text-gray-300 mb-2 text-sm">
                Expenses
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Bought groceries"
                className="w-full p-3 rounded-lg bg-stone-700 text-white border border-stone-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-gray-300 mb-2 text-sm">
                Amount (UGX)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="20000"
                className="w-full p-3 rounded-lg bg-stone-700 text-white border border-stone-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-gray-300 mb-2 text-sm">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Optional notes..."
                className="w-full p-3 rounded-lg bg-stone-700 text-white border border-stone-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                rows={3}
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-300 mb-2 text-sm">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-stone-700 text-white border border-stone-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white font-semibold shadow-md transition"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Save Expense
            </motion.button>
          </motion.form>

          {/* ================= Expenses Table ================= */}
          {expenses.length > 0 && (
            <motion.div
              className="w-full max-w-5xl bg-stone-800 mt-10 rounded-2xl shadow-lg border border-stone-700 overflow-x-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <table className="w-full text-left border-collapse">
                <thead className="bg-stone-700 text-emerald-400">
                  <tr>
                    <th className="p-4">#</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Amount (UGX)</th>
                    <th className="p-4">Notes</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((exp, index) => (
                    <tr
                      key={exp.id}
                      className="border-t border-stone-700 hover:bg-stone-700 transition"
                    >
                      <td className="p-4 text-gray-300">{index + 1}</td>
                      <td className="p-4 text-gray-300">{exp.category}</td>
                      <td className="p-4 text-gray-300">{exp.description}</td>
                      <td className="p-4 text-emerald-400 font-semibold">
                        {parseInt(exp.amount).toLocaleString()}
                      </td>
                      <td className="p-4 text-gray-400">{exp.notes || "—"}</td>
                      <td className="p-4 text-gray-400">{exp.date}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDelete(exp.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn redirectUrl="/" />
      </SignedOut>
    </>
  );
}
