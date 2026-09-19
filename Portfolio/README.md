<div align="center">

```
 ███████╗███████╗███╗   ██╗████████╗ █████╗ ███╗   ███╗██╗██╗      ███████╗███████╗██╗     ██╗   ██╗ █████╗ ███╗   ██╗
 ██╔════╝██╔════╝████╗  ██║╚══██╔══╝██╔══██╗████╗ ████║██║██║      ██╔════╝██╔════╝██║     ██║   ██║██╔══██╗████╗  ██║
 ███████╗█████╗  ██╔██╗ ██║   ██║   ███████║██╔████╔██║██║██║      ███████╗█████╗  ██║     ██║   ██║███████║██╔██╗ ██║
 ╚════██║██╔══╝  ██║╚██╗██║   ██║   ██╔══██║██║╚██╔╝██║██║██║      ╚════██║██╔══╝  ██║     ╚██╗ ██╔╝██╔══██║██║╚██╗██║
 ███████║███████╗██║ ╚████║   ██║   ██║  ██║██║ ╚═╝ ██║██║███████╗ ███████║███████╗███████╗ ╚████╔╝ ██║  ██║██║ ╚████║
 ╚══════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚══════╝ ╚══════╝╚══════╝╚══════╝  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝
```

# 🌌 Sentamilselvan — Dual-Mode Portfolio

**A cinematic, premium, fully interactive developer portfolio with two distinct UI personalities — switch between a dark cyberpunk Digital Universe and a clean Professional mode, all sharing the same live data.**

[![React](https://img.shields.io/badge/React-19.x-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-ff0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Three.js](https://img.shields.io/badge/Three.js-0.184-black?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Dual UI Mode System](#-dual-ui-mode-system)
- [Live Preview](#-live-preview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Data Architecture](#-data-architecture)
- [Admin Panel](#-admin-panel)
- [Component Architecture](#-component-architecture)
  - [Universe Mode Components](#universe-mode-components)
  - [Professional Mode Components](#professional-mode-components)
  - [Shared Components](#shared-components)
- [Global CSS System](#-global-css-system)
- [Visual Design System](#-visual-design-system)
- [Special Features](#-special-features)
- [Easter Eggs](#-easter-eggs)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Dependencies](#-dependencies)
- [Performance](#-performance)
- [Browser Compatibility](#-browser-compatibility)

---

## 🌟 Overview

This is not a typical developer portfolio. It is a **cinematic interactive experience** with two complete UI personalities that share the same underlying data. Every section feels alive with motion, every interaction is intentional, and the overall aesthetic draws inspiration from:

- **Apple Keynote** — smooth transitions, purposeful animation
- **Cyberpunk Futurism** — neon glows, holographic panels, scan lines (Universe mode)
- **Modern SaaS Design** — clean white/purple professional aesthetic (Professional mode)
- **AAA Game Menus** — immersive UI, atmospheric depth

The portfolio is built entirely with **React + Vite + Tailwind CSS v4 + Framer Motion**, with zero backend dependencies — just a single static build. All data is managed via `localStorage`.

---

## 🔀 Dual UI Mode System

The portfolio ships with two complete, independent UI modes that coexist in a single React app.

### Universe Mode (Default)
- Dark near-black background (`#020408`)
- Neon cyan / purple / pink accent palette
- Custom cursor with mouse trail
- Particle field background
- Cinematic loader with text scramble + portal zoom
- Konami code and logo-click Easter eggs
- Orbitron display font, JetBrains Mono for code

### Professional Mode
- Clean white / off-white background (`#faf7ff`)
- Purple / magenta (`#c026d3`) accent palette
- Native OS cursor restored
- Minimal, card-based layouts
- Smooth Framer Motion entry animations
- Inter / system font stack

### Mode Switching
- A **UI Mode Toggle** button lives in both navbars (desktop + mobile drawer)
- Clicking it triggers a 600ms `ModeTransition` overlay fade
- The selected mode persists to `localStorage('portfolioMode')`
- `App.jsx` toggles `body.universe-mode` / `body.pro-mode` classes for CSS scoping
- The custom cursor and trail are scoped to `body.universe-mode` only — Professional mode restores the native cursor

### Architecture
```
ModeContext (React Context)
  ├── portfolioMode: 'universe' | 'professional'
  ├── switchMode()
  └── transitioning: boolean

AppContent (App.jsx)
  ├── body.universe-mode class → UniverseApp
  └── body.pro-mode class     → ProfessionalApp

AnimatePresence (opacity + scale transition between modes)
```

---

## 🚀 Live Preview

```bash
# Run locally
npm run dev
# Open http://localhost:5173
```

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.x | UI component framework |
| **Vite** | 8.x | Build tool and dev server |
| **Tailwind CSS** | 4.x | Utility-first styling (via `@tailwindcss/vite` plugin) |
| **Framer Motion** | 12.x | All animations and transitions |
| **Three.js** | 0.184 | 3D scene capability (via `@react-three/fiber` + `@react-three/drei`) |
| **GSAP** | 3.15 | Scroll-driven effects |
| **React Intersection Observer** | 10.x | Scroll-triggered reveal animations |
| **React Scroll** | 1.9 | Smooth section navigation |
| **Google Fonts** | — | Orbitron, Inter, JetBrains Mono |

---

## 📁 Project Structure

```
Portfolio/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── admin/                        # Admin panel (password-protected)
│   │   ├── components/               # Admin UI components
│   │   ├── pages/                    # Admin page views
│   │   ├── AdminApp.jsx              # Admin root component
│   │   ├── AdminLogin.jsx            # Session-based login
│   │   └── useAdminData.js           # Admin save → localStorage + event dispatch
│   │
│   ├── assets/
│   │   └── hero.png
│   │
│   ├── components/
│   │   ├── professional/             # Professional mode components
│   │   │   ├── ProfessionalNavbar.jsx
│   │   │   ├── ProfessionalHero.jsx
│   │   │   ├── ProfessionalAbout.jsx
│   │   │   ├── ProfessionalSkills.jsx
│   │   │   ├── ProfessionalProjects.jsx
│   │   │   ├── ProfessionalCodingProfiles.jsx
│   │   │   ├── ProfessionalAchievements.jsx
│   │   │   ├── ProfessionalInternship.jsx
│   │   │   └── ProfessionalContact.jsx
│   │   │
│   │   ├── shared/                   # Components used by both modes
│   │   │   ├── UiModeToggle.jsx      # Toggle button (Universe ↔ Professional)
│   │   │   └── ModeTransition.jsx    # 600ms overlay fade during mode switch
│   │   │
│   │   ├── About.jsx                 # Universe: scroll-animated timeline
│   │   ├── AchievementVault.jsx      # Universe: vault door unlock animation
│   │   ├── CodingProfiles.jsx        # Universe: stats dashboard
│   │   ├── Contact.jsx               # Universe: AI terminal form
│   │   ├── Hero.jsx                  # Universe: 3D command center
│   │   ├── Loader.jsx                # Cinematic portal intro
│   │   ├── Navbar.jsx                # Universe: floating navigation
│   │   ├── ParticleField.jsx         # Canvas particle system
│   │   ├── Projects.jsx              # Universe: project galaxy
│   │   └── Skills.jsx                # Universe: skill matrix orbs
│   │
│   ├── context/
│   │   └── ModeContext.jsx           # UI mode state (universe | professional)
│   │
│   ├── data/
│   │   └── portfolioData.js          # Single source of truth for all portfolio data
│   │
│   ├── hooks/
│   │   └── usePortfolioData.js       # Reactive hook — listens for admin updates
│   │
│   ├── Documents/
│   │   └── SENTAMILSELVAN A Resume.pdf
│   │
│   ├── App.jsx                       # Root — ModeProvider, mode switching, cursor
│   ├── App.css                       # Minimal reset
│   ├── index.css                     # Global CSS: variables, animations, utilities
│   └── main.jsx                      # React DOM entry point
│
├── index.html
├── vite.config.js
├── package.json
├── eslint.config.js
└── README.md
```

---

## 🗄 Data Architecture

All portfolio content lives in a single file: `src/data/portfolioData.js`.

### Live Override Pattern

```js
// At module load time, check for admin overrides in localStorage
function getOverride() {
  const raw = localStorage.getItem('adminPortfolioData')
  return raw ? JSON.parse(raw) : null
}
// Each export prefers admin data over the default
export const PERSONAL = _o('personal') || _PERSONAL
```

This means:
- Default data is always present as a fallback
- Admin saves instantly override without a page reload (via the `usePortfolioData` hook)
- No backend required — everything is `localStorage`

### Data Exports

| Export | Contents |
|---|---|
| `PERSONAL` | Name, title, location, email, CGPA, bio, tagline |
| `SOCIAL_LINKS` | GitHub, LinkedIn, Email, LeetCode, CodeChef, HackerRank, SkillRack |
| `ROLES` | Rotating role strings shown in Hero |
| `MILESTONES` | Timeline entries for About section |
| `SKILLS` | Categorized skills with level, icon, color, projects |
| `PROJECTS` | Project cards with features, tech stack, links |
| `CODING_STATS` | Quick badges, platform cards (with stats, bars, langBadges) |
| `ACHIEVEMENTS` | Certifications and achievements for vault |
| `INTERNSHIP` | Internship details and learning areas |

### `usePortfolioData` Hook

```js
// Reactive — re-renders all consumers when admin saves
useEffect(() => {
  const handler = () => setData(readFromStorage())
  window.addEventListener('storage', handler)
  window.addEventListener('portfolioDataUpdated', handler)
  return () => { ... }
}, [])
```

Every component in both UI modes calls `usePortfolioData()` — zero hardcoded values anywhere in the component tree.

### Platform `langBadges`

The HackerRank platform card's language badge data is stored in `portfolioData.js` as an array:

```js
langBadges: [
  { lang: 'C++',      stars: 5, color: '#00599c' },
  { lang: 'C',        stars: 3, color: '#a8b9cc' },
  { lang: 'Python',   stars: 3, color: '#3776ab' },
  { lang: 'Java',     stars: 3, color: '#f89820' },
  { lang: 'SQL',      stars: 3, color: '#e38c00' },
  { lang: 'Prob.Sol', stars: 2, color: '#10b981' },
]
```

Both `CodingProfiles.jsx` (Universe) and `ProfessionalCodingProfiles.jsx` render from `platform.langBadges` — no hardcoded badge arrays in components.

---

## 🔐 Admin Panel

A password-protected admin panel allows live editing of all portfolio data without touching code.

### Access
- Route: `/admin`
- Auth: `sessionStorage` — session expires on tab close
- No server required

### How It Works
1. Admin logs in → session stored in `sessionStorage`
2. Admin edits any field and saves
3. `useAdminData.js` writes to `localStorage('adminPortfolioData')`
4. Fires `window.dispatchEvent(new Event('portfolioDataUpdated'))`
5. All `usePortfolioData()` consumers re-render instantly in the same tab
6. On next page load, `portfolioData.js` reads the override at module level

---

## 🧩 Component Architecture

### Universe Mode Components

#### `App.jsx` — Master Orchestrator

Wraps everything in `ModeProvider`. The inner `AppContent` component:
- Toggles `body.universe-mode` / `body.pro-mode` classes on mode change
- Renders `UniverseApp` or `ProfessionalApp` inside `AnimatePresence`
- All cursor, trail, Konami code, and Easter egg logic lives inside `UniverseApp`

**Cursor System:**
Implemented in vanilla JS inside a `useEffect` for maximum performance. Two elements: `.cursor` (dot, snaps to mouse) and `.cursor-follower` (ring, 15% lerp lag). 12 trail dots injected into `document.body`. Scoped to `body.universe-mode` via CSS — Professional mode restores the native cursor.

#### `Loader.jsx` — Cinematic Portal Intro

Runs for ~4.6 seconds before the portfolio reveals.

| Phase | Timing | Effect |
|---|---|---|
| `scramble` | 0s → 3.2s | Name scrambles from random chars to "SENTAMILSELVAN" |
| subtitle | 1.8s | "Welcome to my digital universe." fades in |
| `portal` | 3.2s → 4.6s | Text scales to 40×, blurs — portal zoom effect |
| `done` | 4.6s | `onComplete()` called, Loader unmounts |

#### `Navbar.jsx` — Floating Navigation

- Transparent → frosted glass on scroll past 80px
- 7 section dot indicators with active glow
- `UiModeToggle` in both desktop and mobile drawer
- STS logo (5 clicks = Easter egg)

#### `ParticleField.jsx` — Canvas Particle System

120 particles with mouse repulsion within 120px, connecting lines within 100px, wrap-around edges.

#### `Hero.jsx` — 3D Command Center

- Mouse-driven `perspective(1000px)` parallax tilt
- 4 concentric rotating rings
- Animated role cycling every 2.5s (`AnimatePresence`)
- Holographic profile card with scanline overlay
- Magnetic CTA buttons (follow cursor 0.25×)
- All data from `usePortfolioData()`

#### `About.jsx` — Journey Timeline

- 6 milestone cards alternating left/right
- Central gradient vertical line
- Cards slide in from their side on scroll reveal
- All milestone data from `MILESTONES` in `portfolioData.js`

#### `Skills.jsx` — Skill Matrix Orbs

- Category filter (Programming / Frontend / Backend / Database / Tools)
- SVG progress ring animated on scroll reveal
- Hover tooltip with proficiency % and project list
- All skill data from `SKILLS` in `portfolioData.js`

#### `Projects.jsx` — Project Galaxy

- Planets positioned via trigonometry on elliptical orbits
- Click → full-screen modal with features, tech stack, challenge
- All project data from `PROJECTS` in `portfolioData.js`

#### `CodingProfiles.jsx` — Stats Dashboard

- Animated `Counter` component (ease-out cubic, rAF-based)
- Quick stat badges from `coding.quick`
- Platform cards from `coding.platforms` (stats, progress bars, langBadges)
- `langBadges` rendered from `platform.langBadges` array — no hardcoded values
- Universe mode uses inline SVG icons mapped via `LANG_SVG_MAP`

#### `AchievementVault.jsx` — Vault Door

- Locked state: combination lock, gear decorations, "CLASSIFIED" prompt
- On click: "ACCESS GRANTED" flash → 8 achievement cards animate in with 3D flip-up
- All achievement data from `ACHIEVEMENTS` in `portfolioData.js`

#### `Contact.jsx` — AI Transmission Terminal

- Left panel: macOS terminal with sequential boot lines + social links
- Right panel: CLI-styled form with cyan glow inputs
- Submit: 2.5s simulated transmission → success state
- Social links from `SOCIAL_LINKS` in `portfolioData.js`

---

### Professional Mode Components

All Professional components use `usePortfolioData()` — same data, different visual treatment.

#### `ProfessionalNavbar.jsx`
White sticky navbar, purple active states, `UiModeToggle` included.

#### `ProfessionalHero.jsx`
- Clean two-column layout: text left, profile card right
- Quick stats read from `coding.quick.slice(0, 2)` and `PERSONAL.cgpa`
- No hardcoded stat values

#### `ProfessionalAbout.jsx`
Card-based timeline with purple accent borders.

#### `ProfessionalSkills.jsx`
Categorized skill pills with proficiency bars.

#### `ProfessionalProjects.jsx`
Project cards with tech stack pills and hover lift effect.

#### `ProfessionalCodingProfiles.jsx`
- Quick stat badges from `coding.quick`
- Platform cards from `coding.platforms`
- `langBadges` rendered from `platform.langBadges` — no hardcoded values
- "View Profile →" links per platform

#### `ProfessionalAchievements.jsx`
Clean certification cards with type badges (cert / achievement).

#### `ProfessionalInternship.jsx`
Internship card with learning area grid.

#### `ProfessionalContact.jsx`
Clean form with purple focus states and social link grid.

---

### Shared Components

#### `UiModeToggle.jsx`
Animated toggle button. Shows "Professional View" in Universe mode, "Universe View" in Professional mode. Calls `switchMode()` from `ModeContext`.

#### `ModeTransition.jsx`
Framer Motion full-screen overlay that fades in/out during the 600ms mode switch.

---

## 🎨 Global CSS System

Located in `src/index.css`. Uses **Tailwind CSS v4** with `@import "tailwindcss"`.

### Cursor Scoping

```css
/* Custom cursor only active in Universe mode */
body.universe-mode { cursor: none; }
body.universe-mode .cursor,
body.universe-mode .cursor-follower,
body.universe-mode .trail-dot { display: block; }

/* Professional mode restores native cursor */
body.pro-mode { cursor: auto !important; }
```

### CSS Custom Properties
```css
--cyan:   #00f5ff   /* Primary accent — electric blue-cyan */
--purple: #8b5cf6   /* Secondary accent — violet */
--pink:   #ec4899   /* Tertiary accent — hot pink */
--gold:   #fbbf24   /* Achievement color — amber */
--green:  #10b981   /* Success / availability — emerald */
--bg:     #020408   /* Background — near-black with blue tint */
--panel:  rgba(255,255,255,0.04)
--border: rgba(0,245,255,0.15)
```

### Key Utility Classes

| Class | Description |
|---|---|
| `.glass` | Glassmorphism panel (blur 20px, semi-transparent border) |
| `.gradient-border` | Pseudo-element rainbow gradient border |
| `.scanlines` | CRT scanline overlay |
| `.glow-cyan/purple/gold/pink` | Text glow via `text-shadow` |
| `.shimmer-text` | Moving gradient across text |
| `.magnetic-btn` | Ripple + gradient hover effects |
| `.float` / `.float-slow` | Continuous vertical floating |
| `.pulse-glow` | Opacity pulse animation |
| `.font-orbitron` | Orbitron display font |
| `.font-mono` | JetBrains Mono monospace font |
| `.cursor` / `.cursor-follower` | Custom cursor elements (universe-mode only) |
| `.trail-dot` | Mouse trail particle (universe-mode only) |
| `.pro-input` | Professional mode form input styling |
| `.ui-mode-toggle` | Mode toggle button base styles |

---

## 🎨 Visual Design System

### Universe Mode Palette
Dark near-black base (`#020408`) with neon cyan / purple / pink accents. Three ambient orbs (600px, 500px, 400px) with 80px blur at 15% opacity create atmospheric depth.

### Professional Mode Palette
White / off-white base (`#faf7ff`, `#ffffff`) with purple / magenta (`#c026d3`) accents. Subtle box shadows and `#eee5f5` borders for card separation.

### Typography

| Use | Universe | Professional |
|---|---|---|
| Headings | Orbitron Black | Inter Bold |
| Body | Inter | Inter |
| Code / labels | JetBrains Mono | JetBrains Mono |

### Motion Principles
- Entry: `opacity: 0 → 1` + `y: 30–60 → 0` on `useInView`
- Stagger: 0.08–0.15s between siblings
- Easing: `[0.23, 1, 0.32, 1]` (Apple-style fast-start ease-out)
- All animations fire `once: true`

---

## ✨ Special Features

### Custom Cursor System (Universe Mode Only)
- Scoped to `body.universe-mode` — Professional mode uses native cursor
- Dot (12px): snaps to mouse; Ring (36px): 15% lerp lag
- On hover over interactive elements: dot grows to 20px (pink), ring to 56px

### Mouse Trail (Universe Mode Only)
12 DOM-injected dots with decreasing size (6px → 1.2px) and opacity, each following the next with decreasing lerp factor.

### Scroll Progress Bar
4px gradient bar (`cyan → purple`) fixed to top, width = `(scrollTop / maxScroll) * 100%`.

### Interactive Particles
120 canvas particles with mouse repulsion, connecting lines, and wrap-around edges.

### Magnetic Buttons
Buttons translate `0.25×` toward cursor, spring back on mouse leave.

### Mode Persistence
Selected UI mode saved to `localStorage('portfolioMode')` — survives page refresh.

---

## 🥚 Easter Eggs

### 1. Konami Code
**Sequence:** `↑ ↑ ↓ ↓ ← → ← → B A`
Triggers a fullscreen "KONAMI CODE! — Achievement Unlocked: Gamer Soul" overlay. Auto-dismisses after 3 seconds.

### 2. Logo Click × 5
Click the `STS` logo in the navbar 5 times. Triggers a toast: `🏆 SECRET UNLOCKED — Curiosity is the mark of a great developer.`

### 3. Hidden DOM Message
Open DevTools → Elements → find `<div data-secret="true">` for a personal ASCII art message.

> All Easter eggs are preserved exclusively in Universe mode inside `UniverseApp`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+

### Installation

```bash
# 1. Navigate to the project
cd Portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open http://localhost:5173
```

### Admin Panel
Navigate to `/admin` in the browser. Log in with the configured password. All changes save to `localStorage` and reflect instantly across both UI modes.

---

## 📜 Available Scripts

```bash
npm run dev       # Start Vite dev server (HMR enabled)
npm run build     # Production build → /dist
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

---

## 📦 Dependencies

### Production

```json
{
  "@react-three/drei":          "^10.7.7",
  "@react-three/fiber":         "^9.6.1",
  "@tailwindcss/vite":          "^4.3.0",
  "framer-motion":              "^12.40.0",
  "gsap":                       "^3.15.0",
  "react":                      "^19.2.6",
  "react-dom":                  "^19.2.6",
  "react-intersection-observer":"^10.0.3",
  "react-scroll":               "^1.9.3",
  "tailwindcss":                "^4.3.0",
  "three":                      "^0.184.0"
}
```

### Dev

```json
{
  "@eslint/js":                 "^10.0.1",
  "@types/react":               "^19.2.14",
  "@types/react-dom":           "^19.2.3",
  "@vitejs/plugin-react":       "^6.0.1",
  "eslint":                     "^10.3.0",
  "eslint-plugin-react-hooks":  "^7.1.1",
  "eslint-plugin-react-refresh":"^0.5.2",
  "globals":                    "^17.6.0",
  "vite":                       "^8.0.12"
}
```

---

## ⚡ Performance

### Build Output
```
dist/index.html              ~0.90 kB │ gzip:  ~0.48 kB
dist/assets/index.css       ~38.63 kB │ gzip:  ~8.08 kB
dist/assets/index.js       ~370.28 kB │ gzip: ~115.31 kB
```
Total gzipped: **~123 kB**

### Optimization Techniques
- `useInView` with `once: true` — animations never re-compute
- Cursor / trail / particle logic runs in `requestAnimationFrame` — zero React re-renders per frame
- Canvas particle field is entirely off-React
- `AnimatePresence` for proper cleanup of unmounted animated components
- Ambient orbs are CSS-only
- `portfolioData.js` module-level override read — single parse per page load
- `usePortfolioData` hook only re-renders on actual data change events

---

## 🌐 Browser Compatibility

| Browser | Status |
|---|---|
| Chrome 100+ | ✅ Full support |
| Firefox 100+ | ✅ Full support |
| Safari 15.4+ | ✅ Full support |
| Edge 100+ | ✅ Full support |
| Mobile Chrome | ✅ Responsive |
| Mobile Safari | ✅ Responsive |

**Notes:**
- `backdrop-filter` includes `-webkit-backdrop-filter` for Safari
- Custom cursor hidden on touch devices (mouse events don't fire)
- Mode toggle works on all screen sizes (included in mobile drawer)

---

## 📱 Responsive Design

| Breakpoint | Behavior |
|---|---|
| Mobile (`< 768px`) | Single column, smaller fonts, mobile drawer nav |
| Tablet (`768px+`) | Two-column grids |
| Desktop (`1024px+`) | Full experience with parallax and hover effects |
| Large (`1280px+`) | `max-w-6xl` containers prevent over-stretching |

---

<div align="center">

**Built with ❤️ and passion by Sentamilselvan**

*"Code is poetry. Make it beautiful."*

`// If you're reading this README, you're exactly the kind of detail-oriented person I want to work with.`

</div>
