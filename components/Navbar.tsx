"use client";

import { navItems } from "@/app/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b px-6 py-4 shadow-sm relative z-50">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-blue-500">BitrixApp</div>

        <div className="hidden lg:flex items-center gap-4">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 transition ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <Icon className="text-lg" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden mt-2"
          >
            <div className="flex flex-col items-center py-3 gap-3">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center gap-2 px-6 py-3 w-full justify-center transition
                      rounded-lg
                      ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "text-gray-700"
                      }
                      hover:bg-blue-50 hover:scale-105
                    `}
                  >
                    <Icon className="text-lg" />
                    <span className="text-lg font-medium">{label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
