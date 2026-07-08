'use client';

import { useEffect } from 'react';

export default function ScrollAnimations() {
  useEffect(() => {
    let gsap, ScrollTrigger;

    async function init() {
      const mod = await import('gsap');
      gsap = mod.gsap || mod.default;
      const stMod = await import('gsap/ScrollTrigger');
      ScrollTrigger = stMod.ScrollTrigger || stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      // ── Hero entrance ──────────────────────────────
      gsap.fromTo('.hero-meta-top', { opacity: 0, y: 12 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.8
      });
      gsap.fromTo('.hero-greeting', { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 2.0
      });
      gsap.fromTo('.hero-name-word', { yPercent: 120 }, {
        yPercent: 0, stagger: 0.15, duration: 1.2, ease: 'power4.out', delay: 2.1
      });
      gsap.fromTo('.hero-tagline', { opacity: 0, y: 15 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 2.5
      });
      gsap.fromTo('.hero-description', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 2.7
      });
      gsap.fromTo('.hero-cta-row', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 2.9
      });
      gsap.fromTo('.hero-portrait-wrap', { opacity: 0, x: 60 }, {
        opacity: 0.7, x: 0, duration: 1.4, ease: 'power4.out', delay: 2.2
      });
      gsap.fromTo('.role-belt', { opacity: 0 }, {
        opacity: 1, duration: 0.8, delay: 3.0
      });

      // ── Hero parallax on scroll ────────────────────
      gsap.to('.hero-content', {
        yPercent: -15, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
      });
      gsap.to('.hero-portrait-wrap', {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
      });
      gsap.to('.role-belt', {
        opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: '30% top', end: '60% top', scrub: 1 }
      });

      // ── About section ─────────────────────────────
      gsap.fromTo('.about-statement-line', { yPercent: 110 }, {
        yPercent: 0, stagger: 0.1, duration: 1.0, ease: 'power4.out',
        scrollTrigger: { trigger: '#about', start: 'top 75%' }
      });
      gsap.fromTo('.about-description', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-description', start: 'top 85%' }
      });
      gsap.fromTo('.stat-item', { opacity: 0, y: 25 }, {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-stats', start: 'top 88%' }
      });

      // ── Experience timeline ────────────────────────
      gsap.fromTo('.timeline-item', { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.timeline', start: 'top 80%' }
      });

      // ── Work section ──────────────────────────────
      gsap.fromTo('.work-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '#work', start: 'top 80%' }
      });
      gsap.fromTo('.project-card', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.project-card', start: 'top 85%' }
      });

      // ── Skills section ────────────────────────────
      gsap.fromTo('.skills-heading', { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: '#skills', start: 'top 75%' }
      });
      gsap.fromTo('.skill-pill', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, stagger: 0.04, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: '#skills', start: 'top 70%' }
      });

      // ── Terminal section ──────────────────────────
      gsap.fromTo('.terminal-widget', { opacity: 0, y: 40, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: '.terminal-widget', start: 'top 85%' }
      });

      // ── Robot section ─────────────────────────────
      gsap.fromTo('.robot-container', { opacity: 0, scale: 0.9 }, {
        opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.robot-container', start: 'top 80%' }
      });

      // ── Contact section ───────────────────────────
      gsap.fromTo('.contact-cta-link', { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 1.1, ease: 'power4.out',
        scrollTrigger: { trigger: '#contact', start: 'top 75%' }
      });
      gsap.fromTo('.contact-footer', { opacity: 0 }, {
        opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: '.contact-footer', start: 'top 90%' }
      });
    }

    // Delay init to allow preloader to finish
    const timeout = setTimeout(init, 500);
    return () => clearTimeout(timeout);
  }, []);

  return null;
}
