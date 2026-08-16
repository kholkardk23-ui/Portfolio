import React from 'react';
import { ArrowUp, Github, Linkedin, Instagram, Mail, Heart, Sparkles } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { arcadeAudio } from '../utils/audio';

export default function Footer({ onScrollToTop }) {
  return (
    <footer className="w-full bg-[#04040A] border-t-2 border-arcade-border pt-12 pb-8 px-4 text-slate-400 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-6">
        
        {/* Arcade Marquee Title */}
        <div className="flex items-center gap-3">
          <Sparkles size={16} className="text-arcade-yellow animate-spin" />
          <h2 className="font-arcade text-base sm:text-xl text-arcade-yellow text-glow-yellow tracking-wider">
            DARSHAN'S ARCADE
          </h2>
          <Sparkles size={16} className="text-ghost-cyan animate-spin" />
        </div>

        {/* Marquee Slogan */}
        <div className="font-pixel text-lg sm:text-xl text-slate-300 tracking-widest uppercase">
          INSERT COIN • KEEP BUILDING • LEVEL UP • ZERO BUGS
        </div>

        {/* Social Icons Strip */}
        <div className="flex items-center gap-4">
          <a
            href={portfolio.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Darshan Kholkar GitHub"
            className="p-2.5 bg-slate-900 border border-slate-800 hover:border-arcade-yellow rounded-lg text-slate-400 hover:text-arcade-yellow transition-all hover:scale-110"
          >
            <Github size={18} />
          </a>
          <a
            href={portfolio.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Darshan Kholkar LinkedIn"
            className="p-2.5 bg-slate-900 border border-slate-800 hover:border-arcade-blue rounded-lg text-slate-400 hover:text-arcade-blue transition-all hover:scale-110"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={portfolio.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Darshan Kholkar Instagram"
            className="p-2.5 bg-slate-900 border border-slate-800 hover:border-ghost-pink rounded-lg text-slate-400 hover:text-ghost-pink transition-all hover:scale-110"
          >
            <Instagram size={18} />
          </a>
          <a
            href={`mailto:${portfolio.email}`}
            aria-label="Email Darshan Kholkar"
            className="p-2.5 bg-slate-900 border border-slate-800 hover:border-arcade-green rounded-lg text-slate-400 hover:text-arcade-green transition-all hover:scale-110"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => {
            arcadeAudio.playClick();
            onScrollToTop();
          }}
          className="px-5 py-2.5 bg-arcade-card hover:bg-slate-800 text-arcade-yellow font-arcade text-xs rounded border border-arcade-yellow/50 shadow-neon-yellow transition-all flex items-center gap-2"
        >
          <ArrowUp size={14} />
          <span>BACK TO TOP ↑</span>
        </button>

        {/* Copyright & Meta */}
        <div className="pt-6 border-t border-slate-900 w-full text-xs text-slate-500 font-pixel text-sm sm:text-base tracking-wider">
          © {new Date().getFullYear()} DARSHAN KHOLKAR • ALL RIGHTS RESERVED • BUILT WITH REACT, VITE & RETRO LOVE
        </div>

      </div>
    </footer>
  );
}
