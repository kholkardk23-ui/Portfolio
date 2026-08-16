import React, { useState } from 'react';
import { 
  Zap, Coffee, Cpu, Terminal, Bot, Workflow, Radio, Smartphone, Code2, Layout, Database, GitBranch, Sparkles 
} from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { arcadeAudio } from '../utils/audio';

// Map icon names to Lucide icons
const iconMap = {
  Coffee: Coffee,
  Cpu: Cpu,
  Terminal: Terminal,
  Bot: Bot,
  Workflow: Workflow,
  Radio: Radio,
  Smartphone: Smartphone,
  Code2: Code2,
  Layout: Layout,
  Database: Database,
  GitBranch: GitBranch,
};

export default function Skills({ onGainScore }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [poppedCard, setPoppedCard] = useState(null);

  const filteredSkills = activeCategory === 'All' 
    ? portfolio.skills 
    : portfolio.skills.filter(s => s.category === activeCategory);

  const handleCardInteraction = (skill) => {
    arcadeAudio.playPellet();
    onGainScore(25);
    setPoppedCard(skill.id);
    setTimeout(() => setPoppedCard(null), 800);
  };

  return (
    <section id="skills" className="py-16 px-4 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="flex items-center gap-2 text-ghost-cyan font-arcade text-xs mb-2">
          <Zap size={14} />
          <span>INVENTORY & ABILITIES</span>
        </div>
        <h2 className="font-arcade text-2xl sm:text-4xl text-arcade-yellow text-glow-yellow tracking-wider mb-2">
          POWER-UPS (SKILLS)
        </h2>
        <div className="font-pixel text-xl sm:text-2xl text-slate-300 tracking-widest">
          INTERACTIVE ABILITY MATRIX • TAP TO COLLECT XP
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-arcade-yellow via-ghost-pink to-arcade-blue mt-4" />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {portfolio.skillCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              arcadeAudio.playClick();
              setActiveCategory(cat);
            }}
            className={`px-4 py-2 rounded-md font-arcade text-xs transition-all ${
              activeCategory === cat
                ? 'bg-arcade-yellow text-black border-2 border-white shadow-neon-yellow font-bold scale-105'
                : 'bg-arcade-card border border-arcade-border text-slate-300 hover:text-white hover:border-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => {
          const IconComponent = iconMap[skill.icon] || Zap;
          const isPopped = poppedCard === skill.id;

          return (
            <div
              key={skill.id}
              onClick={() => handleCardInteraction(skill)}
              className={`bg-arcade-card border-2 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 relative group overflow-hidden ${
                isPopped
                  ? 'border-arcade-yellow shadow-neon-yellow scale-105'
                  : 'border-arcade-border hover:border-arcade-blue hover:shadow-neon-blue'
              }`}
            >
              {/* Top Row: Icon, Name & XP Badge */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center border transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${skill.color}15`, borderColor: skill.color }}
                  >
                    <IconComponent size={20} style={{ color: skill.color }} />
                  </div>
                  <div>
                    <h3 className="font-arcade text-sm text-slate-100 group-hover:text-arcade-yellow transition-colors">
                      {skill.name}
                    </h3>
                    <span className="font-pixel text-xs text-slate-400">
                      {skill.category}
                    </span>
                  </div>
                </div>

                {/* XP Pill */}
                <div className="font-arcade text-[10px] px-2 py-1 rounded bg-arcade-bg border border-arcade-yellow/60 text-arcade-yellow">
                  +{skill.xp} XP
                </div>
              </div>

              {/* Skill Description */}
              <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                {skill.description}
              </p>

              {/* XP Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between font-arcade text-[9px] text-slate-400">
                  <span>MASTERY</span>
                  <span style={{ color: skill.color }}>{skill.level}</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (skill.xp / 1000) * 100)}%`,
                      backgroundColor: skill.color,
                      boxShadow: `0 0 8px ${skill.color}`
                    }}
                  />
                </div>
              </div>

              {/* Floating +XP Notification when clicked */}
              {isPopped && (
                <div className="absolute top-2 right-2 bg-arcade-yellow text-black font-arcade text-[10px] px-2 py-0.5 rounded shadow-neon-yellow animate-bounce">
                  +25 XP COLLECTED!
                </div>
              )}

            </div>
          );
        })}
      </div>

    </section>
  );
}
