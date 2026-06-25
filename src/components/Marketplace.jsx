import React, { useState, useEffect } from 'react';
import CustomSelect from './CustomSelect';

// Initial default properties for Kurnool district
const DEFAULT_PROPERTIES = [
  {
    id: 'prop-1',
    title: 'Premium East-Facing Plot (SriKrishna X1)',
    type: 'plot',
    price: 3600000,
    size: '1872 Sq. Ft. (4.3 Cents)',
    facing: 'East',
    location: 'Byluppala Village, Kurnool',
    description: 'Beautiful level plot in the newly developed SriKrishna X1 layout. Fully cleared titles, immediate registration available. Ideal for premium residential villa.',
    contactName: 'Murali Krishna Reddy',
    contactPhone: '+91 8985961113',
    image: '/logo.jpeg',
    tag: 'Verified Layout',
    date: '2026-06-20'
  },
  {
    id: 'prop-2',
    title: '3 BHK Contemporary Luxury Villa',
    type: 'villa',
    price: 7800000,
    size: '2400 Sq. Ft.',
    facing: 'East',
    location: 'Sampath Nagar, Kurnool',
    description: 'Fully finished ready-to-move deluxe villa. Features lappam finishes, premium false ceilings in all rooms, modular kitchen, solar backup, and automatic water controllers.',
    contactName: 'R. M. K. Reddy',
    contactPhone: '+91 8985961113',
    image: '/sk_villa.jpg',
    tag: 'Ready to Move',
    date: '2026-06-24'
  },
  {
    id: 'prop-3',
    title: '2 BHK Premium Apartment in Gated Community',
    type: 'apartment',
    price: 4500000,
    size: '1200 Sq. Ft.',
    facing: 'North',
    location: 'Bellary Road, Kurnool',
    description: 'Excellent residential unit with 24/7 security, power backup, and dedicated parking. Walking distance to schools and supermarkets.',
    contactName: 'Sri Krishna Builders',
    contactPhone: '+91 8985961113',
    image: '/logo.jpeg',
    tag: 'Hot Deal',
    date: '2026-06-22'
  },
  {
    id: 'prop-4',
    title: 'Commercial Retail Space on Highway Frontage',
    type: 'commercial',
    price: 12500000,
    size: '3000 Sq. Ft.',
    facing: 'East',
    location: 'Bellary Road, Kurnool',
    description: 'Prime commercial plot/building structure ideal for retail showrooms, banks, or franchise stores. Exceptional visibility and high foot traffic.',
    contactName: 'Murali Krishna Reddy',
    contactPhone: '+91 8985961113',
    image: '/sk_villa.jpg',
    tag: 'Prime Location',
    date: '2026-06-18'
  }
];

// Icons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
);

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

function Marketplace() {
  const [activeSubTab, setActiveSubTab] = useState('browse'); // 'browse' or 'list'
  const [listings, setListings] = useState([]);
  const [selectedProp, setSelectedProp] = useState(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [filterFacing, setFilterFacing] = useState('all');

  // Listing Form State
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState('plot');
  const [formPrice, setFormPrice] = useState('');
  const [formSize, setFormSize] = useState('');
  const [formFacing, setFormFacing] = useState('East');
  const [formLocation, setFormLocation] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formContactName, setFormContactName] = useState('');
  const [formContactPhone, setFormContactPhone] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Load listings from localStorage + default lists on startup
  useEffect(() => {
    const saved = localStorage.getItem('sri_krishna_marketplace_listings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setListings([...DEFAULT_PROPERTIES, ...parsed]);
      } catch (e) {
        setListings(DEFAULT_PROPERTIES);
      }
    } else {
      setListings(DEFAULT_PROPERTIES);
    }
  }, []);

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  // Form submission handler
  const handleAddProperty = (e) => {
    e.preventDefault();
    if (!formTitle || !formPrice || !formSize || !formLocation || !formContactPhone || !formContactName) return;

    const newProperty = {
      id: `custom-${Date.now()}`,
      title: formTitle,
      type: formType,
      price: Number(formPrice),
      size: formSize,
      facing: formFacing,
      location: formLocation,
      description: formDescription || 'No description provided.',
      contactName: formContactName,
      contactPhone: formContactPhone,
      image: '/logo.jpeg', // Default logo placeholder
      tag: 'Owner Listed',
      date: new Date().toISOString().split('T')[0]
    };

    // Get current localstorage values and append
    const saved = localStorage.getItem('sri_krishna_marketplace_listings');
    let currentSaved = [];
    if (saved) {
      try {
        currentSaved = JSON.parse(saved);
      } catch (err) {}
    }
    
    const updatedSaved = [newProperty, ...currentSaved];
    localStorage.setItem('sri_krishna_marketplace_listings', JSON.stringify(updatedSaved));
    
    // Update local state
    setListings([...DEFAULT_PROPERTIES, ...updatedSaved]);
    setFormSubmitted(true);
    
    // Reset form fields
    setFormTitle('');
    setFormPrice('');
    setFormSize('');
    setFormLocation('');
    setFormDescription('');
    setFormContactName('');
    setFormContactPhone('');
  };

  // Filtering Logic
  const filteredListings = listings.filter((prop) => {
    // Search Query match
    const textToSearch = `${prop.title} ${prop.location} ${prop.description}`.toLowerCase();
    if (searchQuery && !textToSearch.includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Type Match
    if (filterType !== 'all' && prop.type !== filterType) {
      return false;
    }

    // Facing Match
    if (filterFacing !== 'all' && prop.facing !== filterFacing) {
      return false;
    }

    // Price Match
    if (filterPrice !== 'all') {
      const price = prop.price;
      if (filterPrice === 'under-20') return price < 2000000;
      if (filterPrice === '20-50') return price >= 2000000 && price <= 5000000;
      if (filterPrice === '50-100') return price > 5000000 && price <= 10000000;
      if (filterPrice === 'over-100') return price > 10000000;
    }

    return true;
  });

  const getWhatsAppLink = (prop) => {
    const text = encodeURIComponent(`Hi, I am interested in inquiring about your property listed on Sri Krishna Real Estate: "${prop.title}" in ${prop.location} (Price: ${formatCurrency(prop.price)}). Please share more details.`);
    return `https://wa.me/${prop.contactPhone.replace(/[^0-9]/g, '')}?text=${text}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Tab Switcher Headers */}
      <div className="panel" style={{ padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button 
            className={`filter-btn ${activeSubTab === 'browse' ? 'active' : ''}`}
            onClick={() => { setActiveSubTab('browse'); setFormSubmitted(false); }}
            style={{ fontSize: '0.85rem', padding: '8px 16px' }}
          >
            Browse Properties
          </button>
          <button 
            className={`filter-btn ${activeSubTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('list')}
            style={{ fontSize: '0.85rem', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <PlusIcon /> List Your Property
          </button>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'none', md: 'inline' }}>
          Total Listings: {listings.length}
        </span>
      </div>

      {activeSubTab === 'browse' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Filters Panel */}
          <div className="panel" style={{ padding: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
              
              {/* Search Bar */}
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Search by location, title or landmark (e.g. Bellary Road)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '40px', width: '100%' }}
                />
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
                  <SearchIcon />
                </span>
              </div>

              {/* Filtering dropdowns */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: '0.75rem' }}>Property Type</label>
                  <CustomSelect 
                    value={filterType}
                    onChange={setFilterType}
                    options={[
                      { value: 'all', label: 'All Property Types' },
                      { value: 'plot', label: 'Plots / Land Layouts' },
                      { value: 'villa', label: 'Villas / Independent Houses' },
                      { value: 'apartment', label: 'Apartments / Flats' },
                      { value: 'commercial', label: 'Commercial Spaces' }
                    ]}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: '0.75rem' }}>Budget Range</label>
                  <CustomSelect 
                    value={filterPrice}
                    onChange={setFilterPrice}
                    options={[
                      { value: 'all', label: 'Any Price Range' },
                      { value: 'under-20', label: 'Under ₹20 Lakhs' },
                      { value: '20-50', label: '₹20 Lakhs - ₹50 Lakhs' },
                      { value: '50-100', label: '₹50 Lakhs - ₹1 Crore' },
                      { value: 'over-100', label: 'Above ₹1 Crore' }
                    ]}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: '0.75rem' }}>Orientation / Facing</label>
                  <CustomSelect 
                    value={filterFacing}
                    onChange={setFilterFacing}
                    options={[
                      { value: 'all', label: 'Any Facing Direction' },
                      { value: 'East', label: 'East Facing' },
                      { value: 'West', label: 'West Facing' },
                      { value: 'North', label: 'North Facing' },
                      { value: 'South', label: 'South Facing' }
                    ]}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Grid Layout of Property Cards */}
          {filteredListings.length === 0 ? (
            <div className="panel" style={{ padding: '60px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.5rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }}>🔍</span>
              <h4>No Properties Match Your Filters</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                Try adjusting your search keywords, price filter, or facing selection.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '20px' }}>
              {filteredListings.map((prop) => (
                <div 
                  key={prop.id} 
                  className="panel"
                  style={{
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedProp(prop)}
                >
                  {/* Photo area */}
                  <div style={{ height: '180px', position: 'relative', background: '#0f172a' }}>
                    <img 
                      src={prop.image} 
                      alt={prop.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} 
                    />
                    <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(11,15,23,0.8)', border: '1px solid var(--accent-gold)', borderRadius: '4px', padding: '4px 8px', fontSize: '0.65rem', fontWeight: '700', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <TagIcon /> {prop.tag}
                    </div>
                    <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(16,185,129,0.95)', borderRadius: '4px', padding: '4px 10px', fontSize: '0.9rem', fontWeight: '800', color: '#fff' }}>
                      {formatCurrency(prop.price)}
                    </div>
                  </div>

                  {/* Text area */}
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: '700', letterSpacing: '1px' }}>
                      {prop.type === 'plot' ? 'Plot / Land' : prop.type} • {prop.facing} Facing
                    </span>
                    <h4 style={{ fontSize: '1rem', lineBreak: 'strict', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', height: '2.5rem', lineHeight: '1.25' }}>
                      {prop.title}
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      📍 {prop.location}
                    </p>
                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Size: <strong>{prop.size}</strong>
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: '600' }}>
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Details Modal */}
          {selectedProp && (
            <div 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(11,15,23,0.85)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '15px',
                boxSizing: 'border-box'
              }}
              onClick={() => setSelectedProp(null)}
            >
              <div 
                className="panel"
                style={{
                  width: '100%',
                  maxWidth: '620px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image panel */}
                <div style={{ height: '250px', position: 'relative', background: '#090c12' }}>
                  <img src={selectedProp.image} alt={selectedProp.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button 
                    onClick={() => setSelectedProp(null)}
                    style={{ position: 'absolute', top: '15px', right: '15px', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(11,15,23,0.8)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    ×
                  </button>
                  <div style={{ position: 'absolute', bottom: '15px', left: '15px', background: 'var(--accent-gold)', color: '#0b0f17', fontWeight: '800', fontSize: '1.1rem', padding: '6px 14px', borderRadius: '4px' }}>
                    {formatCurrency(selectedProp.price)}
                  </div>
                </div>

                {/* Info panel */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: '700', letterSpacing: '1.5px' }}>
                      {selectedProp.type} Property • {selectedProp.facing} Facing
                    </span>
                    <h3 style={{ fontSize: '1.3rem', marginTop: '4px' }}>{selectedProp.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>📍 {selectedProp.location}</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: '#1c2436', padding: '12px 16px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Property Size:</span>
                      <p style={{ fontWeight: '700', fontSize: '0.9rem', marginTop: '2px', color: '#fff' }}>{selectedProp.size}</p>
                    </div>
                    <div style={{ fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Orientation:</span>
                      <p style={{ fontWeight: '700', fontSize: '0.9rem', marginTop: '2px', color: '#fff' }}>{selectedProp.facing} Facing</p>
                    </div>
                  </div>

                  <div>
                    <h5 style={{ color: 'var(--accent-gold)', marginBottom: '6px' }}>Property Description:</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      {selectedProp.description}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h5 style={{ color: 'var(--accent-gold)' }}>Contact Listing Agent / Owner:</h5>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                      <div>
                        <p style={{ fontWeight: '700', fontSize: '0.9rem' }}>{selectedProp.contactName}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Phone: {selectedProp.contactPhone}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <a 
                          href={getWhatsAppLink(selectedProp)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="gold-button"
                          style={{ textDecoration: 'none', background: '#25D366', color: '#fff', padding: '8px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          💬 WhatsApp
                        </a>
                        <a 
                          href={`tel:${selectedProp.contactPhone}`} 
                          className="gold-button" 
                          style={{ textDecoration: 'none', padding: '8px 16px', fontSize: '0.8rem' }}
                        >
                          📞 Call Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      ) : (
        /* List Your Property Form Page */
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title"><PlusIcon /> Add Your Property Listing</h3>
          </div>
          <div className="panel-content">
            {formSubmitted ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '3rem', color: 'var(--accent-green)' }}>✓</span>
                <h4 style={{ marginTop: '15px' }}>Property Listed Successfully (Locally)</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '400px' }}>
                  Your listing is now saved locally on this browser. You can go to the "Browse Properties" tab to view, search, or filter it instantly.
                </p>
                <button 
                  className="gold-button" 
                  style={{ marginTop: '20px' }} 
                  onClick={() => { setActiveSubTab('browse'); setFormSubmitted(false); }}
                >
                  Go to Browse Properties
                </button>
              </div>
            ) : (
              <form onSubmit={handleAddProperty} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                <div className="form-group">
                  <label>Listing Title</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 3 BHK Gated Villa near Sampath Nagar"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    required 
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Property Type</label>
                    <CustomSelect 
                      value={formType}
                      onChange={setFormType}
                      options={[
                        { value: 'plot', label: 'Plot / Land Layout' },
                        { value: 'villa', label: 'Villa / Independent House' },
                        { value: 'apartment', label: 'Apartment / Flat' },
                        { value: 'commercial', label: 'Commercial Space' }
                      ]}
                    />
                  </div>

                  <div className="form-group">
                    <label>Orientation / Facing</label>
                    <CustomSelect 
                      value={formFacing}
                      onChange={formFacing => setFormFacing(formFacing)}
                      options={[
                        { value: 'East', label: 'East Facing' },
                        { value: 'West', label: 'West Facing' },
                        { value: 'North', label: 'North Facing' },
                        { value: 'South', label: 'South Facing' }
                      ]}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Asking Price (INR)</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      placeholder="e.g. 4500000"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label>Property Size (Sq. Ft. or Cents)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. 1500 Sq. Ft. or 5 Cents"
                      value={formSize}
                      onChange={(e) => setFormSize(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Location Address / Landmark</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Bellary Road, beside Union Bank, Kurnool"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Detailed Description</label>
                  <textarea 
                    className="form-input" 
                    rows="4" 
                    placeholder="Describe amenities, surroundings, road width, approvals, construction state..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                  />
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px', marginTop: '10px' }}>
                  <h5 style={{ color: 'var(--accent-gold)', marginBottom: '15px' }}>Contact Information</h5>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Contact Person Name</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Enter your name"
                        value={formContactName}
                        onChange={(e) => setFormContactName(e.target.value)}
                        required 
                      />
                    </div>

                    <div className="form-group">
                      <label>Contact Phone Number (WhatsApp preferred)</label>
                      <input 
                        type="tel" 
                        className="form-input" 
                        placeholder="e.g. +918985961113"
                        value={formContactPhone}
                        onChange={(e) => setFormContactPhone(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="gold-button"
                  style={{ alignSelf: 'flex-start', padding: '12px 30px', marginTop: '10px' }}
                >
                  Publish Listing Locally
                </button>

              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default Marketplace;
