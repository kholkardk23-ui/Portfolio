import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import ArcadeHUD from './components/ArcadeHUD';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import MiniGame from './components/MiniGame';
import MazeNavigation from './components/MazeNavigation';
import CRTOverlay from './components/CRTOverlay';
import Footer from './components/Footer';
import { arcadeAudio } from './utils/audio';

export default function App() {
  const [isGameStarted, setIsGameStarted] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [score, setScore] = useState(1250);
  const [highScore, setHighScore] = useState(4250);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [crtEnabled, setCrtEnabled] = useState(true);

  // Load Initial Settings & High Score
  useEffect(() => {
    try {
      const savedHigh = localStorage.getItem('darshan_pacman_highscore');
      if (savedHigh) setHighScore(parseInt(savedHigh, 10));

      const savedCRT = localStorage.getItem('darshan_arcade_crt');
      if (savedCRT !== null) setCrtEnabled(savedCRT === 'true');

      setSoundEnabled(arcadeAudio.getSoundState());
    } catch (e) {}
  }, []);

  // Gain score callback across interactions
  const handleGainScore = (amount) => {
    setScore(prev => {
      const newScore = prev + amount;
      if (newScore > highScore) {
        setHighScore(newScore);
        try {
          localStorage.setItem('darshan_pacman_highscore', String(newScore));
        } catch (e) {}
      }
      return newScore;
    });
  };

  // Toggle Sound FX
  const handleToggleSound = () => {
    const newState = arcadeAudio.toggleSound();
    setSoundEnabled(newState);
  };

  // Toggle CRT Scanlines
  const handleToggleCRT = () => {
    setCrtEnabled(prev => {
      const next = !prev;
      try {
        localStorage.setItem('darshan_arcade_crt', String(next));
      } catch (e) {}
      return next;
    });
  };

  // Scroll to section handler
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -90; // offset for sticky HUD & Navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('hero');
  };

  // Intersection Observer to update active navigation tab dynamically
  useEffect(() => {
    if (!isGameStarted) return;

    const sections = ['hero', 'about', 'skills', 'education', 'achievements', 'contact', 'minigame'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isGameStarted]);

  return (
    <div className="min-h-screen bg-arcade-bg text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      
      {/* CRT Scanline Effect Overlay */}
      <CRTOverlay enabled={crtEnabled} />

      {/* Boot & Loading Screen */}
      {!isGameStarted && (
        <LoadingScreen onStart={() => setIsGameStarted(true)} />
      )}

      {/* Main Arcade Experience */}
      {isGameStarted && (
        <>
          {/* Top Arcade 1UP / HIGH SCORE HUD */}
          <ArcadeHUD
            score={score}
            highScore={highScore}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            crtEnabled={crtEnabled}
            onToggleCRT={handleToggleCRT}
          />

          {/* Sticky Maze Corridor Navbar */}
          <Navbar
            activeSection={activeSection}
            onNavigate={handleNavigate}
          />

          {/* Side Ultra-Wide Maze Radar */}
          <MazeNavigation
            activeSection={activeSection}
            onNavigate={handleNavigate}
          />

          {/* Main Portfolio Sections */}
          <main className="flex-grow space-y-12">
            <Hero
              onNavigate={handleNavigate}
              onGainScore={handleGainScore}
            />

            <About
              onGainScore={handleGainScore}
            />

            <Skills
              onGainScore={handleGainScore}
            />

            <Education
              onGainScore={handleGainScore}
            />

            <Achievements
              onGainScore={handleGainScore}
            />

            <Contact
              onGainScore={handleGainScore}
            />

            <MiniGame
              onGlobalScoreUpdate={handleGainScore}
            />
          </main>

          {/* Arcade Footer */}
          <Footer onScrollToTop={handleScrollToTop} />
        </>
      )}

    </div>
  );
}
