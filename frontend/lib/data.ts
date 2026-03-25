import type { Session, SubjectConfig } from "@/types";

export const SUBJECTS: SubjectConfig[] = [
  {
    id: "system-design",
    label: "System Design",
    description: "Distributed systems, databases, caching, and architecture.",
    color: "purple",
    suggestedTopics: [
      { id: "load-balancers", title: "Load Balancers", description: "Distribute traffic across servers" },
      { id: "database-sharding", title: "Database Sharding", description: "Horizontal DB partitioning" },
      { id: "caching", title: "Caching Strategies", description: "Redis, CDN, cache invalidation" },
      { id: "url-shortener", title: "URL Shortener", description: "Design bit.ly from scratch" },
      { id: "rate-limiting", title: "Rate Limiting", description: "Throttle API requests at scale" },
      { id: "cap-theorem", title: "CAP Theorem", description: "Consistency, availability, partition tolerance" },
      { id: "message-queues", title: "Message Queues", description: "Kafka, RabbitMQ, async processing" },
      { id: "microservices", title: "Microservices", description: "vs monolith, service discovery" },
      { id: "cdn", title: "CDN Design", description: "Content delivery at a global scale" },
      { id: "chat-system", title: "Chat System", description: "Real-time messaging architecture" },
    ],
  },
  {
    id: "algorithms",
    label: "Algorithms",
    description: "Sorting, graphs, dynamic programming, and complexity.",
    color: "green",
    suggestedTopics: [
      { id: "binary-search", title: "Binary Search", description: "Search in O(log n) time" },
      { id: "dynamic-programming", title: "Dynamic Programming", description: "Memoization and tabulation" },
      { id: "graph-traversal", title: "Graph Traversal", description: "BFS, DFS, and applications" },
      { id: "sorting", title: "Sorting Algorithms", description: "Merge sort, quicksort, heapsort" },
      { id: "trees", title: "Trees & BSTs", description: "Traversals, balancing, operations" },
      { id: "sliding-window", title: "Sliding Window", description: "Efficient subarray problems" },
      { id: "two-pointers", title: "Two Pointers", description: "In-place array techniques" },
      { id: "recursion", title: "Recursion & Backtracking", description: "Recursive thinking patterns" },
      { id: "heaps", title: "Heaps & Priority Queues", description: "Min/max heap operations" },
      { id: "big-o", title: "Big O Notation", description: "Time and space complexity" },
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
    mode: "learn",
  },
  {
    id: "2",
    title: "Binary Search Deep Dive",
    subject: "algorithms",
    date: "2026-03-21",
    status: "completed",
    mode: "interview",
    score: {
      understanding: 8,
      coverage: 6,
      communication: 7,
      summary: "Good understanding of the algorithm but struggled with edge cases.",
    },
  },
  {
    id: "3",
    title: "Database Sharding Strategies",
    subject: "system-design",
    date: "2026-03-20",
    status: "in-progress",
    mode: "learn",
  },
  {
    id: "4",
    title: "Dynamic Programming Basics",
    subject: "algorithms",
    date: "2026-03-18",
    status: "completed",
    mode: "learn",
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
    mode: "interview",
    score: {
      understanding: 7,
      coverage: 8,
      communication: 9,
      summary: "Strong communication and grasp of BFS/DFS tradeoffs.",
    },
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