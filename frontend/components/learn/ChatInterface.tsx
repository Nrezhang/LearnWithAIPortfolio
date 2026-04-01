"use client";

import { useState, useRef, useEffect } from "react";
import type {
  SubjectConfig,
  Topic,
  Mode,
  SessionPhase,
  ChatMessage,
  Feedback,
} from "@/types";
import { Globe, Code2, Send, Sparkles, BookOpen, Mic } from "lucide-react";
import TopicSelector from "./SuggestedTopics";
import ModeSelector from "./ModeSelect";
import ScoreCard from "./score";
import { API_BASE_URL } from "@/lib/config";
import ReactMarkdown from "react-markdown";

const INTERVIEW_MESSAGE_LIMIT = 2;
const LEARN_MESSAGE_LIMIT = 3;

const iconMap = {
  "system-design": Globe,
  algorithms: Code2,
};

const colorMap = {
  purple: { iconBg: "bg-purple-100", icon: "text-purple-600" },
  green: { iconBg: "bg-green-100", icon: "text-green-600" },
};

export default function ChatInterface({ subject }: { subject: SubjectConfig }) {
  const [phase, setPhase] = useState<SessionPhase>("topic-select");
  const [topic, setTopic] = useState<Topic | null>(null);
  const [mode, setMode] = useState<Mode | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiMessageCount, setAiMessageCount] = useState(0);
  const [score, setScore] = useState<Feedback | null>(null);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [finalSummary, setFinalSummary] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // const requestIDRef = useRef(0);

  const Icon = iconMap[subject.id];
  const colors = colorMap[subject.color];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ─── Get initial assistant message ───────────────────────────────────────

  const getInitialAssistantText = (t: Topic, m: Mode): string => {
    if (m === "learn") {
      return `What would you like to learn about ${t.title}?`;
    } else {
      return `Let's start your interview on ${t.title}. Are you ready?`;
    }
  };

  // ─── Log session ──────────────────────────────────────────────────────────

  const handleLogSessionAndRestart = async () => {
    if (!topic || !mode) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/chat/log-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subject.id,
          topic_id: topic.id,
          topic_label: topic.title,
          mode,
          messages,
          ai_message_count: aiMessageCount,
          score,
          summary: finalSummary,
        }),
      });

      if (!res.ok) {
        console.error("Failed to log session");
      }
    } catch (err) {
      console.error("Error logging session:", err);
    } finally {
      handleRestart();
    }
  };

  // ─── Navigation handlers ──────────────────────────────────────────────────

  const handleTopicSelect = (t: Topic) => {
    setTopic(t);
    setPhase("mode-select");
  };

  const handleModeSelect = (m: Mode) => {
    setMode(m);
    setPhase("chatting");
        if (topic) {
      const initialAssistantText = getInitialAssistantText(topic, m);
      setMessages([{ role: "assistant", content: initialAssistantText }]);
    }
  };

  const handleRestart = () => {
    setPhase("topic-select");
    setTopic(null);
    setMode(null);
    setMessages([]);
    setAiMessageCount(0);
    setScore(null);
    setError(null);
    setSessionComplete(false);
    setFinalSummary(null);
  };

  // ─── Send message ─────────────────────────────────────────────────────────

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    if (phase === "topic-select") {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/chat/normalize-topic`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: content }),
        });

        if (!res.ok) throw new Error("Failed to normalize topic");

        const data = await res.json();
            const normalizedTopic: Topic = data.topic ?? data;

            if (!normalizedTopic?.id || !normalizedTopic?.title) {
              throw new Error("Invalid normalized topic returned");
            }

        setTopic(normalizedTopic);
        setPhase("mode-select");
        setInput("");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to process topic",
        );
      } finally {
        setLoading(false);
      }

      return;
    }

    if (!topic || !mode) return;

    const activeLimit = mode === "interview" ? INTERVIEW_MESSAGE_LIMIT : LEARN_MESSAGE_LIMIT;
    if (aiMessageCount >= activeLimit) {
      setError("Message limit reached for this mode.");
      return;
    }

    const newMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/chat/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subject.id,
          topic_id: topic.id,
          topic_label: topic.title,
          mode,
          message: content,
          history: messages, // send history before this new message
          ai_message_count: aiMessageCount,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail ?? "Something went wrong");
      }

      const data = await res.json();
      const newCount = aiMessageCount + 1;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
      setAiMessageCount(newCount);

      const sessionEnded = newCount >= currentMessageLimit;
      if (sessionEnded) {
        // Fetch session summary from backend
        try {
          const summaryRes = await fetch(`${API_BASE_URL}/api/chat/summary`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              subject: subject.id,
              topic_id: topic.id,
              topic_label: topic.title,
              mode,
              message: content,
              history: [...messages, { role: "assistant", content: data.reply }],
              ai_message_count: newCount,
            }),
          });

          let summary = "Your session has finished.";
          let summaryData: { score?: Feedback; summary?: string; feedback?: string } | null = null;
          if (summaryRes.ok) {
            summaryData = await summaryRes.json();
            summary = summaryData?.summary || summary;
          }

          if (mode === "interview" && summaryData && summaryData.score) {
            setScore(summaryData.score);
            setSessionComplete(true);
            setFinalSummary(summaryData.feedback || summary);
            setPhase("review");
          } else {
            setSessionComplete(true);
            setFinalSummary(summary);
          }
        } catch (err) {
          console.error("Error fetching summary:", err);
          setSessionComplete(true);
          setFinalSummary("Your session has finished.");
        }
      }

      if (data.score) {
        setScore(data.score);
        if (sessionEnded) {
          setPhase("review");
        }
      }
    } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to process topic",
        )
      }finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const currentMessageLimit =
    mode === "interview" ? INTERVIEW_MESSAGE_LIMIT : LEARN_MESSAGE_LIMIT;

  const isFinalMessage =
    mode != null && aiMessageCount >= currentMessageLimit - 1;

  const messagesLeft =
    mode != null ? Math.max(currentMessageLimit - aiMessageCount, 0) : null;

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-screen">
      {/* Page header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-white shrink-0">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 ${colors.iconBg} rounded-xl flex items-center justify-center`}
          >
            <Icon className={`w-5 h-5 ${colors.icon}`} />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">{subject.label}</h1>
            {topic && (
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-400">{topic.title}</span>
                {mode && (
                  <>
                    <span className="text-gray-200">·</span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-500">
                      {mode === "learn" ? (
                        <>
                          <BookOpen className="w-3 h-3" /> Learn
                        </>
                      ) : (
                        <>
                          <Mic className="w-3 h-3" /> Interview
                        </>
                      )}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Chat progress */}
        {mode && phase === "chatting" && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">
              {messagesLeft !== null
                ? `${messagesLeft} messages left`
                : `${aiMessageCount}/${currentMessageLimit}`}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: currentMessageLimit }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i < aiMessageCount ? "bg-indigo-500" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {/* Topic select */}
        {phase === "topic-select" && (
          <div className="flex flex-col items-center justify-center min-h-full gap-6">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-indigo-500" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                What would you like to study?
              </h2>
              <p className="text-sm text-gray-400">
                Pick a topic to get started with {subject.label}.
              </p>
            </div>
            <TopicSelector subject={subject} onSelect={handleTopicSelect} />
          </div>
        )}

        {/* Mode select */}
        {phase === "mode-select" && topic && (
          <div className="flex flex-col items-center justify-start min-h-full gap-6 pt-8">
            <ModeSelector
              topic={topic}
              onSelect={handleModeSelect}
              onBack={() => setPhase("topic-select")}
            />
          </div>
        )}

        {/* Chat */}
        {phase === "chatting" && (
          <div className="space-y-4 max-w-2xl mx-auto">
            {messages.map((msg, i) => {
              const isLastAssistantMessage = msg.role === "assistant" && i === messages.length - 1 && sessionComplete;
              return (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-2xl px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-br-sm"
                        : isLastAssistantMessage
                        ? "bg-indigo-50 border border-indigo-200 text-gray-800 rounded-bl-sm"
                        : "bg-white border border-gray-100 text-gray-800 rounded-bl-sm"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              );
            })}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm text-sm text-gray-400">
                  <span className="animate-pulse">···</span>
                </div>
              </div>
            )}
            {error && (
              <p className="text-xs text-red-400 text-center">{error}</p>
            )}

            {/* Recap box shown after session complete */}
            {sessionComplete && finalSummary && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-indigo-50 border border-indigo-200 rounded-2xl px-4 py-3 text-sm text-gray-800 leading-relaxed">
                  <p className="font-semibold text-indigo-900 mb-2">Session Summary</p>
                  <ReactMarkdown>{finalSummary}</ReactMarkdown>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}

        {/* Score */}
        {phase === "review" && score && topic && (
          <div className="flex flex-col items-center justify-center min-h-full gap-4">
            {/* Show the last AI message above score */}
            {messages.length > 0 &&
              messages[messages.length - 1].role === "assistant" && (
                <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl px-4 py-3 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {messages[messages.length - 1].content}
                </div>
              )}
            <ScoreCard score={score} topic={topic} onRestart={handleRestart} />
          </div>
        )}
      </div>

      {/* Input bar — only visible during chat and not complete */}
      {phase === "chatting" && !sessionComplete && (
        <div className="shrink-0 px-8 py-4 border-t border-gray-100 bg-white">
          {isFinalMessage && !sessionComplete && (
            <p className="text-xs text-amber-500 text-center mb-2">
              This is your last response — the session will end after this.
            </p>
          )}
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-2.5 max-w-2xl mx-auto">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={"Type your message here..."}
              className="flex-1 text-sm bg-transparent outline-none placeholder-gray-400 text-gray-800"
              disabled={sessionComplete}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading || sessionComplete}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Save recap button — only visible when session complete */}
      {phase === "chatting" && sessionComplete && (
        <div className="shrink-0 px-8 py-4 border-t border-gray-100 bg-white">
          <button
            onClick={handleLogSessionAndRestart}
            className="w-full max-w-2xl mx-auto flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Save recap + start over
          </button>
        </div>
      )}

      {/* Topic select input bar */}
      {phase === "topic-select" && (
        <div className="shrink-0 px-8 py-4 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-2.5 max-w-2xl mx-auto">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={"Type your message here..."}
              className="flex-1 text-sm bg-transparent outline-none placeholder-gray-400 text-gray-800"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
