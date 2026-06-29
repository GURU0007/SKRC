import React, { useState, useEffect } from 'react';
import CustomSelect from './CustomSelect';

// Icons
const CalculatorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="16"></line><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="22"></line><line x1="16" y1="10" x2="8" y2="10"></line></svg>
);

function Estimator() {
  const [area, setArea] = useState(() => localStorage.getItem('sri_krishna_estimator_area') || '1500');
  const [floors, setFloors] = useState(() => Number(localStorage.getItem('sri_krishna_estimator_floors')) || 1);
  const [quality, setQuality] = useState(() => localStorage.getItem('sri_krishna_estimator_quality') || 'premium');

  useEffect(() => {
    localStorage.setItem('sri_krishna_estimator_area', area);
  }, [area]);

  useEffect(() => {
    localStorage.setItem('sri_krishna_estimator_floors', String(floors));
  }, [floors]);

  useEffect(() => {
    localStorage.setItem('sri_krishna_estimator_quality', quality);
  }, [quality]);

  // Convert to number for calculations, default to 0 if cleared
  const areaNum = Number(area) || 0;

  // Estimation multiplier details
  const getQualityMultiplier = () => {
    if (quality === 'basic') return 2000;  // Normal Construction: 2000/-sqft
    if (quality === 'luxury') return 3200; // Ultra Deluxe: 3200/-sqft
    return 2400;                           // Deluxe: 2400/-sqft
  };

  const calculateEstimate = () => {
    const totalArea = areaNum * floors;
    const baseCost = totalArea * getQualityMultiplier();
    
    // Unbundled material costs breakdown
    // Cement: ~16% of total
    // Steel: ~20% of total
    // Bricks: ~12% of total
    // Sand & Aggregate: ~14% of total
    // Labor: ~25% of total
    // Finishings/Other: ~13% of total
    
    const cement = baseCost * 0.16;
    const steel = baseCost * 0.20;
    const bricks = baseCost * 0.12;
    const sand = baseCost * 0.14;
    const labor = baseCost * 0.25;
    const finishings = baseCost * 0.13;
    
    return {
      total: baseCost,
      cement,
      steel,
      bricks,
      sand,
      labor,
      finishings
    };
  };

  const est = calculateEstimate();

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  // Safe divisor check for average cost display
  const getAverageCostDisplay = () => {
    if (areaNum === 0) return formatCurrency(0);
    return formatCurrency(est.total / (areaNum * floors));
  };

  return (
    <div className="panel full-width-card">
      <div className="panel-header">
        <h3 className="panel-title"><CalculatorIcon /> Structural Construction Cost Estimator</h3>
        <span className="brand-tagline">Unbundle construction material budgets</span>
      </div>
      <div className="panel-content">
        {/* Premium Disclaimer Bar */}
        <div style={{ 
          background: 'rgba(212, 175, 55, 0.08)', 
          borderLeft: '4px solid var(--accent-gold)', 
          padding: '12px 16px', 
          borderRadius: '4px', 
          marginBottom: '20px',
          fontSize: '0.85rem',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          lineHeight: '1.4'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <span><strong>Disclaimer:</strong> This is a rough estimate. Please visit our office to get a detailed price breakdown.</span>
        </div>

        <div className="estimator-layout-grid">
          
          {/* Inputs Panel */}
          <div className="calc-inputs-pane">
            <div className="form-group">
              <label>Proposed Built-up Area per Floor (Sq. Ft.)</label>
              <input 
                type="number" 
                className="form-input" 
                placeholder="e.g. 1500"
                value={area}
                onChange={(e) => setArea(e.target.value)} // Binds as string, allows clearing the box
              />
            </div>

            <div className="form-group">
              <label>Number of Floors (Stories)</label>
              <CustomSelect 
                value={floors} 
                onChange={(val) => setFloors(Number(val))} 
                options={[
                  { value: 1, label: 'G (Ground Floor Only)' },
                  { value: 2, label: 'G + 1 (Double Story)' },
                  { value: 3, label: 'G + 2 (Triple Story)' },
                  { value: 4, label: 'G + 3 (Four Story)' }
                ]}
              />
            </div>

            <div className="form-group">
              <label>Material Specifications & Quality Grade</label>
              <CustomSelect 
                value={quality} 
                onChange={setQuality} 
                options={[
                  { value: 'basic', label: 'Normal Construction (₹2,000 / Sq. Ft.)' },
                  { value: 'premium', label: 'Deluxe - Lappam, False Ceiling (₹2,400 / Sq. Ft.)' },
                  { value: 'luxury', label: 'Ultra Deluxe - Cupboards, Solar, Smart Home (₹3,200 / Sq. Ft.)' }
                ]}
              />
            </div>
            
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', background: '#1c2436', padding: '10px', borderRadius: '4px', marginTop: '10px' }}>
              <strong>Standard Materials Specs:</strong> Cement (Ultratech or similar), Steel Reinforcements (Tata, Vizag or similar), and Lightweight / Clay bricks are used as default baselines to calculate construction structures.
            </p>
          </div>

          {/* Outputs Panel with high-clarity meters */}
          <div className="material-result-card">
            <div className="big-cost-header">
              <span className="cost-num-sub">Total Construction Estimate Budget:</span>
              <div className="cost-num-big" style={{ color: 'var(--accent-gold)' }}>{formatCurrency(est.total)}</div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Average Cost: {getAverageCostDisplay()} per Sq. Ft.
              </span>
            </div>

            <div className="cost-bars-stack">
              {/* Cement bags */}
              <div className="material-item">
                <div className="material-meta">
                  <span>Cement (Ultratech or similar)</span>
                  <span>{formatCurrency(est.cement)} (approx. {Math.round(areaNum * floors * 0.4)} bags)</span>
                </div>
                <div className="material-bar-outer">
                  <div className="material-bar-inner" style={{ width: '16%' }}></div>
                </div>
              </div>

              {/* Steel tons */}
              <div className="material-item">
                <div className="material-meta">
                  <span>TMT Steel (Tata / Vizag or similar)</span>
                  <span>{formatCurrency(est.steel)} (approx. {(areaNum * floors * 0.0035).toFixed(1)} Tons)</span>
                </div>
                <div className="material-bar-outer">
                  <div className="material-bar-inner" style={{ width: '20%' }}></div>
                </div>
              </div>

              {/* Sand aggregate */}
              <div className="material-item">
                <div className="material-meta">
                  <span>Fine Sand & Coarse Aggregate</span>
                  <span>{formatCurrency(est.sand)} (approx. {Math.round(areaNum * floors * 1.5)} CFT)</span>
                </div>
                <div className="material-bar-outer">
                  <div className="material-bar-inner" style={{ width: '14%' }}></div>
                </div>
              </div>

              {/* Bricks */}
              <div className="material-item">
                <div className="material-meta">
                  <span>Lightweight / Clay Bricks</span>
                  <span>{formatCurrency(est.bricks)} (approx. {Math.round(areaNum * floors * 12)} pcs)</span>
                </div>
                <div className="material-bar-outer">
                  <div className="material-bar-inner" style={{ width: '12%' }}></div>
                </div>
              </div>

              {/* Labor */}
              <div className="material-item">
                <div className="material-meta">
                  <span>Contractor Labor & Excavation Charges</span>
                  <span>{formatCurrency(est.labor)}</span>
                </div>
                <div className="material-bar-outer">
                  <div className="material-bar-inner" style={{ width: '25%' }}></div>
                </div>
              </div>

              {/* Finishing */}
              <div className="material-item">
                <div className="material-meta">
                  <span>Plumbing, Electrical, & Finishing Tiles</span>
                  <span>{formatCurrency(est.finishings)}</span>
                </div>
                <div className="material-bar-outer">
                  <div className="material-bar-inner" style={{ width: '13%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Estimator;
