'use client';

import { useState, useRef, useEffect } from 'react';

export default function Terminal({ config }) {
  const [lines, setLines] = useState([
    { type: 'output', text: config?.welcomeMessage || "Welcome to Aryan's Terminal v2.0 — Type 'help' for available commands." },
  ]);
  const [input, setInput] = useState('');
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  const commands = config?.commands || {};

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  function handleSubmit(e) {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newLines = [...lines, { type: 'prompt', text: `visitor@aryan:~$ ${cmd}` }];

    if (cmd === 'clear') {
      setLines([{ type: 'output', text: config?.welcomeMessage || "Terminal cleared. Type 'help' for commands." }]);
      setInput('');
      return;
    }

    if (cmd === 'sudo rm -rf /') {
      newLines.push({ type: 'output', text: '🚫 Nice try! Access denied. My portfolio is staying right here.' });
    } else if (cmd === 'whoami') {
      newLines.push({ type: 'output', text: 'visitor — Welcome to my digital space!' });
    } else if (cmd === 'ls') {
      newLines.push({ type: 'output', text: 'about/  projects/  skills/  blog/  contact/' });
    } else if (cmd === 'pwd') {
      newLines.push({ type: 'output', text: '/home/aryan/portfolio' });
    } else if (cmd === 'date') {
      newLines.push({ type: 'output', text: new Date().toLocaleString() });
    } else if (cmd === 'neofetch' || cmd === 'system') {
      newLines.push({ type: 'output', text: `
   ╔═══════════════════════════╗
   ║  Aryan Shakya Terminal    ║
   ╠═══════════════════════════╣
   ║  OS: Creative Coder OS    ║
   ║  Stack: Full-Stack + IoT  ║
   ║  Editor: VS Code          ║
   ║  Shell: Innovation/zsh    ║
   ║  Uptime: 2+ years         ║
   ╚═══════════════════════════╝` });
    } else if (commands[cmd]) {
      newLines.push({ type: 'output', text: commands[cmd] });
    } else {
      newLines.push({ type: 'output', text: `Command not found: '${cmd}'. Type 'help' for available commands.` });
    }

    setLines(newLines);
    setInput('');
  }

  function handleClick() {
    inputRef.current?.focus();
  }

  return (
    <div className="terminal-widget" onClick={handleClick}>
      <div className="terminal-header">
        <div className="terminal-dot red"></div>
        <div className="terminal-dot yellow"></div>
        <div className="terminal-dot green"></div>
        <span className="terminal-title">aryan@portfolio — bash</span>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {lines.map((line, i) => (
          <div key={i} className="terminal-line">
            {line.type === 'prompt' ? (
              <span className="terminal-prompt">{line.text}</span>
            ) : (
              <span className="terminal-output">{line.text}</span>
            )}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="terminal-input-line">
          <span className="terminal-prompt">visitor@aryan:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            spellCheck="false"
            aria-label="Terminal input"
          />
        </form>
      </div>
    </div>
  );
}
