import React, { useState } from 'react';
import './App.css';

// Import local components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Estimator from './components/Estimator';
import Contact from './components/Contact';

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
  const [activeTab, setActiveTab] = useState('home');
  const [prefilledPlot, setPrefilledPlot] = useState('');

  // Handle routing plot selection inquiry directly to the contact tab
  const handleSelectPlotInquiry = (plotNumber) => {
    setPrefilledPlot(plotNumber);
    setActiveTab('contact');
  };

  return (
    <div className="app-container">
      {/* Brand Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Corporate Hero Banner */}
      <Hero />

      {/* Main Panel View Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {activeTab === 'home' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            
            {/* Interactive Plots Overview Preview */}
            <div className="panel">
              <div className="panel-header">
                <h3 className="panel-title"><CompassIcon /> Developments & Plot Layouts</h3>
              </div>
              <div className="panel-content">
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '15px' }}>
                  Explore active HMDA/GHMC layout plans. View available plots on our blueprint grid, click to see sizing specifications, orientations, and request booking quotes.
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

            {/* Request Quote Preview */}
            <div className="panel">
              <div className="panel-header">
                <h3 className="panel-title"><PhoneIcon /> Consultation & Direct Contact</h3>
              </div>
              <div className="panel-content">
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '15px' }}>
                  Need a custom residential build quote or plot booking consultation? Reach out to Sri Krishna Constructions corporate helpline or submit a consultation request.
                </p>
                <button className="gold-button" style={{ width: '100%' }} onClick={() => setActiveTab('contact')}>
                  Inquire Now
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

        {/* Tab 4: Contact Booking Request */}
        {activeTab === 'contact' && (
          <Contact prefilledPlot={prefilledPlot} setPrefilledPlot={setPrefilledPlot} />
        )}

      </div>

      {/* Footer */}
      <footer style={{ marginTop: 'auto', paddingTop: '30px', paddingBottom: '10px', borderTop: '1px solid var(--border-color)', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
        Sri Krishna Real Estate & Constructions © 2026. All rights reserved. Madhapur, Hyderabad, TS.
      </footer>
    </div>
  );
}

export default App;
