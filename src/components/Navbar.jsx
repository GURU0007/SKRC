import React from 'react';

function Navbar({ activeTab, setActiveTab, user, onLogout, onChangePassword }) {
  return (
    <header className="app-header-nav">
      {/* Banner */}
      {activeTab !== 'login' && (
        <div className="brand-banner">
          <h1 className="banner-title">
            Sri Krishna <span className="banner-subtitle">Real Estate & Constructions</span>
          </h1>
          <div className="banner-tagline">From Land to Landmark</div>
          <div className="banner-phone">Cell: +91 8985961113</div>

          {/* Bottom Auth Section (Right above Navbar) */}
          <div className="banner-auth-header">
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ color: 'var(--accent-gold)', fontWeight: '600', fontSize: '0.85rem' }}>
                  👤 {user.email}
                </span>
                <button 
                  onClick={onLogout} 
                  className="filter-btn" 
                  style={{ borderColor: 'var(--accent-gold)', color: 'var(--accent-gold)', cursor: 'pointer' }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setActiveTab('login')} 
                className="gold-button" 
                style={{ cursor: 'pointer' }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="nav-links">
        <button 
          className={`nav-tab-btn ${activeTab === 'home' ? 'active' : ''}`} 
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'marketplace' ? 'active' : ''}`} 
          onClick={() => setActiveTab('marketplace')}
        >
          Marketplace
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'projects' ? 'active' : ''}`} 
          onClick={() => setActiveTab('projects')}
        >
          Plots Layout
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'contact' ? 'active' : ''}`} 
          onClick={() => setActiveTab('contact')}
        >
          Contact Us
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'estimator' ? 'active' : ''}`} 
          onClick={() => setActiveTab('estimator')}
        >
          Cost Estimator
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
