<div align="center">

# Unfiltered

**Most dating apps want your highlight reel. Unfiltered wants your real.**

A dating app that rewards honesty over performance.

![Status](https://img.shields.io/badge/status-in%20development-f59e0b?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646cff?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ecf8e?style=for-the-badge&logo=supabase&logoColor=white)

</div>

<!-- TODO: add a hero screenshot or short GIF here, e.g. ![Unfiltered](public/screenshots/hero.png) -->

---

## The idea

Swipe apps reward whoever curates the best version of themselves. Unfiltered flips that: it asks people to be honest about who they are, then matches on what they actually answered, not on how good their photos look.

## How it works

| | Feature | What it does |
|:--|:--|:--|
| 1 | **7 layers of honest profiling** | Profiles are built up in seven layers instead of one bio box, so people are described by what they're really like. |
| 2 | **Gender-personalised onboarding** | The onboarding flow adapts to the person signing up. |
| 3 | **MCQ-based compatibility** | Compatibility is calculated from multiple-choice answers, not guesswork. |
| 4 | **Truth-first swipe system** | Swiping is designed to reward honest profiles over performative ones. |

<!-- TODO: name the 7 layers, explain how the compatibility score is calculated, and add a screenshot for each feature -->

## Tech stack

**Frontend:** React 19, Vite, React Router, Zustand (state), Tailwind CSS, lucide-react icons

**Backend:** Node.js server (`server.js`) organised as Routes, Controllers, Models and Utils

**Data:** Supabase (migrations and config live in `/supabase`)

## Project structure

```
Unfiltered-Dating-App/
├── Website/        # Frontend app
├── public/         # Static assets
├── Routes/         # API route definitions
├── Controllers/    # Request handling logic
├── Models/         # Data models
├── Utils/          # Shared helpers
├── supabase/       # Supabase config and migrations
├── server.js       # Backend entry point
└── vite.config.js
```

## Getting started

**Prerequisites:** Node.js 18+ and a Supabase project.

```bash
# 1. Clone
git clone https://github.com/yukyk/Unfiltered-Dating-App.git
cd Unfiltered-Dating-App

# 2. Install dependencies
npm install

# 3. Start the frontend dev server
npm run dev
```

Other scripts:

| Command | Purpose |
|:--|:--|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

<!-- TODO: add the command to start the backend (node server.js?) and list required environment variables, e.g. SUPABASE_URL and SUPABASE_ANON_KEY, with a .env.example -->

## Status and roadmap

Unfiltered is under active development. Core ideas are in place; polish, testing and deployment are next.

- [x] Core concept and profiling flow
- [ ] Live deployment
- [ ] Automated tests
- [ ] Screenshots and demo

<!-- TODO: adjust this checklist to match what is actually done -->

## Author

Built by **Yusuf Khambaty**
[GitHub](https://github.com/yukyk) · [LinkedIn](https://linkedin.com/in/yusufkhambaty)
