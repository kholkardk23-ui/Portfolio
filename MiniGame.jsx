import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Pause, Volume2, Trophy, Award, Gamepad2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { arcadeAudio } from '../utils/audio';

// Grid Dimensions for the Mini Maze (19 cols x 15 rows)
const COLS = 19;
const ROWS = 15;
const CELL_SIZE = 24; // Canvas size: 456 x 360

// 1 = Wall, 0 = Pellet, 2 = Power Pellet, 3 = Empty/Spawn
const INITIAL_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 3, 3, 3, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 2, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export default function MiniGame({ onGlobalScoreUpdate }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('IDLE'); // 'IDLE' | 'PLAYING' | 'PAUSED' | 'GAMEOVER' | 'VICTORY'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(4250);
  const [lives, setLives] = useState(3);
  const [pelletsRemaining, setPelletsRemaining] = useState(0);

  // Game Engine Internal Mutable State
  const engineRef = useRef({
    grid: JSON.parse(JSON.stringify(INITIAL_MAP)),
    player: { x: 9, y: 10, dirX: 0, dirY: 0, nextDirX: 0, nextDirY: 0, mouthAngle: 0.2, mouthSpeed: 0.05 },
    ghosts: [
      { id: 'blinky', x: 9, y: 7, dirX: 1, dirY: 0, color: '#FF3333', name: 'Blinky', isFrightened: false },
      { id: 'pinky', x: 8, y: 7, dirX: -1, dirY: 0, color: '#FF88BB', name: 'Pinky', isFrightened: false },
      { id: 'inky', x: 10, y: 7, dirX: 0, dirY: -1, color: '#33FFFF', name: 'Inky', isFrightened: false },
      { id: 'clyde', x: 9, y: 6, dirX: 0, dirY: 1, color: '#FF9933', name: 'Clyde', isFrightened: false }
    ],
    frightenedTimer: 0,
    animFrameId: null,
    tickCount: 0,
    totalPellets: 0,
  });

  // Load High Score from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('darshan_pacman_highscore');
      if (saved) setHighScore(parseInt(saved, 10));
    } catch (e) {}
  }, []);

  // Update High Score if needed
  const updateHighScore = (newScore) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      try {
        localStorage.setItem('darshan_pacman_highscore', String(newScore));
      } catch (e) {}
    }
  };

  // Count pellets initially
  const countPellets = (map) => {
    let count = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (map[r][c] === 0 || map[r][c] === 2) count++;
      }
    }
    return count;
  };

  // Start / Restart Game
  const startGame = () => {
    arcadeAudio.playCoin();
    const freshGrid = JSON.parse(JSON.stringify(INITIAL_MAP));
    const total = countPellets(freshGrid);

    engineRef.current = {
      grid: freshGrid,
      player: { x: 9, y: 10, dirX: -1, dirY: 0, nextDirX: -1, nextDirY: 0, mouthAngle: 0.2, mouthSpeed: 0.05 },
      ghosts: [
        { id: 'blinky', x: 9, y: 7, dirX: 1, dirY: 0, color: '#FF3333', name: 'Blinky', isFrightened: false },
        { id: 'pinky', x: 8, y: 7, dirX: -1, dirY: 0, color: '#FF88BB', name: 'Pinky', isFrightened: false },
        { id: 'inky', x: 10, y: 7, dirX: 0, dirY: -1, color: '#33FFFF', name: 'Inky', isFrightened: false },
        { id: 'clyde', x: 9, y: 6, dirX: 0, dirY: 1, color: '#FF9933', name: 'Clyde', isFrightened: false }
      ],
      frightenedTimer: 0,
      animFrameId: null,
      tickCount: 0,
      totalPellets: total,
    };

    setScore(0);
    setLives(3);
    setPelletsRemaining(total);
    setGameState('PLAYING');
  };

  // Direction handler (Keyboard & Touch)
  const setDirection = (dx, dy) => {
    if (gameState !== 'PLAYING') return;
    engineRef.current.player.nextDirX = dx;
    engineRef.current.player.nextDirY = dy;
  };

  // Keyboard Event Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        setDirection(0, -1);
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        setDirection(0, 1);
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        setDirection(-1, 0);
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        setDirection(1, 0);
      } else if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'IDLE' || gameState === 'GAMEOVER' || gameState === 'VICTORY') {
          startGame();
        } else if (gameState === 'PLAYING') {
          setGameState('PAUSED');
        } else if (gameState === 'PAUSED') {
          setGameState('PLAYING');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Main Canvas Render & Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      const engine = engineRef.current;
      const { grid, player, ghosts } = engine;

      // Clear Canvas
      ctx.fillStyle = '#06070E';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Maze Grid
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const tile = grid[r][c];
          const px = c * CELL_SIZE;
          const py = r * CELL_SIZE;

          if (tile === 1) {
            // Wall Block
            ctx.fillStyle = '#0D1B4D';
            ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);
            ctx.strokeStyle = '#2563EB';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(px + 1, py + 1, CELL_SIZE - 2, CELL_SIZE - 2);
          } else if (tile === 0) {
            // Normal Pellet
            ctx.fillStyle = '#FDE047';
            ctx.beginPath();
            ctx.arc(px + CELL_SIZE / 2, py + CELL_SIZE / 2, 2.5, 0, Math.PI * 2);
            ctx.fill();
          } else if (tile === 2) {
            // Power Pellet (Flashing)
            ctx.fillStyle = '#00F0FF';
            ctx.beginPath();
            const pulse = (Math.sin(engine.tickCount * 0.15) + 1) * 2 + 4;
            ctx.arc(px + CELL_SIZE / 2, py + CELL_SIZE / 2, pulse, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Update Game Logic if PLAYING
      if (gameState === 'PLAYING') {
        engine.tickCount++;

        // Update Frightened Timer
        if (engine.frightenedTimer > 0) {
          engine.frightenedTimer--;
          if (engine.frightenedTimer === 0) {
            ghosts.forEach(g => g.isFrightened = false);
          }
        }

        // Move Player every 14 frames for smoother, more relaxed control
        if (engine.tickCount % 14 === 0) {
          // Check if requested direction is valid
          const targetNextX = player.x + player.nextDirX;
          const targetNextY = player.y + player.nextDirY;
          if (grid[targetNextY] && grid[targetNextY][targetNextX] !== 1) {
            player.dirX = player.nextDirX;
            player.dirY = player.nextDirY;
          }

          // Move in current direction if valid
          const targetX = player.x + player.dirX;
          const targetY = player.y + player.dirY;
          if (grid[targetY] && grid[targetY][targetX] !== 1) {
            player.x = targetX;
            player.y = targetY;

            // Handle Pellet Eaten
            if (grid[player.y][player.x] === 0) {
              grid[player.y][player.x] = 3;
              arcadeAudio.playPellet();
              setScore(prev => {
                const ns = prev + 10;
                updateHighScore(ns);
                if (onGlobalScoreUpdate) onGlobalScoreUpdate(ns);
                return ns;
              });
              setPelletsRemaining(prev => {
                const rem = prev - 1;
                if (rem <= 0) {
                  arcadeAudio.playLevelUp();
                  setGameState('VICTORY');
                }
                return rem;
              });
            } else if (grid[player.y][player.x] === 2) {
              // Power Pellet Eaten
              grid[player.y][player.x] = 3;
              arcadeAudio.playPowerPellet();
              engine.frightenedTimer = 240; // ~6 seconds
              ghosts.forEach(g => g.isFrightened = true);
              setScore(prev => {
                const ns = prev + 50;
                updateHighScore(ns);
                return ns;
              });
            }
          }
        }

        // Move Ghosts every 18 frames (or 26 when frightened)
        const ghostSpeed = engine.frightenedTimer > 0 ? 26 : 18;
        if (engine.tickCount % ghostSpeed === 0) {
          ghosts.forEach((ghost) => {
            const possibleDirs = [
              { x: 0, y: -1 },
              { x: 0, y: 1 },
              { x: -1, y: 0 },
              { x: 1, y: 0 }
            ].filter(dir => {
              const nx = ghost.x + dir.x;
              const ny = ghost.y + dir.y;
              return grid[ny] && grid[ny][nx] !== 1 && !(dir.x === -ghost.dirX && dir.y === -ghost.dirY);
            });

            if (possibleDirs.length > 0) {
              // Simple AI: Chance to move toward player if not frightened
              let chosenDir;
              if (!ghost.isFrightened && Math.random() < 0.6) {
                // Seek player
                possibleDirs.sort((a, b) => {
                  const distA = Math.hypot(ghost.x + a.x - player.x, ghost.y + a.y - player.y);
                  const distB = Math.hypot(ghost.x + b.x - player.x, ghost.y + b.y - player.y);
                  return distA - distB;
                });
                chosenDir = possibleDirs[0];
              } else {
                chosenDir = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
              }

              ghost.dirX = chosenDir.x;
              ghost.dirY = chosenDir.y;
              ghost.x += chosenDir.x;
              ghost.y += chosenDir.y;
            } else {
              // Reverse if stuck
              ghost.dirX = -ghost.dirX;
              ghost.dirY = -ghost.dirY;
            }

            // Check Ghost Collision with Player
            if (ghost.x === player.x && ghost.y === player.y) {
              if (ghost.isFrightened) {
                // Eat Ghost
                arcadeAudio.playGhostEat();
                setScore(prev => {
                  const ns = prev + 200;
                  updateHighScore(ns);
                  return ns;
                });
                ghost.x = 9;
                ghost.y = 7;
                ghost.isFrightened = false;
              } else {
                // Player loses a life
                arcadeAudio.playGameOver();
                setLives(prev => {
                  const remainingLives = prev - 1;
                  if (remainingLives <= 0) {
                    setGameState('GAMEOVER');
                  } else {
                    // Reset positions
                    player.x = 9;
                    player.y = 10;
                    player.dirX = 0;
                    player.dirY = 0;
                  }
                  return remainingLives;
                });
              }
            }
          });
        }
      }

      // Draw Player (Pac-Man)
      const ppx = player.x * CELL_SIZE + CELL_SIZE / 2;
      const ppy = player.y * CELL_SIZE + CELL_SIZE / 2;
      const mouthOpen = (Math.sin(engine.tickCount * 0.2) + 1) * 0.2 + 0.05;

      let baseAngle = 0;
      if (player.dirX === -1) baseAngle = Math.PI;
      else if (player.dirY === -1) baseAngle = Math.PI * 1.5;
      else if (player.dirY === 1) baseAngle = Math.PI * 0.5;

      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(ppx, ppy, CELL_SIZE / 2 - 2, baseAngle + mouthOpen, baseAngle + Math.PI * 2 - mouthOpen);
      ctx.lineTo(ppx, ppy);
      ctx.closePath();
      ctx.fill();

      // Draw Ghosts
      ghosts.forEach(ghost => {
        const gx = ghost.x * CELL_SIZE + 2;
        const gy = ghost.y * CELL_SIZE + 2;
        const gw = CELL_SIZE - 4;
        const gh = CELL_SIZE - 4;

        ctx.fillStyle = ghost.isFrightened
          ? (engine.frightenedTimer < 40 && engine.tickCount % 6 < 3 ? '#FFFFFF' : '#3B82F6')
          : ghost.color;

        // Ghost Body Dome
        ctx.beginPath();
        ctx.arc(gx + gw / 2, gy + gh / 2 - 2, gw / 2, Math.PI, 0);
        ctx.lineTo(gx + gw, gy + gh);
        ctx.lineTo(gx + gw * 0.75, gy + gh - 3);
        ctx.lineTo(gx + gw * 0.5, gy + gh);
        ctx.lineTo(gx + gw * 0.25, gy + gh - 3);
        ctx.lineTo(gx, gy + gh);
        ctx.closePath();
        ctx.fill();

        // Ghost Eyes
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(gx + gw * 0.3, gy + gh * 0.35, 3, 0, Math.PI * 2);
        ctx.arc(gx + gw * 0.7, gy + gh * 0.35, 3, 0, Math.PI * 2);
        ctx.fill();

        // Pupils
        ctx.fillStyle = '#06070E';
        ctx.beginPath();
        ctx.arc(gx + gw * 0.3 + ghost.dirX, gy + gh * 0.35 + ghost.dirY, 1.5, 0, Math.PI * 2);
        ctx.arc(gx + gw * 0.7 + ghost.dirX, gy + gh * 0.35 + ghost.dirY, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      engine.animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (engineRef.current.animFrameId) {
        cancelAnimationFrame(engineRef.current.animFrameId);
      }
    };
  }, [gameState]);

  return (
    <section id="minigame" className="py-16 px-4 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center gap-2 text-arcade-yellow font-arcade text-xs mb-2">
          <Gamepad2 size={16} />
          <span>PLAYABLE RETRO ENGINE</span>
        </div>
        <h2 className="font-arcade text-2xl sm:text-4xl text-arcade-yellow text-glow-yellow tracking-wider mb-2">
          🎮 DARSHAN'S ARCADE MINI-GAME
        </h2>
        <div className="font-pixel text-xl text-arcade-blue tracking-widest">
          PAC-MAN-INSPIRED MAZE RUNNER • CHOMP PELLETS & AVOID GHOSTS
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-arcade-yellow via-ghost-pink to-arcade-blue mt-4" />
      </div>

      {/* Arcade Game Machine Cabinet */}
      <div className="bg-[#050510] border-4 border-arcade-yellow rounded-2xl p-4 sm:p-6 shadow-neon-yellow relative">
        
        {/* Top HUD: Score, High Score, Lives */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-arcade text-xs mb-4 pb-3 border-b-2 border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-ghost-red">SCORE:</span>
            <span className="text-arcade-yellow font-bold text-sm sm:text-base">
              {String(score).padStart(6, '0')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Trophy size={14} className="text-arcade-yellow" />
            <span className="text-arcade-blue">HIGH:</span>
            <span className="text-slate-100 font-bold text-sm sm:text-base">
              {String(highScore).padStart(6, '0')}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[10px]">LIVES:</span>
            {[...Array(lives)].map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 16 16" className="fill-arcade-yellow">
                <path d="M 8 1 A 7 7 0 1 0 15 8 L 8 8 Z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Canvas Display Area */}
        <div className="relative flex justify-center items-center bg-black border-2 border-arcade-border rounded-lg overflow-hidden p-1 shadow-arcade-inset">
          <canvas
            ref={canvasRef}
            width={COLS * CELL_SIZE}
            height={ROWS * CELL_SIZE}
            className="w-full max-w-[456px] h-auto aspect-[456/360] block select-none touch-none"
          />

          {/* Overlays for Idle / Game Over / Victory */}
          {gameState === 'IDLE' && (
            <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-4 text-center z-20">
              <Gamepad2 size={40} className="text-arcade-yellow mb-3 animate-bounce" />
              <h3 className="font-arcade text-base sm:text-xl text-arcade-yellow mb-2 text-glow-yellow">
                READY PLAYER ONE?
              </h3>
              <p className="font-pixel text-lg text-slate-300 mb-5 max-w-xs">
                Use WASD, Arrow Keys, or on-screen D-Pad. Eat power pellets to hunt ghosts!
              </p>
              <button
                onClick={startGame}
                className="px-6 py-3 bg-arcade-yellow hover:bg-arcade-yellowGlow text-black font-arcade text-xs sm:text-sm rounded border-2 border-white shadow-neon-yellow transition-transform hover:scale-105"
              >
                ▶ START MISSION
              </button>
            </div>
          )}

          {gameState === 'GAMEOVER' && (
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 text-center z-20 animate-in fade-in">
              <h3 className="font-arcade text-xl sm:text-2xl text-ghost-red mb-2 animate-pulse">
                GAME OVER
              </h3>
              <div className="font-arcade text-xs text-arcade-yellow mb-4">
                FINAL SCORE: {score}
              </div>
              <button
                onClick={startGame}
                className="px-6 py-3 bg-arcade-yellow text-black font-arcade text-xs rounded border-2 border-white shadow-neon-yellow flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <RotateCcw size={15} />
                <span>INSERT COIN (TRY AGAIN)</span>
              </button>
            </div>
          )}

          {gameState === 'VICTORY' && (
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 text-center z-20 animate-in fade-in">
              <Award size={40} className="text-arcade-green mb-2 animate-bounce" />
              <h3 className="font-arcade text-xl sm:text-2xl text-arcade-green mb-2">
                STAGE CLEARED!
              </h3>
              <div className="font-arcade text-xs text-arcade-yellow mb-4">
                SCORE: {score} (+500 BONUS XP)
              </div>
              <button
                onClick={startGame}
                className="px-6 py-3 bg-arcade-green text-black font-arcade text-xs rounded border-2 border-white shadow-neon-green flex items-center gap-2 hover:scale-105 transition-transform font-bold"
              >
                <Play size={15} />
                <span>PLAY NEXT LEVEL</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile & Touch Virtual D-Pad */}
        <div className="mt-6 flex flex-col items-center justify-center select-none">
          <div className="text-[10px] font-arcade text-slate-400 mb-3 block sm:hidden">
            TOUCH CONTROLS:
          </div>

          <div className="grid grid-cols-3 gap-2 w-48 touch-none">
            <div />
            <button
              type="button"
              onPointerDown={(e) => { e.preventDefault(); setDirection(0, -1); }}
              className="p-3 bg-slate-900 border-2 border-slate-700 active:border-arcade-yellow active:bg-arcade-yellow active:text-black rounded-lg text-slate-200 flex items-center justify-center shadow"
              aria-label="Move Up"
            >
              <ArrowUp size={20} />
            </button>
            <div />

            <button
              type="button"
              onPointerDown={(e) => { e.preventDefault(); setDirection(-1, 0); }}
              className="p-3 bg-slate-900 border-2 border-slate-700 active:border-arcade-yellow active:bg-arcade-yellow active:text-black rounded-lg text-slate-200 flex items-center justify-center shadow"
              aria-label="Move Left"
            >
              <ArrowLeft size={20} />
            </button>

            <button
              type="button"
              onPointerDown={(e) => {
                e.preventDefault();
                if (gameState === 'PLAYING') setGameState('PAUSED');
                else if (gameState === 'PAUSED') setGameState('PLAYING');
                else startGame();
              }}
              className="p-2 bg-slate-800 border border-slate-600 rounded-lg text-[9px] font-arcade text-arcade-yellow flex items-center justify-center"
              aria-label="Action / Pause"
            >
              ●
            </button>

            <button
              type="button"
              onPointerDown={(e) => { e.preventDefault(); setDirection(1, 0); }}
              className="p-3 bg-slate-900 border-2 border-slate-700 active:border-arcade-yellow active:bg-arcade-yellow active:text-black rounded-lg text-slate-200 flex items-center justify-center shadow"
              aria-label="Move Right"
            >
              <ArrowRight size={20} />
            </button>

            <div />
            <button
              type="button"
              onPointerDown={(e) => { e.preventDefault(); setDirection(0, 1); }}
              className="p-3 bg-slate-900 border-2 border-slate-700 active:border-arcade-yellow active:bg-arcade-yellow active:text-black rounded-lg text-slate-200 flex items-center justify-center shadow"
              aria-label="Move Down"
            >
              <ArrowDown size={20} />
            </button>
            <div />
          </div>
        </div>

      </div>

    </section>
  );
}
