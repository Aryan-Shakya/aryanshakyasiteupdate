'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ComicBadge } from '@/components/Doodles';

export default function ChatbotTerminal({ config }) {
  const [lines, setLines] = useState([
    { type: 'output', text: "🤖 ARYAN'S AI TERMINAL v3.0 — Type any question or command!" },
    { type: 'output', text: "Examples: 'What are your skills?', 'Tell me about your projects', 'Download resume', or type 'help'." },
  ]);
  const [input, setInput] = useState('');
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  async function handleCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    const newLines = [...lines, { type: 'prompt', text: `visitor@aryan:~$ ${cmdRaw}` }];

    // Standard CLI commands
    if (cmd === 'clear') {
      setLines([
        { type: 'output', text: "🤖 Terminal cleared. Type 'help' or ask any question about Aryan!" }
      ]);
      setInput('');
      return;
    }

    if (cmd === 'help') {
      newLines.push({ type: 'output', text: `
⚡ AVAILABLE COMMANDS & TOPICS:
  • about       — Quick summary of Aryan's story and background
  • skills      — View technical stack (Languages, Web, IoT/Embedded)
  • projects    — Featured hardware & software applications
  • hobbies     — Music playlists, favorite TV shows & games
  • resume      — One-click link to download official PDF resume
  • contact     — Email, WhatsApp, GitHub & LinkedIn coordinates
  • clear       — Clear terminal screen
  • neofetch    — Display system specs badge

💡 Or ask natural questions like:
  "Where do you study?", "What is your experience with ESP32?", "What shows do you watch?"` });
    } else if (cmd === 'resume' || cmd.includes('download') || cmd.includes('cv')) {
      newLines.push({ type: 'output', text: "📄 RESUME FOUND: Click the button below or visit /RESUME_AryanShakya_01.pdf to download Aryan's official CV!" });
      window.open('/RESUME_AryanShakya_01.pdf', '_blank');
    } else if (cmd === 'skills' || cmd === 'stack' || cmd === 'technologies' || cmd === 'languages') {
      newLines.push({ type: 'output', text: `
🛠 ARYAN'S TECHNICAL ARSENAL:
  • Languages: Python, JavaScript, C/C++, Java, SQL, HTML5/CSS3
  • Web Development: React, Next.js, Three.js, GSAP, Node.js, Express, MongoDB, Firebase
  • Robotics & IoT: ESP32, Raspberry Pi (4, 5 & Zero 2W), Arduino, Sensor Integration, Real-time telemetry
  • Tools & AI: Git, GitHub, VS Code, AI-augmented workflows (Antigravity, Gemini, Claude)` });
    } else if (cmd === 'projects' || cmd === 'work' || cmd === 'portfolio') {
      newLines.push({ type: 'output', text: `
🚀 FEATURED CREATIONS:
  1. FlowRead — Intelligent reading platform with custom themes & authentication (Next.js, MongoDB)
  2. Smart Sensor Dashboard — Real-time IoT live telemetry visualization (ESP32 + Firebase)
  3. Reception Desk Bot — Local voice pipeline with Whisper STT & Llama3.2 on Raspberry Pi 4
  4. Dual-Motor Stabilization Aircraft — Custom IMU flight stabilization protocols
  5. Internet-Controlled RC Car — Sub-200ms command latency Wi-Fi vehicle` });
    } else if (cmd === 'about' || cmd === 'bio' || cmd === 'story') {
      newLines.push({ type: 'output', text: `
👨‍💻 ABOUT ARYAN SHAKYA:
Full-stack developer, creative coder, and IoT engineer based in India. Currently pursuing B.Tech in CSE (Class of 2028). Passionate about building systems where physical hardware meets immersive web software. Co-founder & President of the University Robotics & IoT Club (YANTRIX).` });
    } else if (cmd === 'hobbies' || cmd === 'music' || cmd === 'shows' || cmd === 'gaming') {
      newLines.push({ type: 'output', text: `
🎧 PERSONAL SCRAPBOOK & HOBBIES:
  • Music: Big fan of high-energy beats and atmospheric tunes (check out my Spotify section!)
  • TV Shows & Sitcoms: Rick and Morty (Wubba Lubba Dub-Dub!), Harry Potter, Silicon Valley
  • Gaming: Love retro arcade games and magic spell-dueling (try the Harry Potter wizard game on this page!)` });
    } else if (cmd === 'contact' || cmd === 'email' || cmd === 'whatsapp' || cmd === 'social') {
      newLines.push({ type: 'output', text: `
📬 LET'S CONNECT:
  • Email: aryanshakyaofficial.mail@gmail.com
  • WhatsApp: +91 93223 11917
  • GitHub: https://github.com/Aryan-Shakya
  • LinkedIn: https://www.linkedin.com/in/aryan-shakya-73035a385/` });
    } else if (cmd === 'neofetch' || cmd === 'system') {
      newLines.push({ type: 'output', text: `
   ╔══════════════════════════════════╗
   ║  Aryan Shakya Creative Core      ║
   ╠══════════════════════════════════╣
   ║  OS: Storytelling OS v3.0        ║
   ║  Hardware: ESP32 + Raspberry Pi  ║
   ║  Frontend: Next.js + GSAP + 3D   ║
   ║  Vibe: Warm, Colorful & Tech     ║
   ║  Status: Open for Innovation     ║
   ╚══════════════════════════════════╝` });
    } else if (cmd === 'sudo rm -rf /') {
      newLines.push({ type: 'output', text: "🚫 Access Denied! Nice try! My portfolio resilience shield blocked your command." });
    } else {
      // Live Cerebras AI Llama 3.1 Inference for Natural Language Queries
      newLines.push({ type: 'output', text: "⚡ Cerebras AI reasoning...", id: "loading" });
      setLines(newLines);
      setInput('');

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: cmdRaw, history: lines }),
        });
        const data = await res.json();
        
        setLines((prev) => prev.map((item) => 
          item.id === "loading" ? { type: 'output', text: `🤖 ${data.reply}` } : item
        ));
      } catch (err) {
        setLines((prev) => prev.map((item) => 
          item.id === "loading" ? { type: 'output', text: "🤖 Network timeout. As Aryan's AI, I can tell you he specializes in Full-Stack Web Dev & IoT! Try typing 'skills' or 'projects'." } : item
        ));
      }
      return;
    }

    setLines(newLines);
    setInput('');
  }

  return (
    <div className="terminal-widget" onClick={() => inputRef.current?.focus()} style={{ width: '100%', maxWidth: '850px', margin: '2rem auto', border: '2px solid var(--border-light)', boxShadow: '0 15px 40px rgba(0, 240, 255, 0.15)', background: 'var(--bg-card)', borderRadius: '16px' }}>
      <div className="terminal-header" style={{ background: 'var(--bg-elevated)', padding: '0.8rem 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div className="terminal-dot red" style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
          <div className="terminal-dot yellow" style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
          <div className="terminal-dot green" style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
          <span className="terminal-title" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '0.5rem', fontWeight: 700 }}>
            aryan@ai-chatbot — bash
          </span>
        </div>
        <ComicBadge text="AI CHATBOT" color="var(--accent-gold)" textColor="#000" style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem' }} />
      </div>

      <div className="terminal-body" ref={bodyRef} style={{ padding: '1.5rem', maxHeight: '380px', overflowY: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-primary)', background: 'var(--bg-primary)' }}>
        {lines.map((line, i) => (
          <div key={i} className="terminal-line" style={{ marginBottom: '0.8rem', whiteSpace: 'pre-wrap' }}>
            {line.type === 'prompt' ? (
              <span style={{ color: 'var(--accent-teal)', fontWeight: 700 }}>{line.text}</span>
            ) : (
              <span style={{ color: i === 0 ? 'var(--accent-rose)' : 'var(--text-primary)', fontWeight: i === 0 ? 700 : 400 }}>{line.text}</span>
            )}
          </div>
        ))}
        <form onSubmit={(e) => { e.preventDefault(); handleCommand(input); }} className="terminal-input-line" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '1rem' }}>
          <span style={{ color: 'var(--accent-teal)', fontWeight: 700 }}>visitor@aryan:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'skills', 'projects', or ask me anything..."
            style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', outline: 'none', fontWeight: 600 }}
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
}
