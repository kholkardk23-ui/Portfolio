import React, { useState, useEffect } from 'react';
import { Play, User, ChevronDown, Sparkles, Terminal } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { arcadeAudio } from '../utils/audio';

export default function Hero({ onNavigate, onGainScore }) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for roles
  useEffect(() => {
    const roles = portfolio.roles;
    const currentFullText = roles[currentRoleIndex];
    let timeout;

    if (!isDeleting) {
      if (displayedText.length < currentFullText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        }, 90);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex]);

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 py-12 overflow-hidden arcade-grid-bg">
      
      {/* Subtle Background Maze Walls */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex justify-between p-6">
        <div className="w-24 h-64 border-r-4 border-b-4 border-arcade-blue rounded-br-2xl" />
        <div className="w-24 h-64 border-l-4 border-b-4 border-arcade-pink rounded-bl-2xl" />
      </div>

      <div className="w-full max-w-5xl mx-auto z-10 flex flex-col items-center text-center">
        
        {/* Arcade Badge / System Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-arcade-yellow/50 bg-arcade-yellow/10 text-arcade-yellow font-arcade text-[10px] sm:text-xs mb-6 shadow-neon-yellow animate-float">
          <Sparkles size={12} className="text-arcade-yellow" />
          <span>PLAYER 1 READY • LEVEL 08 ARCHITECTURE</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-arcade text-3xl sm:text-5xl md:text-6xl text-arcade-yellow tracking-wider mb-4 text-glow-yellow leading-tight">
          DARSHAN KHOLKAR
        </h1>

        {/* Subtitle & Tagline */}
        <div className="font-pixel text-2xl sm:text-3xl text-arcade-blue tracking-widest uppercase mb-2">
          DEVELOPER PORTFOLIO
        </div>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl font-sans font-medium mb-6">
          {portfolio.tagline}
        </p>

        {/* Dynamic Typewriter Box */}
        <div className="w-full max-w-lg bg-[#080816] border-2 border-arcade-border rounded-lg p-3 sm:p-4 mb-8 shadow-arcade-inset flex items-center justify-center gap-3">
          <Terminal size={18} className="text-arcade-green" />
          <span className="font-arcade text-xs sm:text-sm text-slate-200">
            {displayedText}
            <span className="inline-block w-2 h-4 bg-arcade-green ml-1 animate-pulse" />
          </span>
        </div>

        {/* Pac-Man Animated Corridor Simulation */}
        <div className="w-full max-w-2xl bg-arcade-card/80 border-2 border-blue-900/60 rounded-xl p-4 mb-10 overflow-hidden relative shadow-neon-blue">
          <div className="flex items-center justify-between relative min-h-[44px]">
            
            {/* Custom SVG Arcade Player */}
            <div className="flex items-center gap-3 animate-pulse">
              <svg width="34" height="34" viewBox="0 0 32 32" className="fill-arcade-yellow filter drop-shadow-[0_0_8px_#FFD700]">
                <path d="M 16 4 A 12 12 0 1 0 28 16 L 16 16 Z" />
                <circle cx="16" cy="10" r="2.2" fill="#06070E" />
              </svg>
            </div>

            {/* Glowing Pellets Pathway */}
            <div className="flex-1 flex items-center justify-evenly px-4">
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className={`rounded-full ${
                    i === 2 || i === 5
                      ? 'w-3 h-3 bg-arcade-blue shadow-neon-blue animate-ping'
                      : 'w-2 h-2 bg-amber-100/90 shadow-[0_0_6px_#ffffff]'
                  }`}
                />
              ))}
            </div>

            {/* 4 Ghost-like Characters (Blinky, Pinky, Inky, Clyde) */}
            <div className="flex items-center gap-2">
              {/* Blinky (Red) */}
              <svg width="24" height="24" viewBox="0 0 24 24" className="fill-ghost-red animate-bounce" style={{ animationDelay: '0.1s' }}>
                <path d="M 4 12 C 4 6 8 4 12 4 C 16 4 20 6 20 12 L 20 20 L 17 18 L 14 20 L 11 18 L 8 20 L 4 18 Z" />
                <circle cx="9" cy="10" r="2" fill="#ffffff" />
                <circle cx="9" cy="10" r="1" fill="#000000" />
                <circle cx="15" cy="10" r="2" fill="#ffffff" />
                <circle cx="15" cy="10" r="1" fill="#000000" />
              </svg>

              {/* Pinky (Pink) */}
              <svg width="24" height="24" viewBox="0 0 24 24" className="fill-ghost-pink animate-bounce" style={{ animationDelay: '0.2s' }}>
                <path d="M 4 12 C 4 6 8 4 12 4 C 16 4 20 6 20 12 L 20 20 L 17 18 L 14 20 L 11 18 L 8 20 L 4 18 Z" />
                <circle cx="9" cy="10" r="2" fill="#ffffff" />
                <circle cx="15" cy="10" r="2" fill="#ffffff" />
              </svg>

              {/* Inky (Cyan) */}
              <svg width="24" height="24" viewBox="0 0 24 24" className="fill-ghost-cyan animate-bounce" style={{ animationDelay: '0.3s' }}>
                <path d="M 4 12 C 4 6 8 4 12 4 C 16 4 20 6 20 12 L 20 20 L 17 18 L 14 20 L 11 18 L 8 20 L 4 18 Z" />
                <circle cx="9" cy="10" r="2" fill="#ffffff" />
                <circle cx="15" cy="10" r="2" fill="#ffffff" />
              </svg>

              {/* Clyde (Orange) */}
              <svg width="24" height="24" viewBox="0 0 24 24" className="fill-ghost-orange animate-bounce" style={{ animationDelay: '0.4s' }}>
                <path d="M 4 12 C 4 6 8 4 12 4 C 16 4 20 6 20 12 L 20 20 L 17 18 L 14 20 L 11 18 L 8 20 L 4 18 Z" />
                <circle cx="9" cy="10" r="2" fill="#ffffff" />
                <circle cx="15" cy="10" r="2" fill="#ffffff" />
              </svg>
            </div>

          </div>
        </div>

        {/* Hero Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
          
          {/* Main Button: START GAME */}
          <button
            onClick={() => {
              arcadeAudio.playPellet();
              onGainScore(100);
              onNavigate('minigame');
            }}
            className="px-6 py-3.5 bg-arcade-yellow hover:bg-arcade-yellowGlow text-black font-arcade text-xs sm:text-sm rounded border-2 border-white shadow-neon-yellow transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Play size={16} className="fill-black" />
            <span>▶ START GAME</span>
          </button>

          {/* Secondary Button: VIEW PROFILE */}
          <button
            onClick={() => {
              arcadeAudio.playClick();
              onNavigate('about');
            }}
            className="px-6 py-3.5 bg-arcade-card hover:bg-slate-800 text-arcade-blue font-arcade text-xs sm:text-sm rounded border-2 border-arcade-blue shadow-neon-blue transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <User size={16} />
            <span>👤 VIEW PROFILE</span>
          </button>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex flex-col items-center gap-1 text-slate-500 hover:text-arcade-yellow cursor-pointer transition-colors"
          onClick={() => onNavigate('about')}
        >
          <span className="font-arcade text-[10px]">SCROLL TO EXPLORE</span>
          <ChevronDown size={18} className="animate-bounce text-arcade-yellow" />
        </div>

      </div>
    </section>
  );
}
