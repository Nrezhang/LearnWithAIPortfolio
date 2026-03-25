"use client";

import type { Feedback  , Topic } from "@/types";
import { RotateCcw } from "lucide-react";

interface Props {
  score: Feedback;
  topic: Topic;
  onRestart: () => void;
}

const scoreCategories: { key: keyof Omit<Feedback, "summary">; label: string }[] = [
  { key: "understanding", label: "Understanding" },
  { key: "coverage", label: "Coverage" },
  { key: "communication", label: "Communication" },
];

function ScoreBar({ value }: { value: number }) {
  const pct = (value / 10) * 100;
  const color =
    value >= 8 ? "bg-green-400" : value >= 6 ? "bg-amber-400" : "bg-red-400";

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-gray-700 w-6 text-right">
        {value}
      </span>
    </div>
  );
}

export default function ScoreCard({ score, topic, onRestart }: Props) {
  const avg = Math.round(
    scoreCategories.reduce((sum, c) => sum + score[c.key], 0) /
      scoreCategories.length
  );

  const overallColor =
    avg >= 8 ? "text-green-500" : avg >= 6 ? "text-amber-500" : "text-red-500";

  return (
    <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
            Interview complete
          </p>
          <h2 className="text-lg font-semibold text-gray-900">{topic.title}</h2>
        </div>
        <div className={`text-3xl font-bold ${overallColor}`}>{avg}<span className="text-base text-gray-300">/10</span></div>
      </div>

      {/* Score bars */}
      <div className="space-y-3 mb-5">
        {scoreCategories.map(({ key, label }) => (
          <div key={key}>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-gray-500">{label}</span>
            </div>
            <ScoreBar value={score[key]} />
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-xl px-4 py-3 mb-5">
        <p className="text-xs font-medium text-gray-400 mb-1">Summary</p>
        <p className="text-sm text-gray-700 leading-relaxed">{score.summary}</p>
      </div>

      {/* Actions */}
      <button
        onClick={onRestart}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        Start a new session
      </button>
    </div>
  );
}