"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  LayoutDashboard,
  TrendingUp,
  Wallet,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50 border-b">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        
        {/* LOGO */}
        <Link href="/">
          <div className="text-2xl font-bold text-emerald-700 cursor-pointer">
            HalalWealth
          </div>
        </Link>

        {/* ===== DESKTOP NAV ===== */}
        <div className="hidden md:flex items-center gap-6">

          {user ? (
            <>
              <Link href="/dashboard">
                <div className="flex items-center gap-2 text-gray-700 hover:text-emerald-700 transition">
                  <LayoutDashboard size={18} />
                  Dashboard
                </div>
              </Link>

              <Link href="/dashboard#trading">
                <div className="flex items-center gap-2 text-gray-700 hover:text-emerald-700 transition">
                  <TrendingUp size={18} />
                  Trading
                </div>
              </Link>

              <Link href="/dashboard#zakat">
                <div className="flex items-center gap-2 text-gray-700 hover:text-emerald-700 transition">
                  <Wallet size={18} />
                  Zakat
                </div>
              </Link>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold"
              >
                {user.email}
              </motion.div>

              <button
                onClick={logout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              {[
                { name: "Home", link: "/#home" },
                { name: "Stocks", link: "/#stocks" },
                { name: "Gold", link: "/#gold" },
                { name: "Silver", link: "/#silver" },
                { name: "Moon", link: "/#moon" },
                { name: "Screening", link: "/#screening" },
                { name: "Contact", link: "/#contact" },
                { name: "Blog", link: "/#blog" },
              ].map((item) => (
                <Link key={item.name} href={item.link}>
                  <button className="text-gray-800 hover:text-emerald-700 font-medium transition-colors">
                    {item.name}
                  </button>
                </Link>
              ))}

              <Link href="/signin">
                <button className="bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-800 transition">
                  Sign In
                </button>
              </Link>
            </>
          )}
        </div>

        {/* ===== MOBILE BUTTON ===== */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg border-t"
          >
            <div className="flex flex-col p-6 space-y-4">

              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <div className="flex items-center gap-2">
                      <LayoutDashboard size={18} />
                      Dashboard
                    </div>
                  </Link>

                  <Link href="/dashboard#trading" onClick={() => setIsOpen(false)}>
                    <div className="flex items-center gap-2">
                      <TrendingUp size={18} />
                      Trading
                    </div>
                  </Link>

                  <Link href="/dashboard#zakat" onClick={() => setIsOpen(false)}>
                    <div className="flex items-center gap-2">
                      <Wallet size={18} />
                      Zakat
                    </div>
                  </Link>

                  <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg text-sm">
                    {user.email}
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 text-red-600"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {[
                    { name: "Home", link: "/#home" },
                    { name: "Stocks", link: "/#stocks" },
                    { name: "Gold", link: "/#gold" },
                    { name: "Silver", link: "/#silver" },
                    { name: "Moon", link: "/#moon" },
                    { name: "Screening", link: "/#screening" },
                    { name: "Contact", link: "/#contact" },
                    { name: "Blog", link: "/#blog" },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      href={item.link}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}

                  <Link href="/signin" onClick={() => setIsOpen(false)}>
                    <button className="bg-emerald-700 text-white px-4 py-2 rounded-lg">
                      Sign In
                    </button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
