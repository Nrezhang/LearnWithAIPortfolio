https://www.notion.so/Product-Reqs-32c59cf5ddc980759534c9c1beaa57bc?source=copy_link

## Frontend
app/
  layout.tsx                        ← root layout (sidebar + body wrapper)
  globals.css                       ← tailwind directives
  page.tsx                          ← / dashboard
  learn/[subject]/page.tsx          ← /learn/system-design + /learn/algorithms
  calendar/page.tsx                 ← /calendar
  about/page.tsx                    ← /about

components/
  layout/Sidebar.tsx                ← shared nav (used by layout.tsx)
  dashboard/SubjectCard.tsx
  dashboard/RecentSessions.tsx
  learn/ChatInterface.tsx
  learn/SuggestedPrompts.tsx
  about/ProfileHeader.tsx
  about/SkillsSection.tsx
  about/ExperienceSection.tsx
  about/AskAIWidget.tsx

lib/data.ts                         ← all mock data + constants
types/index.ts                      ← shared TypeScript types

## Backend

FastAPI 
uvicorn main:app --reload


## TODO:
hardcoded about section info needs to be fetched from central repo in backend
