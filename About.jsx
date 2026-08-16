import React from 'react';
import { User, Shield, Zap, Sparkles, MapPin, Mail, Phone, Award, Globe, Code } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { arcadeAudio } from '../utils/audio';

export default function About({ onGainScore }) {
  return (
    <section id="about" className="py-16 px-4 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="flex items-center gap-2 text-arcade-yellow font-arcade text-xs mb-2">
          <Shield size={14} />
          <span>STAT SHEET & BIOGRAPHY</span>
        </div>
        <h2 className="font-arcade text-2xl sm:text-4xl text-arcade-yellow text-glow-yellow tracking-wider mb-2">
          {portfolio.about.heading}
        </h2>
        <div className="font-pixel text-xl sm:text-2xl text-arcade-blue tracking-widest">
          {portfolio.about.subheading}
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-arcade-yellow via-ghost-pink to-arcade-blue mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Pixel Avatar & Player Stats Card */}
        <div className="lg:col-span-4 bg-arcade-card border-2 border-arcade-yellow/70 rounded-xl p-6 shadow-neon-yellow relative overflow-hidden">
          
          {/* Top Status Bar */}
          <div className="flex items-center justify-between border-b border-arcade-border pb-3 mb-4">
            <span className="font-arcade text-[10px] text-slate-400">P1 CARD</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-arcade-green animate-ping" />
              <span className="font-arcade text-[10px] text-arcade-green font-bold">ONLINE</span>
            </div>
          </div>

          {/* Original SVG Pixel Avatar */}
          <div className="w-36 h-36 mx-auto mb-5 bg-[#080816] border-2 border-arcade-blue rounded-lg p-2 flex items-center justify-center relative shadow-neon-blue group">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Retro Pixel Avatar Character */}
              {/* Background Glow */}
              <rect x="5" y="5" width="90" height="90" rx="4" fill="#0A0A1F" />
              
              {/* Hair (Cyber Neon Dark Brown/Black) */}
              <rect x="25" y="15" width="50" height="20" fill="#1E293B" />
              <rect x="20" y="20" width="10" height="25" fill="#1E293B" />
              <rect x="70" y="20" width="10" height="25" fill="#1E293B" />
              
              {/* Face Skin */}
              <rect x="25" y="30" width="50" height="40" fill="#FBBF24" />
              
              {/* Retro Arcade Glasses */}
              <rect x="28" y="40" width="18" height="12" fill="#00F0FF" />
              <rect x="54" y="40" width="18" height="12" fill="#00F0FF" />
              <rect x="46" y="44" width="8" height="4" fill="#00F0FF" />
              {/* Glass Eyes */}
              <rect x="34" y="44" width="6" height="6" fill="#06070E" />
              <rect x="60" y="44" width="6" height="6" fill="#06070E" />
              
              {/* Confident Pixel Smile */}
              <rect x="40" y="58" width="20" height="4" fill="#854D0E" />
              <rect x="42" y="62" width="16" height="2" fill="#854D0E" />
              
              {/* Body / Hoodie (Arcade Dark Blue with Yellow Accent) */}
              <rect x="20" y="70" width="60" height="25" fill="#1D4ED8" />
              <rect x="45" y="70" width="10" height="25" fill="#FFD700" />
            </svg>
            
            {/* Level Tag */}
            <div className="absolute -bottom-2 -right-2 bg-arcade-yellow text-black font-arcade text-[9px] px-2 py-0.5 rounded border border-black shadow">
              LVL 08
            </div>
          </div>

          {/* Character Identity Metrics */}
          <div className="space-y-2.5 font-arcade text-[11px]">
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">PLAYER:</span>
              <span className="text-arcade-yellow font-bold">{portfolio.name.toUpperCase()}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">CLASS:</span>
              <span className="text-arcade-blue">{portfolio.playerClass}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">LEVEL:</span>
              <span className="text-ghost-pink">{portfolio.level}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">LOCATION:</span>
              <span className="text-slate-200">Pune, India</span>
            </div>
          </div>

          {/* Contact Details List */}
          <div className="mt-5 pt-4 border-t border-slate-800 space-y-2 text-xs font-sans text-slate-300">
            <a
              href={`mailto:${portfolio.email}`}
              className="flex items-center gap-2 hover:text-arcade-yellow transition-colors"
            >
              <Mail size={14} className="text-arcade-yellow" />
              <span className="truncate">{portfolio.email}</span>
            </a>
            <a
              href={`tel:${portfolio.phone}`}
              className="flex items-center gap-2 hover:text-arcade-yellow transition-colors"
            >
              <Phone size={14} className="text-ghost-cyan" />
              <span>{portfolio.phone}</span>
            </a>
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin size={14} className="text-ghost-pink" />
              <span>{portfolio.location}</span>
            </div>
          </div>

        </div>

        {/* Right: Bio, Academic Stats & Skills */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Biography Block */}
          <div className="bg-arcade-card border-2 border-arcade-border rounded-xl p-6 shadow-arcade-inset">
            <div className="flex items-center gap-2 font-arcade text-xs text-arcade-blue mb-4">
              <Sparkles size={14} />
              <span>MISSION BRIEFING / BACKGROUND</span>
            </div>
            
            <div className="space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed font-sans">
              {portfolio.about.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Languages Spoken */}
            <div className="mt-6 pt-4 border-t border-arcade-border/80 flex flex-wrap items-center gap-2">
              <span className="font-arcade text-[10px] text-slate-400 mr-2">LANGUAGES:</span>
              {portfolio.about.languages.map((lang, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-slate-800/80 border border-slate-700 text-slate-200 text-xs font-mono rounded"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* 4 Stat Boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {portfolio.about.stats.map((stat, idx) => (
              <div
                key={idx}
                onClick={() => {
                  arcadeAudio.playPellet();
                  onGainScore(20);
                }}
                className="bg-arcade-card/90 border border-arcade-border hover:border-arcade-yellow p-4 rounded-lg text-center cursor-pointer transition-all hover:scale-105 group shadow-sm"
              >
                <div className="font-arcade text-xs text-slate-400 mb-1 group-hover:text-arcade-yellow transition-colors">
                  {stat.label}
                </div>
                <div className="font-arcade text-base sm:text-xl text-arcade-yellow text-glow-yellow mb-1">
                  {stat.value}
                </div>
                <div className="font-pixel text-xs text-slate-400">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>

          {/* Volunteer & Certifications Box */}
          <div className="bg-arcade-card/60 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-2 font-arcade text-xs text-arcade-green mb-3">
              <Award size={14} />
              <span>VOLUNTEER & TECHNICAL CERTIFICATIONS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {portfolio.certifications.map((cert, i) => (
                <div key={i} className="flex items-start gap-2.5 p-2.5 bg-slate-900/80 rounded border border-slate-800">
                  <span className="text-arcade-yellow font-arcade text-xs">★</span>
                  <div>
                    <div className="text-xs font-semibold text-slate-200">{cert.title}</div>
                    <div className="text-[11px] text-slate-400">{cert.issuer} • {cert.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
