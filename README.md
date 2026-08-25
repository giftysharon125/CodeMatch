# 💻 CODE MATCH — Mascot & Tech Memory Game

![HTML5]
![CSS3]
![JavaScript]
![License]

A cute, modern, and highly interactive **developer-themed memory card game** built with pure HTML5, CSS3 3D transforms, and Vanilla JavaScript. Test your memory, pair up adorable tech mascots, and beat your high scores!


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

