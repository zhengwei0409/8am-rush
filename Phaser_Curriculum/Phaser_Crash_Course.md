# Phaser 2D Game Development — Crash Course Curriculum

> **Target:** Year 3 CS student, basic programming knowledge
> **Focus:** Concepts & theory only (no practical builds)
> **Engine:** Phaser 3 (with Phaser 4 notes at the end)

---

## 1. Foundations of 2D Game Development

### [[1.1 — What is a Game Engine]]

**Learning Objectives:**
- Understand the role of a game engine in 2D game development.

**Key Concepts:**
- Game engine definition
- Rendering abstraction
- Input handling
- Asset management
- Scene lifecycle

**Scope:**
- Included: general idea of what an engine provides.
- Not required: engine internals, graphics pipelines.

---

### [[1.2 — What is Phaser]]

**Learning Objectives:**
- Identify Phaser's purpose and position in the web ecosystem.

**Key Concepts:**
- HTML5 game framework
- JavaScript/TypeScript based
- Browser-based runtime
- Canvas and WebGL rendering
- Open-source library

**Scope:**
- Included: what Phaser is and where it runs.
- Not required: Phaser history, version comparisons (covered in 7.1).

---

### [[1.3 — The Game Loop]]

**Learning Objectives:**
- Understand why games run in a loop.

**Key Concepts:**
- Game loop cycle
- Input → Update → Render
- Continuous execution
- Frame-based update
- Delta time

**Scope:**
- Included: conceptual game loop.
- Not required: fixed vs variable timestep details.

---

### [[1.4 — Coordinate System]]

**Learning Objectives:**
- Understand how 2D positions are represented in Phaser.

**Key Concepts:**
- 2D Cartesian plane
- Origin top-left
- X increases right
- Y increases downward
- Pixel units

**Scope:**
- Included: Phaser coordinate orientation.
- Not required: cameras, world vs screen space (covered in 5.x).

---

## 2. Project & Runtime Setup

### [[2.1 — Phaser Project Structure]]

**Learning Objectives:**
- Recognize the minimal pieces of a Phaser project.

**Key Concepts:**
- index.html entry
- Phaser library import
- Main JS file
- Assets folder
- Local dev server

**Scope:**
- Included: conceptual file layout.
- Not required: build tools, bundlers.

---

### [[2.2 — The Game Config Object]]

**Learning Objectives:**
- Understand what the game config defines.

**Key Concepts:**
- Game configuration object
- Width and height
- Renderer type
- Parent DOM element
- Scene list

**Scope:**
- Included: purpose of config fields.
- Not required: advanced config (scale, plugins).

---

### [[2.3 — Renderer: Canvas vs WebGL]]

**Learning Objectives:**
- Differentiate Phaser's two rendering backends.

**Key Concepts:**
- Canvas renderer
- WebGL renderer
- AUTO mode
- Performance tradeoffs
- Shader support

**Scope:**
- Included: conceptual difference.
- Not required: writing shaders.

---

## 3. Scenes

### [[3.1 — What is a Scene]]

**Learning Objectives:**
- Understand scenes as self-contained game states.

**Key Concepts:**
- Scene definition
- Isolated state
- Independent lifecycle
- Scene as screen
- Multiple scenes per game

**Scope:**
- Included: conceptual role of scenes.
- Not required: scene transitions.

---

### [[3.2 — Scene Lifecycle Methods]]

**Learning Objectives:**
- Identify the three core scene methods.

**Key Concepts:**
- preload()
- create()
- update()
- Execution order
- Per-frame vs one-time

**Scope:**
- Included: purpose of each method.
- Not required: init(), shutdown(), destroy().

---

### [[3.3 — Multi-Scene Architecture]]

**Learning Objectives:**
- Understand why games use multiple scenes.

**Key Concepts:**
- Boot scene
- Menu scene
- Gameplay scene
- UI overlay scene
- Scene manager

**Scope:**
- Included: scene separation concept.
- Not required: data passing between scenes.

---

## 4. Assets & Game Objects

### [[4.1 — Asset Loading]]

**Learning Objectives:**
- Understand how Phaser loads external resources.

**Key Concepts:**
- Loader system
- Asset keys
- Image loading
- Audio loading
- Load during preload()

**Scope:**
- Included: concept of asset loading.
- Not required: dynamic runtime loading.

---

### [[4.2 — Sprites]]

**Learning Objectives:**
- Define what a sprite is in Phaser.

**Key Concepts:**
- Sprite definition
- Texture reference
- Position x, y
- Visual game object
- Transformable entity

**Scope:**
- Included: sprite as a core object.
- Not required: sprite sheets (covered in 4.3).

---

### [[4.3 — Sprite Sheets and Atlases]]

**Learning Objectives:**
- Distinguish single images from packed texture formats.

**Key Concepts:**
- Sprite sheet
- Texture atlas
- Frame index
- Memory efficiency
- Batched rendering

**Scope:**
- Included: concept only.
- Not required: tools like TexturePacker.

---

### [[4.4 — Animations]]

**Learning Objectives:**
- Understand frame-based animation.

**Key Concepts:**
- Animation sequence
- Frame rate
- Looping animation
- Animation key
- Play animation on sprite

**Scope:**
- Included: animation concept.
- Not required: tweens (covered in 4.5).

---

### [[4.5 — Tweens]]

**Learning Objectives:**
- Understand tweens as property interpolation.

**Key Concepts:**
- Tween definition
- Property interpolation
- Duration
- Easing functions
- Non-animation motion

**Scope:**
- Included: tween vs animation distinction.
- Not required: tween chaining.

---

### [[4.6 — Text Objects]]

**Learning Objectives:**
- Understand how text is rendered as a game object.

**Key Concepts:**
- Text game object
- Font family
- Font size
- Color and style
- Dynamic text update

**Scope:**
- Included: text as a game object.
- Not required: bitmap fonts.

---

## 5. Input

### [[5.1 — Keyboard Input]]

**Learning Objectives:**
- Understand how Phaser captures keyboard events.

**Key Concepts:**
- Keyboard plugin
- Key object
- isDown state
- JustDown detection
- Cursor keys helper

**Scope:**
- Included: polling-based input model.
- Not required: key combos.

---

### [[5.2 — Mouse and Pointer Input]]

**Learning Objectives:**
- Understand unified pointer input.

**Key Concepts:**
- Pointer abstraction
- Mouse events
- Touch events
- Click detection
- Pointer position

**Scope:**
- Included: pointer unification concept.
- Not required: multi-touch.

---

### [[5.3 — Interactive Game Objects]]

**Learning Objectives:**
- Understand how objects become clickable.

**Key Concepts:**
- setInteractive()
- Hit area
- Pointer events
- Event listeners
- Object-level input

**Scope:**
- Included: enabling input on objects.
- Not required: custom hit shapes.

---

## 6. Physics

### [[6.1 — Why Physics Engines]]

**Learning Objectives:**
- Understand why games use physics systems.

**Key Concepts:**
- Simulated motion
- Velocity and acceleration
- Collision detection
- Automated updates
- Realism vs arcade feel

**Scope:**
- Included: rationale for physics.
- Not required: math derivations.

---

### [[6.2 — Arcade Physics]]

**Learning Objectives:**
- Identify Arcade Physics as Phaser's default system.

**Key Concepts:**
- Arcade Physics system
- AABB collision
- Lightweight performance
- Gravity setting
- Velocity-based motion

**Scope:**
- Included: arcade physics purpose.
- Not required: advanced body tuning.

---

### [[6.3 — Matter.js Physics]]

**Learning Objectives:**
- Recognize Matter.js as the advanced physics option.

**Key Concepts:**
- Matter.js engine
- Rigid body dynamics
- Rotational physics
- Complex shapes
- Higher cost

**Scope:**
- Included: when to consider Matter over Arcade.
- Not required: configuring Matter bodies.

---

### [[6.4 — Physics Bodies]]

**Learning Objectives:**
- Understand the concept of a physics body attached to a sprite.

**Key Concepts:**
- Physics body
- Static vs dynamic
- Body size and offset
- Body vs sprite
- Enable physics on object

**Scope:**
- Included: body concept.
- Not required: body manipulation APIs.

---

### [[6.5 — Collisions and Overlaps]]

**Learning Objectives:**
- Distinguish collision from overlap detection.

**Key Concepts:**
- Collider definition
- Overlap definition
- Collision callback
- Blocking vs non-blocking
- Collision groups

**Scope:**
- Included: conceptual difference.
- Not required: collision filtering masks.

---

## 7. Phaser 4 — What Changes

### [[7.1 — Phaser 3 vs Phaser 4 Overview]]

**Learning Objectives:**
- Understand Phaser 4's positioning relative to Phaser 3.

**Key Concepts:**
- Phaser 4 as successor
- TypeScript-first
- Modular architecture
- Tree-shakeable imports
- Phaser 3 still maintained

**Scope:**
- Included: high-level positioning.
- Not required: full migration details.

---

### [[7.2 — Setup Differences]]

**Learning Objectives:**
- Identify how project setup changes in Phaser 4.

**Key Concepts:**
- ES module imports
- Per-feature imports
- Bundler expected
- Smaller bundle size
- No global Phaser object

**Scope:**
- Included: setup-level differences.
- Not required: specific bundler configs.

---

### [[7.3 — Code Style Differences]]

**Learning Objectives:**
- Recognize code style shifts from Phaser 3 to Phaser 4.

**Key Concepts:**
- Explicit imports
- Stronger typing
- Namespaced modules
- Similar scene lifecycle
- Familiar game object API

**Scope:**
- Included: stylistic shift only.
- Not required: exhaustive API diff.
