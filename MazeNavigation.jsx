import React from 'react';
import { User, Wrench, GraduationCap, Trophy, Mail, Gamepad2 } from 'lucide-react';
import { arcadeAudio } from '../utils/audio';

export default function MazeNavigation({ activeSection, onNavigate }) {
  const checkpoints = [
    { id: 'about', label: 'PROFILE', icon: User, color: '#FFD700' },
    { id: 'skills', label: 'POWER-UPS', icon: Wrench, color: '#00F0FF' },
    { id: 'education', label: 'LEVELS', icon: GraduationCap, color: '#22C55E' },
    { id: 'achievements', label: 'HIGH SCORE', icon: Trophy, color: '#F97316' },
    { id: 'contact', label: 'NEXT LEVEL', icon: Mail, color: '#A855F7' },
    { id: 'minigame', label: 'MINI GAME', icon: Gamepad2, color: '#3B82F6' },
  ];

  return (
    <aside className="hidden 2xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4 bg-arcade-card/90 border-2 border-arcade-border p-3 rounded-2xl backdrop-blur shadow-2xl">
      <span className="font-arcade text-[8px] text-slate-400 rotate-180 [writing-mode:vertical-lr] tracking-widest">
        MAZE RADAR
      </span>

      <div className="w-0.5 h-6 bg-arcade-border" />

      <div className="flex flex-col items-center gap-3">
        {checkpoints.map((cp) => {
          const isActive = activeSection === cp.id;
          const Icon = cp.icon;

          return (
            <button
              key={cp.id}
              onClick={() => {
                arcadeAudio.playClick();
                onNavigate(cp.id);
              }}
              title={cp.label}
              className={`relative p-2 rounded-xl border-2 transition-all group ${
                isActive
                  ? 'scale-125 shadow-lg'
                  : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
              }`}
              style={
                isActive
                  ? { borderColor: cp.color, backgroundColor: `${cp.color}20`, color: cp.color, boxShadow: `0 0 10px ${cp.color}` }
                  : {}
              }
            >
              <Icon size={14} />

              {/* Tooltip on Hover */}
              <span className="absolute right-12 top-1/2 -translate-y-1/2 px-2 py-1 bg-black border border-slate-700 text-slate-100 font-arcade text-[9px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow">
                {cp.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="w-0.5 h-6 bg-arcade-border" />

      {/* Mini Pac-Man */}
      <svg width="16" height="16" viewBox="0 0 16 16" className="fill-arcade-yellow animate-pulse">
        <path d="M 8 1 A 7 7 0 1 0 15 8 L 8 8 Z" />
      </svg>
    </aside>
  );
}
