"use client";

import type { Topic, SubjectConfig } from "@/types";

interface Props {
  subject: SubjectConfig;
  onSelect: (topic: Topic) => void;
}

const colorMap = {
  purple: {
    card: "hover:border-purple-300 hover:bg-purple-50",
    dot: "bg-purple-400",
  },
  green: {
    card: "hover:border-green-300 hover:bg-green-50",
    dot: "bg-green-400",
  },
};

export default function TopicSelector({ subject, onSelect }: Props) {
  const colors = colorMap[subject.color];

  return (
    <div className="w-full max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4 text-center">
        Choose a topic
      </p>
      <div className="grid grid-cols-2 gap-2">
        {subject.suggestedTopics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelect(topic)}
            className={`flex items-start gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white text-left transition-all ${colors.card}`}
          >
            <span className={`w-2 h-2 rounded-full ${colors.dot} mt-1.5 shrink-0`} />
            <div>
              <p className="text-sm font-medium text-gray-800">{topic.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{topic.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}