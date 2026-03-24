import Link from "next/link";
import type { Session } from "@/types";
import { CheckCircle2, Clock, Circle, CalendarDays } from "lucide-react";

const statusIcon = {
  completed: <CheckCircle2 className="w-4 h-4 text-green-500" />,
  "in-progress": <Clock className="w-4 h-4 text-amber-500" />,
  planned: <Circle className="w-4 h-4 text-gray-300" />,
};

const subjectLabel = {
  "system-design": "System Design",
  algorithms: "Algorithms",
};

export default function RecentSessions({ sessions }: { sessions: Session[] }) {
  // Sort: completed/in-progress first, then planned; within each group by date desc
  const sorted = [...sessions].sort((a, b) => {
    const order = { completed: 0, "in-progress": 1, planned: 2 };
    if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Recent Sessions
        </h2>
        <Link
          href="/calendar"
          className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 font-medium"
        >
          <CalendarDays className="w-4 h-4" />
          View calendar
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
        {sorted.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between px-5 py-3.5"
          >
            <div className="flex items-center gap-3">
              {statusIcon[session.status]}
              <span className="text-sm text-gray-800">{session.title}</span>
            </div>
            <span className="text-sm text-gray-400">
              {subjectLabel[session.subject]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}