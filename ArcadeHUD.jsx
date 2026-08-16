import React from 'react';
import { Volume2, VolumeX, Tv, Sparkles } from 'lucide-react';
import { arcadeAudio } from '../utils/audio';

export default function ArcadeHUD({ score, highScore, soundEnabled, onToggleSound, crtEnabled, onToggleCRT }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-arcade-bg/95 backdrop-blur border-b-2 border-arcade-border px-4 py-2 text-xs font-arcade">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* 1UP Score */}
        <div className="flex items-center gap-2">
          <span className="text-ghost-red animate-pulse">1UP</span>
          <span className="text-arcade-yellow font-bold tracking-widest text-sm sm:text-base">
            {String(score).padStart(6, '0')}
          </span>
        </div>

        {/* HIGH SCORE */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-arcade-blue">HIGH SCORE</span>
          <span className="text-slate-100 font-bold tracking-widest text-sm sm:text-base text-glow-blue">
            {String(highScore).padStart(6, '0')}
          </span>
        </div>

        {/* 2UP / CREDITS / LIVES */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Pac-Man Lives Icons */}
          <div className="hidden md:flex items-center gap-1.5" title="Player Lives">
            <span className="text-slate-400 text-[10px] mr-1">LIVES:</span>
            {[1, 2, 3].map((life) => (
              <svg key={life} width="14" height="14" viewBox="0 0 16 16" className="fill-arcade-yellow">
                <path d="M 8 1 A 7 7 0 1 0 15 8 L 8 8 Z" />
              </svg>
            ))}
          </div>

          {/* Quick Audio Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? "Mute Arcade Audio" : "Unmute Arcade Audio"}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded border transition-all ${
              soundEnabled
                ? 'border-arcade-yellow bg-arcade-yellow/10 text-arcade-yellow shadow-neon-yellow'
                : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            {soundEnabled ? <Volume2 size={13} className="animate-pulse" /> : <VolumeX size={13} />}
            <span className="hidden xs:inline text-[10px]">{soundEnabled ? 'SOUND ON' : 'MUTED'}</span>
          </button>

          {/* CRT Scanline Toggle */}
          <button
            onClick={onToggleCRT}
            aria-label={crtEnabled ? "Disable CRT Scanlines" : "Enable CRT Scanlines"}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded border transition-all ${
              crtEnabled
                ? 'border-arcade-blue bg-arcade-blue/10 text-arcade-blue shadow-neon-blue'
                : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tv size={13} />
            <span className="hidden xs:inline text-[10px]">{crtEnabled ? 'CRT ON' : 'CRT OFF'}</span>
          </button>

          {/* Credit Coin Indicator */}
          <div className="flex items-center gap-1 text-[10px] text-arcade-green">
            <Sparkles size={11} className="animate-spin" style={{ animationDuration: '4s' }} />
            <span>CREDIT 01</span>
          </div>
        </div>

      </div>
    </header>
  );
}
