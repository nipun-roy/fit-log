# FitLog - Workout Library & Planner

FitLog is a dark-themed fitness companion web application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. It allows users to browse different workout exercises, view detailed instructions and movement specifications, and manage their daily workout routine with a 5-exercise limit.

---

## Project Links

- **Repository**: [https://github.com/nipun-roy/fit-log](https://github.com/nipun-roy/fit-log)
- **Live Demo**: [Deploying on Vercel - Link will be updated here]

---

## Key Features

1. **Responsive Workout Library Grid**
   - Displays all exercises fetched from the FitLog API in a responsive 3-column grid on desktop and single-column on mobile.
   - Includes real-time search by workout name, equipment, or muscle group.
   - Quick category filter chips to filter by muscle groups (Chest, Arms, Back, Legs, Core, Shoulders).
   - Animated skeleton loading cards while data is being fetched.

2. **Workout Details Page**
   - Clean two-column layout showing the workout image on the left and full exercise details on the right.
   - Key specifications table: Equipment, Difficulty level, Sets, Reps, Duration, Calories burned, and Rating.
   - Step-by-step instructions numbered list.
   - Action buttons to add to "Today's Plan" or "Save for Later".

3. **My Plan Page with Live Metrics**
   - Live summary stats showing total Exercises count, total workout Minutes, and total Calories burned.
   - Tab switcher to toggle between "Today's Plan" and "Saved" workouts.
   - Sort dropdown to re-order workouts by Duration, Calories burned, or Rating.
   - Friendly empty state with a direct button to return to the workouts library when no exercises are added.

4. **Daily Plan Cap & Mark as Done**
   - Enforces a 5-exercise cap for Today's Plan to keep workouts focused.
   - Includes a "Mark as Done" button that visually strikes through completed workouts and plays celebratory confetti.
   - Ability to remove exercises from Today's Plan or Saved lists with instant recalculation of metrics.

5. **Data Persistence & Responsive Design**
   - Uses `localStorage` to save your daily plan and bookmarked workouts so data stays intact after page reloads.
   - Fully responsive on mobile, tablet, and desktop screens with a collapsible mobile menu.
   - Custom 404 page for unknown routes.

---

## Technologies Used

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animation**: Canvas Confetti

---

## Getting Started Locally

### Prerequisites
Make sure you have Node.js (version 18 or higher) and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nipun-roy/fit-log.git
   cd fit-log
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

### Production Build
To test the production build locally:
```bash
npm run build
npm run start
```

---

## Author
Developed by **Nipun Roy**
