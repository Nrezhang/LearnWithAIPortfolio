export type Subject = "system-design" | "algorithms";

export type SessionStatus = "completed" | "in-progress" | "planned";

export interface Session {
  id: string;
  title: string;
  subject: Subject;
  date: string; // ISO date string "YYYY-MM-DD"
  status: SessionStatus;
}

export interface SubjectConfig {
  id: Subject;
  label: string;
  description: string;
  color: "purple" | "green";
  suggestedPrompts: string[];
}