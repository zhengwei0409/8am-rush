# 8am Rush

A 2D side-scrolling platformer game built with Phaser 4, React, and TypeScript. You play as a university student racing against the clock to reach Universiti Malaya before 8:00 AM.

## Gameplay

Run and jump across 3 levels — Dorm Walkway, MRT Station, and University Gate — while avoiding obstacles. You have 90 seconds (real time) before the in-game clock hits 8:00 AM. Reach the finish line of Level 3 to win.

**Controls**

| Key | Action |
|-----|--------|
| `SPACE` or mouse click | Jump |
| `A` / `D` or `←` / `→` | Navigate character select |
| `ENTER` or `SPACE` | Confirm selection / Start game |

**Scoring**

```
Level score = 500 (base) + remaining seconds + (70 - elapsed seconds) × 5
```

## Characters

- CS Student
- Medic Student
- Engineer Student

Each character has 5 animation states: running, jumping, falling, idle, and slipping.

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| Phaser | 4.1.0 | Game engine (physics, scenes, animations) |
| React | 19.2.5 | Mounts the game canvas into the web page |
| TypeScript | 6.0.2 | Type safety |
| Vite | 8.0.10 | Dev server and build tool |
| Tailwind CSS | 4.2.4 | Styling for the page wrapper |

## Project Structure

```
src/
├── App.tsx                    # React root — configures and mounts the Phaser game
├── gameData.js                # Character data, game constants, helper functions
├── audio.js                   # Audio management
├── entities/
│   ├── Player.js              # Player sprite with physics and animations
│   └── Enemy.js               # Obstacle/enemy sprite
└── scenes/
    ├── StartScene.js          # Main menu
    ├── CharacterSelectScene.js # Character selection screen
    ├── BaseLevel.js           # Shared base class for all levels
    ├── Level1.js              # Level 1: Dorm Walkway
    ├── Level2.js              # Level 2: MRT Station
    ├── Level3.js              # Level 3: University Gate
    ├── LevelSummaryScene.js   # Checkpoint summary between levels
    └── ResultScene.js         # Final result screen
```

## Getting Started

**Prerequisites:** Node.js installed on your machine.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open `http://localhost:5173` in your browser.

**Other commands**

```bash
npm run build    # Production build
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```
