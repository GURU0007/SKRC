import React from 'react';

const SolarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M20 12h2"/><path d="M2 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
);

const IoTIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 18h6"/><path d="M10 6h4"/><path d="M8 10h8"/><path d="M12 14v4"/></svg>
);

const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58 0 8a13 13 0 0 1-8 10Z"/><path d="M9 10H4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-5"/></svg>
);

function SmartHomes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Intro Header Section */}
      <div className="panel" style={{ background: 'linear-gradient(135deg, rgba(197, 168, 128, 0.05) 0%, rgba(11, 15, 23, 0.4) 100%)', border: '1px solid var(--border-color)' }}>
        <div className="panel-content" style={{ padding: '30px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.8rem', marginBottom: '12px' }}>
            Eco-Friendly Solar & <span style={{ color: 'var(--accent-gold)' }}>Smart Home IoT Integration</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '720px', margin: '0 auto' }}>
            At Sri Krishna, we build houses with modern technologies. Our premium construction models integrate clean solar energy and full-scale IoT home automation to lower electricity bills, minimize ecological carbon footprint, and provide automated living.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
        
        {/* Solar Section */}
        <div className="panel">
          <div className="panel-header" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ color: 'var(--accent-gold)', background: 'rgba(197, 168, 128, 0.08)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
              <SolarIcon />
            </div>
            <div>
              <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>Green Solar Energy Systems</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: '4px 0 0' }}>Clean power, zero emissions</p>
            </div>
          </div>
          <div className="panel-content" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              We install top-tier monocrystalline solar panel systems directly integrated onto your villa rooftops. These systems generate high-efficiency electric power even during semi-cloudy seasons in Kurnool.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: 'var(--accent-gold)' }}>✓</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}><strong>Net Metering & Grid Sync</strong>: Export excess generated solar power back to the government grid to offset monthly energy bills.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: 'var(--accent-gold)' }}>✓</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}><strong>Battery Backup Readiness</strong>: Configured with hybrid solar inverter channels so you can connect battery backups for uninterrupted blackout support.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: 'var(--accent-gold)' }}>✓</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}><strong>Low Maintenance</strong>: Constructed with tempered solar glass and anti-reflective coating, requiring simple water washes twice a year.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Smart IoT Automation */}
        <div className="panel">
          <div className="panel-header" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ color: 'var(--accent-gold)', background: 'rgba(197, 168, 128, 0.08)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
              <IoTIcon />
            </div>
            <div>
              <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>Full Home IoT & Automation</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: '4px 0 0' }}>Connected, automated convenience</p>
            </div>
          </div>
          <div className="panel-content" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Control your home with your voice, phone, or schedule. Our construction models feature modern home automation backbones using secure smart switches.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: 'var(--accent-gold)' }}>✓</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}><strong>App-Controlled Smart Switches</strong>: Toggle fans, AC units, water heaters, and indoor/outdoor lights via your smartphone from anywhere in the world.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: 'var(--accent-gold)' }}>✓</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}><strong>Voice Assistant Support</strong>: Works seamlessly with Google Assistant, Alexa, or Apple Siri for touchless hands-free operations.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: 'var(--accent-gold)' }}>✓</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}><strong>Smart Energy Scheduling</strong>: Set automated timers on heavy loads (e.g. pumps, geysers) to run during peak solar generation hours.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Sustainable Construction Panel */}
      <div className="panel">
        <div className="panel-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0, color: '#fff', fontSize: '1.1rem' }}>
            <LeafIcon /> Built for a Sustainable Future
          </h3>
        </div>
        <div className="panel-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div>
              <h4 style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', marginBottom: '8px' }}>Rainwater Harvesting</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Every villa is equipped with individual rainwater recharge pits that filter and channel rooftop rain run-offs into the groundwater tables, securing long-term water availability.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', marginBottom: '8px' }}>Thermal Wall Insulation</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                We use high-grade AAC block masonries or red clay hollow blocks that naturally provide higher thermal and acoustic insulation, keeping interiors up to 4°C cooler in summer.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', marginBottom: '8px' }}>Low VOC Eco-Paints</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                We prioritize premium eco-friendly primers and paints that release zero toxic chemical VOC odors, ensuring high indoor air quality for your family.
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default SmartHomes;
