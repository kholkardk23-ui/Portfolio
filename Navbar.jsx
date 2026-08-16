import React, { useState, useEffect } from 'react';
import { Menu, X, Gamepad2, User, Wrench, GraduationCap, Trophy, Mail, Home } from 'lucide-react';
import { arcadeAudio } from '../utils/audio';

export default function Navbar({ activeSection, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'HOME', icon: Home },
    { id: 'about', label: 'ABOUT', icon: User },
    { id: 'skills', label: 'SKILLS', icon: Wrench },
    { id: 'education', label: 'EDUCATION', icon: GraduationCap },
    { id: 'achievements', label: 'SCORES', icon: Trophy },
    { id: 'contact', label: 'CONTACT', icon: Mail },
    { id: 'minigame', label: 'MINI GAME', icon: Gamepad2, highlight: true },
  ];

  const handleNavClick = (id) => {
    arcadeAudio.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-[41px] z-30 w-full bg-arcade-card/90 backdrop-blur border-b-2 border-arcade-border px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo / Brand */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
        >
          {/* Animated Pac-Man SVG */}
          <div className="relative w-7 h-7 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 16 16" className="fill-arcade-yellow transition-transform group-hover:scale-110">
              <path d="M 8 1 A 7 7 0 1 0 15 8 L 8 8 Z" />
            </svg>
          </div>
          <div>
            <span className="font-arcade text-xs sm:text-sm text-arcade-yellow tracking-wider text-glow-yellow block">
              DARSHAN'S ARCADE
            </span>
            <span className="font-pixel text-xs sm:text-sm text-slate-400 block -mt-1">
              LEVEL 08 DEVELOPER
            </span>
          </div>
        </button>

        {/* Desktop Maze Corridor Navigation */}
        <div className="hidden lg:flex items-center gap-1 bg-arcade-bg/80 border-2 border-arcade-border px-2 py-1 rounded-md relative shadow-arcade-inset">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-1.5 rounded text-xs font-arcade transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-arcade-yellow bg-arcade-yellow/15 border border-arcade-yellow/40 shadow-neon-yellow'
                    : item.highlight
                    ? 'text-ghost-cyan hover:text-white hover:bg-ghost-cyan/15 border border-ghost-cyan/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {/* Active Indicator Pac-Man */}
                {isActive && (
                  <span className="inline-block w-2 h-2 rounded-full bg-arcade-yellow animate-ping" />
                )}
                <Icon size={12} className={isActive ? 'text-arcade-yellow' : ''} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Quick Play Mini-Game CTA on Mobile */}
          <button
            onClick={() => handleNavClick('minigame')}
            className="px-2.5 py-1 bg-ghost-cyan/10 border border-ghost-cyan text-ghost-cyan text-[10px] font-arcade rounded flex items-center gap-1 hover:bg-ghost-cyan hover:text-black transition-colors"
          >
            <Gamepad2 size={12} />
            <span>PLAY</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-1.5 rounded border border-arcade-border bg-slate-900 text-slate-200 hover:text-arcade-yellow hover:border-arcade-yellow transition-all"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 pt-2 border-t border-arcade-border/80 bg-arcade-bg/95 backdrop-blur rounded-lg p-3 space-y-1 shadow-2xl animate-in slide-in-from-top">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded font-arcade text-xs text-left transition-all ${
                  isActive
                    ? 'bg-arcade-yellow/20 text-arcade-yellow border border-arcade-yellow shadow-neon-yellow'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={14} className={isActive ? 'text-arcade-yellow' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </div>
                {isActive && (
                  <span className="font-pixel text-xs text-arcade-yellow">ACTIVE</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
