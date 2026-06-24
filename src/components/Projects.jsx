import React, { useState } from 'react';

// Icons
const CompassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
);

const PLOTS = [
  { id: 1, number: "P-01", area: 1200, status: "available", orientation: "East-Facing", rate: 2500 },
  { id: 2, number: "P-02", area: 1200, status: "available", orientation: "East-Facing", rate: 2500 },
  { id: 3, number: "P-03", area: 1500, status: "sold", orientation: "North-Facing", rate: 2700 },
  { id: 4, number: "P-04", area: 1500, status: "available", orientation: "North-Facing", rate: 2700 },
  { id: 5, number: "P-05", area: 2400, status: "available", orientation: "West-Facing", rate: 2900 },
  { id: 6, number: "P-06", area: 2400, status: "sold", orientation: "West-Facing", rate: 2900 },
  { id: 7, number: "P-07", area: 1200, status: "available", orientation: "East-Facing", rate: 2500 },
  { id: 8, number: "P-08", area: 1200, status: "sold", orientation: "East-Facing", rate: 2500 },
  { id: 9, number: "P-09", area: 1500, status: "available", orientation: "South-Facing", rate: 2400 },
  { id: 10, number: "P-10", area: 1500, status: "available", orientation: "South-Facing", rate: 2400 },
  { id: 11, number: "P-11", area: 1800, status: "available", orientation: "North-Facing", rate: 2700 },
  { id: 12, number: "P-12", area: 1800, status: "sold", orientation: "North-Facing", rate: 2700 },
  { id: 13, number: "P-13", area: 1200, status: "available", orientation: "East-Facing", rate: 2500 },
  { id: 14, number: "P-14", area: 1200, status: "available", orientation: "East-Facing", rate: 2500 },
  { id: 15, number: "P-15", area: 1500, status: "sold", orientation: "West-Facing", rate: 2600 },
  { id: 16, number: "P-16", area: 1500, status: "available", orientation: "West-Facing", rate: 2600 },
  { id: 17, number: "P-17", area: 2400, status: "available", orientation: "North-Facing", rate: 3000 },
  { id: 18, number: "P-18", area: 2400, status: "sold", orientation: "North-Facing", rate: 3000 },
  { id: 19, number: "P-19", area: 1200, status: "available", orientation: "East-Facing", rate: 2500 },
  { id: 20, number: "P-20", area: 1200, status: "sold", orientation: "East-Facing", rate: 2500 },
  { id: 21, number: "P-21", area: 1500, status: "available", orientation: "South-Facing", rate: 2400 },
  { id: 22, number: "P-22", area: 1500, status: "available", orientation: "South-Facing", rate: 2400 },
  { id: 23, number: "P-23", area: 1800, status: "available", orientation: "North-Facing", rate: 2700 },
  { id: 24, number: "P-24", area: 1800, status: "sold", orientation: "North-Facing", rate: 2700 }
];

function Projects({ handleSelectPlotInquiry }) {
  const [filter, setFilter] = useState('all');
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
          <h3 className="panel-title">
            <CompassIcon /> Sri Krishna Enclave (Kurnool): KUDA & AP-RERA Approved Layout
          </h3>
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
                <span>KUDA APPROVED LAYOUT • LP NO: 42/2025/KUDA</span>
                <span>AP-RERA REGISTRATION ID: AP18020054321</span>
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
                      <span>Approval Status:</span>
                      <span style={{ color: 'var(--accent-green)' }}>KUDA Approved</span>
                    </div>
                    <div className="detail-row">
                      <span>RERA Registry:</span>
                      <span style={{ color: 'var(--accent-green)' }}>AP-RERA Registered</span>
                    </div>
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
    </div>
  );
}

export default Projects;
