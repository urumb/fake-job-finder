"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Shield, Home, Search, LayoutDashboard, BarChart2, History, Link as LinkIcon, Settings } from "lucide-react";
import { motion } from "framer-motion";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/scanner", label: "Scanner", icon: Search },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/analytics", label: "Analytics", icon: BarChart2 },
    { href: "/history", label: "History", icon: History },
    { href: "/blockchain", label: "Blockchain", icon: LinkIcon },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white">
          <Shield className="w-6 h-6 text-indigo-500" />
          <span className="font-bold tracking-wider">AEGIS AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm transition-colors rounded-md",
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                )}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {link.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-white/10 rounded-md"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
