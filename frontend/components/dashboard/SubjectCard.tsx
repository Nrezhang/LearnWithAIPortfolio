import Link from "next/link";
import type { SubjectConfig } from "@/types";
import { ArrowRight, Globe, Code2 } from "lucide-react";

const iconMap = {
  "system-design": Globe,
  algorithms: Code2,
};

const colorMap = {
  purple: {
    bg: "bg-purple-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    link: "text-purple-600 hover:text-purple-800",
  },
  green: {
    bg: "bg-green-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    link: "text-green-600 hover:text-green-800",
  },
};

export default function SubjectCard({ subject }: { subject: SubjectConfig }) {
  const Icon = iconMap[subject.id];
  const colors = colorMap[subject.color];

  return (
    <div className={`${colors.bg} rounded-2xl p-6`}>
      <div className={`w-10 h-10 ${colors.iconBg} rounded-xl flex items-center justify-center mb-4`}>
        <Icon className={`w-5 h-5 ${colors.iconColor}`} />
      </div>
      <h2 className="font-semibold text-gray-900 mb-1">{subject.label}</h2>
      <p className="text-sm text-gray-500 mb-4 leading-relaxed">
        {subject.description}
      </p>
      <Link
        href={`/learn/${subject.id}`}
        className={`inline-flex items-center gap-1 text-sm font-medium ${colors.link} transition-colors`}
      >
        Open tutor <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}