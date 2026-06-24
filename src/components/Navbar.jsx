import React from 'react';

function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="app-header-nav">
      {/* Banner */}
      <div className="brand-banner">
        <h1 className="banner-title">
          Sri Krishna <span className="banner-subtitle">Real Estate & Constructions</span>
        </h1>
        <div className="banner-tagline">From Land to Landmark</div>
      </div>

      {/* Navigation */}
      <nav className="nav-links">
        <button 
          className={`nav-tab-btn ${activeTab === 'home' ? 'active' : ''}`} 
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'projects' ? 'active' : ''}`} 
          onClick={() => setActiveTab('projects')}
        >
          Developments & Plots
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'estimator' ? 'active' : ''}`} 
          onClick={() => setActiveTab('estimator')}
        >
          Cost Estimator
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'contact' ? 'active' : ''}`} 
          onClick={() => setActiveTab('contact')}
        >
          Request Quote
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
