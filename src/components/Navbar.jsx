import React from 'react';

function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="app-header-nav">
      <div className="brand-container">
        <div className="brand-logo">
          <div className="brand-logo-icon">SK</div>
          Sri Krishna
        </div>
        <span className="brand-tagline">Real Estate & Constructions</span>
      </div>
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
