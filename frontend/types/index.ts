export type Subject = "system-design" | "algorithms";

export type Mode = "learn" | "interview";

export type SessionPhase = "topic-select" | "mode-select" | "chatting" | "review";

export type SessionStatus = "completed" | "in-progress" | "planned";

export interface Feedback {
  understanding: number; 
  communication: number;
  coverage: number;
  summary: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
}

export interface Session {
  id: string;
  title: string;
  subject: Subject;
  date: string; // ISO date string "YYYY-MM-DD"
  status: SessionStatus;
  mode?: Mode;
  score?: Feedback; 
}
export interface SubjectConfig {
  id: Subject;
  label: string;
  description: string;
  color: "purple" | "green";
  suggestedTopics: Topic[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}