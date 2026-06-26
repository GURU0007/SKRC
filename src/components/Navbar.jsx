import React from 'react';

function Navbar({ activeTab, setActiveTab, user, onLogout, onChangePassword }) {
  return (
    <header className="app-header-nav">
      {/* Banner */}
      {activeTab === 'home' && (
        <div className="brand-banner">
          <h1 className="banner-title">
            Sri Krishna <span className="banner-subtitle">Real Estate & Constructions</span>
          </h1>
          <div className="banner-tagline">From Land to Landmark</div>
          <div className="banner-phone">Cell: +91 8985961113</div>

          {/* Bottom Auth Section (Right above Navbar) */}
          <div className="banner-auth-header">
            {user ? (
              <div className="auth-user-section">
                <span className="auth-user-email">👤 {user.email}</span>
                <div className="auth-user-actions">
                  <button 
                    onClick={onChangePassword} 
                    className="filter-btn auth-action-btn"
                  >
                    Set Password
                  </button>
                  <button 
                    onClick={onLogout} 
                    className="filter-btn auth-action-btn"
                  >
                    Sign Out
                  </button>
                </div>
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
      <nav className="nav-links" style={{ position: 'relative' }}>
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

        {/* Compact Auth Section for other tabs */}
        {activeTab !== 'home' && activeTab !== 'login' && (
          <div className="nav-compact-auth">
            {user ? (
              <div className="auth-user-section">
                <span className="auth-user-email" style={{ fontSize: '0.8rem' }}>👤 {user.email}</span>
                <div className="auth-user-actions">
                  <button 
                    onClick={onChangePassword} 
                    className="filter-btn auth-action-btn"
                    style={{ padding: '4px 10px', fontSize: '0.72rem' }}
                  >
                    Set Password
                  </button>
                  <button 
                    onClick={onLogout} 
                    className="filter-btn auth-action-btn"
                    style={{ padding: '4px 10px', fontSize: '0.72rem' }}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setActiveTab('login')} 
                className="gold-button" 
                style={{ padding: '6px 12px', fontSize: '0.75rem', cursor: 'pointer' }}
              >
                Login
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
