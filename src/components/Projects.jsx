import React, { useState } from 'react';

// Icons
const HouseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);

const CompassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
);

const PLOTS = [
  { id: 1, number: "P-01", area: 1200, status: "available", orientation: "East-Facing", rate: 3500 },
  { id: 2, number: "P-02", area: 1200, status: "available", orientation: "East-Facing", rate: 3500 },
  { id: 3, number: "P-03", area: 1500, status: "sold", orientation: "North-Facing", rate: 3700 },
  { id: 4, number: "P-04", area: 1500, status: "available", orientation: "North-Facing", rate: 3700 },
  { id: 5, number: "P-05", area: 2400, status: "available", orientation: "West-Facing", rate: 3900 },
  { id: 6, number: "P-06", area: 2400, status: "sold", orientation: "West-Facing", rate: 3900 },
  { id: 7, number: "P-07", area: 1200, status: "available", orientation: "East-Facing", rate: 3500 },
  { id: 8, number: "P-08", area: 1200, status: "sold", orientation: "East-Facing", rate: 3500 },
  { id: 9, number: "P-09", area: 1500, status: "available", orientation: "South-Facing", rate: 3400 },
  { id: 10, number: "P-10", area: 1500, status: "available", orientation: "South-Facing", rate: 3400 },
  { id: 11, number: "P-11", area: 1800, status: "available", orientation: "North-Facing", rate: 3700 },
  { id: 12, number: "P-12", area: 1800, status: "sold", orientation: "North-Facing", rate: 3700 },
  { id: 13, number: "P-13", area: 1200, status: "available", orientation: "East-Facing", rate: 3500 },
  { id: 14, number: "P-14", area: 1200, status: "available", orientation: "East-Facing", rate: 3500 },
  { id: 15, number: "P-15", area: 1500, status: "sold", orientation: "West-Facing", rate: 3600 },
  { id: 16, number: "P-16", area: 1500, status: "available", orientation: "West-Facing", rate: 3600 },
  { id: 17, number: "P-17", area: 2400, status: "available", orientation: "North-Facing", rate: 4000 },
  { id: 18, number: "P-18", area: 2400, status: "sold", orientation: "North-Facing", rate: 4000 },
  { id: 19, number: "P-19", area: 1200, status: "available", orientation: "East-Facing", rate: 3500 },
  { id: 20, number: "P-20", area: 1200, status: "sold", orientation: "East-Facing", rate: 3500 },
  { id: 21, number: "P-21", area: 1500, status: "available", orientation: "South-Facing", rate: 3400 },
  { id: 22, number: "P-22", area: 1500, status: "available", orientation: "South-Facing", rate: 3400 },
  { id: 23, number: "P-23", area: 1800, status: "available", orientation: "North-Facing", rate: 3700 },
  { id: 24, number: "P-24", area: 1800, status: "sold", orientation: "North-Facing", rate: 3700 }
];

function Projects({ handleSelectPlotInquiry }) {
  const [filter, setFilter] = useState('all'); // all, available, residential, commercial
  const [selectedPlot, setSelectedPlot] = useState(PLOTS[0]);

  const filteredPlots = PLOTS.filter(p => {
    if (filter === 'available') return p.status === 'available';
    return true;
  });

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="projects-layout-container">
      {/* Land Layout Blueprint Showcase */}
      <div className="panel full-width-card">
        <div className="panel-header">
          <h3 className="panel-title"><CompassIcon /> Sri Krishna Enclave: Interactive Land Layout</h3>
          <div className="filter-bar">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Show All Plots</button>
            <button className={`filter-btn ${filter === 'available' ? 'active' : ''}`} onClick={() => setFilter('available')}>Show Available Only</button>
          </div>
        </div>
        
        <div className="panel-content">
          <div className="plot-layout-grid-container">
            
            {/* Interactive Grid representing Land Plots */}
            <div className="plot-blueprint">
              <div className="blueprint-header">
                <span>PROJECT LAYOUT PLAN • PHASE 1</span>
                <span>TOTAL PLOTS: 24</span>
              </div>
              <div className="plots-grid">
                {filteredPlots.map((plot) => {
                  const isSelected = selectedPlot && selectedPlot.id === plot.id;
                  const isAvailable = plot.status === 'available';
                  return (
                    <div 
                      key={plot.id}
                      className={`plot-cell ${isAvailable ? 'available' : 'sold'} ${isSelected ? 'selected' : ''}`}
                      onClick={() => isAvailable && setSelectedPlot(plot)}
                    >
                      <span className="plot-num">{plot.number}</span>
                      <span className="plot-status-text" style={{ color: isAvailable ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                        {isAvailable ? 'AV' : 'SOLD'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Plot Details sidebar */}
            <div className="plot-details-panel">
              <div>
                <h4 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '15px' }}>
                  Plot Reference: {selectedPlot ? selectedPlot.number : 'Select Plot'}
                </h4>
                {selectedPlot ? (
                  <>
                    <div className="detail-row">
                      <span>Land Area:</span>
                      <span>{selectedPlot.area} Sq. Ft.</span>
                    </div>
                    <div className="detail-row">
                      <span>Dimensions:</span>
                      <span>
                        {selectedPlot.area === 1200 ? '30 x 40 ft' : selectedPlot.area === 1500 ? '30 x 50 ft' : selectedPlot.area === 1800 ? '36 x 50 ft' : '40 x 60 ft'}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span>Orientation:</span>
                      <span>{selectedPlot.orientation}</span>
                    </div>
                    <div className="detail-row">
                      <span>Base Rate:</span>
                      <span>{formatCurrency(selectedPlot.rate)} / Sq. Ft.</span>
                    </div>
                    <div className="detail-row" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', marginTop: '15px' }}>
                      <span style={{ fontWeight: '700', color: 'var(--accent-gold)' }}>Total Plot Value:</span>
                      <span style={{ fontWeight: '700', color: 'var(--accent-gold)' }}>
                        {formatCurrency(selectedPlot.area * selectedPlot.rate)}
                      </span>
                    </div>
                  </>
                ) : (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Click on any available plot on the blueprint grid map to see pricing and specifications.</p>
                )}
              </div>
              
              {selectedPlot && (
                <button 
                  className="gold-button"
                  style={{ width: '100%', marginTop: '20px' }}
                  onClick={() => handleSelectPlotInquiry(selectedPlot.number)}
                >
                  Request Booking Quote
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Buildings & Completed developments grid */}
      <div className="panel full-width-card">
        <div className="panel-header">
          <h3 className="panel-title"><HouseIcon /> Architectural Projects & Construction Highlights</h3>
        </div>
        <div className="panel-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            
            {/* Card 1 */}
            <div className="panel" style={{ overflow: 'hidden' }}>
              <div style={{ height: '160px', background: '#1c2436', overflow: 'hidden' }}>
                <img src={process.env.PUBLIC_URL + '/sk_villa.jpg'} alt="Premium Luxury Villas" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '16px' }}>
                <h4 style={{ color: 'var(--accent-gold)' }}>Sri Krishna Arcade</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Miyapur, Hyderabad</p>
                <p style={{ fontSize: '0.8rem', marginTop: '10px', lineHeight: '1.4' }}>
                  A premium residential luxury apartment complex featuring RCC framed structural builds and clear GHMC occupancy certificates.
                </p>
                <span className="badge-green" style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '600', marginTop: '12px' }}>
                  COMPLETED & HANDED OVER
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="panel" style={{ overflow: 'hidden' }}>
              <div style={{ height: '160px', background: '#1c2436', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2.5rem', color: 'var(--accent-gold)' }}>🏢</span>
              </div>
              <div style={{ padding: '16px' }}>
                <h4 style={{ color: 'var(--accent-gold)' }}>Sri Krishna Heights</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Kondapur, Hyderabad</p>
                <p style={{ fontSize: '0.8rem', marginTop: '10px', lineHeight: '1.4' }}>
                  Modern high-rise commercial structures constructed with standard premium Grade-500 steel reinforcement and customized partitions.
                </p>
                <span className="badge-orange" style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '600', marginTop: '12px' }}>
                  UNDER CONSTRUCTION (70%)
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
