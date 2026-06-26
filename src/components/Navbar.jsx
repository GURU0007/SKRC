import React from 'react';

const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);

function Navbar({ activeTab, setActiveTab, user, onLogout, onChangePassword }) {
  const handleBackNavigation = () => {
    if (activeTab === 'home') {
      window.history.back();
    } else {
      setActiveTab('home');
    }
  };

  return (
    <header className="app-header-nav" style={{ position: 'relative', width: '100%' }}>
      {/* Back Navigation Arrow */}
      <button 
        onClick={handleBackNavigation}
        className="nav-back-arrow-btn"
        aria-label="Go Back"
      >
        <BackArrowIcon />
      </button>

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
