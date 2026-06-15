# Dark Mode Transformation Plan

## Doodle Sketchbook → Blackboard & Chalk Experience

### Project Goal

The current website already has a completed doodle-themed light mode. The objective of this enhancement is to transform the dark mode from a simple color inversion into a completely different visual experience inspired by a classroom blackboard and chalk drawings.

The transition should feel as if the user is switching from a sketchbook to a blackboard rather than merely changing colors.

---

# Current State

## Light Mode (Completed)

Theme Style:

* Sketchbook
* Notebook
* Hand-drawn doodles
* Pencil illustrations
* Paper background
* Doodle borders and elements

Current Dark Mode:

* Only color values are changed
* Same doodle assets are reused
* No unique blackboard identity

---

# Desired Dark Mode Vision

## Theme Concept

Light Mode:

```text
Artist Sketchbook
```

Dark Mode:

```text
Classroom Blackboard
```

The overall layout remains identical while visual assets and styling adapt to the selected theme.

---

# Phase 1: Blackboard Foundation

## Background Replacement

### Current

```text
Paper Background
```

### Target

```text
Blackboard Surface
```

Tasks:

* Create subtle blackboard texture
* Add chalk dust noise
* Add depth using multiple overlay layers
* Avoid pure black backgrounds

Recommended Colors:

```css
--blackboard-bg: #1A1D1A;
--blackboard-surface: #202420;
--blackboard-secondary: #2A2F2A;
```

Deliverable:

A realistic but lightweight chalkboard background.

---

# Phase 2: Chalk Typography System

## Text Transformation

Current:

```text
Pencil Ink
```

Target:

```text
White Chalk
```

Tasks:

* Create chalk color palette
* Add slight chalk softness
* Apply chalk-like rendering to headings

Recommended Colors:

```css
--chalk-white: #F5F5F5;
--chalk-yellow: #FFE66D;
--chalk-blue: #70D6FF;
--chalk-green: #7AE582;
```

Deliverable:

Typography feels hand-written using chalk.

---

# Phase 3: Doodle Asset Conversion

## SVG Illustration System

Current:

```text
Notebook Doodles
```

Target:

```text
Chalk Drawings
```

Tasks:

* Convert all SVG strokes to chalk colors
* Create chalk brush stroke effect
* Add subtle rough edges
* Introduce chalk dust filter

Components:

* Hero illustrations
* Decorative arrows
* Stars
* Clouds
* Icons
* Section dividers

Deliverable:

All doodles appear hand-drawn with chalk.

---

# Phase 4: Card System Redesign

## Project Cards

Current:

```text
Sketchbook Cards
```

Target:

```text
Chalk Board Panels
```

Tasks:

* Create rough chalk borders
* Add hand-drawn corners
* Add chalk highlights
* Remove clean modern shadows

Deliverable:

Cards appear drawn directly on the board.

---

# Phase 5: Button System

## Interactive Elements

Current:

```text
Standard Doodle Buttons
```

Target:

```text
Chalk Buttons
```

Tasks:

* Chalk outline buttons
* Chalk hover animations
* Chalk underline effects
* Hand-drawn focus states

Deliverable:

All actions feel consistent with the blackboard aesthetic.

---

# Phase 6: Theme Toggle Redesign

## Theme Switch Story

Current:

```text
Light ↔ Dark
```

Target:

```text
Sketchbook ↔ Blackboard
```

Toggle Design:

Light Mode Icon:

```text
✏ Pencil
```

Dark Mode Icon:

```text
Chalk
```

Tasks:

* Create animated toggle
* Animate icon morphing
* Add subtle drawing animation

Deliverable:

Theme toggle becomes part of the website identity.

---

# Phase 7: Theme Transition Animation

## Blackboard Eraser Transition

Objective:

Create a transition that mimics a teacher wiping a blackboard.

Flow:

```text
User Clicks Toggle
        ↓
Eraser Appears
        ↓
Screen Wipes
        ↓
Theme Changes
        ↓
Eraser Exits
```

Tasks:

* Create transition overlay
* Add motion path
* Add chalk dust particles
* Animate theme swap

Deliverable:

A memorable theme-changing experience.

---

# Phase 8: Cursor Effect Integration

## Theme-Aware Cursor Ripples

Light Mode:

```text
Ink Ripples
```

Dark Mode:

```text
Chalk Dust Ripples
```

Tasks:

* Change ripple colors dynamically
* Add chalk particle emission
* Adjust opacity and glow

Deliverable:

Cursor effects reinforce the active theme.

---

# Phase 9: Hero Section Enhancement

## Theme-Specific Illustrations

Light Mode:

```text
Notebook Style
```

Dark Mode:

```text
Blackboard Style
```

Tasks:

* Replace decorative assets
* Add chalk planets
* Add chalk rockets
* Add chalk arrows
* Add chalk equations

Deliverable:

Hero section feels uniquely designed for each mode.

---

# Phase 10: Global Theme Tokens

## CSS Variable Architecture

Create dedicated design tokens.

Example:

```css
[data-theme="light"] {
  --surface: #fffdf7;
  --text: #1e1e1e;
}

[data-theme="dark"] {
  --surface: #1a1d1a;
  --text: #f5f5f5;
}
```

Deliverable:

All theme styling controlled from a central source.

---

# Implementation Priority

## Phase A (High Priority)

* Blackboard background
* Chalk typography
* Theme toggle redesign
* Global theme tokens

## Phase B (Medium Priority)

* SVG chalk conversion
* Card redesign
* Button redesign

## Phase C (Premium Experience)

* Blackboard eraser transition
* Chalk particle system
* Theme-aware cursor effects

---

# Success Criteria

The website should no longer feel like:

```text
Light Theme + Dark Colors
```

It should feel like:

```text
Sketchbook Experience
        ↔
Blackboard Experience
```

where both themes have their own personality while sharing the same layout and content structure.
