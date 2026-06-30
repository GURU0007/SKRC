import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { supabase } from './supabaseClient';

// Import local components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Estimator from './components/Estimator';
import Marketplace from './components/Marketplace';
import Contact from './components/Contact';
import Login from './components/Login';
import SmartHomes from './components/SmartHomes';
import LayoutsInfo from './components/LayoutsInfo';

// Icons used for home dashboard preview panels
const CompassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
);

const CalculatorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="16"></line><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="22"></line><line x1="16" y1="10" x2="8" y2="10"></line></svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

function App() {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const tabParam = url.searchParams.get('tab');
      if (tabParam) return tabParam;
      return localStorage.getItem('sri_krishna_active_tab') || 'home';
    }
    return 'home';
  });
  const [prefilledPlot, setPrefilledPlot] = useState('');
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      // Initialize synchronously from global persistent localStorage key
      const stored = localStorage.getItem('sri-krishna-real-estate-auth');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.user) return parsed.user;
        } catch (e) {}
      }
    }
    return null;
  });
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const toastTimeoutRef = useRef(null);
  const sessionInitialized = useRef(false);

  const showToast = (message) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage('');
      toastTimeoutRef.current = null;
    }, 2500);
  };

  // Sync activeTab changes to URL search parameters & browser history stack
  useEffect(() => {
    const url = new URL(window.location.href);
    const currentTab = url.searchParams.get('tab') || 'home';
    if (currentTab !== activeTab) {
      if (activeTab === 'home') {
        url.searchParams.delete('tab');
        // Replaced instead of pushed to keep history flat on home page (lets user swipe back to exit app)
        window.history.replaceState({ tab: 'home' }, '', url.pathname + url.search);
      } else {
        url.searchParams.set('tab', activeTab);
        const historyState = window.history.state;
        if (historyState && historyState.tab !== 'home') {
          // If we are already navigating subtabs, replace state to prevent pop history from accumulating
          window.history.replaceState({ tab: activeTab }, '', url.pathname + url.search);
        } else {
          // First transition from home to subtab, push state
          window.history.pushState({ tab: activeTab }, '', url.pathname + url.search);
        }
      }
    }
    localStorage.setItem('sri_krishna_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    // Setup history Popstate routing
    const url = new URL(window.location.href);
    const initialTab = url.searchParams.get('tab') || activeTab;
    window.history.replaceState({ tab: initialTab }, '', url.pathname + url.search);

    const handlePopState = (event) => {
      const tab = (event.state && event.state.tab) || 'home';
      setActiveTab(tab);
    };

    window.addEventListener('popstate', handlePopState);

    const handleAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const isCallback = code || window.location.hash.includes('access_token');
      
      if (code) {
        // Prevent duplicate authentication exchanges on back/forward browser navigation
        const processedCodes = JSON.parse(sessionStorage.getItem('sri_krishna_processed_codes') || '[]');
        if (!processedCodes.includes(code)) {
          try {
            const { data, error } = await supabase.auth.exchangeCodeForSession(code);
             if (!error && data?.session) {
              setUser(data.session.user);
              showToast('You have been logged in successfully.');
            }
            processedCodes.push(code);
            sessionStorage.setItem('sri_krishna_processed_codes', JSON.stringify(processedCodes));
          } catch (err) {
            console.error("Error exchanging code for session:", err);
          }
        }
      }

      if (isCallback) {
        showToast('You have been logged in successfully.');
        // Since the user returned via an auth link/OAuth redirect, land them directly in the marketplace
        localStorage.setItem('sri_krishna_marketplace_sub_tab', 'browse');
        localStorage.setItem('sri_krishna_marketplace_my_listings', 'false');
        localStorage.setItem('sri_krishna_marketplace_pending_only', 'false');
        
        // Replace the OAuth callback history entry with clean Home state first,
        // then sync triggers marketplace to be pushed onto history. (Swiping back goes to Home)
        const params = new URLSearchParams(window.location.search);
        params.delete('code');
        params.delete('access_token');
        const newSearch = params.toString();
        const newUrl = window.location.origin + window.location.pathname + (newSearch ? '?' + newSearch : '');
        window.history.replaceState({ tab: 'home' }, document.title, newUrl);

        setActiveTab('marketplace');
      }
    };

    handleAuthCallback();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      sessionInitialized.current = true;
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      
      if (event === 'SIGNED_IN') {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const isCallback = code || window.location.hash.includes('access_token');
        
        if (!sessionInitialized.current) {
          sessionInitialized.current = true;
          if (isCallback) {
            showToast('You have been logged in successfully.');
          }
        } else {
          showToast('You have been logged in successfully.');
        }
      } else if (event === 'SIGNED_OUT') {
        sessionInitialized.current = true;
      }

      if (event === 'PASSWORD_RECOVERY') {
        setRecoveryMode(true);
        setActiveTab('login');
      }
    });

    return () => {
      window.removeEventListener('popstate', handlePopState);
      subscription.unsubscribe();
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn("Supabase signOut error:", err);
    }
    // Delete global persistent token key
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('sri-krishna-real-estate-auth');
    }
    setUser(null);
    showToast('You have been logged out successfully.');
  };

  // Redirect to marketplace automatically once user logs in from the login tab
  useEffect(() => {
    if (user && activeTab === 'login' && !recoveryMode) {
      // Do not redirect to marketplace if user has not completed profile setup (no phone number)
      if (!user.user_metadata?.phone) {
        return;
      }
      
      localStorage.setItem('sri_krishna_marketplace_sub_tab', 'browse');
      localStorage.setItem('sri_krishna_marketplace_my_listings', 'false');
      localStorage.setItem('sri_krishna_marketplace_pending_only', 'false');
      
      // Replace the login history entry with clean Home state first,
      // so swiping back from marketplace will go to Home instead of back to login tab
      const url = new URL(window.location.href);
      url.searchParams.delete('tab');
      window.history.replaceState({ tab: 'home' }, '', url.pathname + url.search);

      setActiveTab('marketplace');
    }
  }, [user, activeTab, recoveryMode]);


  // Handle routing plot selection inquiry directly to the contact tab
  const handleSelectPlotInquiry = (plotNumber) => {
    setPrefilledPlot(plotNumber);
    setActiveTab('contact');
  };

  return (
    <div className="app-container">
      {/* Brand Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user}
        onLogout={handleLogout}
        onChangePassword={() => {
          setRecoveryMode(true);
          setActiveTab('login');
        }}
        isProfileDrawerOpen={isProfileDrawerOpen}
        onProfileClick={() => setIsProfileDrawerOpen(true)}
      />

      {/* Corporate Hero Banner */}
      {activeTab === 'home' && <Hero />}

      {/* Main Panel View Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {activeTab === 'home' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            
            {/* Property Marketplace Preview */}
            <div className="panel">
              <div className="panel-header">
                <h3 className="panel-title"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> Property Marketplace</h3>
              </div>
              <div className="panel-content">
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '15px' }}>
                  Browse premium local listings or list your own plots, villas, apartments, and commercial spaces. Connect directly with owners via WhatsApp.
                </p>
                <button className="gold-button" style={{ width: '100%' }} onClick={() => setActiveTab('marketplace')}>
                  Explore Marketplace
                </button>
              </div>
            </div>

            {/* Interactive Plots Overview Preview */}
            <div className="panel">
              <div className="panel-header">
                <h3 className="panel-title"><CompassIcon /> Plots Layout & Blueprint</h3>
              </div>
              <div className="panel-content">
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '15px' }}>
                  Explore our active layout plan in Kurnool. View available plots on our interactive blueprint grid to check sizing, orientation, and booking quotes.
                </p>
                <button className="gold-button" style={{ width: '100%' }} onClick={() => setActiveTab('projects')}>
                  View Interactive Layout
                </button>
              </div>
            </div>

            {/* Cost Estimator Preview */}
            <div className="panel">
              <div className="panel-header">
                <h3 className="panel-title"><CalculatorIcon /> Construction Cost Estimator</h3>
              </div>
              <div className="panel-content">
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '15px' }}>
                  Estimate material costs for your build — cement, TMT steel, bricks, sand, and labor — calculated dynamically based on your plot area.
                </p>
                <button className="gold-button" style={{ width: '100%' }} onClick={() => setActiveTab('estimator')}>
                  Calculate Construction Budget
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Projects Showcase and Layout Grid */}
        {activeTab === 'projects' && (
          <Projects handleSelectPlotInquiry={handleSelectPlotInquiry} />
        )}

        {/* Tab 3: Construction Estimator */}
        {activeTab === 'estimator' && (
          <Estimator />
        )}

        {/* Tab 4: Property Marketplace */}
        {activeTab === 'marketplace' && (
          <Marketplace user={user} setUser={setUser} setActiveTab={setActiveTab} />
        )}

        {/* Dedicated Login Tab */}
        {activeTab === 'login' && (!user || !user.user_metadata?.phone || recoveryMode) && (
          <Login 
            user={user} 
            setUser={setUser} 
            recoveryMode={recoveryMode} 
            setRecoveryMode={setRecoveryMode} 
            onLoginSuccess={(msg) => {
              showToast(msg);
            }}
          />
        )}

        {/* Tab 5: Contact Booking Request */}
        {activeTab === 'contact' && (
          <Contact prefilledPlot={prefilledPlot} setPrefilledPlot={setPrefilledPlot} />
        )}

        {/* Tab 6: Smart Homes & Solar */}
        {activeTab === 'smarthomes' && (
          <SmartHomes />
        )}

        {/* Tab 7: Layouts Info */}
        {activeTab === 'layoutsinfo' && (
          <LayoutsInfo />
        )}

      </div>

      {/* Footer */}
      <footer style={{ marginTop: 'auto', paddingTop: '30px', paddingBottom: '10px', borderTop: '1px solid var(--border-color)', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
        Sri Krishna Real Estate & Constructions © 2026. All rights reserved. Kurnool, Andhra Pradesh.
      </footer>

      {/* Profile Side Drawer Dialogue Box */}
      <div 
        className={`profile-drawer-overlay ${isProfileDrawerOpen ? 'open' : ''}`}
        onClick={() => setIsProfileDrawerOpen(false)}
      >
        <div 
          className="profile-drawer"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="profile-drawer-header">
            <h3 className="profile-drawer-title">Profile Details</h3>
            <button 
              className="profile-drawer-close-btn"
              onClick={() => setIsProfileDrawerOpen(false)}
              aria-label="Close Profile Drawer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          
          <div className="profile-drawer-content">
            <div className="profile-avatar-large">
              👤
            </div>
            
            {user ? (
              <>
                <h4 className="profile-email">{user.email}</h4>
                <p className="profile-status">Signed In Session</p>
                
                <div className="profile-actions">
                  <button 
                    onClick={() => {
                      setRecoveryMode(true);
                      setActiveTab('login');
                      setIsProfileDrawerOpen(false);
                    }} 
                    className="profile-action-button secondary"
                  >
                    Change Password
                  </button>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsProfileDrawerOpen(false);
                    }} 
                    className="profile-action-button primary"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <h4 className="profile-email">Guest User</h4>
                <p className="profile-status" style={{ color: 'var(--text-secondary)' }}>You are not logged in.</p>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: '0 0 24px' }}>
                  Sign in with your Google or email account to post property listings, view your saved listings, or update your password.
                </p>
                
                <div className="profile-actions">
                  <button 
                    onClick={() => {
                      setRecoveryMode(false);
                      setActiveTab('login');
                      setIsProfileDrawerOpen(false);
                    }} 
                    className="profile-action-button primary"
                  >
                    Sign In / Register
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Floating Logout Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '90px',
          right: '30px',
          background: 'var(--bg-card)',
          border: '1px solid var(--accent-gold)',
          borderRadius: '8px',
          padding: '12px 20px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          color: '#fff',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'fadeIn 0.3s ease'
        }}>
          <span style={{ color: 'var(--accent-gold)', fontSize: '1.2rem', fontWeight: 'bold' }}>✓</span>
          <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;
