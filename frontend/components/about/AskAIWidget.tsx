"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const PLACEHOLDER_RESPONSES: Record<string, string> = {
  default:
    "I'm Alex Johnson, a software engineer focused on distributed systems and backend infrastructure. Feel free to ask about my skills, experience, or projects!",
};

export default function AskAIWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // TODO: replace with real API call to FastAPI backend
    await new Promise((r) => setTimeout(r, 800));
    const reply: Message = {
      role: "assistant",
      content:
        PLACEHOLDER_RESPONSES[text.toLowerCase()] ??
        PLACEHOLDER_RESPONSES.default,
    };
    setMessages((prev) => [...prev, reply]);
    setLoading(false);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Floating trigger button (bottom of page, matches screenshot) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-md text-sm font-medium text-gray-700 hover:shadow-lg transition-shadow"
        >
          <span className="text-purple-500">✦</span>
          Ask AI about me
        </button>
      )}

      {/* Widget panel */}
      {open && (
        <div className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <span className="text-purple-500">✦</span>
              Ask about Alex
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-lg leading-none"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-40 max-h-72">
            {messages.length === 0 && (
              <p className="text-xs text-gray-400 text-center mt-4">
                Ask anything about skills, experience, or projects.
              </p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-purple-600 text-white rounded-br-sm"
                      : "bg-gray-100 text-gray-800 rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-400 px-3 py-2 rounded-xl rounded-bl-sm text-sm">
                  <span className="animate-pulse">···</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 border-t border-gray-100">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask something..."
              className="flex-1 text-sm bg-transparent outline-none placeholder-gray-400 text-gray-800"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-600 text-white disabled:opacity-40 hover:bg-purple-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M3.105 3.105a1 1 0 0 1 1.317-.092l13 9a1 1 0 0 1 0 1.65l-13 9A1 1 0 0 1 3 21.75V3.75a1 1 0 0 1 .105-.645z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}