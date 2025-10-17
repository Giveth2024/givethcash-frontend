"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import Navbar from "../components/Navbar";

export default function GoalsPage() {
  const [formData, setFormData] = useState({
    goalName: "",
    goalType: "",
    targetAmount: "",
    deadline: "",
    allocateAmount: "",
    description: "",
  });

  const [goals, setGoals] = useState([
    {
      id: 1,
      goalName: "Buy a Laptop",
      goalType: "Short Term",
      targetAmount: 2000000,
      savedSoFar: 500000,
      deadline: "2026-03-01",
      description: "For coding projects and work.",
    },
    {
      id: 2,
      goalName: "Gym Membership",
      goalType: "Mid Term",
      targetAmount: 300000,
      savedSoFar: 50000,
      deadline: "2025-12-01",
      description: "Monthly plan to stay fit.",
    },
  ]);

  const [availableSavings, setAvailableSavings] = useState(50000);
  const [editGoalId, setEditGoalId] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save or update goal
  const handleSubmit = (e) => {
    e.preventDefault();
    const allocation = parseInt(formData.allocateAmount) || 0;

    if (allocation > availableSavings) {
      alert("Not enough savings to allocate!");
      return;
    }

    if (editGoalId) {
      setGoals((prev) =>
        prev.map((g) =>
          g.id === editGoalId
            ? {
                ...g,
                goalName: formData.goalName,
                goalType: formData.goalType,
                targetAmount: parseInt(formData.targetAmount),
                savedSoFar: Math.min(g.savedSoFar + allocation, parseInt(formData.targetAmount)),
                deadline: formData.deadline,
                description: formData.description,
              }
            : g
        )
      );
      setEditGoalId(null);
    } else {
      const newGoal = {
        id: Date.now(),
        goalName: formData.goalName,
        goalType: formData.goalType,
        targetAmount: parseInt(formData.targetAmount) || 0,
        savedSoFar: allocation,
        deadline: formData.deadline,
        description: formData.description,
      };
      setGoals((prev) => [newGoal, ...prev]);
    }

    setAvailableSavings((prev) => prev - allocation);

    setFormData({
      goalName: "",
      goalType: "",
      targetAmount: "",
      deadline: "",
      allocateAmount: "",
      description: "",
    });
  };

  const handleEdit = (goal) => {
    setEditGoalId(goal.id);
    setFormData({
      goalName: goal.goalName,
      goalType: goal.goalType,
      targetAmount: goal.targetAmount,
      deadline: goal.deadline,
      allocateAmount: "",
      description: goal.description,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    const goalToDelete = goals.find((g) => g.id === id);
    if (goalToDelete) setAvailableSavings((prev) => prev + goalToDelete.savedSoFar);
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const statusCounts = useMemo(() => {
    let completed = 0,
      active = 0,
      notStarted = 0;
    goals.forEach((g) => {
      const progress = g.targetAmount ? (g.savedSoFar / g.targetAmount) * 100 : 0;
      if (progress >= 100) completed++;
      else if (progress > 0) active++;
      else notStarted++;
    });
    return { completed, active, notStarted };
  }, [goals]);

  return (
    <>
      <SignedIn>
        <Navbar />
        <div className="min-h-screen bg-stone-900 text-white flex flex-col items-center p-6">
          <motion.h1
            className="text-2xl font-semibold mb-4 text-emerald-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            🎯 Dream Board 💭
          </motion.h1>
          <p className="text-gray-400 mb-6">Turn your savings into milestones.</p>

          {/* Available Savings */}
          <div className="bg-stone-800 p-4 rounded-xl border border-stone-700 w-full max-w-4xl text-center mb-6">
            <p className="text-gray-300">
              💰 Available to allocate:{" "}
              <span className="text-emerald-400 font-semibold">
                UGX {availableSavings.toLocaleString()}
              </span>
            </p>
          </div>

          {/* Completed Goals Total */}
          <div className="bg-stone-800 p-6 rounded-xl border border-stone-700 w-full max-w-4xl mb-6 text-center">
            <h2 className="text-lg text-emerald-400 font-semibold mb-2">🏁 Completed Goals</h2>
            <p className="text-gray-300">
              Total Amount from Completed Goals:{" "}
              <span className="text-emerald-400 font-semibold">
                UGX{" "}
                {goals
                  .filter((g) => g.savedSoFar >= g.targetAmount)
                  .reduce((sum, g) => sum + g.targetAmount, 0)
                  .toLocaleString()}
              </span>
            </p>
          </div>

          {/* Status Overview */}
          <div className="grid grid-cols-3 gap-4 mb-6 w-full max-w-4xl">
            <div className="bg-stone-800 p-4 rounded-xl border border-stone-700 text-center">
              <p className="text-emerald-400 font-semibold text-lg">{statusCounts.completed}</p>
              <p className="text-gray-400 text-sm">Completed</p>
            </div>
            <div className="bg-stone-800 p-4 rounded-xl border border-stone-700 text-center">
              <p className="text-yellow-400 font-semibold text-lg">{statusCounts.active}</p>
              <p className="text-gray-400 text-sm">Active</p>
            </div>
            <div className="bg-stone-800 p-4 rounded-xl border border-stone-700 text-center">
              <p className="text-red-400 font-semibold text-lg">{statusCounts.notStarted}</p>
              <p className="text-gray-400 text-sm">Not Started</p>
            </div>
          </div>

          {/* Goal Form */}
          <motion.form onSubmit={handleSubmit} className="w-full max-w-md bg-stone-800 p-6 rounded-2xl shadow-lg border border-stone-700 space-y-4">
            <div>
              <label className="block text-gray-300 mb-2 text-sm">Goal Name</label>
              <input type="text" name="goalName" value={formData.goalName} onChange={handleChange} placeholder="Buy a Laptop" className="w-full p-3 rounded-lg bg-stone-700 text-white border border-stone-600 placeholder-gray-400" />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">Type</label>
              <select name="goalType" value={formData.goalType} onChange={handleChange} className="w-full p-3 rounded-lg bg-stone-700 text-white border border-stone-600">
                <option value="">Select Type</option>
                <option value="Short Term">Short Term</option>
                <option value="Mid Term">Mid Term</option>
                <option value="Long Term">Long Term</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">Target Amount (UGX)</label>
              <input type="number" name="targetAmount" value={formData.targetAmount} onChange={handleChange} placeholder="2000000" className="w-full p-3 rounded-lg bg-stone-700 text-white border border-stone-600 placeholder-gray-400" />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">Allocate from Savings (UGX)</label>
              <input type="number" name="allocateAmount" value={formData.allocateAmount} onChange={handleChange} placeholder="10000" className="w-full p-3 rounded-lg bg-stone-700 text-white border border-stone-600 placeholder-gray-400" />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">Deadline</label>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full p-3 rounded-lg bg-stone-700 text-white border border-stone-600" />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">Description (Optional)</label>
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="For coding projects & work" className="w-full p-3 rounded-lg bg-stone-700 text-white border border-stone-600 resize-none" rows={3} />
            </div>

            <motion.button type="submit" className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white font-semibold" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              {editGoalId ? "Update Goal" : "Save Goal"}
            </motion.button>
          </motion.form>

          {/* Goals Table */}
          {goals.length > 0 && (
            <motion.div className="w-full max-w-6xl bg-stone-800 mt-10 rounded-2xl shadow-lg border border-stone-700 overflow-x-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <table className="w-full text-left border-collapse">
                <thead className="bg-stone-700 text-emerald-400">
                  <tr>
                    <th className="p-4">#</th>
                    <th className="p-4">Goal</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Target</th>
                    <th className="p-4">Saved</th>
                    <th className="p-4">Progress</th>
                    <th className="p-4">Deadline</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {goals.map((g, i) => {
                    const progress = Math.min(Math.round((g.savedSoFar / (g.targetAmount || 1)) * 100), 100);
                    const progressColor = progress >= 75 ? "bg-emerald-500" : progress >= 25 ? "bg-yellow-400" : "bg-red-500";

                    return (
                      <tr key={g.id} className="border-t border-stone-700 hover:bg-stone-700 transition">
                        <td className="p-4 text-gray-300">{i + 1}</td>
                        <td className="p-4 text-gray-300">{g.goalName}</td>
                        <td className="p-4 text-gray-300 max-w-xs truncate" title={g.description || ""}>{g.description || "—"}</td>
                        <td className="p-4 text-gray-300">{g.goalType}</td>
                        <td className="p-4 text-emerald-400 font-semibold">{(g.targetAmount || 0).toLocaleString()}</td>
                        <td className="p-4 text-yellow-400 font-semibold">{(g.savedSoFar || 0).toLocaleString()}</td>
                        <td className="p-4 w-52">
                          <div className="w-full bg-stone-600 h-3 rounded-full">
                            <div className={`${progressColor} h-3 rounded-full`} style={{ width: `${progress}%` }} />
                          </div>
                          <p className="text-xs text-gray-400 mt-1">{progress}%</p>
                        </td>
                        <td className="p-4 text-gray-400">{g.deadline || "—"}</td>
                        <td className="p-4 text-center space-x-2">
                          <button onClick={() => handleEdit(g)} className="bg-yellow-500 hover:bg-yellow-600 text-white my-1 px-3 py-1 rounded-lg text-sm">Edit</button>
                          <button onClick={() => handleDelete(g.id)} className="bg-red-600 hover:bg-red-700 text-white my-1 px-3 py-1 rounded-lg text-sm">Delete</button>
                        </td>
                      </tr>
                    );
                  })}
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
