import React, { useState } from 'react';

// Icons
const CompassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
);

const PLOTS = [
  // 1: 30*46 (1)
  { id: 1, number: "P-01", width: 30, length: 46, status: "available", orientation: "East-Facing", ratePerCent: 180000 },
  // 2: 36*56 (2)
  { id: 2, number: "P-02", width: 36, length: 56, status: "available", orientation: "East-Facing", ratePerCent: 180000 },
  // 3-19: 36*52 (3-19)
  { id: 3, number: "P-03", width: 36, length: 52, status: "sold", orientation: "East-Facing", ratePerCent: 180000 },
  { id: 4, number: "P-04", width: 36, length: 52, status: "available", orientation: "East-Facing", ratePerCent: 180000 },
  { id: 5, number: "P-05", width: 36, length: 52, status: "available", orientation: "East-Facing", ratePerCent: 180000 },
  { id: 6, number: "P-06", width: 36, length: 52, status: "sold", orientation: "East-Facing", ratePerCent: 180000 },
  { id: 7, number: "P-07", width: 36, length: 52, status: "available", orientation: "East-Facing", ratePerCent: 180000 },
  { id: 8, number: "P-08", width: 36, length: 52, status: "sold", orientation: "East-Facing", ratePerCent: 180000 },
  { id: 9, number: "P-09", width: 36, length: 52, status: "available", orientation: "East-Facing", ratePerCent: 180000 },
  { id: 10, number: "P-10", width: 36, length: 52, status: "available", orientation: "East-Facing", ratePerCent: 180000 },
  { id: 11, number: "P-11", width: 36, length: 52, status: "available", orientation: "East-Facing", ratePerCent: 180000 },
  { id: 12, number: "P-12", width: 36, length: 52, status: "sold", orientation: "East-Facing", ratePerCent: 180000 },
  { id: 13, number: "P-13", width: 36, length: 52, status: "available", orientation: "East-Facing", ratePerCent: 180000 },
  { id: 14, number: "P-14", width: 36, length: 52, status: "available", orientation: "East-Facing", ratePerCent: 180000 },
  { id: 15, number: "P-15", width: 36, length: 52, status: "sold", orientation: "East-Facing", ratePerCent: 180000 },
  { id: 16, number: "P-16", width: 36, length: 52, status: "available", orientation: "East-Facing", ratePerCent: 180000 },
  { id: 17, number: "P-17", width: 36, length: 52, status: "available", orientation: "East-Facing", ratePerCent: 180000 },
  { id: 18, number: "P-18", width: 36, length: 52, status: "sold", orientation: "East-Facing", ratePerCent: 180000 },
  { id: 19, number: "P-19", width: 36, length: 52, status: "available", orientation: "East-Facing", ratePerCent: 180000 },
  // 20: 49*50 (20)
  { id: 20, number: "P-20", width: 49, length: 50, status: "sold", orientation: "East-Facing", ratePerCent: 180000 },
  // 21: 17.5*49 (21)
  { id: 21, number: "P-21", width: 17.5, length: 49, status: "available", orientation: "East-Facing", ratePerCent: 180000 }
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

  // Helper calculation details for chosen plot
  const calculateCents = (plot) => {
    return (plot.width * plot.length) / 435.6;
  };

  const getCentsDisplay = (plot) => {
    return calculateCents(plot).toFixed(2);
  };

  return (
    <div className="projects-layout-container">
      {/* Land Layout Blueprint Showcase */}
      <div className="panel full-width-card">
        <div className="panel-header">
          <h3 className="panel-title">
            SriKrishna X1 (Byluppala, Kurnool): Premium Plots Layout
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
                <span>PROJECT LOCATION: BYLUPPALA VILLAGE, KURNOOL DIST.</span>
                <span>TOTAL PLOTS: 21</span>
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
                      <span>Location:</span>
                      <span>Byluppala, Kurnool</span>
                    </div>
                    <div className="detail-row">
                      <span>Dimensions:</span>
                      <span style={{ fontWeight: '600', color: '#fff' }}>
                        {selectedPlot.width} × {selectedPlot.length} Ft
                      </span>
                    </div>
                    <div className="detail-row">
                      <span>Total Area:</span>
                      <span>{selectedPlot.width * selectedPlot.length} Sq. Ft.</span>
                    </div>
                    <div className="detail-row">
                      <span>Land Area (Cents):</span>
                      <span style={{ fontWeight: '600', color: 'var(--accent-gold)' }}>
                        {getCentsDisplay(selectedPlot)} Cents
                      </span>
                    </div>
                    <div className="detail-row">
                      <span>Orientation:</span>
                      <span>{selectedPlot.orientation}</span>
                    </div>
                    <div className="detail-row">
                      <span>Rate per Cent:</span>
                      <span>{formatCurrency(selectedPlot.ratePerCent)} / Cent</span>
                    </div>
                    <div className="detail-row" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', marginTop: '15px' }}>
                      <span style={{ fontWeight: '700', color: 'var(--accent-gold)' }}>Total Plot Value:</span>
                      <span style={{ fontWeight: '700', color: 'var(--accent-gold)' }}>
                        {formatCurrency(calculateCents(selectedPlot) * selectedPlot.ratePerCent)}
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
