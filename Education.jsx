import React from 'react';
import { GraduationCap, Award, ChevronRight, CheckCircle2, Flame, MapPin } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { arcadeAudio } from '../utils/audio';

export default function Education({ onGainScore }) {
  return (
    <section id="education" className="py-16 px-4 max-w-5xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="flex items-center gap-2 text-arcade-green font-arcade text-xs mb-2">
          <GraduationCap size={14} />
          <span>STAGE PROGRESSION • WORLD MAP</span>
        </div>
        <h2 className="font-arcade text-2xl sm:text-4xl text-arcade-yellow text-glow-yellow tracking-wider mb-2">
          LEVEL SELECT (EDUCATION)
        </h2>
        <div className="font-pixel text-xl sm:text-2xl text-slate-300 tracking-widest">
          ACADEMIC CHECKPOINTS & PRACTICAL MASTERY
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-arcade-yellow via-ghost-pink to-arcade-blue mt-4" />
      </div>

      {/* Level Progression Timeline */}
      <div className="relative">
        
        {/* Central Neon Maze Corridor Line */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-8 bottom-8 w-1.5 bg-gradient-to-b from-arcade-green via-arcade-yellow to-arcade-blue shadow-neon-blue" />

        <div className="space-y-10 relative">
          {portfolio.education.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                onClick={() => {
                  arcadeAudio.playPellet();
                  onGainScore(30);
                }}
                className={`flex flex-col md:flex-row items-center cursor-pointer group ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card */}
                <div className="w-full md:w-[45%] bg-arcade-card border-2 border-arcade-border group-hover:border-arcade-yellow rounded-xl p-6 transition-all duration-300 group-hover:shadow-neon-yellow shadow-arcade-inset">
                  
                  {/* Level Tag & Status */}
                  <div className="flex items-center justify-between border-b border-arcade-border pb-3 mb-3">
                    <span className="font-arcade text-xs text-arcade-yellow group-hover:text-glow-yellow">
                      {item.level}
                    </span>
                    <span
                      className="font-arcade text-[10px] px-2.5 py-0.5 rounded border"
                      style={{
                        borderColor: item.color,
                        color: item.color,
                        backgroundColor: `${item.color}15`
                      }}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Degree / Program */}
                  <h3 className="font-arcade text-sm sm:text-base text-slate-100 group-hover:text-arcade-yellow transition-colors mb-2">
                    {item.degree}
                  </h3>

                  {/* Institution & Period */}
                  <div className="font-pixel text-base sm:text-lg text-arcade-blue mb-2">
                    {item.institution} • <span className="text-slate-400">{item.period}</span>
                  </div>

                  {/* Score Pill */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-700 rounded-md font-arcade text-xs text-arcade-green mb-4">
                    <Award size={13} className="text-arcade-yellow" />
                    <span>SCORE: {item.score}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Center Node Icon */}
                <div className="my-4 md:my-0 md:mx-auto relative z-10">
                  <div
                    className="w-12 h-12 rounded-full border-4 flex items-center justify-center transition-transform group-hover:scale-125 bg-arcade-bg"
                    style={{ borderColor: item.color, boxShadow: `0 0 12px ${item.color}` }}
                  >
                    <span className="font-arcade text-xs font-bold" style={{ color: item.color }}>
                      0{idx + 1}
                    </span>
                  </div>
                </div>

                {/* Empty Space for alignment on Desktop */}
                <div className="hidden md:block w-full md:w-[45%]" />

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
