# 🕹️ DARSHAN'S ARCADE — PAC-MAN-INSPIRED DEVELOPER PORTFOLIO

> A production-ready, highly interactive personal developer portfolio built inside a retro arcade game for **Darshan Kholkar** (Diploma IT Student, Java, C/C++, Automation & Web Developer).

![Darshan's Arcade Preview](public/favicon.svg)

---

## 🌟 Key Features

- **🎮 Authentic Arcade Experience**: Custom SVG Pac-Man-inspired player character, 4 original ghost characters (Blinky, Pinky, Inky, Clyde), maze pathways, neon glows, and CRT scanlines.
- **🔊 8-Bit Web Audio API Synthesizer**: Procedural retro audio engine with **zero external audio file dependencies** (waka pellets, power pellets, insert coin chime, laser clicks, game over, level clear fanfare). Includes persistent mute/unmute toggle.
- **⚡ Playable HTML5 Canvas Mini-Game**:
  - Full-featured arcade maze runner with responsive canvas.
  - Ghost AI with chase & frightened modes.
  - Keyboard controls (`WASD` / `Arrow Keys` / `Space`) & Virtual Touch D-Pad for smartphones.
  - LocalStorage high-score persistence.
- **📊 Interactive Developer Stats**:
  - **Player Profile**: Retro character sheet with stats, bio, and custom pixel avatar.
  - **Power-Ups (Skills)**: Interactive cards with live XP animations and category filters.
  - **Missions (Projects)**: Mission control cards with status badges and source/demo links.
  - **Level Select (Education)**: Timeline progression checkpoints (SSC, JSPM Diploma in IT, etc.).
  - **High Scores (Achievements)**: Leaderboard table with animated XP counter bars.
- **📬 Functional Contact System**: Supports Formspree, Web3Forms, or custom endpoint via `VITE_CONTACT_FORM_ENDPOINT` with automatic mailto fallback and +100 XP confetti celebration.
- **🚀 100% Static-Host Ready**: Configured for instant deployment on GitHub Pages, Vercel, Netlify, and Cloudflare Pages.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) + Custom Retro CSS Tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) + [Canvas Confetti](https://github.com/catdad/canvas-confetti)
- **Audio Engine**: Web Audio API (Synthesized 8-bit Oscillator & Gain Nodes)
- **Game Engine**: HTML5 Canvas 2D Context

---

## 🚀 Quick Start

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or newer) installed.

### 2. Installation
```bash
# Clone or navigate to the project directory
cd portfoilio_pacman

# Install dependencies
npm install
```

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build
```bash
npm run build
```
This outputs a fully optimized static website bundle to the `dist/` directory.

### 5. Local Preview of Production Build
```bash
npm run preview
```

---

## 🎨 Easy Customization

All personal information, projects, skills, education, and links are centralized in a single file:

📂 `src/data/portfolio.js`

### Changing Your Bio & Social Links
Open `src/data/portfolio.js` and edit the `portfolio` object:
```javascript
export const portfolio = {
  name: "Darshan Kholkar",
  primaryRole: "Diploma IT Student",
  email: "kholkar.dk23@gmail.com",
  phone: "+91 9529618605",
  location: "Pune, Maharashtra, India",
  social: {
    github: "https://github.com/kholkardk23-ui",
    linkedin: "https://www.linkedin.com/in/darshan-kholkar-754513321/",
    instagram: "https://www.instagram.com/dk_artist_2307/"
  },
  // ...
};
```

### Adding or Updating Projects (Missions)
Add a new mission object to `projects` array in `src/data/portfolio.js`:
```javascript
{
  id: "mission-06",
  code: "MISSION 06",
  title: "New Amazing Project",
  category: "Web & Automation",
  status: "COMPLETED",
  xpReward: "+900 XP",
  description: "Description of your new project...",
  technologies: ["React", "Tailwind CSS", "Node.js"],
  github: "https://github.com/kholkardk23-ui/new-repo",
  liveDemo: "https://my-demo-link.com", // Or set null for 'COMING SOON'
}
```

### Adding Your Resume PDF
Place your PDF resume inside:
📂 `public/assets/Darshan-Kholkar-Resume.pdf`

---

## 📬 Contact Form Configuration

To connect the contact form to your own backend service (e.g. [Web3Forms](https://web3forms.com/) or [Formspree](https://formspree.io/)):

1. Create a `.env` file in the root directory (based on `.env.example`).
2. Add your form submission URL:
   ```env
   VITE_CONTACT_FORM_ENDPOINT=https://api.web3forms.com/submit
   ```
*(If no endpoint is configured, the form automatically falls back to opening the visitor's default email client with a pre-filled message addressed to `kholkar.dk23@gmail.com`.)*

---

## 🌐 Static Hosting Deployment Guide

### 1. GitHub Pages
1. In `vite.config.js`, the base path defaults to `./` (relative path) or can be passed via `VITE_BASE_PATH`:
   ```bash
   # If deploying to username.github.io/portfolio_pacman/
   npm run build -- --base=/portfolio_pacman/
   ```
2. Push the contents of the `dist/` folder to your `gh-pages` branch, or use GitHub Actions.

### 2. Vercel
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Select your repository.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Click **Deploy**.

### 3. Netlify
1. Go to [Netlify](https://www.netlify.com/) and click **Add new site** > **Import an existing project**.
2. Select your GitHub repository.
3. Build command: `npm run build`.
4. Publish directory: `dist`.
5. Click **Deploy Site**.

### 4. Cloudflare Pages
1. Go to Cloudflare Dashboard > **Workers & Pages** > **Create application** > **Pages**.
2. Connect to Git repository.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Click **Save and Deploy**.

---

## 📜 License & Credits

Designed and developed for **Darshan Kholkar**.  
Retro visual language and sound effects created with original code, CSS, SVG, and HTML5 Canvas.
