# 8AM Rush 🎓

A 2D side-scrolling casual game built with **Phaser**, where you play as a student desperately trying to make it to your 8AM lecture on time.

---

## Gameplay Overview

The game clock starts at **7:00 AM** and runs in real time. Reach the end of each level before the clock hits **8:00 AM** — or you're late!

- **Collide with an enemy** → time penalty (clock moves forward)
- **Pick up a buff collectible** → time reward (clock moves backward)
- **Pick up a scoring collectible** → score increases
- **Arrive before 8:00 AM** → WIN
- **Clock reaches 8:00 AM** → LOSE

---

## Characters

Players choose one of 3 characters before the game starts. All characters are purely cosmetic — same stats.

- **CS Student**
- **Engineering Student**
- **Medical Student**

---

## Controls

| Action | Key |
|---|---|
| Jump | `Space` / `↑` |
| Double Jump | `Space` / `↑` (press again mid-air) |
| Crouch | `↓` |

---

## Levels

| Level | Location | Description |
|---|---|---|
| 1 | Apartment → Bus Stop | Navigate out of your apartment block to catch the bus |
| 2 | MRT Station → Platform | Work your way through the MRT station to the platform |
| 3 | Faculty → Lecture Hall | Final dash through the faculty building to the lecture hall |

---

## Enemies

Enemies use static sprites (no animation). They follow fixed movement patterns — contact with an enemy adds time to the clock.

| Enemy | Movement | Effect |
|---|---|---|
| **Notification Bubble** | flies across the screen (projectile) | +time penalty |
| **Game Controller** | drops from above | +time penalty |
| **Bubble Tea Cup** | patrols back and forth on a platform | +time penalty |

---

## Collectibles

Collectibles affect **player movement speed** — arrive earlier or later depending on what you pick up.

### Speed Boosts (player moves faster)

| Collectible | Effect |
|---|---|
| **Exam Paper** | player moves faster |
| **Breakfast** | player moves faster |
| **Coffee** | player moves faster |

### Debuffs (player moves slower)

| Collectible | Effect |
|---|---|
| **ZZZ Icon** | player moves slower |

---

## Tech Stack

- **Framework**: [Phaser](https://phaser.io/)
- **Language**: JavaScript
- **Assets**: TBD

---

## Project Structure

```
Game_Dev_Grp_Assignment/
├── index.html          ← Entry point — open this in a browser to run the game
├── src/                ← All JavaScript source code
│   ├── scenes/         ← Each game screen is a "Scene" in Phaser
│   │   ├── Level1.js   ← Scene for Apartment → Bus Stop
│   │   ├── Level2.js   ← Scene for MRT Station → Platform
│   │   └── Level3.js   ← Scene for Faculty → Lecture Hall
│   ├── entities/       ← Game object logic
│   │   ├── Player.js   ← Player movement: jump, double jump, crouch
│   │   └── Enemy.js    ← Enemy behaviour: patrol, projectile, drop
│   └── main.js         ← Phaser initialisation — wires all scenes together
├── assets/             ← Game assets
│   ├── sprites/        ← Images: characters, enemies, backgrounds, tiles
│   └── audio/          ← Sound effects and background music
└── README.md
```

> **What is a Scene?** In Phaser, a Scene is one self-contained game screen. The main menu is a scene, each level is a scene, and the Game Over screen is a scene. `main.js` registers them all and controls which one runs first.

---

## Team

| Name | Responsibility |
|---|---|
| TBD | TBD |

---

## Getting Started

1. Clone the repo
2. Open `index.html` in a browser, or use a local server:
   ```bash
   npx serve .
   ```
3. Start playing!
