"use client";

import type { Mode, Topic } from "@/types";
import { BookOpen, Mic } from "lucide-react";

interface Props {
  topic: Topic;
  onSelect: (mode: Mode) => void;
  onBack: () => void;
}

const modes: {
  id: Mode;
  label: string;
  description: string;
  detail: string;
  icon: React.ElementType;
}[] = [
  {
    id: "learn",
    label: "Learn",
    description: "Conversational deep dive",
    detail:
      "Explain your current understanding and I'll identify gaps, ask clarifying questions, and build on what you know.",
    icon: BookOpen,
  },
  {
    id: "interview",
    label: "Interview",
    description: "Simulated technical interview",
    detail:
      "I'll give you a real problem, ask follow-up questions like an interviewer, and score your performance at the end.",
    icon: Mic,
  },
];

export default function ModeSelector({ topic, onSelect, onBack }: Props) {
  return (
    <div className="w-full max-w-xl">
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={onBack}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Back
        </button>
        <span className="text-xs text-gray-300">/</span>
        <span className="text-xs font-medium text-gray-600">{topic.title}</span>
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4 text-center">
        Choose a mode
      </p>

      <div className="grid grid-cols-2 gap-3">
        {modes.map(({ id, label, description, detail, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className="flex flex-col items-start gap-3 p-5 rounded-2xl border border-gray-200 bg-white text-left hover:border-indigo-300 hover:bg-indigo-50 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
              <Icon className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{label}</p>
              <p className="text-xs text-indigo-500 font-medium mb-2">{description}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{detail}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}