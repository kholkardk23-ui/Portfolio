import React, { useState } from 'react';
import { Mail, Send, Github, Linkedin, Instagram, Phone, MapPin, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolio } from '../data/portfolio';
import { arcadeAudio } from '../utils/audio';

export default function Contact({ onGainScore }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('IDLE'); // 'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'
  const [errorMessage, setErrorMessage] = useState('');

  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    arcadeAudio.playClick();
    setStatus('SENDING');
    setErrorMessage('');

    // If external form endpoint is configured (Web3Forms, Formspree, etc.)
    if (endpoint && endpoint.trim() !== '') {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          handleSuccess();
        } else {
          fallbackMailto();
        }
      } catch (err) {
        fallbackMailto();
      }
    } else {
      // Graceful fallback: Open default email client with formatted data
      fallbackMailto();
    }
  };

  const fallbackMailto = () => {
    const subject = encodeURIComponent(`[Portfolio Contact] ${formData.subject || 'New Collaboration Message'}`);
    const body = encodeURIComponent(
      `Hi Darshan,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`;
    handleSuccess();
  };

  const handleSuccess = () => {
    setStatus('SUCCESS');
    arcadeAudio.playLevelUp();
    onGainScore(100);

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#00F0FF', '#FF2E93', '#22C55E']
      });
    } catch (e) {}

    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('IDLE'), 8000);
  };

  return (
    <section id="contact" className="py-16 px-4 max-w-5xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="flex items-center gap-2 text-ghost-pink font-arcade text-xs mb-2">
          <MessageSquare size={14} />
          <span>TRANSMISSION HUB • FINAL STAGE</span>
        </div>
        <h2 className="font-arcade text-2xl sm:text-4xl text-arcade-yellow text-glow-yellow tracking-wider mb-2">
          READY FOR THE NEXT LEVEL?
        </h2>
        <div className="font-pixel text-xl sm:text-2xl text-slate-300 tracking-widest">
          LET'S BUILD SOMETHING AWESOME TOGETHER
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-arcade-yellow via-ghost-pink to-arcade-blue mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Contact Info & Socials */}
        <div className="lg:col-span-5 bg-arcade-card border-2 border-arcade-border rounded-xl p-6 shadow-arcade-inset space-y-6">
          <div>
            <span className="font-arcade text-xs text-arcade-blue block mb-1">
              DIRECT CHANNELS
            </span>
            <h3 className="font-arcade text-base sm:text-lg text-slate-100 mb-3">
              GET IN TOUCH
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Whether you have an internship opportunity, freelance project, automation challenge, or simply want to talk tech and arcade games, feel free to drop a message!
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 font-sans text-xs sm:text-sm">
            <a
              href={`mailto:${portfolio.email}`}
              className="flex items-center gap-3 p-3 bg-slate-900/80 rounded-lg border border-slate-800 hover:border-arcade-yellow transition-colors group"
            >
              <Mail size={18} className="text-arcade-yellow group-hover:scale-110 transition-transform" />
              <div className="truncate">
                <div className="text-[10px] font-arcade text-slate-400">EMAIL</div>
                <div className="text-slate-200 truncate">{portfolio.email}</div>
              </div>
            </a>

            <a
              href={`tel:${portfolio.phone}`}
              className="flex items-center gap-3 p-3 bg-slate-900/80 rounded-lg border border-slate-800 hover:border-ghost-cyan transition-colors group"
            >
              <Phone size={18} className="text-ghost-cyan group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-[10px] font-arcade text-slate-400">PHONE</div>
                <div className="text-slate-200">{portfolio.phone}</div>
              </div>
            </a>

            <div className="flex items-center gap-3 p-3 bg-slate-900/80 rounded-lg border border-slate-800">
              <MapPin size={18} className="text-ghost-pink" />
              <div>
                <div className="text-[10px] font-arcade text-slate-400">LOCATION</div>
                <div className="text-slate-200">{portfolio.location}</div>
              </div>
            </div>
          </div>

          {/* Social Links Matrix */}
          <div>
            <span className="font-arcade text-[10px] text-slate-400 block mb-3">
              CONNECT ON SOCIALS:
            </span>
            <div className="flex items-center gap-3">
              <a
                href={portfolio.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Darshan Kholkar GitHub"
                className="p-3 bg-slate-900 border border-slate-700 hover:border-arcade-yellow rounded-lg text-slate-300 hover:text-arcade-yellow transition-all hover:scale-110"
              >
                <Github size={18} />
              </a>
              <a
                href={portfolio.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Darshan Kholkar LinkedIn"
                className="p-3 bg-slate-900 border border-slate-700 hover:border-arcade-blue rounded-lg text-slate-300 hover:text-arcade-blue transition-all hover:scale-110"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={portfolio.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Darshan Kholkar Instagram"
                className="p-3 bg-slate-900 border border-slate-700 hover:border-ghost-pink rounded-lg text-slate-300 hover:text-ghost-pink transition-all hover:scale-110"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7 bg-arcade-card border-2 border-arcade-yellow/60 rounded-xl p-6 shadow-neon-yellow relative">
          
          {status === 'SUCCESS' ? (
            <div className="py-12 flex flex-col items-center text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-arcade-green/20 border-2 border-arcade-green flex items-center justify-center shadow-neon-green">
                <CheckCircle2 size={32} className="text-arcade-green animate-bounce" />
              </div>
              <h3 className="font-arcade text-lg sm:text-xl text-arcade-green">
                MESSAGE TRANSMITTED!
              </h3>
              <div className="inline-block px-4 py-1.5 bg-arcade-yellow text-black font-arcade text-xs rounded shadow-neon-yellow">
                ★ +100 XP EARNED ★
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md font-sans">
                Thank you for reaching out! Darshan will get back to you as soon as possible.
              </p>
              <button
                onClick={() => setStatus('IDLE')}
                className="font-arcade text-xs text-arcade-blue hover:underline pt-4"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block font-arcade text-[10px] text-slate-300 mb-1.5">
                    YOUR NAME <span className="text-ghost-red">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Player Name"
                    className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 focus:border-arcade-yellow rounded font-sans text-xs text-slate-100 outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block font-arcade text-[10px] text-slate-300 mb-1.5">
                    YOUR EMAIL <span className="text-ghost-red">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="player@arcade.com"
                    className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 focus:border-arcade-yellow rounded font-sans text-xs text-slate-100 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block font-arcade text-[10px] text-slate-300 mb-1.5">
                  SUBJECT
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Internship / Collaboration / Project"
                  className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 focus:border-arcade-yellow rounded font-sans text-xs text-slate-100 outline-none transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block font-arcade text-[10px] text-slate-300 mb-1.5">
                  MESSAGE <span className="text-ghost-red">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your mission objective or question here..."
                  className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 focus:border-arcade-yellow rounded font-sans text-xs text-slate-100 outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'SENDING'}
                className="w-full py-3.5 bg-arcade-yellow hover:bg-arcade-yellowGlow text-black font-arcade text-xs sm:text-sm rounded border-2 border-white shadow-neon-yellow transition-all flex items-center justify-center gap-2 font-bold disabled:opacity-50"
              >
                {status === 'SENDING' ? (
                  <span>TRANSMITTING...</span>
                ) : (
                  <>
                    <Send size={15} />
                    <span>▶ SEND MESSAGE (+100 XP)</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>

    </section>
  );
}
