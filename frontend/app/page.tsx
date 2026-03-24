import SubjectCard from "@/components/dashboard/SubjectCard";
import RecentSessions from "@/components/dashboard/RecentSessions";
import { SUBJECTS, SESSIONS, USER } from "@/lib/data";

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Good morning, {USER.name} 👋
        </h1>
        <p className="text-gray-400 mt-1 text-sm">
          {USER.sessionsThisWeek} of {USER.weeklyGoal} sessions completed this week.
        </p>
      </div>

      {/* Subject cards */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {SUBJECTS.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>

      {/* Recent sessions */}
      <RecentSessions sessions={SESSIONS} />
    </div>
  );
}