"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  Code2,
  CalendarDays,
  User,
  Sparkles,
} from "lucide-react";

const navItems = [
  { label: "Dashboard",     href: "/",                    icon: LayoutDashboard },
  { label: "System Design", href: "/learn/system-design", icon: Globe },
  { label: "Algorithms",    href: "/learn/algorithms",    icon: Code2 },
  { label: "Calendar",      href: "/calendar",            icon: CalendarDays },
  { label: "About Me",      href: "/about",               icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-semibold tracking-tight">LearnAI</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-indigo-600 text-white"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}