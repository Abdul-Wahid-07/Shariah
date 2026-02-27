"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Image from "next/image";

export default function SignInPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <Navbar />

      <div className="relative h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-emerald-900 via-emerald-800 to-black px-6 overflow-hidden">
        
        {/* Background Glow Effect */}
        <div className="absolute w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-3xl top-[-200px] right-[-200px]" />
        <div className="absolute w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl bottom-[-150px] left-[-150px]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative backdrop-blur-xl bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-md"
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.jpg"
              alt="HalalWealth Logo"
              width={60}
              height={60}
              className="drop-shadow-md"
              priority
            />
          </div>

          <h2 className="text-3xl font-bold text-center mb-4 text-emerald-800">
            Welcome Back
          </h2>

          {/* Demo Notice */}
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl p-4 mb-6 text-center">
            🔔 <strong>Demo Login Only</strong> <br />
            Email: <strong>halal@wealth.com</strong> <br />
            Password: <strong>123456</strong>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 transition"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 transition"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-emerald-700 text-white py-3 rounded-xl font-semibold hover:bg-emerald-800 transition shadow-lg"
            >
              Sign In
            </motion.button>
          </form>

          {/* Footer Note */}
          <p className="text-xs text-gray-500 text-center mt-6">
            This is a demonstration dashboard for HalalWealth.
          </p>
        </motion.div>
      </div>
    </>
  );
}
