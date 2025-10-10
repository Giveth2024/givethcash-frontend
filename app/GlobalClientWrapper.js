"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function GlobalClientWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const [serverOnline, setServerOnline] = useState(false);
  const fastIntervalRef = useRef(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Stabilize checkServer with useCallback
  const checkServer = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}`);
      if (response.status === 200) {
        console.log(response.data.message);
        setServerOnline(true);
        setLoading(false);

        if (fastIntervalRef.current) {
          clearInterval(fastIntervalRef.current);
          fastIntervalRef.current = null;
        }
        return true;
      }
    } catch (error) {
      console.log("❌ Server Offline:", error.message);
      setServerOnline(false);
      setLoading(true);
      return false;
    }
  }, [BACKEND_URL]); // only changes if BACKEND_URL changes

  // Stabilize startFastCheck and depend on checkServer
  const startFastCheck = useCallback(() => {
    if (!fastIntervalRef.current) {
      fastIntervalRef.current = setInterval(() => {
        checkServer();
      }, 5000);
    }
  }, [checkServer]);

  useEffect(() => {
    let slowInterval;

    const slowCheck = async () => {
      const online = await checkServer();
      if (!online) {
        console.log("⚠️ Server offline. Starting fast 5-second checks.");
        startFastCheck();
      }
    };

    // initial run
    slowCheck();

    slowInterval = setInterval(slowCheck, 90000); // every 90s

    return () => {
      clearInterval(slowInterval);
      if (fastIntervalRef.current) {
        clearInterval(fastIntervalRef.current);
        fastIntervalRef.current = null;
      }
    };
  }, [checkServer, startFastCheck]); // safe: functions are stable via useCallback

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900 text-white">
        <motion.div
          className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        <motion.p
          className="mt-4 text-lg font-semibold text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          Connecting to Giveth₵₳$H server...
        </motion.p>
      </div>
    );
  }

  return <>{children}</>;
}
