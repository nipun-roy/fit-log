# 🏋️ FITLOG — Train With Intent. Log Every Set.

A dark, no-nonsense gym companion web application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. Designed pixel-for-pixel from the official Figma specification with robust state management, live metrics tracking, and responsive design across all devices.

---

## 📌 Project Overview

**FitLog** empowers fitness enthusiasts and athletes to explore a curated library of strength and conditioning lifts, inspect deep movement specifications, lock exercises into a dedicated 5-lift daily plan, and track real-time workouts, duration, and calories burned.

- **Live URL**: [Deploy on Vercel / Netlify]
- **Repository**: [GitHub Repository Link]

---

## 🚀 Key Features

### 1. 🔝 Figma-Exact Responsive Navigation & Live Status Badges
- Stylized brand logo with custom 45-degree dumbbell geometry and bold uppercase typography.
- Active route highlighting (`Workouts` vs `My Plan`) matching the Figma design pill container.
- Live real-time status badges:
  - **Plan Badge**: Filled accent pill (`#ccff00`) displaying current lifts in Today's Plan.
  - **Saved Badge**: Outlined pill displaying bookmarked workouts.
  - Direct deep-links to `/my-plan?tab=today` and `/my-plan?tab=saved`.
- Mobile responsive collapsible navigation drawer for small screens.

### 2. ⚡ High-Impact Hero Banner & Instant Smooth Anchor Scroll
- Eyebrow category tracker: `"WORKOUT LIBRARY"`.
- Display headline: `"TRAIN WITH INTENT. LOG EVERY SET."` rendered in heavy display font.
- Descriptive subtext explaining the daily logging philosophy.
- Primary CTA button `"BROWSE WORKOUTS"` that smoothly scrolls down to `#library`.
- Rendered 3D lifter illustration on the preacher bench matching the Figma visual.

### 3. ⚖️ The Library Section (3x4 Grid, Search, & Muscle Group Filters)
- Displays all 12 exercises fetched from the FitLog API in a responsive 3-column desktop grid.
- Custom skeleton loading animation while data is being fetched.
- Each card highlights:
  - Workout illustration with lazy-loading and fallback handling.
  - Category tag pills (e.g., `CHEST`, `ARMS`, `LEGS`, `CORE`).
  - Workout name & equipment requirement.
  - Key stats row with icons: Duration (`Clock`), Calories (`Flame`), and Rating (`Star`).
- Instant live search by exercise name, muscle group, or equipment.
- Muscle group quick-filter chips (`All`, `Chest`, `Arms`, `Back`, `Legs`, `Core`, `Shoulders`).

### 4. 📖 Deep Workout Details Page (Two-Column Layout)
- Dynamic route (`/workout/:id`) fetching single workout data directly from the API.
- **Left Column**: High-resolution exercise visual with rounded border container.
- **Right Column**:
  - Full title, description, and muscle tags.
  - **Key Specs Panel**: Structured table displaying `EQUIPMENT`, `DIFFICULTY`, `SETS`, `REPS`, `DURATION`, `CALORIES`, and `RATING`.
  - **Step-by-step Instructions**: Formatted ordered list.
  - **Add to Today's Plan** action: locks the lift into the daily routine, updates navbar badges, triggers toast alerts, and celebrates with confetti.
  - **Save for Later** action: bookmarks the lift into the Saved collection.
  - **5-Lift Daily Cap Protection**: Enforces the subtitle rule (`"Cap of five lifts for today"`), preventing overload and warning the user if the plan is full.

### 5. 📊 My Plan Log Page with Live Metrics & Tabbed Lists
- **Metrics Summary Panel**: 3 live metric stat cards:
  - `Exercises` (accent lime count)
  - `Minutes` (cumulative workout time)
  - `Calories` (cumulative calories burned)
- **Tab Switching**: Toggle between `Today's Plan` and `Saved` lifts.
- **Challenge Features Included**:
  - **Sort Dropdown**: Sort current lists by **Duration**, **Calories**, or **Rating** with active indicator.
  - **Mark as Done**: Check off completed lifts with visual strike-through, badge update, and confetti.
  - **Item Removal (`✕`)**: Remove lifts from Today's Plan or Saved with instant metric re-calculation and toast feedback.
  - **Empty State**: Custom dashed container with `"NOTHING HERE YET"` and direct `"Go to workouts"` CTA button.

### 6. 💾 Full Data Persistence & Error Handling
- Automatic client-side synchronization with `localStorage` so plans and saved workouts survive page refreshes and browser restarts.
- Custom **404 Not Found** page (`"LOST YOUR FORM?"`) matching the FitLog aesthetic.
- Error recovery button if external API requests fail.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16+ (App Router)** | Framework, server components, client components, and routing |
| **React 19** | UI rendering, state management, and lifecycle hooks |
| **TypeScript** | Static type safety, interfaces (`Workout`, `PlanItem`, `SavedItem`) |
| **Tailwind CSS v4** | Modern utility-first CSS styling, custom theme variables, responsive design |
| **Lucide React** | Clean, lightweight SVG icons |
| **Canvas Confetti** | Interactive celebratory particles on completing or planning a workout |
| **Sharp** | Image processing and Figma asset optimization |

---

## 🌐 API Endpoints

- **All Workouts**: `https://api.abcz.workers.dev/api/fitlog`
- **Single Workout**: `https://api.abcz.workers.dev/api/fitlog/:id`

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js `v18.18.0` or later
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/fit-log.git
   cd fit-log
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📱 Responsive Breakpoints Tested

- **Mobile (< 640px)**: Single column workout cards, stacked hero banner, collapsible navigation menu, touch-friendly buttons.
- **Tablet (640px - 1024px)**: 2-column library grid, inline metric stat row, responsive details view.
- **Desktop (> 1024px)**: Full 3x4 workout grid, two-column detail page, split hero layout.

---

## 📄 License

This project was built for educational and assignment evaluation purposes.
© 2026 FitLog — Workout Library. Train hard, log honest.
