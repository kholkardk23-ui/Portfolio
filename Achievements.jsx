import React from 'react';
import { Trophy, Medal, Sparkles, Star, Flame, Crown } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { arcadeAudio } from '../utils/audio';

export default function Achievements({ onGainScore }) {
  return (
    <section id="achievements" className="py-16 px-4 max-w-5xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="flex items-center gap-2 text-arcade-yellow font-arcade text-xs mb-2">
          <Trophy size={14} />
          <span>HALL OF FAME • LEADERBOARD</span>
        </div>
        <h2 className="font-arcade text-2xl sm:text-4xl text-arcade-yellow text-glow-yellow tracking-wider mb-2">
          HIGH SCORES
        </h2>
        <div className="font-pixel text-xl sm:text-2xl text-arcade-blue tracking-widest">
          TOP PERFORMANCE BENCHMARKS & DEVELOPER RANK
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-arcade-yellow via-ghost-pink to-arcade-blue mt-4" />
      </div>

      {/* Developer Level Banner */}
      <div className="bg-arcade-card border-2 border-arcade-yellow rounded-xl p-6 mb-8 shadow-neon-yellow relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-3 bg-arcade-yellow/10 rounded-lg border border-arcade-yellow">
              <Crown size={28} className="text-arcade-yellow animate-bounce" />
            </div>
            <div>
              <span className="font-pixel text-sm text-slate-400">CURRENT STATUS</span>
              <h3 className="font-arcade text-lg sm:text-xl text-slate-100">
                DARSHAN'S DEVELOPER LEVEL
              </h3>
            </div>
          </div>

          {/* Level Badge */}
          <div className="px-5 py-2.5 bg-arcade-yellow text-black font-arcade text-sm rounded-lg border-2 border-white shadow-neon-yellow font-bold">
            LEVEL 08
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-arcade text-[10px] text-slate-300">
            <span>EXP: 8,450 / 10,000 XP</span>
            <span className="text-arcade-yellow">84.5% TO LEVEL 09</span>
          </div>
          <div className="w-full bg-slate-950 h-4 rounded border border-arcade-border p-0.5">
            <div
              className="h-full bg-gradient-to-r from-arcade-yellow via-ghost-pink to-arcade-blue rounded transition-all duration-700 shadow-neon-yellow"
              style={{ width: '84.5%' }}
            />
          </div>
        </div>
      </div>

      {/* Arcade High Scores Table */}
      <div className="bg-arcade-card border-2 border-arcade-border rounded-xl overflow-hidden shadow-arcade-inset">
        
        {/* Table Header */}
        <div className="bg-slate-900/90 border-b border-arcade-border px-6 py-3.5 grid grid-cols-12 text-[11px] font-arcade text-slate-400">
          <span className="col-span-2 sm:col-span-1">RANK</span>
          <span className="col-span-3 sm:col-span-3">PLAYER</span>
          <span className="col-span-4 sm:col-span-5">SPECIALIZATION</span>
          <span className="col-span-3 sm:col-span-3 text-right">SCORE / XP</span>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-800/80 font-arcade text-xs">
          {portfolio.highScores.map((row, idx) => {
            const isFirst = idx === 0;

            return (
              <div
                key={idx}
                onClick={() => {
                  arcadeAudio.playPellet();
                  onGainScore(25);
                }}
                className={`px-6 py-4 grid grid-cols-12 items-center cursor-pointer transition-colors ${
                  isFirst
                    ? 'bg-arcade-yellow/10 text-arcade-yellow hover:bg-arcade-yellow/15'
                    : 'hover:bg-slate-800/50 text-slate-200'
                }`}
              >
                {/* Rank */}
                <div className="col-span-2 sm:col-span-1 flex items-center gap-1.5 font-bold">
                  {isFirst ? (
                    <Trophy size={14} className="text-arcade-yellow animate-pulse" />
                  ) : (
                    <span className="text-slate-400">{row.rank}</span>
                  )}
                </div>

                {/* Player Name */}
                <div className="col-span-3 sm:col-span-3 font-bold text-slate-100">
                  {row.player}
                </div>

                {/* Category */}
                <div className="col-span-4 sm:col-span-5 text-xs text-slate-300 font-pixel sm:font-arcade text-[10px]">
                  {row.category}
                </div>

                {/* Score & XP */}
                <div className="col-span-3 sm:col-span-3 text-right flex flex-col items-end">
                  <span className="font-bold text-arcade-yellow">
                    {row.score.toLocaleString()} PTS
                  </span>
                  <span className="font-pixel text-xs text-slate-400">
                    {row.xp}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
