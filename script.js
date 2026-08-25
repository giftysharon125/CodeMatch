/* ==========================================================================
   CODE MATCH - MASCOT TECH MEMORY GAME
   Vanilla JavaScript Application Engine
   ========================================================================== */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. WEB AUDIO SYNTHESIZER ENGINE (Zero External Audio Files)
     -------------------------------------------------------------------------- */
  class SoundEngine {
    constructor() {
      this.ctx = null;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playTone(freq, type, duration, delay = 0, gainValue = 0.15) {
      if (!gameState.soundEnabled) return;
      try {
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);

        gain.gain.setValueAtTime(gainValue, this.ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + delay + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + delay);
        osc.stop(this.ctx.currentTime + delay + duration);
      } catch (e) {
        // Audio fallback ignore
      }
    }

    playFlip() {
      // Light pop chime
      this.playTone(420, 'sine', 0.1, 0, 0.12);
      this.playTone(600, 'sine', 0.12, 0.04, 0.08);
    }

    playMatch() {
      // Ascending major triad fanfare
      this.playTone(523.25, 'sine', 0.2, 0, 0.15);     // C5
      this.playTone(659.25, 'sine', 0.2, 0.08, 0.15);  // E5
      this.playTone(783.99, 'sine', 0.25, 0.16, 0.18); // G5
      this.playTone(1046.50, 'sine', 0.35, 0.24, 0.2); // C6
    }

    playMismatch() {
      // Low disappointed double buzz
      this.playTone(180, 'sawtooth', 0.18, 0, 0.12);
      this.playTone(140, 'sawtooth', 0.25, 0.12, 0.12);
    }

    playClick() {
      // Subtle click sound
      this.playTone(800, 'sine', 0.05, 0, 0.08);
    }

    playVictory() {
      // Victory tune fanfare
      const notes = [
        { f: 523.25, d: 0.15, t: 0 },
        { f: 659.25, d: 0.15, t: 0.12 },
        { f: 783.99, d: 0.15, t: 0.24 },
        { f: 1046.50, d: 0.4, t: 0.36 },
        { f: 880.00, d: 0.15, t: 0.65 },
        { f: 1046.50, d: 0.6, t: 0.8 }
      ];
      notes.forEach(n => this.playTone(n.f, 'triangle', n.d, n.t, 0.2));
    }
  }

  const sound = new SoundEngine();

  /* --------------------------------------------------------------------------
     2. 18 CUTE MASCOT DEFINITIONS (Inline Scalable SVGs)
     -------------------------------------------------------------------------- */
  const MASCOTS = [
    {
      id: 'js-cat',
      name: 'JavaScript Cat',
      color: '#fef08a',
      badge: '#ca8a04',
      svg: `<svg viewBox="0 0 100 100">
        <rect x="15" y="15" width="70" height="70" rx="18" fill="#facc15"/>
        <polygon points="25,18 40,32 20,38" fill="#eab308"/>
        <polygon points="75,18 60,32 80,38" fill="#eab308"/>
        <circle cx="38" cy="45" r="6" fill="#1e293b"/>
        <circle cx="62" cy="45" r="6" fill="#1e293b"/>
        <circle cx="40" cy="43" r="2" fill="#ffffff"/>
        <circle cx="64" cy="43" r="2" fill="#ffffff"/>
        <ellipse cx="50" cy="55" rx="4" ry="3" fill="#ca8a04"/>
        <path d="M42,62 Q50,68 58,62" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>
        <text x="66" y="78" font-family="sans-serif" font-weight="900" font-size="22" fill="#1e293b">JS</text>
      </svg>`
    },
    {
      id: 'python-snake',
      name: 'Python Snake',
      color: '#bae6fd',
      badge: '#0284c7',
      svg: `<svg viewBox="0 0 100 100">
        <path d="M 30,35 C 30,15 70,15 70,35 C 70,50 40,45 40,65 C 40,85 75,85 75,65" fill="none" stroke="#38bdf8" stroke-width="16" stroke-linecap="round"/>
        <path d="M 30,35 C 30,15 70,15 70,35 C 70,50 40,45 40,65 C 40,85 75,85 75,65" fill="none" stroke="#facc15" stroke-width="16" stroke-linecap="round" stroke-dasharray="40 40"/>
        <circle cx="58" cy="24" r="3" fill="#1e293b"/>
        <circle cx="42" cy="76" r="3" fill="#1e293b"/>
        <path d="M 72,25 Q 82,22 88,25" fill="none" stroke="#ef4444" stroke-width="2.5"/>
      </svg>`
    },
    {
      id: 'java-coffee',
      name: 'Java Coffee',
      color: '#ffedd5',
      badge: '#c2410c',
      svg: `<svg viewBox="0 0 100 100">
        <path d="M 35,22 Q 40,12 35,5 M 50,22 Q 55,12 50,5 M 65,22 Q 70,12 65,5" fill="none" stroke="#ea580c" stroke-width="3" stroke-linecap="round"/>
        <rect x="25" y="32" width="50" height="48" rx="14" fill="#f97316"/>
        <path d="M 75,42 C 90,42 90,64 75,64" fill="none" stroke="#ea580c" stroke-width="7" stroke-linecap="round"/>
        <circle cx="42" cy="52" r="4.5" fill="#ffffff"/>
        <circle cx="58" cy="52" r="4.5" fill="#ffffff"/>
        <path d="M 44,63 Q 50,68 56,63" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      </svg>`
    },
    {
      id: 'react-bot',
      name: 'React Robot',
      color: '#e0f2fe',
      badge: '#0284c7',
      svg: `<svg viewBox="0 0 100 100">
        <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#38bdf8" stroke-width="4" transform="rotate(30 50 50)"/>
        <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#38bdf8" stroke-width="4" transform="rotate(90 50 50)"/>
        <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#38bdf8" stroke-width="4" transform="rotate(150 50 50)"/>
        <circle cx="50" cy="50" r="12" fill="#0284c7"/>
        <circle cx="46" cy="48" r="3" fill="#ffffff"/>
        <circle cx="54" cy="48" r="3" fill="#ffffff"/>
      </svg>`
    },
    {
      id: 'node-greenie',
      name: 'Node.js Character',
      color: '#dcfce7',
      badge: '#15803d',
      svg: `<svg viewBox="0 0 100 100">
        <polygon points="50,15 85,35 85,70 50,90 15,70 15,35" fill="#22c55e"/>
        <circle cx="38" cy="48" r="6" fill="#1e293b"/>
        <circle cx="62" cy="48" r="6" fill="#1e293b"/>
        <circle cx="40" cy="46" r="2" fill="#ffffff"/>
        <circle cx="64" cy="46" r="2" fill="#ffffff"/>
        <ellipse cx="50" cy="62" rx="8" ry="5" fill="#15803d"/>
      </svg>`
    },
    {
      id: 'docker-whale',
      name: 'Docker Whale',
      color: '#e0f2fe',
      badge: '#0369a1',
      svg: `<svg viewBox="0 0 100 100">
        <rect x="35" y="32" width="8" height="8" rx="2" fill="#0284c7"/>
        <rect x="45" y="32" width="8" height="8" rx="2" fill="#0284c7"/>
        <rect x="55" y="32" width="8" height="8" rx="2" fill="#0284c7"/>
        <rect x="45" y="22" width="8" height="8" rx="2" fill="#0284c7"/>
        <path d="M 12,54 C 12,38 78,38 88,54 C 95,64 80,78 45,78 C 20,78 12,68 12,54 Z" fill="#38bdf8"/>
        <circle cx="75" cy="56" r="3.5" fill="#1e293b"/>
        <path d="M 12,58 Q 2,48 8,42 Q 16,48 16,58" fill="#0284c7"/>
      </svg>`
    },
    {
      id: 'github-octo',
      name: 'GitHub Octopus',
      color: '#f3e8ff',
      badge: '#6b21a8',
      svg: `<svg viewBox="0 0 100 100">
        <ellipse cx="50" cy="45" rx="32" ry="28" fill="#a855f7"/>
        <path d="M 22,55 Q 15,80 30,78 M 38,62 Q 35,88 48,80 M 62,62 Q 65,88 52,80 M 78,55 Q 85,80 70,78" fill="none" stroke="#a855f7" stroke-width="7" stroke-linecap="round"/>
        <ellipse cx="38" cy="45" rx="7" ry="9" fill="#ffffff"/>
        <ellipse cx="62" cy="45" rx="7" ry="9" fill="#ffffff"/>
        <circle cx="40" cy="46" r="4" fill="#1e293b"/>
        <circle cx="60" cy="46" r="4" fill="#1e293b"/>
      </svg>`
    },
    {
      id: 'ai-robot',
      name: 'AI Robot',
      color: '#fae8ff',
      badge: '#c026d3',
      svg: `<svg viewBox="0 0 100 100">
        <rect x="22" y="25" width="56" height="46" rx="16" fill="#e879f9"/>
        <line x1="50" y1="25" x2="50" y2="12" stroke="#d946ef" stroke-width="4"/>
        <circle cx="50" cy="10" r="5" fill="#f43f5e"/>
        <rect x="30" y="35" width="40" height="22" rx="8" fill="#1e293b"/>
        <circle cx="40" cy="46" r="4" fill="#38bdf8"/>
        <circle cx="60" cy="46" r="4" fill="#38bdf8"/>
        <path d="M 40,78 L 60,78 L 50,88 Z" fill="#d946ef"/>
      </svg>`
    },
    {
      id: 'code-laptop',
      name: 'Coding Laptop',
      color: '#e0e7ff',
      badge: '#4338ca',
      svg: `<svg viewBox="0 0 100 100">
        <rect x="20" y="22" width="60" height="42" rx="6" fill="#6366f1"/>
        <rect x="25" y="27" width="50" height="32" rx="4" fill="#1e1b4b"/>
        <path d="M 12,68 L 88,68 L 82,78 L 18,78 Z" fill="#818cf8"/>
        <path d="M 33,38 L 41,43 L 33,48" fill="none" stroke="#22c55e" stroke-width="3" stroke-linecap="round"/>
        <line x1="46" y1="48" x2="58" y2="48" stroke="#facc15" stroke-width="3" stroke-linecap="round"/>
      </svg>`
    },
    {
      id: 'firefox-fox',
      name: 'Firefox Fox',
      color: '#ffedd5',
      badge: '#c2410c',
      svg: `<svg viewBox="0 0 100 100">
        <circle cx="50" cy="52" r="28" fill="#38bdf8"/>
        <path d="M 20,40 Q 50,10 80,40 Q 90,75 50,85 Q 10,75 20,40 Z" fill="#f97316"/>
        <polygon points="25,32 40,48 20,50" fill="#ea580c"/>
        <polygon points="75,32 60,48 80,50" fill="#ea580c"/>
        <ellipse cx="40" cy="52" rx="4" ry="5" fill="#1e293b"/>
        <ellipse cx="60" cy="52" rx="4" ry="5" fill="#1e293b"/>
        <circle cx="41" cy="50" r="1.5" fill="#ffffff"/>
        <circle cx="61" cy="50" r="1.5" fill="#ffffff"/>
      </svg>`
    },
    {
      id: 'rust-ferris',
      name: 'Rust Ferris Crab',
      color: '#ffe4e6',
      badge: '#e11d48',
      svg: `<svg viewBox="0 0 100 100">
        <ellipse cx="50" cy="55" rx="30" ry="22" fill="#fb7185"/>
        <circle cx="35" cy="40" r="6" fill="#ffffff"/>
        <circle cx="65" cy="40" r="6" fill="#ffffff"/>
        <circle cx="36" cy="40" r="3" fill="#1e293b"/>
        <circle cx="64" cy="40" r="3" fill="#1e293b"/>
        <path d="M 22,42 Q 10,25 22,18 C 30,22 26,35 22,42 Z" fill="#f43f5e"/>
        <path d="M 78,42 Q 90,25 78,18 C 70,22 74,35 78,42 Z" fill="#f43f5e"/>
        <path d="M 44,64 Q 50,70 56,64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>
      </svg>`
    },
    {
      id: 'go-gopher',
      name: 'Go Gopher',
      color: '#e0f2fe',
      badge: '#0284c7',
      svg: `<svg viewBox="0 0 100 100">
        <rect x="25" y="25" width="50" height="55" rx="25" fill="#38bdf8"/>
        <circle cx="36" cy="38" r="10" fill="#ffffff"/>
        <circle cx="64" cy="38" r="10" fill="#ffffff"/>
        <circle cx="38" cy="38" r="4.5" fill="#1e293b"/>
        <circle cx="62" cy="38" r="4.5" fill="#1e293b"/>
        <ellipse cx="50" cy="48" rx="6" ry="4" fill="#0284c7"/>
        <rect x="46" y="52" width="8" height="6" fill="#ffffff"/>
      </svg>`
    },
    {
      id: 'html5-flame',
      name: 'HTML5 Flame',
      color: '#ffedd5',
      badge: '#ea580c',
      svg: `<svg viewBox="0 0 100 100">
        <polygon points="20,18 80,18 74,78 50,88 26,78" fill="#f97316"/>
        <polygon points="50,23 74,23 69,73 50,81" fill="#ea580c"/>
        <path d="M 33,32 L 67,32 L 65,46 L 48,46 L 49,57 L 64,57 L 62,72 L 50,76 L 38,72 L 37,60" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
    },
    {
      id: 'css3-palette',
      name: 'CSS3 Palette',
      color: '#dbeafe',
      badge: '#1d4ed8',
      svg: `<svg viewBox="0 0 100 100">
        <polygon points="20,18 80,18 74,78 50,88 26,78" fill="#3b82f6"/>
        <polygon points="50,23 74,23 69,73 50,81" fill="#2563eb"/>
        <path d="M 66,32 L 34,32 L 35,46 L 64,46 L 62,72 L 50,76 L 38,72 L 37,60" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
    },
    {
      id: 'ts-shield',
      name: 'TypeScript Shield',
      color: '#dbeafe',
      badge: '#1d4ed8',
      svg: `<svg viewBox="0 0 100 100">
        <rect x="18" y="18" width="64" height="64" rx="16" fill="#2563eb"/>
        <text x="32" y="62" font-family="sans-serif" font-weight="800" font-size="34" fill="#ffffff">TS</text>
      </svg>`
    },
    {
      id: 'swift-bird',
      name: 'Swift Bird',
      color: '#ffedd5',
      badge: '#c2410c',
      svg: `<svg viewBox="0 0 100 100">
        <path d="M 20,25 C 40,25 75,35 85,75 C 65,65 50,70 30,85 C 45,65 35,45 15,40 C 30,42 45,45 55,35 Z" fill="#f97316"/>
        <circle cx="70" cy="50" r="3" fill="#ffffff"/>
      </svg>`
    },
    {
      id: 'git-branch',
      name: 'Git Branch',
      color: '#ffe4e6',
      badge: '#e11d48',
      svg: `<svg viewBox="0 0 100 100">
        <rect x="22" y="22" width="56" height="56" rx="14" fill="#f43f5e" transform="rotate(45 50 50)"/>
        <circle cx="36" cy="64" r="6" fill="#ffffff"/>
        <circle cx="64" cy="36" r="6" fill="#ffffff"/>
        <circle cx="64" cy="64" r="6" fill="#ffffff"/>
        <line x1="36" y1="64" x2="64" y2="36" stroke="#ffffff" stroke-width="5"/>
        <line x1="64" y1="36" x2="64" y2="64" stroke="#ffffff" stroke-width="5"/>
      </svg>`
    },
    {
      id: 'linux-tux',
      name: 'Linux Penguin',
      color: '#fef08a',
      badge: '#ca8a04',
      svg: `<svg viewBox="0 0 100 100">
        <ellipse cx="50" cy="52" rx="26" ry="32" fill="#1e293b"/>
        <ellipse cx="50" cy="56" rx="18" ry="24" fill="#ffffff"/>
        <ellipse cx="42" cy="40" rx="4" ry="5" fill="#ffffff"/>
        <ellipse cx="58" cy="40" rx="4" ry="5" fill="#ffffff"/>
        <circle cx="43" cy="41" r="2.5" fill="#1e293b"/>
        <circle cx="57" cy="41" r="2.5" fill="#1e293b"/>
        <polygon points="44,48 56,48 50,56" fill="#f59e0b"/>
      </svg>`
    }
  ];

  /* --------------------------------------------------------------------------
     3. GAME STATE MANAGEMENT
     -------------------------------------------------------------------------- */
  const gameState = {
    difficulty: 'medium', // 'easy' (4x4), 'medium' (5x4), 'hard' (6x6)
    totalPairs: 10,
    boardCards: [],
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    timerSeconds: 0,
    timerInterval: null,
    score: 0,
    isGameActive: false,
    isLockBoard: false,
    soundEnabled: true,
    currentTheme: 'light',
    highScores: {
      easy: [],
      medium: [],
      hard: []
    }
  };

  /* Motivational Quotes */
  const MOTIVATIONAL_MESSAGES = [
    "Nice match! ✨",
    "You're on fire! 🔥",
    "Great memory! 🧠",
    "Awesome pair! ⚡",
    "Spot on! 🎯",
    "Keep it up, Dev! 🚀",
    "Brilliant scan! 💡",
    "Coding wizardry! 🧙‍♂️"
  ];

  const MASCOT_EMOJIS = ['🤖', '🐱', '🐍', '☕', '⚛️', '🐳', '🦊', '🦀', '🐧'];

  /* --------------------------------------------------------------------------
     4. DOM ELEMENT REFERENCES
     -------------------------------------------------------------------------- */
  const elements = {
    appHtml: document.documentElement,
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    soundToggleBtn: document.getElementById('sound-toggle-btn'),
    highScoresBtn: document.getElementById('high-scores-btn'),
    howToPlayBtn: document.getElementById('how-to-play-btn'),
    logoHomeBtn: document.getElementById('logo-home-btn'),

    // Views
    mainMenuView: document.getElementById('main-menu-view'),
    gameScreenView: document.getElementById('game-screen-view'),

    // Menu Actions
    diffBtns: document.querySelectorAll('.diff-btn'),
    startGameBtn: document.getElementById('start-game-btn'),
    menuScoresBtn: document.getElementById('menu-scores-btn'),
    menuRulesBtn: document.getElementById('menu-rules-btn'),

    // HUD & Progress
    movesCount: document.getElementById('moves-count'),
    pairsCount: document.getElementById('pairs-count'),
    timerCount: document.getElementById('timer-count'),
    scoreCount: document.getElementById('score-count'),
    bestScoreCount: document.getElementById('best-score-count'),
    progressFill: document.getElementById('progress-fill'),
    progressText: document.getElementById('progress-text'),

    // Reaction Bar
    reactionAvatar: document.getElementById('reaction-avatar'),
    reactionSpeech: document.getElementById('reaction-speech'),

    // Board
    gameBoard: document.getElementById('game-board'),
    restartGameBtn: document.getElementById('restart-game-btn'),
    quitGameBtn: document.getElementById('quit-game-btn'),

    // Modals
    countdownModal: document.getElementById('countdown-modal'),
    countdownNumber: document.getElementById('countdown-number'),

    winModal: document.getElementById('win-modal'),
    winScore: document.getElementById('win-score'),
    winMoves: document.getElementById('win-moves'),
    winTime: document.getElementById('win-time'),
    winBest: document.getElementById('win-best'),
    winStars: document.getElementById('win-stars'),
    winRecordBadge: document.getElementById('win-record-badge'),
    winPlayAgainBtn: document.getElementById('win-play-again-btn'),
    winMainMenuBtn: document.getElementById('win-main-menu-btn'),

    scoresModal: document.getElementById('scores-modal'),
    closeScoresBtn: document.getElementById('close-scores-btn'),
    tabBtns: document.querySelectorAll('.tab-btn'),
    scoresContent: document.getElementById('scores-content'),
    clearScoresBtn: document.getElementById('clear-scores-btn'),

    rulesModal: document.getElementById('rules-modal'),
    closeRulesBtn: document.getElementById('close-rules-btn'),

    resetModal: document.getElementById('reset-modal'),
    confirmRestartBtn: document.getElementById('confirm-restart-btn'),
    cancelRestartBtn: document.getElementById('cancel-restart-btn'),

    confettiCanvas: document.getElementById('confetti-canvas')
  };

  /* --------------------------------------------------------------------------
     5. LOCAL STORAGE ENGINE
     -------------------------------------------------------------------------- */
  function loadLocalStorage() {
    try {
      const savedTheme = localStorage.getItem('codeMatch_theme');
      if (savedTheme) {
        gameState.currentTheme = savedTheme;
      }

      const savedSound = localStorage.getItem('codeMatch_sound');
      if (savedSound !== null) {
        gameState.soundEnabled = savedSound === 'true';
      }

      const savedScores = localStorage.getItem('codeMatch_highScores');
      if (savedScores) {
        gameState.highScores = JSON.parse(savedScores);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  function saveLocalStorage() {
    try {
      localStorage.setItem('codeMatch_theme', gameState.currentTheme);
      localStorage.setItem('codeMatch_sound', gameState.soundEnabled);
      localStorage.setItem('codeMatch_highScores', JSON.stringify(gameState.highScores));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  function applySettings() {
    elements.appHtml.setAttribute('data-theme', gameState.currentTheme);
    if (!gameState.soundEnabled) {
      document.body.classList.add('sound-disabled');
    } else {
      document.body.classList.remove('sound-disabled');
    }
    updateBestScoreDisplay();
  }

  /* --------------------------------------------------------------------------
     6. GAME INITIALIZATION & SHUFFLE
     -------------------------------------------------------------------------- */
  function getPairsCount(diff) {
    switch (diff) {
      case 'easy': return 8;   // 4x4
      case 'medium': return 10; // 5x4
      case 'hard': return 18;  // 6x6
      default: return 10;
    }
  }

  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function prepareBoard() {
    gameState.totalPairs = getPairsCount(gameState.difficulty);
    
    // Select required mascot subset
    const shuffledMascots = shuffle(MASCOTS).slice(0, gameState.totalPairs);
    
    // Duplicate for pairs and shuffle
    const pairCards = shuffle([...shuffledMascots, ...shuffledMascots]);

    gameState.boardCards = pairCards.map((mascot, index) => ({
      uid: `${mascot.id}-${index}-${Math.random().toString(36).substr(2, 5)}`,
      mascotId: mascot.id,
      name: mascot.name,
      svg: mascot.svg,
      color: mascot.color,
      badge: mascot.badge
    }));

    gameState.flippedCards = [];
    gameState.matchedPairs = 0;
    gameState.moves = 0;
    gameState.timerSeconds = 0;
    gameState.score = 0;
    gameState.isLockBoard = false;

    updateHUD();
    renderBoard();
  }

  function renderBoard() {
    elements.gameBoard.innerHTML = '';
    elements.gameBoard.className = `game-board grid-${getGridClass(gameState.difficulty)}`;

    gameState.boardCards.forEach((card, idx) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'card';
      cardEl.setAttribute('tabindex', '0');
      cardEl.setAttribute('role', 'button');
      cardEl.setAttribute('aria-label', `Memory card ${idx + 1}`);
      cardEl.dataset.uid = card.uid;
      cardEl.dataset.mascotId = card.mascotId;

      cardEl.innerHTML = `
        <div class="card-inner">
          <div class="card-front">
            <div class="card-front-pattern"></div>
            <span class="card-front-icon">💻</span>
          </div>
          <div class="card-back" style="background-color: ${card.color};">
            <div class="mascot-svg-wrapper">${card.svg}</div>
            <span class="mascot-name-tag">${card.name}</span>
          </div>
        </div>
      `;

      cardEl.addEventListener('click', () => handleCardClick(cardEl));
      cardEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick(cardEl);
        }
      });

      elements.gameBoard.appendChild(cardEl);
    });
  }

  function getGridClass(diff) {
    switch (diff) {
      case 'easy': return '4x4';
      case 'medium': return '5x4';
      case 'hard': return '6x6';
      default: return '5x4';
    }
  }

  /* --------------------------------------------------------------------------
     7. TIMER & SCORE CALCULATOR
     -------------------------------------------------------------------------- */
  function startTimer() {
    clearInterval(gameState.timerInterval);
    gameState.timerInterval = setInterval(() => {
      gameState.timerSeconds++;
      updateTimerDisplay();
      calculateScore();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(gameState.timerInterval);
  }

  function updateTimerDisplay() {
    const mins = Math.floor(gameState.timerSeconds / 60).toString().padStart(2, '0');
    const secs = (gameState.timerSeconds % 60).toString().padStart(2, '0');
    elements.timerCount.textContent = `${mins}:${secs}`;
  }

  function calculateScore() {
    if (gameState.moves === 0) {
      gameState.score = 0;
    } else {
      const diffMultiplier = gameState.difficulty === 'easy' ? 1.0 : (gameState.difficulty === 'medium' ? 1.5 : 2.0);
      const basePoints = gameState.matchedPairs * 250 * diffMultiplier;
      const movePenalty = gameState.moves * 15;
      const timePenalty = gameState.timerSeconds * 3;

      gameState.score = Math.max(0, Math.round(basePoints - movePenalty - timePenalty));
    }
    elements.scoreCount.textContent = gameState.score;
  }

  function updateHUD() {
    elements.movesCount.textContent = gameState.moves;
    elements.pairsCount.textContent = `${gameState.matchedPairs} / ${gameState.totalPairs}`;
    updateTimerDisplay();
    calculateScore();
    updateProgressBar();
    updateBestScoreDisplay();
  }

  function updateProgressBar() {
    const pct = Math.round((gameState.matchedPairs / gameState.totalPairs) * 100);
    elements.progressFill.style.width = `${pct}%`;
    elements.progressText.textContent = `${pct}% Completed`;
  }

  function updateBestScoreDisplay() {
    const scores = gameState.highScores[gameState.difficulty] || [];
    if (scores.length > 0) {
      elements.bestScoreCount.textContent = scores[0].score;
    } else {
      elements.bestScoreCount.textContent = '--';
    }
  }

  /* --------------------------------------------------------------------------
     8. CARD CLICK & MATCH LOGIC
     -------------------------------------------------------------------------- */
  function handleCardClick(cardEl) {
    if (!gameState.isGameActive || gameState.isLockBoard) return;
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

    sound.playFlip();

    cardEl.classList.add('flipped');
    gameState.flippedCards.push(cardEl);

    if (gameState.flippedCards.length === 2) {
      gameState.moves++;
      elements.movesCount.textContent = gameState.moves;
      checkMatch();
    }
  }

  function checkMatch() {
    const [card1, card2] = gameState.flippedCards;
    const isMatch = card1.dataset.mascotId === card2.dataset.mascotId;

    if (isMatch) {
      // MATCH SUCCESS
      sound.playMatch();

      card1.classList.add('matched');
      card2.classList.add('matched');
      
      gameState.matchedPairs++;
      gameState.flippedCards = [];

      updateHUD();
      triggerReaction('match');

      if (gameState.matchedPairs === gameState.totalPairs) {
        setTimeout(handleVictory, 500);
      }
    } else {
      // MISMATCH
      gameState.isLockBoard = true;
      sound.playMismatch();

      card1.classList.add('shake');
      card2.classList.add('shake');

      triggerReaction('miss');

      setTimeout(() => {
        card1.classList.remove('flipped', 'shake');
        card2.classList.remove('flipped', 'shake');
        gameState.flippedCards = [];
        gameState.isLockBoard = false;
      }, 850);
    }
  }

  function triggerReaction(type) {
    const randomEmoji = MASCOT_EMOJIS[Math.floor(Math.random() * MASCOT_EMOJIS.length)];
    elements.reactionAvatar.textContent = randomEmoji;

    if (type === 'match') {
      const msg = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
      elements.reactionSpeech.textContent = msg;
    } else {
      elements.reactionSpeech.textContent = "Oops! Not a match. Give it another try! 🧠";
    }
  }

  /* --------------------------------------------------------------------------
     9. GAME FLOW: START, COUNTDOWN, VICTORY, RESTART
     -------------------------------------------------------------------------- */
  function initGameFlow() {
    elements.mainMenuView.classList.add('hidden');
    elements.gameScreenView.classList.remove('hidden');

    prepareBoard();
    runCountdown(() => {
      gameState.isGameActive = true;
      startTimer();
      triggerReaction('start');
      elements.reactionSpeech.textContent = "Game started! Find all matching tech pairs!";
    });
  }

  function runCountdown(callback) {
    let count = 3;
    elements.countdownNumber.textContent = count;
    elements.countdownModal.classList.remove('hidden');
    sound.playClick();

    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        elements.countdownNumber.textContent = count;
        sound.playClick();
      } else if (count === 0) {
        elements.countdownNumber.textContent = 'GO!';
        sound.playTone(880, 'sine', 0.25, 0, 0.2);
      } else {
        clearInterval(interval);
        elements.countdownModal.classList.add('hidden');
        if (callback) callback();
      }
    }, 800);
  }

  function handleVictory() {
    stopTimer();
    gameState.isGameActive = false;

    sound.playVictory();

    calculateScore();
    const finalScore = gameState.score;
    const finalMoves = gameState.moves;
    const finalTime = elements.timerCount.textContent;

    // Check High Score
    const diffScores = gameState.highScores[gameState.difficulty] || [];
    const isNewRecord = diffScores.length === 0 || finalScore > diffScores[0].score;

    // Save to High Scores
    diffScores.push({
      score: finalScore,
      moves: finalMoves,
      time: finalTime,
      date: new Date().toLocaleDateString()
    });

    diffScores.sort((a, b) => b.score - a.score);
    gameState.highScores[gameState.difficulty] = diffScores.slice(0, 5); // Keep top 5
    saveLocalStorage();

    // Populate Win Modal
    elements.winScore.textContent = finalScore;
    elements.winMoves.textContent = finalMoves;
    elements.winTime.textContent = finalTime;
    elements.winBest.textContent = gameState.highScores[gameState.difficulty][0].score;

    if (isNewRecord && finalScore > 0) {
      elements.winRecordBadge.classList.remove('hidden');
    } else {
      elements.winRecordBadge.classList.add('hidden');
    }

    // Star Rating Logic
    renderStars(finalMoves, gameState.totalPairs, gameState.timerSeconds);

    // Show Modal & Confetti
    elements.winModal.classList.remove('hidden');
    launchConfetti();
  }

  function renderStars(moves, pairs, seconds) {
    const perfectMoves = pairs + 4;
    const goodMoves = pairs * 2;
    const starsContainer = elements.winStars;
    starsContainer.innerHTML = '';

    let starCount = 1;
    if (moves <= perfectMoves && seconds <= pairs * 8) {
      starCount = 3;
    } else if (moves <= goodMoves) {
      starCount = 2;
    }

    for (let i = 1; i <= 3; i++) {
      const star = document.createElement('span');
      star.className = `star ${i <= starCount ? 'star-filled' : ''}`;
      star.textContent = '⭐';
      starsContainer.appendChild(star);
    }
  }

  function promptRestart() {
    if (gameState.isGameActive && gameState.matchedPairs < gameState.totalPairs && gameState.moves > 0) {
      elements.resetModal.classList.remove('hidden');
    } else {
      initGameFlow();
    }
  }

  function quitToMainMenu() {
    stopTimer();
    gameState.isGameActive = false;
    elements.gameScreenView.classList.add('hidden');
    elements.mainMenuView.classList.remove('hidden');
    elements.winModal.classList.add('hidden');
    elements.resetModal.classList.add('hidden');
  }

  /* --------------------------------------------------------------------------
     10. CONFETTI ANIMATION ENGINE (Canvas Native)
     -------------------------------------------------------------------------- */
  function launchConfetti() {
    const canvas = elements.confettiCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth || 500;
    canvas.height = canvas.offsetHeight || 500;

    const particles = [];
    const colors = ['#8b5cf6', '#38bdf8', '#facc15', '#f43f5e', '#10b981', '#a855f7'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.7) * 14,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 8
      });
    }

    let animationFrame;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3; // Gravity
        p.rotation += p.rSpeed;

        if (p.y < canvas.height) alive = true;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      if (alive) {
        animationFrame = requestAnimationFrame(render);
      }
    }

    render();
  }

  /* --------------------------------------------------------------------------
     11. HIGH SCORES LEADERBOARD MODAL
     -------------------------------------------------------------------------- */
  function renderHighScores(tabDiff = 'easy') {
    const scores = gameState.highScores[tabDiff] || [];
    elements.scoresContent.innerHTML = '';

    if (scores.length === 0) {
      elements.scoresContent.innerHTML = `
        <div class="empty-scores">
          <p>No high scores recorded yet for ${tabDiff.toUpperCase()} mode!</p>
          <p>Play a game to claim your spot on the leaderboard! 🎮</p>
        </div>
      `;
      return;
    }

    scores.forEach((s, idx) => {
      const row = document.createElement('div');
      row.className = 'score-row';
      row.innerHTML = `
        <span class="score-rank">#${idx + 1}</span>
        <div class="score-details">
          <span class="score-points">${s.score} pts</span>
          <span class="score-meta"> (${s.moves} moves | ${s.time})</span>
        </div>
        <span class="score-date">${s.date}</span>
      `;
      elements.scoresContent.appendChild(row);
    });
  }

  /* --------------------------------------------------------------------------
     12. EVENT LISTENERS SETUP
     -------------------------------------------------------------------------- */
  function setupEventListeners() {
    // Theme Toggle
    elements.themeToggleBtn.addEventListener('click', () => {
      sound.playClick();
      gameState.currentTheme = gameState.currentTheme === 'light' ? 'dark' : 'light';
      applySettings();
      saveLocalStorage();
    });

    // Sound Toggle
    elements.soundToggleBtn.addEventListener('click', () => {
      gameState.soundEnabled = !gameState.soundEnabled;
      sound.playClick();
      applySettings();
      saveLocalStorage();
    });

    // Logo click -> Main Menu
    elements.logoHomeBtn.addEventListener('click', () => {
      sound.playClick();
      quitToMainMenu();
    });

    // Difficulty Selector
    elements.diffBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        elements.diffBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        gameState.difficulty = btn.dataset.diff;
      });
    });

    // Start Game
    elements.startGameBtn.addEventListener('click', () => {
      sound.playClick();
      initGameFlow();
    });

    // Main Menu Buttons
    elements.menuScoresBtn.addEventListener('click', () => {
      sound.playClick();
      renderHighScores('easy');
      elements.scoresModal.classList.remove('hidden');
    });

    elements.menuRulesBtn.addEventListener('click', () => {
      sound.playClick();
      elements.rulesModal.classList.remove('hidden');
    });

    // HUD Header Buttons
    elements.highScoresBtn.addEventListener('click', () => {
      sound.playClick();
      renderHighScores(gameState.difficulty);
      elements.scoresModal.classList.remove('hidden');
    });

    elements.howToPlayBtn.addEventListener('click', () => {
      sound.playClick();
      elements.rulesModal.classList.remove('hidden');
    });

    // Game Footer Controls
    elements.restartGameBtn.addEventListener('click', () => {
      sound.playClick();
      promptRestart();
    });

    elements.quitGameBtn.addEventListener('click', () => {
      sound.playClick();
      quitToMainMenu();
    });

    // Modals Close
    elements.closeScoresBtn.addEventListener('click', () => {
      sound.playClick();
      elements.scoresModal.classList.add('hidden');
    });

    elements.closeRulesBtn.addEventListener('click', () => {
      sound.playClick();
      elements.rulesModal.classList.add('hidden');
    });

    // Restart Modal Actions
    elements.confirmRestartBtn.addEventListener('click', () => {
      sound.playClick();
      elements.resetModal.classList.add('hidden');
      initGameFlow();
    });

    elements.cancelRestartBtn.addEventListener('click', () => {
      sound.playClick();
      elements.resetModal.classList.add('hidden');
    });

    // Win Modal Actions
    elements.winPlayAgainBtn.addEventListener('click', () => {
      sound.playClick();
      elements.winModal.classList.add('hidden');
      initGameFlow();
    });

    elements.winMainMenuBtn.addEventListener('click', () => {
      sound.playClick();
      quitToMainMenu();
    });

    // High Scores Modal Tabs
    elements.tabBtns.forEach(tab => {
      tab.addEventListener('click', () => {
        sound.playClick();
        elements.tabBtns.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderHighScores(tab.dataset.tab);
      });
    });

    // Clear Scores
    elements.clearScoresBtn.addEventListener('click', () => {
      sound.playClick();
      if (confirm('Are you sure you want to clear all high scores?')) {
        gameState.highScores = { easy: [], medium: [], hard: [] };
        saveLocalStorage();
        const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab || 'easy';
        renderHighScores(activeTab);
        updateBestScoreDisplay();
      }
    });

    // Global Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 't' || e.key === 'T') {
        elements.themeToggleBtn.click();
      } else if (e.key === 'm' || e.key === 'M') {
        elements.soundToggleBtn.click();
      } else if (e.key === 'Escape') {
        elements.scoresModal.classList.add('hidden');
        elements.rulesModal.classList.add('hidden');
        elements.resetModal.classList.add('hidden');
      }
    });
  }

  /* --------------------------------------------------------------------------
     13. INITIALIZATION ON LOAD
     -------------------------------------------------------------------------- */
  function init() {
    loadLocalStorage();
    applySettings();
    setupEventListeners();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
