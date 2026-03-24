"use client";

export default function SuggestedPrompts({
  prompts,
  onSelect,
}: {
  prompts: string[];
  onSelect: (prompt: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 justify-center max-w-xl">
      {prompts.map((p) => (
        <button
          key={p}
          onClick={() => onSelect(p)}
          className="px-3 py-1.5 rounded-full border border-gray-200 bg-white text-sm text-gray-600 hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
        >
          {p}
        </button>
      ))}
    </div>
  );
}