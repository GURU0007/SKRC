import React, { useState, useEffect } from 'react';
import CustomSelect from './CustomSelect';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

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
    date: '2026-06-20',
    user_id: 'default'
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
    date: '2026-06-24',
    user_id: 'default'
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
    date: '2026-06-22',
    user_id: 'default'
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
    date: '2026-06-18',
    user_id: 'default'
  },
  {
    id: 'prop-5',
    title: 'East-Facing Corner Plot P-02 (SriKrishna X1)',
    type: 'plot',
    price: 3632000,
    size: '2016 Sq. Ft. (4.6 Cents)',
    facing: 'East',
    location: 'Byluppala Village, Kurnool',
    description: 'Special corner plot in the premium SriKrishna X1 layout project. Excellent access, beautiful green boundary view, and direct connections to the main layouts internal concrete roads.',
    contactName: 'Murali Krishna Reddy',
    contactPhone: '+91 8985961113',
    image: '/logo.jpeg',
    tag: 'Corner Plot',
    date: '2026-06-25',
    user_id: 'default'
  },
  {
    id: 'prop-6',
    title: '4 BHK Ultra Deluxe Villa with Solar & false ceiling',
    type: 'villa',
    price: 10500000,
    size: '3200 Sq. Ft.',
    facing: 'West',
    location: 'Budhawara Peta, Kurnool',
    description: 'Stunning modern independent villa. Built using deluxe standards: premium teak wood doors, integrated solar power backup, complete ceiling work, and automated water management.',
    contactName: 'R. M. K. Reddy',
    contactPhone: '+91 8985961113',
    image: '/sk_villa.jpg',
    tag: 'New Launch',
    date: '2026-06-25',
    user_id: 'default'
  },
  {
    id: 'prop-7',
    title: '3 BHK Elegant Flat in Sri Krishna Residency',
    type: 'apartment',
    price: 5800000,
    size: '1650 Sq. Ft.',
    facing: 'East',
    location: 'N R Peta, Kurnool',
    description: 'Spacious family apartment located in the heart of Kurnool city. Features modern bathrooms, 3 balconies, high-speed lift access, dedicated car parking, and low maintenance fees.',
    contactName: 'Sri Krishna Builders',
    contactPhone: '+91 8985961113',
    image: '/logo.jpeg',
    tag: 'Best Value',
    date: '2026-06-25',
    user_id: 'default'
  },
  {
    id: 'prop-8',
    title: 'Highway Frontage Agricultural Land (Farm Plots)',
    type: 'plot',
    price: 1800000,
    size: '4356 Sq. Ft. (10 Cents)',
    facing: 'South',
    location: 'Byluppala Highway, Kurnool',
    description: 'Fertile farm/layout plots close to the major Kurnool highway. Beautiful peaceful environment perfect for building a weekend farmhouse or nursery.',
    contactName: 'Murali Krishna Reddy',
    contactPhone: '+91 8985961113',
    image: '/logo.jpeg',
    tag: 'Farm Layout',
    date: '2026-06-24',
    user_id: 'default'
  },
  {
    id: 'prop-9',
    title: 'Prime Commercial Office / Bank Space',
    type: 'commercial',
    price: 8800000,
    size: '1800 Sq. Ft.',
    facing: 'East',
    location: 'Sampath Nagar, Kurnool',
    description: 'Fully approved commercial space with high-grade electrical wiring, marble flooring, and ready partition frames. Perfect for banking branches, offices, or diagnostic clinics.',
    contactName: 'Murali Krishna Reddy',
    contactPhone: '+91 8985961113',
    image: '/sk_villa.jpg',
    tag: 'Investment Pick',
    date: '2026-06-23',
    user_id: 'default'
  }
];

// Icons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
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
  const [isLoading, setIsLoading] = useState(true);

  // Authentication State
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

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
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // 1. Get Authentication State from Supabase
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        // Pre-fill listing contact details with user metadata if logged in
        setFormContactName(session.user.user_metadata?.name || '');
        setFormContactPhone(session.user.user_metadata?.phone || '');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setFormContactName(session.user.user_metadata?.name || '');
        setFormContactPhone(session.user.user_metadata?.phone || '');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Fetch Listings (Supabase with Local Fallback)
  const fetchProperties = async () => {
    setIsLoading(true);
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Map Supabase column names if they match camelCase or just merge
        const dbListings = data.map(item => ({
          id: item.id,
          title: item.title,
          type: item.type,
          price: Number(item.price),
          size: item.size,
          facing: item.facing,
          location: item.location,
          description: item.description,
          image: item.image_url || '/logo.jpeg',
          contactName: item.contact_name,
          contactPhone: item.contact_phone,
          tag: item.tag || 'Owner Listed',
          date: item.created_at.split('T')[0],
          user_id: item.user_id
        }));

        setListings([...DEFAULT_PROPERTIES, ...dbListings]);
      } catch (err) {
        console.error('Failed to load from Supabase database. Falling back to local.', err);
        loadLocalFallbacks();
      }
    } else {
      loadLocalFallbacks();
    }
    setIsLoading(false);
  };

  const loadLocalFallbacks = () => {
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
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  // 3. User Authentication handlers (Login / Sign Up)
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    if (authMode === 'login') {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password: authPassword
      });
      if (error) {
        setAuthError(error.message);
      } else {
        setAuthEmail('');
        setAuthPassword('');
      }
    } else {
      // Signup Mode
      if (!authName || !authPhone) {
        setAuthError('Please fill in your name and phone number.');
        setAuthLoading(false);
        return;
      }
      const { data, error } = await supabase.auth.signUp({
        email: authEmail,
        password: authPassword,
        options: {
          data: {
            name: authName,
            phone: authPhone
          }
        }
      });
      if (error) {
        setAuthError(error.message);
      } else {
        setAuthError('Verification email sent! Please check your inbox or log in if confirmation is disabled.');
        // Auto signin handles session switch if mail verification is off
      }
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // 4. Form submission handler for new listing
  const handleAddProperty = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!formTitle || !formPrice || !formSize || !formLocation || !formContactPhone || !formContactName) return;

    setFormLoading(true);

    if (isSupabaseConfigured && user) {
      // Save directly to Supabase cloud Database
      try {
        const { data, error } = await supabase
          .from('properties')
          .insert([{
            title: formTitle,
            type: formType,
            price: Number(formPrice),
            size: formSize,
            facing: formFacing,
            location: formLocation,
            description: formDescription || 'No description provided.',
            contact_name: formContactName,
            contact_phone: formContactPhone,
            image_url: '/logo.jpeg',
            tag: 'Owner Listed',
            user_id: user.id
          }]);

        if (error) throw error;
        setFormSubmitted(true);
        fetchProperties();
      } catch (err) {
        setFormError(err.message || 'Failed to list property in cloud database.');
      }
    } else {
      // Mock / Offline LocalStorage Save
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
        image: '/logo.jpeg',
        tag: 'Local Listing',
        date: new Date().toISOString().split('T')[0],
        user_id: 'local-test-user'
      };

      const saved = localStorage.getItem('sri_krishna_marketplace_listings');
      let currentSaved = [];
      if (saved) {
        try {
          currentSaved = JSON.parse(saved);
        } catch (err) {}
      }
      
      const updatedSaved = [newProperty, ...currentSaved];
      localStorage.setItem('sri_krishna_marketplace_listings', JSON.stringify(updatedSaved));
      setListings([...DEFAULT_PROPERTIES, ...updatedSaved]);
      setFormSubmitted(true);
    }
    
    // Reset inputs
    setFormTitle('');
    setFormPrice('');
    setFormSize('');
    setFormLocation('');
    setFormDescription('');
    setFormLoading(false);
  };

  // 5. Delete Listing handler (checks ownership)
  const handleDeleteListing = async (propId) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    
    if (isSupabaseConfigured && user) {
      try {
        const { error } = await supabase
          .from('properties')
          .delete()
          .eq('id', propId)
          .eq('user_id', user.id);

        if (error) throw error;
        setSelectedProp(null);
        fetchProperties();
      } catch (err) {
        alert(err.message || 'Failed to delete listing.');
      }
    } else {
      // Local storage delete
      const saved = localStorage.getItem('sri_krishna_marketplace_listings');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const filtered = parsed.filter(p => p.id !== propId);
          localStorage.setItem('sri_krishna_marketplace_listings', JSON.stringify(filtered));
          setListings([...DEFAULT_PROPERTIES, ...filtered]);
          setSelectedProp(null);
        } catch (err) {}
      }
    }
  };

  // Filtering Logic
  const filteredListings = listings.filter((prop) => {
    const textToSearch = `${prop.title} ${prop.location} ${prop.description}`.toLowerCase();
    if (searchQuery && !textToSearch.includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filterType !== 'all' && prop.type !== filterType) {
      return false;
    }
    if (filterFacing !== 'all' && prop.facing !== filterFacing) {
      return false;
    }
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
      
      {/* Configuration Status Banner */}
      {!isSupabaseConfigured && (
        <div style={{ background: 'rgba(197,168,128,0.08)', border: '1px dashed var(--accent-gold)', borderRadius: '6px', padding: '10px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)' }}>
            ⚠️ <strong>Sandbox Mode:</strong> Real database config not found. Listings are saved locally. Connect your Supabase project in the <code>.env</code> file.
          </span>
          <a href="/supabase_setup.sql" target="_blank" download style={{ fontSize: '0.75rem', color: '#fff', textDecoration: 'underline', fontWeight: '500' }}>
            Download SQL Setup Script
          </a>
        </div>
      )}

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
        
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: '600' }}>
              👤 {user.email}
            </span>
            <button onClick={handleLogout} className="filter-btn" style={{ fontSize: '0.7rem', padding: '4px 8px', borderColor: 'var(--accent-red)', color: 'var(--accent-red)' }}>
              Sign Out
            </button>
          </div>
        ) : (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Sign in required to list properties
          </span>
        )}
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
          {isLoading ? (
            <div className="panel" style={{ padding: '60px', textAlign: 'center' }}>
              <span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Loading properties...</span>
            </div>
          ) : filteredListings.length === 0 ? (
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

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: '700', letterSpacing: '1.5px' }}>
                        {selectedProp.type} Property • {selectedProp.facing} Facing
                      </span>
                      <h3 style={{ fontSize: '1.3rem', marginTop: '4px' }}>{selectedProp.title}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>📍 {selectedProp.location}</p>
                    </div>
                    {/* Delete button: Only show if this listing is owned by the logged-in user */}
                    {user && selectedProp.user_id === user.id && (
                      <button 
                        onClick={() => handleDeleteListing(selectedProp.id)}
                        className="filter-btn" 
                        style={{ borderColor: 'var(--accent-red)', color: 'var(--accent-red)', padding: '6px 12px', fontSize: '0.75rem' }}
                      >
                        Delete Listing
                      </button>
                    )}
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
        /* List Your Property Tab (Enforces Authentication) */
        !user ? (
          /* Render Login/Registration Box */
          <div className="panel" style={{ maxWidth: '450px', margin: '20px auto', width: '100%' }}>
            <div className="panel-header" style={{ justifyContent: 'center' }}>
              <h3 className="panel-title">
                {authMode === 'login' ? 'Sign In to List Property' : 'Create Agent/Owner Account'}
              </h3>
            </div>
            <div className="panel-content">
              <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                {authMode === 'signup' && (
                  <>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Enter your name" 
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number (WhatsApp pref.)</label>
                      <input 
                        type="tel" 
                        className="form-input" 
                        placeholder="e.g. +91 89859 61113" 
                        value={authPhone}
                        onChange={(e) => setAuthPhone(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="Enter email address" 
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    placeholder="Min 6 characters" 
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                {authError && (
                  <p style={{ color: authError.includes('sent') ? 'var(--accent-green)' : 'var(--accent-red)', fontSize: '0.8rem', margin: 0 }}>
                    {authError}
                  </p>
                )}

                <button 
                  type="submit" 
                  className="gold-button" 
                  style={{ width: '100%', marginTop: '10px' }}
                  disabled={authLoading}
                >
                  {authLoading ? 'Processing...' : authMode === 'login' ? 'Sign In' : 'Sign Up'}
                </button>

                <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.8rem' }}>
                  {authMode === 'login' ? (
                    <p style={{ color: 'var(--text-secondary)' }}>
                      Don't have an account?{' '}
                      <span onClick={() => { setAuthMode('signup'); setAuthError(''); }} style={{ color: 'var(--accent-gold)', cursor: 'pointer', textDecoration: 'underline' }}>
                        Create one here
                      </span>
                    </p>
                  ) : (
                    <p style={{ color: 'var(--text-secondary)' }}>
                      Already have an account?{' '}
                      <span onClick={() => { setAuthMode('login'); setAuthError(''); }} style={{ color: 'var(--accent-gold)', cursor: 'pointer', textDecoration: 'underline' }}>
                        Log in here
                      </span>
                    </p>
                  )}
                </div>

              </form>
            </div>
          </div>
        ) : (
          /* Render Property Form once authenticated */
          <div className="panel">
            <div className="panel-header">
              <h3 className="panel-title"><PlusIcon /> Add Your Property Listing</h3>
            </div>
            <div className="panel-content">
              {formSubmitted ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '3rem', color: 'var(--accent-green)' }}>✓</span>
                  <h4 style={{ marginTop: '15px' }}>Property Listed Successfully</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '400px' }}>
                    Your listing is now saved in the database. You can go to the "Browse Properties" tab to view it instantly.
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
                      placeholder="e.g. 3 BHK Gated Villa near budhawara Peta"
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

                  {formError && (
                    <p style={{ color: 'var(--accent-red)', fontSize: '0.85rem', margin: 0 }}>
                      {formError}
                    </p>
                  )}

                  <button 
                    type="submit" 
                    className="gold-button"
                    style={{ alignSelf: 'flex-start', padding: '12px 30px', marginTop: '10px' }}
                    disabled={formLoading}
                  >
                    {formLoading ? 'Publishing...' : 'Publish Listing'}
                  </button>

                </form>
              )}
            </div>
          </div>
        )
      )}

    </div>
  );
}

export default Marketplace;
