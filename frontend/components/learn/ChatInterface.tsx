"use client";

import { useState, useRef, useEffect } from "react";
import type { SubjectConfig } from "@/types";
import { Globe, Code2, Send, Sparkles } from "lucide-react";
import SuggestedPrompts from "./SuggestedPrompts";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const iconMap = {
  "system-design": Globe,
  algorithms: Code2,
};

const colorMap = {
  purple: {
    header: "text-purple-600",
    iconBg: "bg-purple-100",
    icon: "text-purple-600",
    sendBtn: "bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-200",
  },
  green: {
    header: "text-green-600",
    iconBg: "bg-green-100",
    icon: "text-green-600",
    sendBtn: "bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-200",
  },
};

export default function ChatInterface({ subject }: { subject: SubjectConfig }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const Icon = iconMap[subject.id];
  const colors = colorMap[subject.color];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    setMessages((prev) => [...prev, { role: "user", content }]);
    setInput("");
    setLoading(true);

    // TODO: Replace with real API call to FastAPI backend
    // const res = await fetch("/api/chat", {
    //   method: "POST",
    //   body: JSON.stringify({ subject: subject.id, message: content, history: messages }),
    // });
    // const data = await res.json();
    // setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);

    await new Promise((r) => setTimeout(r, 900));
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `This is a placeholder response for "${content}". Connect your FastAPI backend to get real answers about ${subject.label}.`,
      },
    ]);
    setLoading(false);
    inputRef.current?.focus();
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Page header */}
      <div className="flex items-center gap-3 px-8 py-5 border-b border-gray-100 bg-white shrink-0">
        <div className={`w-9 h-9 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${colors.icon}`} />
        </div>
        <div>
          <h1 className="font-semibold text-gray-900">{subject.label}</h1>
          <p className="text-xs text-gray-400">
            {subject.id === "system-design"
              ? "Master distributed systems and architecture patterns"
              : "Sharpen your problem-solving with algorithms"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-indigo-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                What would you like to learn?
              </h2>
              <p className="text-sm text-gray-400 max-w-sm">
                Ask me anything about {subject.label.toLowerCase()}. I&apos;ll explain
                concepts, walk through designs, and test your knowledge.
              </p>
            </div>
            <SuggestedPrompts
              prompts={subject.suggestedPrompts}
              onSelect={sendMessage}
            />
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-2xl px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white rounded-br-sm"
                      : "bg-white border border-gray-100 text-gray-800 rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm text-sm text-gray-400">
                  <span className="animate-pulse">···</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Input bar */}
      <div className="shrink-0 px-8 py-4 border-t border-gray-100 bg-white">
        <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-2.5">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={`Ask about ${subject.label.toLowerCase()}...`}
            className="flex-1 text-sm bg-transparent outline-none placeholder-gray-400 text-gray-800"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className={`w-8 h-8 flex items-center justify-center rounded-xl text-white transition-colors ${colors.sendBtn}`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}