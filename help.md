Here’s a structured **workflow documentation** for your learning tracking chat app. This will serve as a blueprint for development, ensuring clarity on what to code and how components interact.

---

## **1. Overview**
**App Name:** Learning Tracker (or your preferred name)
**Type:** Full-stack chat application with LLM integration.
**Core Purpose:** Help users learn topics via interactive chat sessions (Interview or Learn mode) and track progress.

### **Key Features:**
- Topic selection (structured via LLM).
- Two modes: **Interview** (Q&A with feedback) and **Learn** (free-form chat).
- Session logging (date, topic, performance metrics).
- Progress tracking (via logged sessions).

---

## **2. Workflow Steps**
*(High-level flow with inputs/outputs)*

| **Step**               | **Action**                                                                 | **Input**                          | **Output**                          | **Component Responsible**       |
|-------------------------|---------------------------------------------------------------------------|------------------------------------|-------------------------------------|----------------------------------|
| 1. Topic Selection       | User selects/enters a topic.                                               | Topic text (e.g., "Python OOP")   | Structured topic data (JSON)         | Frontend → Backend → LLM API     |
| 2. Mode Selection        | User picks Interview or Learn mode.                                          | Mode choice (Interview/Learn)      | Confirmed mode                      | Frontend → Backend               |
| 3. Session Execution     | - **Interview Mode:** Backend generates questions; user answers; feedback given.<br>- **Learn Mode:** Free-form chat. | User answers/questions              | Chat responses, feedback (Interview) | Backend (LLM for responses)      |
| 4. Session End           | Session ends (auto or manual).                                              | Session data (topic, answers, etc.) | Logged session data                 | Backend → Database               |
| 5. Repeat               | User starts a new session.                                                  | -                                  | -                                   | Frontend/Backend                 |

---

## **3. Detailed Workflow Breakdown**

### **Step 1: Topic Selection**
**Goal:** Convert user’s natural language topic into a structured format.

#### **Frontend:**
- **UI Elements:**
  - Searchable topic list (predefined topics).
  - Input field for custom topics.
  - "Next" button to submit.
- **Logic:**
  - If user selects a predefined topic → send `topic_id` to backend.
  - If user types a custom topic → send raw text to backend.

#### **Backend:**
- **Endpoint:** `POST /api/topics/process`
  - **Input:** Raw topic text (e.g., `"How to use Python decorators"`).
  - **Process:**
    1. Call LLM API (e.g., OpenAI, Anthropic) with prompt:
       ```
       "Convert the following natural language topic into a structured format with:
       - topic_name: 'Python Decorators'
       - subtopics: ['Basics', 'Use Cases', 'Advanced Patterns']
       - difficulty: 'Intermediate'
       - tags: ['python', 'functions']
       Topic: {user_input}"
       ```
    2. Receive structured data (JSON) from LLM.
    3. Store structured topic in DB (if new) or fetch existing.
    4. Return structured topic to frontend.
  - **Output:** Structured topic JSON (e.g., `{topic_id: "123", name: "Python Decorators", ...}`).

#### **LLM API:**
- **Example Response:**
  ```json
  {
    "topic_id": "123",
    "name": "Python Decorators",
    "subtopics": ["Basics", "Use Cases", "Advanced Patterns"],
    "difficulty": "Intermediate",
    "tags": ["python", "functions"]
  }
  ```

#### **Error Handling:**
- If LLM API fails → Frontend shows error: "Couldn’t process topic. Try rephrasing."
- If topic is too vague → Backend prompts user: "Be more specific (e.g., 'Python decorators for logging')."

---

### **Step 2: Mode Selection**
**Goal:** Let user choose how they want to learn.

#### **Frontend:**
- **UI Elements:**
  - Two buttons: **"Interview Mode"** (structured Q&A) and **"Learn Mode"** (free-form chat).
  - Brief descriptions of each mode.
- **Logic:**
  - Send selected mode to backend: `POST /api/sessions/start` with `{mode: "interview"}`.

#### **Backend:**
- **Endpoint:** `POST /api/sessions/start`
  - **Input:** `{topic_id: "123", mode: "interview"}`.
  - **Process:**
    1. Create a new session in DB with `status: "active"`.
    2. Fetch topic data from DB.
    3. Return session ID and mode confirmation to frontend.
  - **Output:** `{session_id: "456", mode: "interview", topic: {...}}`.

---

### **Step 3: Session Execution**
*(Two sub-flows: Interview vs. Learn)*

#### **A. Interview Mode**
**Goal:** Simulate an interview with questions, follow-ups, and performance feedback.

##### **Frontend:**
- **UI Elements:**
  - Chat interface showing:
    - Current question.
    - User answer input field.
    - "Submit" button.
    - Optional: Timer, question counter.
  - "End Session" button.

##### **Backend:**
- **Endpoints:**
  1. `POST /api/sessions/{session_id}/next_question`
     - **Input:** `{session_id: "456", user_answer: "..."}` (for follow-ups).
     - **Process:**
       - Fetch topic data (subtopics, difficulty).
       - Generate question using LLM (prompt: *"Ask a follow-up question about [subtopic] based on the user’s last answer: [user_answer]."*).
       - Store question in DB linked to session.
     - **Output:** `{question: "How do decorators relate to closures in Python?", follow_up: true/false}`.

  2. `POST /api/sessions/{session_id}/end`
     - **Input:** `{session_id: "456"}`.
     - **Process:**
       - Mark session as `completed`.
       - Generate feedback:
         - Compare user answers to expected answers (or use LLM to evaluate).
         - Score in categories (e.g., Accuracy: 8/10, Clarity: 7/10).
       - Store feedback in DB.
     - **Output:** `{feedback: {...}, scores: {...}}`.

##### **LLM Integration:**
- **Question Generation Prompt:**
  ```
  "Generate a [difficulty]-level question about [subtopic] in [topic_name].
  Format: {question: '...', expected_answer: '...'}.
  Topic: Python Decorators, Subtopic: Basics, Difficulty: Intermediate"
  ```
- **Feedback Generation Prompt:**
  ```
  "Evaluate the user’s answers for [topic_name]:
  - Answers: [{answer: '...', correct: true/false}, ...]
  - Provide scores (0-10) for:
    - Accuracy
    - Clarity
    - Depth
  Format: {scores: {...}, strengths: [...], improvements: [...]}
  Topic: Python Decorators"
  ```

##### **Example Flow:**
1. Backend sends first question: *"What is a decorator in Python?"*
2. User answers: *"A function that modifies another function."*
3. Backend generates follow-up: *"Can you explain how the @ syntax works under the hood?"*
4. After 5 questions (or user clicks "End Session"), backend generates feedback.

---

#### **B. Learn Mode**
**Goal:** Free-form chat to fill knowledge gaps.

##### **Frontend:**
- **UI Elements:**
  - Chat interface with:
    - Message history.
    - Input field for user questions.
    - "End Session" button.

##### **Backend:**
- **Endpoints:**
  1. `POST /api/sessions/{session_id}/chat`
     - **Input:** `{session_id: "456", user_message: "Explain decorators with an example."}`
     - **Process:**
       - Use LLM to generate response (prompt: *"Explain [topic_name] in simple terms. User asked: [user_message]."*).
       - Store message in DB.
     - **Output:** `{response: "Decorators are functions that take another function... Here’s an example: [code]."}`

  2. `POST /api/sessions/{session_id}/end`
     - **Input:** `{session_id: "456"}`
     - **Process:**
       - Mark session as `completed`.
       - Log session (no feedback needed).
     - **Output:** `{status: "completed"}`

---

### **Step 4: Session Logging**
**Goal:** Persist session data for progress tracking.

#### **Backend:**
- **Endpoint:** `POST /api/sessions/{session_id}/log` (auto-called on session end).
  - **Input:** `{session_id: "456", mode: "interview", topic_id: "123", feedback: {...}, scores: {...}, duration_minutes: 15}`
  - **Process:**
    1. Update session in DB: `status: "completed"`, `ended_at: now()`.
    2. Store logs in `sessions` table.
    3. (Optional) Update user progress (if authenticated).
  - **Output:** `{success: true}`

#### **Database Schema (Example):**
```sql
-- Topics table (structured topics)
CREATE TABLE topics (
  topic_id VARCHAR(36) PRIMARY KEY,
  name TEXT NOT NULL,
  subtopics JSON,  -- e.g., ["Basics", "Advanced"]
  difficulty VARCHAR(20), -- "Beginner", "Intermediate", "Advanced"
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sessions table
CREATE TABLE sessions (
  session_id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36), -- NULL if anonymous
  topic_id VARCHAR(36) REFERENCES topics(topic_id),
  mode VARCHAR(10), -- "interview" or "learn"
  status VARCHAR(20), -- "active", "completed"
  started_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP,
  duration_minutes INTEGER,
  feedback JSON, -- Only for interview mode
  scores JSON -- Only for interview mode
);

-- Chat messages (for Learn mode or Interview Q&A)
CREATE TABLE chat_messages (
  message_id VARCHAR(36) PRIMARY KEY,
  session_id VARCHAR(36) REFERENCES sessions(session_id),
  sender VARCHAR(20), -- "user" or "ai"
  content TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

---

### **Step 5: Repeat**
- Frontend shows: *"Session complete! Start a new session?"* with a "New Topic" button.
- Backend resets state (or user refreshes page).

---

## **4. Data Flow Diagram (Text Representation)**
```
User
  │
  ▼
[Frontend UI]
  │
  ├─► Topic Selection ─────────────────────────────────► Backend ─────────────────────────────► LLM API
  │       (Raw text)                                      (Structured topic)               (Topic conversion)
  │
  ├─► Mode Selection ───────────────────────────────────► Backend
  │
  ▼
[Chat Interface]
  │
  ├─► Interview Mode ──────────────────────────────────► Backend ─────────────────────────────► LLM API
  │       (User answers)                                  (Questions/Feedback)               (Q&A generation)
  │
  ├─► Learn Mode ───────────────────────────────────────► Backend ─────────────────────────────► LLM API
  │       (User messages)                                (AI responses)                    (Explanations)
  │
  ▼
[Session End]
  │
  └─► Backend ─────────────────────────────────────────► Database
          (Logs session data)
```

---

## **5. API Endpoints Summary**
| **Endpoint**                          | **Method** | **Purpose**                          | **Request Body**                     | **Response**                     |
|---------------------------------------|------------|--------------------------------------|-------------------------------------|----------------------------------|
| `/api/topics/process`                 | POST       | Convert raw topic to structured format | `{text: "Python decorators"}`        | `{topic_id: "123", ...}`        |
| `/api/sessions/start`                 | POST       | Start a new session                  | `{topic_id: "123", mode: "interview"}` | `{session_id: "456", ...}`    |
| `/api/sessions/{id}/next_question`    | POST       | Get next question (Interview mode)   | `{session_id: "456", user_answer: "..."}` | `{question: "...", ...}`      |
| `/api/sessions/{id}/chat`             | POST       | Send/receive chat messages (Learn mode)| `{session_id: "456", user_message: "..."}` | `{response: "..."}`           |
| `/api/sessions/{id}/end`              | POST       | End session and log data             | `{session_id: "456"}`              | `{feedback: {...}, ...}`         |

---

## **6. Edge Cases & Considerations**
| **Scenario**                          | **Handling**                                                                 |
|---------------------------------------|------------------------------------------------------------------------------|
| LLM API fails                         | Retry 2x; if fails, show error: "AI service unavailable. Try again later."     |
| User ends session mid-Interview        | Log partial session; generate feedback for completed questions.                     |
| Topic is too vague                    | Backend asks: "Be more specific (e.g., 'Python decorators for logging')."   |
| User refreshes during session           | Frontend prompts: "Session in progress. Resume?" (or discard if inactive).      |
| Anonymous vs. Authenticated users       | If anonymous, store sessions in DB with `user_id: NULL`.                      |
| Rate limits on LLM API                | Cache structured topics; batch questions for Interview mode.                     |
| Performance assessment accuracy        | Use rubric-based scoring (e.g., "Did user mention closures?").              |

---
## **7. What to Code Next**
### **Frontend (Prioritize):**
1. **Topic Selection Page:**
   - Searchable topic list + input field.
   - Call `/api/topics/process` on submit.
2. **Mode Selection Page:**
   - Two buttons ("Interview" / "Learn") → call `/api/sessions/start`.
3. **Chat Interface:**
   - Reusable component for both modes.
   - For **Interview Mode**:
     - Display questions, handle answers, show feedback.
   - For **Learn Mode**:
     - Free-form chat with AI.
4. **Session End Screen:**
   - Show feedback (Interview) or summary (Learn).
   - "New Session" button.

### **Backend:**
1. **Topic Processing:**
   - Endpoint `/api/topics/process` + LLM API integration.
2. **Session Management:**
   - Endpoints `/api/sessions/start`, `/api/sessions/{id}/next_question`, `/api/sessions/{id}/end`.
3. **Chat Logic:**
   - Endpoint `/api/sessions/{id}/chat` for Learn mode.
4. **Database:**
   - Set up `topics`, `sessions`, and `chat_messages` tables.
   - Implement session logging.

### **LLM Integration:**
1. **Prompt Engineering:**
   - Design prompts for question generation, feedback, and explanations.
2. **Error Handling:**
   - Retry failed API calls; fallback responses.

### **Optional (Later):**
- User authentication (e.g., Firebase Auth).
- Progress dashboard (visualize logged sessions).
- Topic recommendations (e.g., "You struggled with decorators. Try closures next!").

---
## **8. Example User Journey**
1. **User opens app** → Sees "Enter a topic to learn" input.
2. **Types:** "How do Python decorators work?" → Backend converts to structured topic.
3. **Selects "Interview Mode"** → Backend starts session.
4. **Q1:** "What is a decorator?" → User answers.
5. **Q2:** "How does the @ syntax work?" → User answers.
6. **After 5 questions**, backend generates feedback:
   ```
   Score: Accuracy 8/10, Clarity 7/10
   Strengths: Good understanding of basics.
   Improvements: Explain closures in decorators.
   ```
7. **Session logged** → User sees "New Session" button.

---
## **9. Tools/Technologies Suggested**
| **Component**       | **Tech Options**                          |
|----------------------|------------------------------------------|
| Frontend            | React.js, Next.js, or Vue.js             |
| Backend             | Node.js (Express), Python (FastAPI), or Go |
| Database            | PostgreSQL (structured data) or Firebase   |
| LLM API            | OpenAI (GPT-4), Anthropic (Claude), or local LLM (e.g., Llama) |
| Authentication     | Firebase Auth, Auth0, or JWT             |
| Hosting            | Vercel (frontend), Render/AWS (backend)    |

---
## **10. Next Steps for You**
1. **Validate the workflow** with a quick prototype (e.g., build the topic selection + Interview mode flow first).
2. **Design UI mockups** for key screens (Figma/Excalidraw).
3. **Set up the backend** with the core endpoints.
4. **Integrate LLM API** (start with a free tier like OpenAI’s).
5. **Build the chat interface** (reusable for both modes).
6. **Add session logging** and database.

[ ]TODO: Implement redis for message history
Frontend → send message only
Backend → fetch history from Redis
Backend → append message
Backend → store updated history