"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="flex justify-between items-center p-6 bg-stone-800 sticky top-0 z-50 border-b border-stone-800">
      {/* ================= Logo ================= */}
      <Link href="/" className="text-3xl font-bold text-emerald-400">
        Giveth₵₳$H
      </Link>

      {/* ================= Desktop Nav ================= */}
      <nav className="hidden md:flex space-x-6 text-gray-300 font-semibold">
        <Link href="/dashboard" className="hover:text-emerald-400">Dashboard</Link>
        <Link href="/income" className="hover:text-emerald-400">Income</Link>
        <Link href="/expenses" className="hover:text-emerald-400">Expenses</Link>
        <Link href="/goals" className="hover:text-emerald-400">Goals</Link>
        <Link href="/reports" className="hover:text-emerald-400">Reports</Link>
      </nav>

      {/* ================= Auth Buttons ================= */}
      <div className="hidden md:block">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>

      {/* ================= Mobile Menu Button ================= */}
      <button
        className="md:hidden text-gray-300 hover:text-emerald-400 focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* ================= Mobile Dropdown Menu ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-20 left-0 w-full bg-stone-700 border-t border-stone-800 md:hidden flex flex-col items-center space-y-4 py-6 text-gray-300 font-semibold shadow-lg"
          >
            <Link href="/dashboard" className="hover:text-emerald-400" onClick={() => setIsOpen(false)}>Dashboard</Link>
            <Link href="/income" className="hover:text-emerald-400" onClick={() => setIsOpen(false)}>Income</Link>
            <Link href="/expenses" className="hover:text-emerald-400" onClick={() => setIsOpen(false)}>Expenses</Link>
            <Link href="/goals" className="hover:text-emerald-400" onClick={() => setIsOpen(false)}>Goals</Link>
            <Link href="/reports" className="hover:text-emerald-400" onClick={() => setIsOpen(false)}>Reports</Link>

            <div>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
