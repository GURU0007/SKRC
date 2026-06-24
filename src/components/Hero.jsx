import React from 'react';

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
            <span className="stat-val">15+ Years</span>
            <span className="stat-lbl">Industry Legacy</span>
          </div>
          <div className="stat-item">
            <span className="stat-val">250+ Homes</span>
            <span className="stat-lbl">Built & Handed Over</span>
          </div>
          <div className="stat-item">
            <span className="stat-val">100% Clear</span>
            <span className="stat-lbl">Legal Registry Titles</span>
          </div>
        </div>
      </div>
      <div className="hero-image-container">
        <div className="hero-image-wrapper">
          <img src={process.env.PUBLIC_URL + '/sk_villa.jpg'} alt="Sri Krishna Modern Villa Project" className="hero-img" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
