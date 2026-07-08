'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [cursorClass, setCursorClass] = useState('');
  const [label, setLabel] = useState('');

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Check for touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      cursor.style.display = 'none';
      return;
    }

    let mx = 0, my = 0;
    let cx = 0, cy = 0;

    function onMouseMove(e) {
      mx = e.clientX;
      my = e.clientY;
    }

    function animate() {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
      requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', onMouseMove);
    animate();

    // Hover handlers
    function addHoverListeners() {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', handleHoverEnter);
        el.addEventListener('mouseleave', handleHoverLeave);
      });

      document.querySelectorAll('.project-card, .blog-card').forEach(el => {
        el.addEventListener('mouseenter', handleProjectEnter);
        el.addEventListener('mouseleave', handleProjectLeave);
      });
    }

    function handleHoverEnter() {
      setCursorClass('hover');
    }

    function handleHoverLeave() {
      setCursorClass('');
      setLabel('');
    }

    function handleProjectEnter() {
      setCursorClass('project-hover');
      setLabel('VIEW');
    }

    function handleProjectLeave() {
      setCursorClass('');
      setLabel('');
    }

    // Delayed setup to ensure DOM is ready
    const timeout = setTimeout(addHoverListeners, 500);

    // Re-apply on route changes using MutationObserver
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${cursorClass}`}
    >
      <div className="cursor-dot" />
      <div className="cursor-ring" />
      {label && <span className="cursor-label">{label}</span>}
    </div>
  );
}
