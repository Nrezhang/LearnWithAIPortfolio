# Project Name

## Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend:** FastAPI (Python), Uvicorn

## File Structure

### Frontend

```
app/
├── layout.tsx                        # Root layout (sidebar + body wrapper)
├── globals.css                       # Tailwind directives
├── page.tsx                          # / (dashboard)
├── learn/[subject]/page.tsx          # /learn/system-design, /learn/algorithms
├── calendar/page.tsx                 # /calendar
└── about/page.tsx                    # /about

components/
├── layout/
│   └── Sidebar.tsx                   # Shared nav (used by layout.tsx)
├── dashboard/
│   ├── SubjectCard.tsx
│   └── RecentSessions.tsx
├── learn/
│   ├── ChatInterface.tsx
│   └── SuggestedPrompts.tsx
└── about/
    ├── ProfileHeader.tsx
    ├── SkillsSection.tsx
    ├── ExperienceSection.tsx
    └── AskAIWidget.tsx

lib/
└── data.ts                           # Mock data + constants

types/
└── index.ts                          # Shared TypeScript types
```

### Backend

```
routes/
└── about.py                
services/
└──about_service.py
main.py

```
# FastAPI server
uvicorn main:app --reload
```

## TODO

- [ ] Fetch About section info from central backend repo (currently hardcoded)
- [ ] handle race conditions in chat
