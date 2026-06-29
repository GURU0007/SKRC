import React, { useState, useEffect, useRef } from 'react';
import CustomSelect from './CustomSelect';

// Icons
const CompassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
);

const LAYOUTS = [
  {
    id: 'srikrishna-phase-1',
    name: 'Sri Krishna Phase 1',
    location: 'Byluppala Village, Kurnool',
    area: 'Byluppala',
    distance: 60, // 60 km from Kurnool Center
    ratePerCent: 180000,
    totalPlots: 21,
    description: 'Premium land layout development located in Byluppala Village, Kurnool. Features wide roads, underground drainage, and electricity connections.',
    plots: [
      { id: 1, number: "P-01", width: 30, length: 46, status: "available", orientation: "East-Facing" },
      { id: 2, number: "P-02", width: 36, length: 56, status: "available", orientation: "East-Facing" },
      { id: 3, number: "P-03", width: 36, length: 52, status: "sold", orientation: "East-Facing" },
      { id: 4, number: "P-04", width: 36, length: 52, status: "available", orientation: "East-Facing" },
      { id: 5, number: "P-05", width: 36, length: 52, status: "available", orientation: "East-Facing" },
      { id: 6, number: "P-06", width: 36, length: 52, status: "sold", orientation: "East-Facing" },
      { id: 7, number: "P-07", width: 36, length: 52, status: "available", orientation: "East-Facing" },
      { id: 8, number: "P-08", width: 36, length: 52, status: "sold", orientation: "East-Facing" },
      { id: 9, number: "P-09", width: 36, length: 52, status: "available", orientation: "East-Facing" },
      { id: 10, number: "P-10", width: 36, length: 52, status: "available", orientation: "East-Facing" },
      { id: 11, number: "P-11", width: 36, length: 52, status: "available", orientation: "East-Facing" },
      { id: 12, number: "P-12", width: 36, length: 52, status: "sold", orientation: "East-Facing" },
      { id: 13, number: "P-13", width: 36, length: 52, status: "available", orientation: "East-Facing" },
      { id: 14, number: "P-14", width: 36, length: 52, status: "available", orientation: "East-Facing" },
      { id: 15, number: "P-15", width: 36, length: 52, status: "sold", orientation: "East-Facing" },
      { id: 16, number: "P-16", width: 36, length: 52, status: "available", orientation: "East-Facing" },
      { id: 17, number: "P-17", width: 36, length: 52, status: "available", orientation: "East-Facing" },
      { id: 18, number: "P-18", width: 36, length: 52, status: "sold", orientation: "East-Facing" },
      { id: 19, number: "P-19", width: 36, length: 52, status: "available", orientation: "East-Facing" },
      { id: 20, number: "P-20", width: 49, length: 50, status: "sold", orientation: "East-Facing" },
      { id: 21, number: "P-21", width: 17.5, length: 49, status: "available", orientation: "East-Facing" }
    ]
  }
];

function Projects({ handleSelectPlotInquiry }) {
  const [selectedLayoutId, setSelectedLayoutId] = useState('srikrishna-phase-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPrice, setFilterPrice] = useState('all');
  const [filterRadius, setFilterRadius] = useState('all');
  const [plotFilter, setPlotFilter] = useState('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const filterContainerRef = useRef(null);

  // Price budget utility checks
  const getPlotValue = (plot, ratePerCent) => {
    return ((plot.width * plot.length) / 435.6) * ratePerCent;
  };

  const isPlotInBudget = (plot, ratePerCent, budgetRange) => {
    if (budgetRange === 'all') return true;
    const val = getPlotValue(plot, ratePerCent);
    if (budgetRange === 'under-20') return val < 2000000;
    if (budgetRange === '20-50') return val >= 2000000 && val <= 5000000;
    if (budgetRange === '50-100') return val >= 5000000 && val <= 10000000;
    if (budgetRange === 'over-100') return val > 10000000;
    return true;
  };

  // Filter layouts
  const filteredLayouts = LAYOUTS.filter(layout => {
    if (searchQuery && !layout.name.toLowerCase().includes(searchQuery.toLowerCase()) && !layout.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filterRadius !== 'all') {
      const limit = Number(filterRadius);
      if (layout.distance > limit) return false;
    }
    if (filterPrice !== 'all') {
      const hasMatchingPlot = layout.plots.some(p => isPlotInBudget(p, layout.ratePerCent, filterPrice));
      if (!hasMatchingPlot) return false;
    }
    return true;
  });

  const activeLayout = LAYOUTS.find(l => l.id === selectedLayoutId) || LAYOUTS[0];

  const [selectedPlot, setSelectedPlot] = useState(() => {
    return (activeLayout && activeLayout.plots && activeLayout.plots[0]) || null;
  });

  // Click outside detector to close mobile filters drawer
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterContainerRef.current && !filterContainerRef.current.contains(event.target)) {
        setShowMobileFilters(false);
      }
    }
    if (showMobileFilters) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showMobileFilters]);

  // Set first plot as selected when active layout shifts
  useEffect(() => {
    if (activeLayout && activeLayout.plots && activeLayout.plots.length > 0) {
      setSelectedPlot(activeLayout.plots[0]);
    } else {
      setSelectedPlot(null);
    }
  }, [selectedLayoutId]);

  // Auto-select layout project if exactly 1 matches filters
  useEffect(() => {
    if (filteredLayouts.length === 1) {
      setSelectedLayoutId(filteredLayouts[0].id);
    }
  }, [filteredLayouts]);

  // Filter plots inside active layout
  const filteredPlots = activeLayout.plots.filter(p => {
    if (plotFilter === 'available' && p.status !== 'available') return false;
    if (!isPlotInBudget(p, activeLayout.ratePerCent, filterPrice)) return false;
    return true;
  });

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const calculateCents = (plot) => {
    return (plot.width * plot.length) / 435.6;
  };

  const getCentsDisplay = (plot) => {
    return calculateCents(plot).toFixed(2);
  };

  return (
    <div className="projects-layout-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Search & Filter Header Panel */}
      <div className="panel" style={{ padding: '16px' }} ref={filterContainerRef}>
        <h4 style={{ color: '#fff', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CompassIcon /> Filter Sri Krishna Construction Layouts
        </h4>
        
        <div className="filters-grid-wrapper">
          {/* Search Bar & Toggle Button */}
          <div className="search-filter-row">
            <div style={{ position: 'relative', flex: 1 }}>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Search layout name or area..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '40px', width: '100%' }}
              />
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', display: 'flex' }}>
                <SearchIcon />
              </span>
            </div>

            <button 
              className={`filter-toggle-btn ${showMobileFilters ? 'active' : ''}`}
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              type="button"
            >
              <FilterIcon /> 
              <span>Filters</span>
              {(filterPrice !== 'all' || filterRadius !== 'all') && (
                <span className="filter-active-badge"></span>
              )}
            </button>
          </div>

          {/* Filtering Drawer */}
          <div className={`marketplace-filters-container ${showMobileFilters ? 'mobile-show' : ''}`} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {/* Budget Filter */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ fontSize: '0.75rem' }}>Budget Range</label>
              <CustomSelect 
                value={filterPrice} 
                onChange={(val) => { setFilterPrice(val); setShowMobileFilters(false); }} 
                options={[
                  { value: 'all', label: 'Any Price Range' },
                  { value: 'under-20', label: 'Under ₹20 Lakhs' },
                  { value: '20-50', label: '₹20 Lakhs - ₹50 Lakhs' },
                  { value: '50-100', label: '₹50 Lakhs - ₹1 Crore' },
                  { value: 'over-100', label: 'Above ₹1 Crore' }
                ]}
              />
            </div>

            {/* Distance Radius Range Slider */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Distance Radius</span>
                <span style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>
                  {filterRadius === 'all' || Number(filterRadius) >= 100 ? 'Any distance' : `${filterRadius} km`}
                </span>
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>0 km</span>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={filterRadius === 'all' ? 100 : filterRadius}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setFilterRadius(val >= 100 ? 'all' : val);
                  }}
                  style={{
                    flex: 1,
                    accentColor: 'var(--accent-gold)',
                    background: 'var(--border-color)',
                    height: '6px',
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}
                />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>100 km</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selector of matching layouts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h5 style={{ color: 'var(--accent-gold)', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.75rem', margin: 0, fontWeight: '600' }}>
          Select Layout Project ({filteredLayouts.length} found)
        </h5>
        {filteredLayouts.length === 0 ? (
          <div className="panel" style={{ padding: '30px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>No layouts match your filter options. Try clearing search text or increasing radius filter.</p>
          </div>
        ) : (
          <div style={{ maxWidth: '420px', width: '100%' }}>
            <CustomSelect 
              value={selectedLayoutId} 
              onChange={setSelectedLayoutId}
              options={filteredLayouts.map(layout => ({
                value: layout.id,
                label: `${layout.name} (${layout.location})`
              }))}
            />
          </div>
        )}
      </div>

      {/* Land Layout Blueprint Showcase */}
      <div className="panel full-width-card">
        <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h3 className="panel-title" style={{ fontSize: '1.1rem' }}>
              Interactive Layout Map: {activeLayout.name}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: '4px 0 0' }}>
              📍 {activeLayout.location} • Distance from Center: {activeLayout.distance} km
            </p>
          </div>
          <div className="filter-bar">
            <button className={`filter-btn ${plotFilter === 'all' ? 'active' : ''}`} onClick={() => setPlotFilter('all')}>Show All Plots</button>
            <button className={`filter-btn ${plotFilter === 'available' ? 'active' : ''}`} onClick={() => setPlotFilter('available')}>Show Available Only</button>
          </div>
        </div>
        
        <div className="panel-content">
          <div className="plot-layout-grid-container">
            
            {/* Interactive Grid representing Land Plots */}
            <div className="plot-blueprint">
              <div className="blueprint-header">
                <span>PROJECT LOCATION: {activeLayout.location.toUpperCase()}</span>
                <span>TOTAL PLOTS: {activeLayout.plots.length}</span>
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
                      <span style={{ color: isAvailable ? 'var(--accent-green)' : 'var(--accent-red)', fontSize: '0.55rem', textTransform: 'uppercase' }}>
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
                      <span>Layout:</span>
                      <span>{activeLayout.name}</span>
                    </div>
                    <div className="detail-row">
                      <span>Location:</span>
                      <span>{activeLayout.location}</span>
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
                      <span>{formatCurrency(activeLayout.ratePerCent)} / Cent</span>
                    </div>
                    <div className="detail-row" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', marginTop: '15px' }}>
                      <span style={{ fontWeight: '700', color: 'var(--accent-gold)' }}>Total Plot Value:</span>
                      <span style={{ fontWeight: '700', color: 'var(--accent-gold)' }}>
                        {formatCurrency(calculateCents(selectedPlot) * activeLayout.ratePerCent)}
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
