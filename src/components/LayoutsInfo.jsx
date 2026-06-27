import React from 'react';

const CompassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
);

const SecurityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
);

function LayoutsInfo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Overview Block */}
      <div className="panel" style={{ background: 'linear-gradient(135deg, rgba(197, 168, 128, 0.05) 0%, rgba(11, 15, 23, 0.4) 100%)', border: '1px solid var(--border-color)' }}>
        <div className="panel-content" style={{ padding: '30px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.8rem', marginBottom: '12px' }}>
            Premium Gated <span style={{ color: 'var(--accent-gold)' }}>Land Layout Mappings</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '720px', margin: '0 auto' }}>
            Sri Krishna Real Estate & Constructions designs and develops high-standard gated community land layouts in Byluppala, Kurnool. Every plot registry is fully backed by legal sanctions, structured layouts, and modern essential amenities.
          </p>
        </div>
      </div>

      {/* Grid: Bylaws & Essential Infrastructures */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
        
        {/* Layout Bylaws & Sanctions */}
        <div className="panel">
          <div className="panel-header" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ color: 'var(--accent-gold)', background: 'rgba(197, 168, 128, 0.08)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
              <DocumentIcon />
            </div>
            <div>
              <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>Approved Sanctions & Bylaws</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: '4px 0 0' }}>100% legal title compliance</p>
            </div>
          </div>
          <div className="panel-content" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              All layouts developed by Sri Krishna are verified and strictly follow standard state government rules, including RERA registration, to secure your capital investment.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: 'var(--accent-gold)' }}>✓</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}><strong>DTCP Approval Mappings</strong>: Plots mapped strictly under Directorate of Town and Country Planning (DTCP) layout blueprints.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: 'var(--accent-gold)' }}>✓</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}><strong>Clear Title Deeds</strong>: Free of legal disputes with 100% transparent history registry document files available for check.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: 'var(--accent-gold)' }}>✓</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}><strong>Spot Registration</strong>: Quick registry transfer to the buyer as soon as booking amounts are finalized.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Infrastructures & Infrastructure Details */}
        <div className="panel">
          <div className="panel-header" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ color: 'var(--accent-gold)', background: 'rgba(197, 168, 128, 0.08)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
              <CompassIcon />
            </div>
            <div>
              <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>Gated Community Infrastructures</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: '4px 0 0' }}>Modern layout amenities ready for build</p>
            </div>
          </div>
          <div className="panel-content" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              We build essential civil infrastructures to enable immediately start of villa construction on your plots.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: 'var(--accent-gold)' }}>✓</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}><strong>Cement & Blacktop Roads</strong>: Wide 33-feet internal concrete or asphalt roads built to support heavy transport loads.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: 'var(--accent-gold)' }}>✓</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}><strong>Electricity Transformers</strong>: Installed dedicated overhead lines, electrical poles, and transformers for low-fluctuation power supply.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: 'var(--accent-gold)' }}>✓</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}><strong>Overhead Water Reservoir</strong>: Central overhead water storage tanks with individual pipeline supplies tapped to each plot corner.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Security & Parks Panel */}
      <div className="panel">
        <div className="panel-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0, color: '#fff', fontSize: '1.1rem' }}>
            <SecurityIcon /> Secure & Premium Living Amenities
          </h3>
        </div>
        <div className="panel-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div>
              <h4 style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', marginBottom: '8px' }}>Security Gated Entrance</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Layout entrance is protected by a solid brick security arch gates. Guard cabins control round-the-clock entry to ensure absolute safety.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', marginBottom: '8px' }}>Open Parks & Playgrounds</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Mandatory open space reserves (10% layout area) are developed as beautiful landscaped children's parks, avenues, walking pathways, and seating benches.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', marginBottom: '8px' }}>Stormwater Underground Drains</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Specially sloped concrete underground drainage lines are installed on both road edges to prevent waterlog issues during heavy monsoon downpours.
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default LayoutsInfo;
