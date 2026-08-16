import React, { useState, useEffect } from 'react';
import { Play, Sparkles } from 'lucide-react';
import { arcadeAudio } from '../utils/audio';

export default function LoadingScreen({ onStart }) {
  const [progress, setProgress] = useState(0);
  const [bootLog, setBootLog] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const logs = [
      "SYSTEM BOOT: DARSHAN'S ARCADE ROM V2.6",
      "CHECKING CPU: 8-BIT Z80 ARCHITECTURE... OK",
      "SYSTEM RAM: 640KB HIGH-DENSITY MEMORY... OK",
      "INITIALIZING AUDIO SYNTHESIZER ENGINE... READY",
      "LOADING PLAYER PROFILE: DARSHAN KHOLKAR... LOADED",
      "CALIBRATING MAZE CORRIDORS & GHOST AI... DONE",
      "SYSTEM STATUS: INSERT COIN TO PLAY"
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < logs.length) {
        setBootLog(prev => [...prev, logs[currentStep]]);
        currentStep++;
        setProgress(Math.min(100, Math.round((currentStep / logs.length) * 100)));
      } else {
        clearInterval(interval);
        setIsReady(true);
      }
    }, 280);

    return () => clearInterval(interval);
  }, []);

  const handleStartGame = () => {
    arcadeAudio.playCoin();
    onStart();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#04040A] text-slate-100 flex flex-col items-center justify-center p-4 select-none crt-scanlines">
      {/* Background Subtle Maze Glow */}
      <div className="absolute inset-0 arcade-grid-bg opacity-30 pointer-events-none" />

      <div className="w-full max-w-xl mx-auto z-10 flex flex-col items-center text-center">
        
        {/* Arcade Cabinet Marquee Header */}
        <div className="mb-6 border-4 border-arcade-yellow p-4 bg-arcade-card/90 shadow-neon-yellow rounded-lg w-full">
          <div className="flex items-center justify-center gap-3 text-arcade-yellow">
            <Sparkles size={20} className="animate-spin text-ghost-cyan" />
            <h1 className="font-arcade text-lg sm:text-2xl tracking-widest text-glow-yellow">
              DARSHAN'S ARCADE
            </h1>
            <Sparkles size={20} className="animate-spin text-ghost-pink" />
          </div>
          <p className="font-pixel text-xl sm:text-2xl text-arcade-blue tracking-widest mt-1">
            DEVELOPER PORTFOLIO • PAC-MAN EDITION
          </p>
        </div>

        {/* Boot Terminal Box */}
        <div className="w-full bg-[#080814] border-2 border-arcade-border rounded p-4 font-pixel text-left text-base sm:text-lg mb-6 shadow-arcade-inset min-h-[170px] flex flex-col justify-between">
          <div className="space-y-1">
            {bootLog.map((log, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-arcade-green">{'>'}</span>
                <span className={idx === bootLog.length - 1 ? 'text-arcade-yellow font-bold' : 'text-slate-300'}>
                  {log}
                </span>
              </div>
            ))}
          </div>

          {/* Animated Pac-Man Chomper in Terminal */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-3 mt-3">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 16 16" className="fill-arcade-yellow animate-pulse">
                <path d="M 8 1 A 7 7 0 1 0 15 8 L 8 8 Z" />
              </svg>
              <span className="text-xs font-arcade text-arcade-yellow">
                LOADING: {progress}%
              </span>
            </div>
            {/* Pellets */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-200 animate-pellet-pulse" />
              <span className="w-2 h-2 rounded-full bg-slate-200 animate-pellet-pulse" />
              <span className="w-2.5 h-2.5 rounded-full bg-arcade-blue animate-ping" />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-900 border-2 border-arcade-border h-5 rounded p-0.5 mb-8">
          <div
            className="bg-gradient-to-r from-arcade-yellow via-ghost-pink to-arcade-blue h-full rounded transition-all duration-300 shadow-neon-yellow"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Action Button */}
        {isReady ? (
          <div className="space-y-4 animate-bounce">
            <button
              id="press-start-btn"
              onClick={handleStartGame}
              className="px-8 py-4 bg-arcade-yellow hover:bg-arcade-yellowGlow text-black font-arcade text-base sm:text-lg rounded border-4 border-white shadow-neon-yellow transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              <Play size={20} className="fill-black" />
              <span>PRESS START</span>
            </button>
            <p className="font-pixel text-xl text-ghost-cyan animate-pulse tracking-widest">
              ★ INSERT COIN • 1 PLAYER READY ★
            </p>
          </div>
        ) : (
          <div className="font-arcade text-xs text-slate-400 animate-pulse tracking-widest">
            INITIALIZING GAME ENGINE...
          </div>
        )}

      </div>
    </div>
  );
}
