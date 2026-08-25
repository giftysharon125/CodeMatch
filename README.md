# 💻 CODE MATCH — Mascot & Tech Memory Game

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)

A cute, modern, and highly interactive **developer-themed memory card game** built with pure HTML5, CSS3 3D transforms, and Vanilla JavaScript. Test your memory, pair up adorable tech mascots, and beat your high scores!

---

## ✨ Features

- 🧸 **18 Custom Developer Mascots**: Pixel-perfect scalable SVGs including *JavaScript Cat, Python Snake, Java Coffee, React Robot, Node.js Character, Docker Whale, GitHub Octopus, AI Robot, Coding Laptop, Firefox Fox, Rust Ferris Crab, Go Gopher, HTML5 Flame, CSS3 Palette, TypeScript Shield, Swift Bird, Git Branch, and Linux Penguin*.
- 🎮 **3 Dynamic Difficulty Levels**:
  - **Easy (4×4)** — 8 pairs
  - **Medium (5×4)** — 10 pairs
  - **Hard (6×6)** — 18 pairs
- 🃏 **Smooth 3D Card Flip**: Realistic 3D card flips with `perspective` and `preserve-3d`, match pulse glows, and error shake wiggles.
- 🔊 **Zero-Dependency Sound Engine**: Built-in Web Audio API synthesizer for instant flip pops, match chimes, error buzzes, and victory fanfares (with a persistent Sound On/Off toggle).
- 🌙 **Light / Dark Mode**: Toggle between soft pastel light mode and a terminal cyber dark mode. Automatically saved in `localStorage`.
- 🏆 **High Scores Leaderboard**: Persistent local storage tracking best score, fewest moves, and fastest completion time per difficulty.
- 🎉 **Victory Modal & Confetti**: Animated celebration modal with dynamic star ratings (⭐ to ⭐⭐⭐) and canvas particle confetti bursts.
- 🧩 **Polish & Feedback**: "3... 2... 1... GO!" countdown, live mascot reaction bar, progress percentage tracker, and restart safety prompts.
- 📱 **Fully Responsive & Accessible**: Mobile-touch optimized, zero horizontal scrolling, and keyboard navigable (`Tab`, `Space`, `Enter`, `T`, `M`, `Esc`).

---

## 📁 Project Structure

```text
Mascot&TechMemory game/
├── index.html       # Game layout, modals, HUD, and semantic markup
├── style.css        # Custom CSS properties, glassmorphism, 3D flip card, themes
├── script.js        # Web Audio synth, mascot library, game loop, state management
├── .gitignore       # Git ignore rules for OS and log files
└── README.md        # Documentation and project guide
```

---

## 🚀 Quick Start

No build tools, bundlers, or frameworks required! You can run this project in any web browser.

### Option 1: Direct File Open
Simply double-click `index.html` or open it directly in your browser.

### Option 2: Local HTTP Server (Recommended)
Using Node.js:
```bash
# Clone the repository
git clone https://github.com/your-username/code-match-memory-game.git

# Navigate into the project folder
cd code-match-memory-game

# Serve locally
npx serve -p 8080
```
Then open `http://localhost:8080` in your web browser.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| `Tab` / `Shift+Tab` | Focus next/previous card or button |
| `Space` / `Enter` | Flip focused card or activate button |
| `T` | Toggle Light/Dark Mode |
| `M` | Toggle Sound On/Off |
| `Esc` | Close active modal |

---

## 🎨 Tech Stack & Architecture

- **HTML5**: Semantic structure, SVG sprite definitions, canvas overlays.
- **CSS3**: CSS Grid, Flexbox, custom variables, 3D transforms (`rotateY`, `transform-style: preserve-3d`), glassmorphism (`backdrop-filter`).
- **Vanilla JavaScript (ES6+)**: Event-driven state engine, native Web Audio API synthesis, local storage interface, requestAnimationFrame canvas particles.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to use, modify, and showcase it in your portfolio!
