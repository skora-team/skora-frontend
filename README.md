# Skora Frontend

Skora is a gamified learning frontend for programming and data topics (Python, R, SQL) with quest-style progression, battle-mode quizzes, achievements, daily bonus XP, and a dashboard synced to a backend API.

## Tech Stack

- React 19 + TypeScript
- Vite 7
- React Router 7
- Tailwind CSS 4
- Framer Motion + GSAP (UI motion/interaction)
- Lucide React + React Icons
- React Markdown + remark/rehype plugins (lesson rendering)

## Core Features

- Retro game-inspired landing and onboarding experience
- Signup and login with JWT session storage
- Operator session hydration via `/me/`
- Dashboard with:
  - course modules
  - backend-synced progress bars
  - quest panel
  - daily XP bonus
  - narrative banner
- Course and lesson flows with backend quiz data
- Turn-based battle quiz UI
- XP gain tracking and streak logic
- Achievement unlock system with toast notifications
- Skill tree view (currently mock-data driven)
- Error boundary and theme context provider

## Project Structure

```
src/
  app.tsx                      # Route map
  main.tsx                     # App bootstrap (router + providers + error boundary)
  Home.tsx                     # Landing page
  LevelUpSection.tsx

  pages/
    Login.tsx
    Signup.tsx
    VideoPage.tsx
    SkillTreePage.tsx
    Dashboard/
      DashboardHome.tsx
      CoursePage.tsx
      LessonPage.tsx
      SettingsPage.tsx

  components/
    dashboard/LessonContent.tsx
    layout/DashboardLayout.tsx
    BattleUI.tsx
    QuestPanel.tsx
    AchievementsPanel.tsx
    AchievementToast.tsx
    QuizResultsCard.tsx
    ...

  hooks/
    useGameState.ts
    useBattle.ts
    useAchievements.ts
    useDailyBonus.ts
    useQuestSystem.ts
    ...

  services/
    api.ts                     # Backend API client + auth helpers

  types/
    api.types.ts

  utils/
    enemyGenerator.ts
    narrativeContent.ts
```

## Routing Overview

- `/` -> Landing page
- `/about` -> About page
- `/login` -> Login
- `/signup` -> Signup
- `/video` -> Intro video overlay
- `/skills` and `/skill-tree` -> Skill tree page
- `/DashboardHome` -> Main dashboard
- `/settings` -> Settings
- `/course/:courseId` -> Course details
- `/course/:courseId/lesson/:lessonId` -> Lesson + quiz + battle flow

## Backend Integration

The frontend currently targets:

`https://skora-backend.onrender.com`

This base URL is defined in:

- `src/services/api.ts`
- `src/pages/Login.tsx`
- `src/pages/Signup.tsx`

### Auth/session behavior

- `token` is persisted in localStorage after login/signup.
- `operator_id` is persisted in localStorage.
- Session recovery attempts to hydrate identity through `/me/` when possible.

### API behavior notes

- Requests normalize leading/trailing slash behavior for FastAPI-style endpoints.
- Auth header is automatically attached when token exists.
- Some completion reads intentionally degrade to empty arrays on `404/405` to keep UI stable.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

### 5. Lint

```bash
npm run lint
```

## NPM Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Type-check and build
- `npm run preview` - Preview production bundle
- `npm run lint` - Run ESLint

## Local Storage Keys

- `token` - JWT access token
- `operator_id` - current authenticated user id
- `progress_version` - client-side cache-busting key for progress refresh

## Recommended Next Improvement

Move API host configuration to a single `VITE_API_BASE_URL` environment variable and read it from one shared config module to avoid divergence across pages and services.

## License

No license file is currently defined in this repository. Planning to add MIT license in future
