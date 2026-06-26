import React from 'react';

function Navbar({ activeTab, setActiveTab, user, onLogout, onChangePassword }) {
  return (
    <header className="app-header-nav">
      {/* Banner - Only on Home Page */}
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

      {/* Compact Header - On all other pages except Login */}
      {activeTab !== 'home' && activeTab !== 'login' && (
        <div className="compact-brand-header">
          <div className="compact-title-group" onClick={() => setActiveTab('home')} style={{ cursor: 'pointer' }}>
            <span className="compact-main-title">Sri Krishna</span>
            <span className="compact-subtitle">Real Estate & Constructions</span>
          </div>
          <div className="compact-auth-header">
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
