import type { Session, SubjectConfig } from "@/types";

export const SUBJECTS: SubjectConfig[] = [
  {
    id: "system-design",
    label: "System Design",
    description: "Distributed systems, databases, caching, and architecture.",
    color: "purple",
    suggestedPrompts: [
      "Explain load balancers and when to use them",
      "How does database sharding work?",
      "Design a URL shortener like bit.ly",
      "What is the CAP theorem?",
      "Design a real-time chat system",
      "Explain microservices vs monolith",
    ],
  },
  {
    id: "algorithms",
    label: "Algorithms",
    description: "Sorting, graphs, dynamic programming, and complexity.",
    color: "green",
    suggestedPrompts: [
      "Explain binary search and its time complexity",
      "How does BFS differ from DFS?",
      "What is dynamic programming?",
      "Walk me through merge sort",
      "Explain Big O notation",
      "What are common graph algorithms?",
    ],
  },
];

export const SESSIONS: Session[] = [
  {
    id: "1",
    title: "Load Balancers & Reverse Proxies",
    subject: "system-design",
    date: "2026-03-22",
    status: "completed",
  },
  {
    id: "2",
    title: "Binary Search Deep Dive",
    subject: "algorithms",
    date: "2026-03-21",
    status: "completed",
  },
  {
    id: "3",
    title: "Database Sharding Strategies",
    subject: "system-design",
    date: "2026-03-20",
    status: "in-progress",
  },
  {
    id: "4",
    title: "Dynamic Programming Basics",
    subject: "algorithms",
    date: "2026-03-18",
    status: "completed",
  },
  {
    id: "5",
    title: "Design a URL Shortener",
    subject: "system-design",
    date: "2026-03-25",
    status: "planned",
  },
  {
    id: "6",
    title: "Graph Traversal",
    subject: "algorithms",
    date: "2026-03-15",
    status: "completed",
  },
  {
    id: "7",
    title: "Merge Sort & Quick Sort",
    subject: "algorithms",
    date: "2026-03-28",
    status: "planned",
  },
];

export const USER = {
  name: "Alex",
  weeklyGoal: 5,
  sessionsThisWeek: 3,
};