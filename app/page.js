"use client";

import { motion } from "framer-motion";
import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Navbar from "./components/Navbar";

export default function LandingPage() {
  const { user, isSignedIn } = useUser();

  if (isSignedIn && user) {
    console.log("User Clerk ID:", user.id);
    console.log(user);
  console.log("Public Metadata:", user.publicMetadata);
  }

  return (
    <div className="min-h-screen text-white flex flex-col">
      {/* ================= Navbar ================= */}
      <Navbar />

      {/* ================= Hero Section ================= */}
      <section className="flex flex-col items-center justify-center text-center flex-1 px-4 py-12">
        <motion.h2 
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Take Control of Your Money 💸
        </motion.h2>
        <motion.p 
          className="text-gray-300 mb-6 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Budget smart, save like a boss, and crush your goals. No cap.
        </motion.p>

        <motion.button
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Tracking
        </motion.button>

        {isSignedIn && (
          <p className="mt-6 text-emerald-400 font-semibold text-lg">
            Welcome back, {user.firstName}! 👋
          </p>
        )}
      </section>

      {/* ================= Features Section ================= */}
      <section id="features" className="grid md:grid-cols-3 gap-6 px-6 py-12">
        <motion.div className="bg-stone-800 rounded-2xl p-6 shadow-lg text-center" whileHover={{ scale: 1.05 }}>
          <h3 className="text-2xl font-bold mb-2">Budget Like a Pro</h3>
          <p className="text-gray-300">50% Needs, 30% Wants, 20% Savings. No more broke vibes.</p>
        </motion.div>

        <motion.div className="bg-stone-800 rounded-2xl p-6 shadow-lg text-center" whileHover={{ scale: 1.05 }}>
          <h3 className="text-2xl font-bold mb-2">Goals? We Got You</h3>
          <p className="text-gray-300">Short-term, mid-term, long-term. Watch your dreams glow up.</p>
        </motion.div>

        <motion.div className="bg-stone-800 rounded-2xl p-6 shadow-lg text-center" whileHover={{ scale: 1.05 }}>
          <h3 className="text-2xl font-bold mb-2">Charts & Insights</h3>
          <p className="text-gray-300">Pretty graphs = brain-friendly. Money tracking, simplified.</p>
        </motion.div>
      </section>

      {/* ================= Goals Section ================= */}
      <section id="goals" className="px-6 py-12 text-center">
        <motion.h2 className="text-4xl font-bold mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Set Goals, Flex Later
        </motion.h2>
        <p className="text-gray-300 mb-6">
          Want that PS5? A mini-vacay? Or just stacking cash? Set your goals and watch Giveth₵₳$H do the math for you. 😎
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <div className="bg-stone-800 rounded-2xl p-6 shadow-lg w-60">Short-term: Treat yo&#39; self 🍕</div>
          <div className="bg-stone-800 rounded-2xl p-6 shadow-lg w-60">Mid-term: Chill getaway 🏖️</div>
          <div className="bg-stone-800 rounded-2xl p-6 shadow-lg w-60">Long-term: Future $$$ 💰</div>
        </div>
      </section>

      {/* ================= Budget Section ================= */}
      <section className="px-6 py-12 text-center bg-stone-800 rounded-3xl mx-6 my-6 shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-emerald-400">Budget Your Life</h2>
        <p className="text-gray-300 mb-6">
          50% Needs, 30% Wants, 20% Savings. Giveth₵₳$H literally does the hard math while you sip coffee ☕.
        </p>
      </section>

      {/* ================= Chart Preview Section ================= */}
      <section id="charts" className="px-6 py-12 text-center">
        <h2 className="text-4xl font-bold mb-6">See Your Money Glow</h2>
        <p className="text-gray-300 mb-6">Colorful charts + graphs = instant dopamine. Analytics never looked this good.</p>
        <div className="bg-stone-800 rounded-3xl p-6 shadow-lg mx-auto max-w-3xl">
          <p className="text-gray-400 italic">[Charts will appear here 💹]</p>
        </div>
      </section>

      {/* ================= Testimonials ================= */}
      <section className="px-6 py-12 text-center bg-stone-900">
        <h2 className="text-4xl font-bold mb-6">Even Giveth Approves 😎</h2>
        <p className="text-gray-300 mb-6">
          &#34;Finally, an app that talks my language and actually makes me save money. No more dead accounts.&#34; – Giveth
        </p>
      </section>
    </div>
  );
}
