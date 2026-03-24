"use client";

import { useState } from "react";
import { SESSIONS } from "@/lib/data";
import type { Session } from "@/types";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const subjectColor: Record<Session["subject"], string> = {
  "system-design": "bg-purple-100 text-purple-700",
  algorithms: "bg-green-100 text-green-700",
};

const subjectIcon: Record<Session["subject"], string> = {
  "system-design": "⊙",
  algorithms: "</>",
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Group sessions by date string
  const sessionsByDate: Record<string, Session[]> = {};
  SESSIONS.forEach((s) => {
    if (!sessionsByDate[s.date]) sessionsByDate[s.date] = [];
    sessionsByDate[s.date].push(s);
  });

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };
  const goToday = () => { setMonth(today.getMonth()); setYear(today.getFullYear()); };

  // Build grid cells: nulls for leading empty days, then 1..daysInMonth
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="p-8 max-w-5xl">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-gray-400 text-sm mt-1">Track your learning journey.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
          <Plus className="w-4 h-4" />
          Plan Session
        </button>
      </div>

      {/* Calendar card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        {/* Month nav */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            {MONTHS[month]} {year}
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={goToday}
              className="px-3 py-1 text-sm text-gray-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Today
            </button>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {DAYS.map((d) => (
            <div key={d} className="text-xs font-medium text-gray-400 text-center py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            if (day === null) {
              return <div key={`empty-${i}`} className="aspect-square" />;
            }
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const daySessions = sessionsByDate[dateStr] ?? [];
            const isToday =
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();

            return (
              <div
                key={dateStr}
                className={`min-h-[80px] p-1.5 border border-transparent rounded-xl ${
                  isToday ? "bg-indigo-50 border-indigo-200" : "hover:bg-gray-50"
                }`}
              >
                <span
                  className={`text-sm font-medium block mb-1 ${
                    isToday ? "text-indigo-600" : "text-gray-700"
                  }`}
                >
                  {day}
                </span>
                <div className="space-y-0.5">
                  {daySessions.map((s) => (
                    <div
                      key={s.id}
                      className={`text-xs px-1.5 py-0.5 rounded-md truncate ${subjectColor[s.subject]}`}
                      title={s.title}
                    >
                      {subjectIcon[s.subject]} {s.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}