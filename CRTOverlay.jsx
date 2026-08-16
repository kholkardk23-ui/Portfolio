import React from 'react';

export default function CRTOverlay({ enabled }) {
  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Scanline pattern */}
      <div className="absolute inset-0 crt-scanlines opacity-75" />
      {/* Vignette Shadow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.45)_100%)]" />
    </div>
  );
}
