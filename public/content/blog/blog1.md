---
title: "Doodle Design: Bringing Hand-Drawn Aesthetics to the Web"
date: "2026-06-03"
description: "Exploring the rise of hand-drawn web interfaces, sketch aesthetics, and how to build them using modern CSS properties."
author: "Ritesh Barman"
tags: ["Design", "CSS", "Creative"]
thumbnail: "/svg/blog.svg"
---

> **Original Content Disclaimer**: This article contains original insights and practical techniques based on my personal experience with CSS design. All code examples are created for educational purposes and can be freely used and modified.

# Doodle Design: The Hand-Drawn Web

In a world filled with pixel-perfect, clean, and highly uniform SaaS interfaces, hand-drawn and doodle style designs are making a comeback. They offer warmth, personality, and a sense of craft that feels refreshing and deeply human.

Here's a practical guide on how we can implement this aesthetic on the modern web.

---

## 1. Sketchy Borders

The secret to doodle borders is the CSS `border-radius` property. By specifying eight values separated by a slash `/`, you can create custom asymmetrical border shapes that mimic hand-drawn strokes:

```css
.doodle-border {
  border: 3px solid currentColor;
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
}
```

This creates slightly imperfect borders that feel sketched rather than mathematically computed.

---

## 2. Hard Block Shadows

Traditional web designs rely on soft, blurred box shadows. Doodle designs look much better with a bold, hard offset shadow:

```css
.doodle-shadow {
  box-shadow: 4px 4px 0px 0px currentColor;
}
```

This style matches comic book outlines and makes elements pop as if they were drawn on paper.

---

## 3. Playful Interactions

To make the doodle interface feel tactile and responsive, we can slightly translate elements on hover and click:

* **Hover:** Tilt the card or shift it up (`transform: translate(-2px, -2px) rotate(-1deg)`).
* **Click (Active):** Shift it down and shrink the shadow to make it feel pressed down.

```css
.doodle-button:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px 0px currentColor;
}
```

---

## Conclusion

By combining custom paper-like background grids, handwritten Google Fonts (like *Patrick Hand*), and sketchy CSS rules, we can build a unique, custom layout that wows users at first glance!
