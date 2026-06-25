import React from 'react';

function Navbar({ activeTab, setActiveTab, user, onLogout }) {
  return (
    <header className="app-header-nav">
      {/* Banner */}
      <div className="brand-banner">
        {/* Top Right Auth Section */}
        <div className="top-auth-header">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: 'var(--accent-gold)', fontWeight: '600', fontSize: '0.8rem' }}>
                👤 {user.email}
              </span>
              <button 
                onClick={onLogout} 
                className="filter-btn" 
                style={{ fontSize: '0.75rem', padding: '4px 10px', borderColor: 'var(--accent-red)', color: 'var(--accent-red)', cursor: 'pointer' }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setActiveTab('marketplace')} 
              className="gold-button" 
              style={{ padding: '6px 14px', fontSize: '0.75rem', cursor: 'pointer' }}
            >
              Sign In
            </button>
          )}
        </div>

        <h1 className="banner-title">
          Sri Krishna <span className="banner-subtitle">Real Estate & Constructions</span>
        </h1>
        <div className="banner-tagline">From Land to Landmark</div>
        <div className="banner-phone">Cell: +91 8985961113</div>
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
          Plots Layout
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'estimator' ? 'active' : ''}`} 
          onClick={() => setActiveTab('estimator')}
        >
          Cost Estimator
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'marketplace' ? 'active' : ''}`} 
          onClick={() => setActiveTab('marketplace')}
        >
          Marketplace
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'contact' ? 'active' : ''}`} 
          onClick={() => setActiveTab('contact')}
        >
          Contact Us
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
