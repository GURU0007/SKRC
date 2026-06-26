import React from 'react';

const LegacyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#hero-gold-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="hero-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#f5e6c8" />
      </linearGradient>
    </defs>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"/>
    <path d="M12 2a5 5 0 0 0-5 5v5a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z"/>
  </svg>
);

const GreenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#hero-green-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="hero-green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#11998e" />
        <stop offset="100%" stopColor="#38ef7d" />
      </linearGradient>
    </defs>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58 0 8a13 13 0 0 1-8 10Z"/>
    <path d="M9 10H4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-5"/>
  </svg>
);

const RegistryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#hero-blue-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="hero-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00b4db" />
        <stop offset="100%" stopColor="#0083b0" />
      </linearGradient>
    </defs>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Building Legacies, <span>Engineering Trust</span></h1>
        <p className="hero-desc">
          Premium land layout developments and luxury residential constructions. Sri Krishna Real Estate & Constructions delivers structural excellence, transparent registry mappings, and pixel-precise architectural quality.
        </p>
        <div className="hero-stats">
          
          <div className="stat-item">
            <div className="stat-icon-wrapper">
              <LegacyIcon />
            </div>
            <div className="stat-text-wrapper">
              <span className="stat-val">15+ Years</span>
              <span className="stat-lbl">Industry Legacy</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon-wrapper">
              <GreenIcon />
            </div>
            <div className="stat-text-wrapper">
              <span className="stat-val">Smart & Green</span>
              <span className="stat-lbl">Energy Homes</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon-wrapper">
              <RegistryIcon />
            </div>
            <div className="stat-text-wrapper">
              <span className="stat-val">100% Clear</span>
              <span className="stat-lbl">Legal Registry Titles</span>
            </div>
          </div>

        </div>
      </div>
      <div className="hero-image-container">
        <div className="hero-image-wrapper">
          <img src={`${import.meta.env.BASE_URL}sk_villa.jpg`} alt="Sri Krishna Modern Villa Project" className="hero-img" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
