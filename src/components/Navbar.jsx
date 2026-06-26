import React from 'react';


const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#home-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="home-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#f5e6c8" />
      </linearGradient>
    </defs>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const MarketplaceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#market-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="market-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00b4db" />
        <stop offset="100%" stopColor="#0083b0" />
      </linearGradient>
    </defs>
    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/>
    <path d="m3 9 9-7 9 7"/>
    <path d="M9 22V12h6v10"/>
  </svg>
);

const PlotsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#plots-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="plots-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#11998e" />
        <stop offset="100%" stopColor="#38ef7d" />
      </linearGradient>
    </defs>
    <rect width="18" height="18" x="3" y="3" rx="2"/>
    <path d="M9 3v18"/><path d="M15 3v18"/><path d="M3 9h18"/><path d="M3 15h18"/>
  </svg>
);

const ContactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#contact-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="contact-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff416c" />
        <stop offset="100%" stopColor="#ff4b2b" />
      </linearGradient>
    </defs>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const EstimatorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#estimator-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="estimator-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e55d87" />
        <stop offset="100%" stopColor="#5fc3e4" />
      </linearGradient>
    </defs>
    <rect width="16" height="20" x="4" y="2" rx="2"/>
    <line x1="12" x2="12" y1="18" y2="18"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="8" x2="16" y1="10" y2="10"/><line x1="8" x2="16" y1="14" y2="14"/>
  </svg>
);

const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#profile-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="profile-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8a2387" />
        <stop offset="50%" stopColor="#e94057" />
        <stop offset="100%" stopColor="#f27121" />
      </linearGradient>
    </defs>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

function Navbar({ activeTab, setActiveTab, user, onLogout, onChangePassword, isProfileDrawerOpen, onProfileClick }) {
  return (
    <header className="app-header-nav" style={{ position: 'relative', width: '100%' }}>

      {/* Banner */}
      {activeTab !== 'login' && (
        <div className="brand-banner">
          <h1 className="banner-title">
            Sri Krishna <span className="banner-subtitle">Real Estate & Constructions</span>
          </h1>
          <div className="banner-tagline">From Land to Landmark</div>
          <div className="banner-phone">Cell: +91 8985961113</div>

          {/* Bottom Auth Section (Right above Navbar - Visible ONLY on Desktop via CSS) */}
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
          <HomeIcon />
          <span>Home</span>
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'marketplace' ? 'active' : ''}`} 
          onClick={() => setActiveTab('marketplace')}
        >
          <MarketplaceIcon />
          <span>Marketplace</span>
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'projects' ? 'active' : ''}`} 
          onClick={() => setActiveTab('projects')}
        >
          <PlotsIcon />
          <span>Plots Layout</span>
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'contact' ? 'active' : ''}`} 
          onClick={() => setActiveTab('contact')}
        >
          <ContactIcon />
          <span>Contact Us</span>
        </button>
        
        {/* Desktop-Only Tab: Cost Estimator */}
        <button 
          className={`nav-tab-btn estimator-tab ${activeTab === 'estimator' ? 'active' : ''}`} 
          onClick={() => setActiveTab('estimator')}
        >
          <EstimatorIcon />
          <span>Cost Estimator</span>
        </button>

        {/* Mobile-Only Tab: Profile Drawer Trigger */}
        <button 
          className={`nav-tab-btn profile-tab ${isProfileDrawerOpen || activeTab === 'login' ? 'active' : ''}`} 
          onClick={onProfileClick}
        >
          <ProfileIcon />
          <span>Profile</span>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
