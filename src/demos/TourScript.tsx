import React from 'react';

// TourScript: Smoothly auto-scrolls the demo for embedded preview (<= 20 lines, zero dependencies)
export function TourScript() {
  const scriptContent = `
  (function() {
    try {
      if (new URLSearchParams(window.location.search).get('tour') !== '1') return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var duration = 18000;
      var start = null;
      var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      function stop() { window.cancelAnimationFrame(rafId); window.removeEventListener('pointerdown', stop); window.removeEventListener('wheel', stop); window.removeEventListener('touchstart', stop); window.removeEventListener('keydown', stop); window.removeEventListener('shreejan-stop-tour', stop); }
      window.addEventListener('pointerdown', stop); window.addEventListener('wheel', stop); window.addEventListener('touchstart', stop); window.addEventListener('keydown', stop); window.addEventListener('shreejan-stop-tour', stop);
      var rafId = null;
      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = (timestamp - start) / duration;
        if (progress < 1) {
          var ease = 0.5 - Math.cos(progress * Math.PI) / 2;
          window.scrollTo(0, ease * maxScroll);
          rafId = window.requestAnimationFrame(step);
        } else { window.scrollTo(0, 0); }
      }
      setTimeout(function() { rafId = window.requestAnimationFrame(step); }, 600);
    } catch(e) {}
  })();
  `;

  return (
    <script
      id="demo-tour-script"
      dangerouslySetInnerHTML={{ __html: scriptContent }}
    />
  );
}

export default TourScript;
