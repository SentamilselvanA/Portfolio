<div align="center">

```
 ███████╗███████╗███╗   ██╗████████╗ █████╗ ███╗   ███╗██╗██╗      ███████╗███████╗██╗     ██╗   ██╗ █████╗ ███╗   ██╗
 ██╔════╝██╔════╝████╗  ██║╚══██╔══╝██╔══██╗████╗ ████║██║██║      ██╔════╝██╔════╝██║     ██║   ██║██╔══██╗████╗  ██║
 ███████╗█████╗  ██╔██╗ ██║   ██║   ███████║██╔████╔██║██║██║      ███████╗█████╗  ██║     ██║   ██║███████║██╔██╗ ██║
 ╚════██║██╔══╝  ██║╚██╗██║   ██║   ██╔══██║██║╚██╔╝██║██║██║      ╚════██║██╔══╝  ██║     ╚██╗ ██╔╝██╔══██║██║╚██╗██║
 ███████║███████╗██║ ╚████║   ██║   ██║  ██║██║ ╚═╝ ██║██║███████╗ ███████║███████╗███████╗ ╚████╔╝ ██║  ██║██║ ╚████║
 ╚══════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚══════╝ ╚══════╝╚══════╝╚══════╝  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝
```

# 🌌 Sentamilselvan — Digital Universe Portfolio

**A cinematic, premium, fully interactive developer portfolio that feels less like a website and more like entering a digital world.**

[![React](https://img.shields.io/badge/React-19.x-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-ff0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Three.js](https://img.shields.io/badge/Three.js-0.184-black?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Preview](#-live-preview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Component Architecture](#-component-architecture)
  - [App.jsx — Master Orchestrator](#appjsx--master-orchestrator)
  - [Loader.jsx — Cinematic Portal Intro](#loaderjsx--cinematic-portal-intro)
  - [Navbar.jsx — Floating Navigation](#navbarjsx--floating-navigation)
  - [ParticleField.jsx — Canvas Particle System](#particlefieldjsx--canvas-particle-system)
  - [Hero.jsx — 3D Command Center](#herojsx--3d-command-center)
  - [About.jsx — Journey Timeline](#aboutjsx--journey-timeline)
  - [Skills.jsx — Skill Matrix Orbs](#skillsjsx--skill-matrix-orbs)
  - [Projects.jsx — Project Galaxy](#projectsjsx--project-galaxy)
  - [CodingProfiles.jsx — Stats Dashboard](#codingprofilesjsx--stats-dashboard)
  - [AchievementVault.jsx — Vault Door](#achievementvaultjsx--vault-door)
  - [Contact.jsx — AI Transmission Terminal](#contactjsx--ai-transmission-terminal)
- [Global CSS System](#-global-css-system)
- [Visual Design System](#-visual-design-system)
- [Special Features](#-special-features)
- [Easter Eggs](#-easter-eggs)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Dependencies](#-dependencies)
- [Customization Guide](#-customization-guide)
- [Performance](#-performance)
- [Browser Compatibility](#-browser-compatibility)

---

## 🌟 Overview

This is not a typical developer portfolio. It is a **cinematic interactive experience** designed to make visitors stop and pay attention within the first 5 seconds. Every section feels alive with motion, every interaction is intentional, and the overall aesthetic draws inspiration from:

- **Apple Keynote** — smooth transitions, purposeful animation
- **Cyberpunk Futurism** — neon glows, holographic panels, scan lines
- **AAA Game Menus** — immersive UI, atmospheric depth
- **Modern AI OS** — terminal interfaces, data streams, system dashboards

The portfolio is built entirely with **React + Vite + Tailwind CSS v4 + Framer Motion**, with zero backend dependencies — just a single static build.

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
d:\Portfolio\
│
├── public/
│   ├── favicon.svg              # Browser tab icon
│   └── icons.svg                # Asset icons
│
├── src/
│   ├── components/
│   │   ├── Loader.jsx           # Cinematic opening portal intro
│   │   ├── Navbar.jsx           # Fixed floating navigation
│   │   ├── ParticleField.jsx    # Canvas-based interactive particle network
│   │   ├── Hero.jsx             # 3D command center with rotating roles
│   │   ├── About.jsx            # Scroll-animated journey timeline
│   │   ├── Skills.jsx           # Interactive glowing skill orbs
│   │   ├── Projects.jsx         # Floating planet project galaxy
│   │   ├── CodingProfiles.jsx   # Animated stats & contribution dashboard
│   │   ├── AchievementVault.jsx # Vault door unlock animation
│   │   └── Contact.jsx          # AI terminal transmission form
│   │
│   ├── App.jsx                  # Root component — layout, cursor, Easter eggs
│   ├── App.css                  # Minimal reset
│   ├── index.css                # Global CSS: variables, animations, utilities
│   └── main.jsx                 # React DOM entry point
│
├── index.html                   # HTML shell with Google Fonts imports
├── vite.config.js               # Vite config with Tailwind v4 plugin
├── package.json                 # Dependencies and scripts
├── eslint.config.js             # ESLint configuration
└── README.md                    # This file
```

---

## 🧩 Component Architecture

### `App.jsx` — Master Orchestrator

The root component that manages the entire application lifecycle.

**Responsibilities:**
- Controls the loading state — shows `Loader` first, then reveals the full portfolio
- Implements the **custom dual-layer cursor** (dot + ring follower with rAF-based lag)
- Generates the **12-dot mouse trail** using DOM injection + requestAnimationFrame
- Tracks **scroll progress** and updates the top progress bar
- Listens for the **Konami code** (`↑↑↓↓←→←→BA`) and triggers the achievement overlay
- Tracks **logo clicks** (5 clicks = secret unlock toast)
- Manages **ambient background orbs** (fixed blurred circles creating atmospheric depth)
- Renders a **hidden DOM secret message** (`data-secret="true"`) for curious developers who inspect the source

**Key State:**
```
loaded       — boolean, gates the Loader vs main content
progress     — 0-100, drives the scroll progress bar width
konamiIdx    — tracks how far along the Konami sequence the user is
easterEgg    — boolean, shows the Konami achievement overlay
logoClicks   — counts STS logo clicks
secretMsg    — boolean, shows the 5-click achievement toast
soundOn      — boolean, toggles the SFX button state in Navbar
```

**Cursor System:**
The cursor is implemented entirely in vanilla JS inside a `useEffect` for maximum performance (no React re-renders on every mouse move). Two HTML elements are created via refs: `.cursor` (the dot) and `.cursor-follower` (the ring). The follower uses lerp (linear interpolation) at 15% per frame, creating a smooth lag effect. 12 trail dots are injected directly into `document.body` with decreasing size and opacity.

---

### `Loader.jsx` — Cinematic Portal Intro

The first thing a visitor sees. Runs for ~4.6 seconds before the portfolio reveals.

**Animation Phases:**

| Phase | Timing | Effect |
|---|---|---|
| `scramble` | 0s → 3.2s | Name text scrambles from random chars to "SENTAMILSELVAN" using rAF |
| subtitle | 1.8s | "Welcome to my digital universe." fades in |
| `portal` | 3.2s → 4.6s | The central text scales from 1× to 40×, blurs, and fades — simulating flying through a portal |
| `done` | 4.6s | `onComplete()` called, Loader unmounts with AnimatePresence fade |

**Visual Elements:**
- 80 randomly placed floating star particles with color variance (cyan, purple, pink, gold)
- Two concentric rotating rings around the name (clockwise + counter-clockwise)
- A tri-color gradient loading bar that fills to 70% then jumps to 100% on portal trigger
- "ENTERING DIGITAL UNIVERSE..." text appears at portal phase
- Four corner bracket decorations (top-left, top-right, bottom-left, bottom-right)
- Continuous horizontal scan line sweeping top → bottom

**Scramble Algorithm:**
```
scramble(target, setter, duration)
  - Runs via requestAnimationFrame
  - Progress p = elapsed / duration (0 → 1)
  - Characters at index < floor(p * len) are revealed (correct letter)
  - Characters at index >= floor(p * len) show random CHARS characters
  - Easing: linear (purely time-based)
```

---

### `Navbar.jsx` — Floating Navigation

A fixed navigation bar that becomes visible after the loader completes.

**Features:**
- Slides down from `y: -80` to `y: 0` on mount (Framer Motion entry)
- Transparent background when at the top of the page; switches to `rgba(2,4,8,0.9)` with `backdrop-filter: blur(20px)` and a subtle bottom border after scrolling 80px
- **Section dot indicators** — 7 dots representing each section (Home, About, Skills, Projects, Stats, Vault, Contact). Active dot glows with cyan shadow and scales to 1.4×
- Each dot shows a label tooltip on hover
- Active section is detected by checking if the section's bounding rect top ≤ 200px and bottom ≥ 200px
- **STS logo** (clickable — 5 times triggers the secret Easter egg)
- **SFX toggle** button on the right

---

### `ParticleField.jsx` — Canvas Particle System

A full-viewport `<canvas>` fixed to the background with 120 interactive particles.

**Behavior:**
- Particles drift slowly with random velocity (±0.4 px/frame)
- **Mouse repulsion**: within 120px of the cursor, particles are pushed away with force inversely proportional to distance
- Velocity damping at 0.98× per frame (natural deceleration)
- Particles wrap around edges (leave one side, appear on the other)
- Lines are drawn between particles within 100px of each other, opacity fades with distance
- Particle colors: cyan `#00f5ff`, purple `#8b5cf6`, pink `#ec4899`
- Each particle has a glow via `ctx.shadowBlur`
- Canvas resizes on window resize
- Overall opacity: 40%

---

### `Hero.jsx` — 3D Command Center

The main landing section. Full viewport height.

**3D Parallax Effect:**
The entire content block has a `perspective(1000px)` CSS transform that responds to mouse position. Moving the mouse to the top-left tilts the content slightly toward that direction, creating a depth illusion without Three.js.

**Visual Elements:**

- **Rotating rings** — 4 concentric circles (300px, 450px, 600px, 750px) with alternating clockwise/counter-clockwise rotation at different speeds (20s, 28s, 36s, 44s)
- **Status badge** — glassmorphism pill showing "Available for opportunities" with a pulsing green dot
- **Name** — `SENTAMILSELVAN` in Orbitron Black at up to 8xl, with shimmer animation (gradient moves across the text)
- **Animated roles** — 4 roles cycle every 2.5s using `AnimatePresence mode="wait"`, each entering from below and exiting upward
- **Holographic profile card** — floats with CSS animation, contains avatar initial, name/role/location, and three mini stat chips. Has scanline overlay effect and gradient border
- **Magnetic buttons** — 3 CTA buttons (Resume, Contact, GitHub) that physically follow the cursor within their bounds using `getBoundingClientRect` math
- **Scroll indicator** — pulsing vertical line at the bottom center

**MagneticBtn Component:**
```
onMouseMove: calculates offset from button center, applies transform: translate(x*0.25, y*0.25)
onMouseLeave: resets transform to translate(0,0) with cubic-bezier(0.23,1,0.32,1) spring
```

---

### `About.jsx` — Journey Timeline

A vertical scrolling timeline with 6 milestone cards.

**Timeline Milestones:**
1. 🚀 Started Programming — 2020
2. ☕ Learned Java — 2021
3. 🌐 Started Web Development — 2022
4. ⚡ Built MERN Projects — 2023
5. 🧩 Solved 200+ Coding Problems — 2024
6. 🎯 Preparing For Professional Career — NOW

**Layout:**
- Central vertical gradient line (transparent → cyan → purple → pink → transparent)
- Cards alternate left/right sides of the timeline (`side: 'left' | 'right'`)
- Each card slides in from its respective side when it enters the viewport
- Center dot for each milestone is an icon in a glowing circular frame
- Each card has a colored left border and subtle background tint matching its color

**Animation:**
- `useInView` from Framer Motion with `once: true` and `-100px` margin
- Cards animate `x: ±60 → 0` and `opacity: 0 → 1` on enter
- Center icon animates `scale: [0.8, 1.1, 1]` + `rotate: [0, 10, 0]` with a 0.3s delay after the card

---

### `Skills.jsx` — Skill Matrix Orbs

A futuristic control room of interactive skill orbs grouped by category.

**Categories:** Frontend | Backend | Database | Tools

**Skills Data (16 total):**
- **Frontend**: React (88%), JavaScript (85%), HTML (95%), CSS (90%), Tailwind (85%)
- **Backend**: Node.js (82%), Express.js (80%)
- **Database**: MongoDB (78%), MySQL (75%)
- **Tools**: Git (85%), GitHub (88%), Postman (80%), VS Code (95%)

**SkillOrb Component Behavior:**
- Size is proportional to proficiency (90px base + up to 30px for 100% proficiency)
- Radial gradient background + colored border with matching glow shadow
- **SVG progress ring** — animated `pathLength` from 0 to `level/100` over 1.5s on scroll reveal
- Idle float animation — unique frequency per orb (3s to ~6s period)
- On hover: scale 1.3×, float up 12px, z-index 20
- **Tooltip on hover** — shows platform name, proficiency %, and list of projects where the skill was used

**Category filter:**
Clicking a category button cross-fades to the new set of orbs. The motion `key={activeCategory}` on the container triggers an `opacity: 0 → 1` fade.

---

### `Projects.jsx` — Project Galaxy

An interactive space galaxy where each project is a clickable floating planet.

**Projects (5 planets):**

| Planet | Color | Stack |
|---|---|---|
| 🎓 Student Management System | Cyan `#00f5ff` | React, Node.js, Express, MongoDB |
| 🎪 Event Management Platform | Purple `#8b5cf6` | React, Node.js, MongoDB, JWT |
| 💃 Dance Registration Website | Pink `#ec4899` | React, Tailwind, Node.js, MySQL |
| 🌤️ Weather App | Gold `#fbbf24` | React, OpenWeather API |
| 💰 Expense Tracker | Green `#10b981` | React, MongoDB, Chart.js |

**Galaxy Layout:**
- A central star (✦) rotates 360° every 20s and pulses in scale
- Two dashed elliptical orbit rings
- Planets are positioned using trigonometry: `x = cos(angle * 2π) * 220`, `y = sin(angle * 2π) * 110` (squished Y axis to create orbital depth)
- Each planet floats with a unique `y` amplitude and rotation animation
- Each planet has a pulsing outer ring

**Project Modal:**
On planet click, a full-screen overlay appears with:
- `AnimatePresence` for enter/exit animation (scale 0.5 → 1, y: 60 → 0)
- Planet icon, name, subtitle in the header
- Full description paragraph
- Features list in a 2-column grid
- Tech stack pills with color-coded border matching the planet
- "Challenge Solved" callout card
- GitHub and Live Demo action buttons
- Clicking outside the modal or the ✕ button closes it

---

### `CodingProfiles.jsx` — Stats Dashboard

A quantified stats dashboard with animated counters and contribution graph.

**Counter Component:**
- Uses `requestAnimationFrame` with an ease-out cubic function: `1 - (1-p)³`
- Starts when the element enters the viewport (`useInView`)
- Counts from 0 to target value over 2 seconds

**Quick Stat Badges (4 cards):**
- 🔥 Day Streak: 45
- ✅ Acceptance Rate: 68%
- 🌐 Global Rank: #150,000
- 💬 Languages: 6

**Platform Cards (2):**
- **GitHub**: 25+ Repos, 400+ Commits, 12 Stars — with language proficiency bars (JavaScript 70%, Python 60%, Java 80%)
- **LeetCode**: 200+ Problems, 85 Easy, 95 Medium — with topic bars (Arrays & Strings 85%, Dynamic Programming 65%, Trees & Graphs 70%)

**Contribution Grid:**
- 26 weeks × 7 days = 182 cells
- Each cell has a randomly generated "contribution value" (0–1)
- Color maps to: near-zero (5% opacity) → low (20%) → medium (45%) → high (70%) → max (100% cyan)
- Cells animate in with staggered scale + opacity via Framer Motion
- Includes a color legend at the bottom right (Less → More)

---

### `AchievementVault.jsx` — Vault Door

A dramatic vault door interaction that reveals certifications and achievements.

**Vault Door (locked state):**
- A 2xl rounded container styled as a dark steel safe
- Gold border with `box-shadow: 0 0 40px rgba(251,191,36,0.2)`
- Four animated decorative "gears" positioned at corners (low-opacity rotating circles)
- A center combination lock with nested concentric circles, wobble animation, and a padlock emoji
- "CLASSIFIED VAULT — CLICK TO AUTHENTICATE" prompt
- Vertical dividing seam down the center

**On Click — Vault Opens:**
- "ACCESS GRANTED" flash text fades in then out
- 8 achievement cards animate in with staggered `y: 60 → 0` and `rotateX: -30 → 0` (3D flip-up effect)
- A "Lock Vault" button appears at the bottom to reset the state

**Achievement Cards (8):**
- 🏆 MERN Stack Certification — Udemy (2023)
- ☕ Java Programming — NPTEL / Oracle (2022)
- ⚛️ React Developer — Meta / Coursera (2023)
- 🥇 Hackathon Finalist — CodeHack 2023 (2023)
- 🧩 200+ LeetCode Solved — LeetCode (2024)
- 🎓 B.Tech Computer Science — University (2025)
- 🏅 Coding Contest Top 10% — HackerRank (2024)
- ⭐ Open Source Contributor — GitHub (2024)

---

### `Contact.jsx` — AI Transmission Terminal

An immersive contact section built as a dual-panel AI terminal.

**Left Panel — Terminal:**
- macOS-style title bar with red/yellow/green dots and filename `transmission_terminal.sh`
- 3 terminal boot lines that appear sequentially with 800ms delay between each:
  1. `> Initializing secure channel...` (gray)
  2. `> Establishing connection to Sentamilselvan...` (yellow)
  3. `> Connection established. Ready to receive transmissions.` (green)
- A blinking cursor appears after boot completes
- Social link grid: GitHub, LinkedIn, Email, LeetCode — each with platform color theming

**Right Panel — Form:**
- Fields styled as terminal inputs with JetBrains Mono font, cyan color scheme, glow on focus
- Field labels styled as CLI prompts: `> SENDER_NAME`, `> SENDER_ADDRESS`, `> MESSAGE_PAYLOAD`
- Submit button with gradient background and hover glow intensification
- On submit: 2.5s simulated transmission delay
- Success state: animated ✅ with "TRANSMISSION SENT" message and expected response time

**Footer:**
- Portfolio attribution
- Build stack credit
- Hint text for the Konami code Easter egg

---

## 🎨 Global CSS System

Located in `src/index.css`. Uses **Tailwind CSS v4** with `@import "tailwindcss"`.

### CSS Custom Properties
```css
--cyan:   #00f5ff   /* Primary accent — electric blue-cyan */
--purple: #8b5cf6   /* Secondary accent — violet */
--pink:   #ec4899   /* Tertiary accent — hot pink */
--gold:   #fbbf24   /* Achievement color — amber */
--green:  #10b981   /* Success / availability — emerald */
--bg:     #020408   /* Background — near-black with blue tint */
--panel:  rgba(255,255,255,0.04)   /* Glassmorphism surface */
--border: rgba(0,245,255,0.15)     /* Default glass border */
```

### Utility Classes

| Class | Description |
|---|---|
| `.glass` | Glassmorphism panel (blur 20px, semi-transparent border) |
| `.glass-dark` | Darker variant for overlays (blur 30px, 80% opaque bg) |
| `.gradient-border` | Pseudo-element rainbow gradient border using mask technique |
| `.scanlines` | CRT scanline overlay via repeating-linear-gradient |
| `.animated-bg` | Shifting background gradient that slowly cycles |
| `.glow-cyan/purple/gold/pink` | Text glow via `text-shadow` |
| `.glow-box-cyan/purple/pink/gold` | Box shadow glow |
| `.shimmer-text` | Moving gradient across text (name in Hero) |
| `.magnetic-btn` | Ripple + gradient hover effects for buttons |
| `.float` | Continuous vertical floating (4s ease-in-out) |
| `.float-slow` | Slower float with subtle rotation (8s) |
| `.pulse-glow` | Opacity pulse 0.6 → 1 → 0.6 (2s) |
| `.rotate` | Continuous 360° rotation (20s linear) |
| `.font-orbitron` | Orbitron display font |
| `.font-mono` | JetBrains Mono monospace font |
| `.nav-dot` | Section indicator dot |
| `.nav-dot.active` | Glowing active state |
| `.progress-bar` | Fixed top scroll indicator |
| `.cursor` / `.cursor-follower` | Custom cursor elements |
| `.trail-dot` | Mouse trail particle |
| `.terminal-input` | Styled form input for Contact section |
| `.timeline-line` | Gradient vertical line for About timeline |
| `.planet` | Circular planet with pulsing ring |
| `.skill-orb` | Circular skill display with hover scale |
| `.ambient-orb` | Large blurred background light blobs |

### CSS Animations (14 keyframes)
- `gradientShift` — background position cycling
- `float` — vertical bob
- `floatSlow` — slow vertical bob with rotation
- `pulse-glow` — opacity pulse
- `rotate360` — full rotation
- `counter-rotate` — reverse full rotation
- `shimmer` — text gradient movement
- `ringPulse` — scale pulse on planet rings
- `portalZoom` — loader portal transition
- `glitch` — clip-path glitch effect
- `scanLine` — top-to-bottom scan line sweep
- `particleDrift` — vertical particle drift
- `dataStream` — vertical data stream
- `blink` — cursor blink

---

## 🎨 Visual Design System

### Color Philosophy
The palette uses a dark near-black base (`#020408`) to maximize contrast and allow neon accent colors to "glow" without competing backgrounds. Three ambient orbs (cyan, purple, pink) are fixed positioned behind all content with 80px blur and 15% opacity, creating atmospheric depth without distraction.

### Typography
| Use | Font | Weight |
|---|---|---|
| Headings, section titles, logo | Orbitron | 700–900 (Black) |
| Body text, descriptions | Inter | 300–600 |
| Code, terminal, labels, stats | JetBrains Mono | 400–700 |

### Spacing & Sections
All sections use `py-24 px-4` (96px vertical padding) with content maxed at `max-w-6xl` (except About which uses `max-w-5xl`).

### Motion Principles
- **Entry animations**: `opacity: 0 → 1` + `y: 40–80 → 0` triggered by `useInView`
- **Stagger**: sibling elements stagger by 0.08–0.15s delay
- **Easing**: `[0.23, 1, 0.32, 1]` — a cubic bezier that starts fast and eases out dramatically (Apple-style)
- **Hover interactions**: scale, shadow, and color transitions all at 0.3–0.4s
- **All animations fire once** via `once: true` in `useInView` (no re-trigger on scroll back up)

---

## ✨ Special Features

### Custom Cursor System
- Replaces default OS cursor (`cursor: none` on body)
- **Dot** (12px): snaps exactly to mouse position
- **Ring** (36px): follows with 15% lerp lag per frame
- On hover over `a`, `button`, `[role=button]`: dot grows to 20px and turns pink; ring grows to 56px

### Mouse Trail
- 12 dots injected into DOM with decreasing size (6px → 1.2px) and opacity
- Each dot follows the next with decreasing lerp factor (0.3 → 0.12)
- Creates a comet tail effect following the cursor

### Scroll Progress Bar
- 4px tall gradient bar (`cyan → purple`) fixed to the top
- Width updates on every scroll event as `(scrollTop / maxScroll) * 100`%

### Interactive Particles
- 120 particles on canvas, mouse-repulsion within 120px radius
- Connected by lines when within 100px of each other
- Continuous wrap-around at viewport edges

### Magnetic Buttons
- Mouse position is measured relative to button center using `getBoundingClientRect`
- Button translates `0.25×` in the direction of the cursor
- Springs back with `cubic-bezier(0.23, 1, 0.32, 1)` on mouse leave

### Ambient Lighting
- Three large blurred circles (600px, 500px, 400px) in cyan, purple, and pink
- Fixed position, `filter: blur(80px)`, `opacity: 0.15`, `pointer-events: none`
- Creates a soft colored ambiance visible behind transparent sections

### Glassmorphism
Every panel uses `backdrop-filter: blur(20px)` with semi-transparent backgrounds and the `gradient-border` technique using CSS masks for a multi-color gradient border without extra DOM elements.

---

## 🥚 Easter Eggs

### 1. Konami Code — Keyboard
**Sequence:** `↑ ↑ ↓ ↓ ← → ← → B A`

Triggering this sequence activates a fullscreen overlay with:
```
🎮 KONAMI CODE!
Achievement Unlocked: Gamer Soul
"You know the ancient code. Respect."
```
The overlay auto-dismisses after 3 seconds.

### 2. Logo Click × 5 — Mouse
**Action:** Click the `STS` logo in the navbar exactly 5 times

Triggers a toast notification in the bottom-right corner:
```
🏆 SECRET UNLOCKED
You clicked the logo 5 times.
// Curiosity is the mark of a great developer.
```
Auto-dismisses after 4 seconds. Counter resets to 0 after trigger.

### 3. Hidden DOM Message — Inspect Element
**Action:** Open browser DevTools → Elements tab → find `<div data-secret="true">`

Contains an ASCII art banner and a personal message:
```
██████╗ ███████╗██╗   ██╗
...
Hey, you found the secret message! 👾
Sentamilselvan - Built this with passion.
"Code is poetry. Make it beautiful."

If you're reading this, you're exactly
the kind of detail-oriented person I want
to work with. Let's connect!
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+

### Installation

```bash
# 1. Clone or navigate to the project
cd d:\Portfolio

# 2. Install all dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### First Run Experience
When the page loads, you will see:
1. Black screen with floating colored particles
2. Text scrambles from random characters to `SENTAMILSELVAN`
3. "Welcome to my digital universe." fades in below
4. The text zooms forward into a portal (cinematic zoom)
5. The full portfolio reveals with Framer Motion entry animations

---

## 📜 Available Scripts

```bash
npm run dev       # Start Vite development server (HMR enabled)
npm run build     # Production build → output in /dist
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint across all source files
```

---

## 📦 Dependencies

### Production Dependencies

```json
{
  "@react-three/drei":         "^10.7.7",   // Three.js React helpers
  "@react-three/fiber":        "^9.6.1",    // React renderer for Three.js
  "@tailwindcss/vite":         "^4.3.0",    // Tailwind CSS v4 Vite plugin
  "framer-motion":             "^12.40.0",  // Animation library
  "gsap":                      "^3.15.0",   // GreenSock animation platform
  "react":                     "^19.2.6",   // React core
  "react-dom":                 "^19.2.6",   // React DOM renderer
  "react-intersection-observer":"^10.0.3",  // Scroll visibility hooks
  "react-scroll":              "^1.9.3",    // Smooth scroll utilities
  "tailwindcss":               "^4.3.0",    // Tailwind CSS v4
  "three":                     "^0.184.0"   // 3D graphics library
}
```

### Dev Dependencies

```json
{
  "@eslint/js":                "^10.0.1",
  "@types/react":              "^19.2.14",
  "@types/react-dom":          "^19.2.3",
  "@vitejs/plugin-react":      "^6.0.1",
  "eslint":                    "^10.3.0",
  "eslint-plugin-react-hooks": "^7.1.1",
  "eslint-plugin-react-refresh":"^0.5.2",
  "globals":                   "^17.6.0",
  "vite":                      "^8.0.12"
}
```

---

## 🔧 Customization Guide

### Changing Personal Information

**Name & Title** — `src/components/Hero.jsx`
```jsx
// Line: the shimmer h1
SENTAMILSELVAN

// Line: ROLES array
const ROLES = ['MERN Stack Developer', 'Problem Solver', ...]

// Holographic card location
Chennai, India 🇮🇳
```

**Timeline Milestones** — `src/components/About.jsx`
```jsx
const MILESTONES = [
  { year: '2020', title: 'Started Programming', desc: '...', icon: '🚀', color: '#00f5ff', side: 'left' },
  // Add, remove, or edit entries here
]
```

**Skills** — `src/components/Skills.jsx`
```jsx
const SKILLS = {
  Frontend: [
    { name: 'React', level: 88, icon: '⚛️', color: '#61dafb', projects: ['...'] },
    // Adjust level (0-100), change icon, color, or projects list
  ],
  // Add new categories as needed
}
```

**Projects** — `src/components/Projects.jsx`
```jsx
const PROJECTS = [
  {
    name: 'Your Project',
    desc: 'Description...',
    features: ['Feature 1', 'Feature 2'],
    tech: ['React', 'Node.js'],
    github: 'https://github.com/yourrepo',
    live: 'https://yourlive.site',
  }
]
```

**Stats** — `src/components/CodingProfiles.jsx`
```jsx
const BADGES = [
  { label: 'Day Streak', value: 45, icon: '🔥', color: '#ef4444' },
  // Change the `value` fields to your actual stats
]
```

**Achievements** — `src/components/AchievementVault.jsx`
```jsx
const ACHIEVEMENTS = [
  { icon: '🏆', title: 'Your Cert', org: 'Platform', year: '2024', color: '#fbbf24', type: 'cert' },
]
```

**Social Links** — `src/components/Contact.jsx`
```jsx
const LINKS = [
  { icon: '🐙', label: 'GitHub', href: 'https://github.com/yourusername', color: '#ffffff' },
  { icon: '💼', label: 'LinkedIn', href: 'https://linkedin.com/in/yourusername', color: '#0077b5' },
]
```

### Changing the Color Theme

All accent colors are defined as CSS variables in `src/index.css`:

```css
:root {
  --cyan:   #00f5ff;   /* Change to any hex — affects cursor, glow, borders */
  --purple: #8b5cf6;   /* Secondary accent */
  --pink:   #ec4899;   /* Tertiary accent */
  --gold:   #fbbf24;   /* Vault / achievement color */
  --green:  #10b981;   /* Success states */
  --bg:     #020408;   /* Background — keep dark for neon effect */
}
```

### Adjusting Loader Duration

In `src/components/Loader.jsx`, change the `setTimeout` values:

```jsx
// Phase 1: scramble starts
setTimeout(() => scramble('SENTAMILSELVAN', setName), 300)

// Phase 2: subtitle appears
setTimeout(() => setSub('Welcome to my digital universe.'), 1800)

// Phase 3: portal starts
setTimeout(() => setPhase('portal'), 3200)   // ← increase for longer display

// Phase 4: complete
setTimeout(() => { setPhase('done'); onComplete() }, 4600)  // ← match above + ~1400ms
```

---

## ⚡ Performance

### Build Output
```
dist/index.html                   0.90 kB │ gzip:   0.48 kB
dist/assets/index.css            38.63 kB │ gzip:   8.08 kB
dist/assets/index.js            370.28 kB │ gzip: 115.31 kB
```
Total gzipped: **~123 kB** — fast load even on slower connections.

### Optimization Techniques Used
- `useInView` with `once: true` — animations trigger once and are never re-computed
- All particle/cursor logic uses `requestAnimationFrame` (no React state updates on every frame)
- Canvas particle field runs entirely off-React (no virtual DOM involvement)
- Framer Motion `AnimatePresence` for proper cleanup of unmounted animated components
- `useCallback` on event handlers where referenced in dependency arrays
- Ambient orbs are CSS-only (no JavaScript, no re-renders)
- Fonts loaded with `preconnect` links for faster initial paint

---

## 🌐 Browser Compatibility

| Browser | Status |
|---|---|
| Chrome 100+ | ✅ Full support |
| Firefox 100+ | ✅ Full support |
| Safari 15.4+ | ✅ Full support (webkit prefixes included) |
| Edge 100+ | ✅ Full support |
| Mobile Chrome | ✅ Responsive |
| Mobile Safari | ✅ Responsive |

**Notes:**
- `backdrop-filter` requires webkit prefix on Safari (included via `-webkit-backdrop-filter` in CSS)
- `mask-composite: exclude` for gradient borders is supported in all modern browsers
- Custom cursor is hidden on touch devices (mouse events don't fire)

---

## 📱 Responsive Design

The portfolio is fully responsive across all screen sizes:

| Breakpoint | Behavior |
|---|---|
| Mobile (`< 768px`) | Single column layouts, smaller font sizes (5xl → 4xl for hero name) |
| Tablet (`768px+`) | Two-column grids in profiles and contact sections |
| Desktop (`1024px+`) | Full experience with all parallax and hover effects |
| Large (`1280px+`) | Max-width containers (`max-w-6xl`) prevent over-stretching |

---

<div align="center">

**Built with ❤️ and passion by Sentamilselvan**

*"Code is poetry. Make it beautiful."*

`// If you're reading this README, you're exactly the kind of detail-oriented person I want to work with.`

</div>
