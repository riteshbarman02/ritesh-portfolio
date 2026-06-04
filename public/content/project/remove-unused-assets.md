---
title: "Flutter Unused Asset Cleaner"
tech: "Python, CLI, Flutter, Shell"
thumbnail: "/svg/developer.svg"
link: "https://github.com/riteshbarman02/remove_unused_assets"
github: "https://github.com/riteshbarman02/remove_unused_assets"
description: "A developer CLI tool written in Python to automatically scan Flutter projects, detect unused asset links, and delete redundant assets to reduce binary sizes."
date: "2023-08-25"
---

# Flutter Unused Asset Cleaner CLI

This is a developer-focused CLI utility designed to scan Flutter configurations (`pubspec.yaml`) and directories. It cross-references asset declarations with files referenced in the `.dart` codebase, finds dead asset weights, and safely removes them.

---

## 🌟 Key Features

* **AST Parsing & Code Analysis:** Safely scans all `.dart` source code directories for hardcoded string assets.
* **Pubspec Syncing:** Automatically edits `pubspec.yaml` declarations to remove entries for deleted assets.
* **Dry Run Support:** Review list of flagged assets and size optimization summaries before executing deletes.
* **Cross-Platform CLI:** Compiles and runs locally on macOS, Linux, and Windows terminals.
