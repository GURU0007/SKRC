import React, { useState, useEffect, useRef } from 'react';
import CustomSelect from './CustomSelect';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

// Initial default properties for Kurnool district
const DEFAULT_PROPERTIES = [
  {
    id: 'prop-1',
    propertyCode: 1001,
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
    propertyCode: 1002,
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
    propertyCode: 1003,
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
    propertyCode: 1004,
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
    propertyCode: 1005,
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
    propertyCode: 1006,
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
    propertyCode: 1007,
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
    propertyCode: 1008,
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
    propertyCode: 1009,
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

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
);

const AllListingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="url(#all-listings-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="all-listings-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00b4db" />
        <stop offset="100%" stopColor="#0083b0" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const ForSaleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="url(#for-sale-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="for-sale-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#11998e" />
        <stop offset="100%" stopColor="#38ef7d" />
      </linearGradient>
    </defs>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
    <line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);

const ForRentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="url(#for-rent-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="for-rent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#f5e6c8" />
      </linearGradient>
    </defs>
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
  </svg>
);

const getImagesArray = (imgField) => {
  if (!imgField) return ['/logo.jpeg'];
  if (typeof imgField === 'string' && imgField.startsWith('[')) {
    try {
      const parsed = JSON.parse(imgField);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {}
  }
  if (Array.isArray(imgField) && imgField.length > 0) return imgField;
  return [imgField];
};
// Global memory cache to store listings client-side across tab switches (SWR pattern)
let cachedListings = null;

function Marketplace({ user, setUser, setActiveTab }) {
  const [activeSubTab, setActiveSubTab] = useState(() => {
    return localStorage.getItem('sri_krishna_marketplace_sub_tab') || 'browse';
  });
  const [listings, setListings] = useState(() => {
    return cachedListings || [];
  });
  const [selectedProp, setSelectedProp] = useState(null);
  const [isLoading, setIsLoading] = useState(() => {
    return !cachedListings;
  });

  // Filters State
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('sri_krishna_marketplace_search') || '';
  });
  const [filterType, setFilterType] = useState(() => {
    return localStorage.getItem('sri_krishna_marketplace_type') || 'all';
  });
  const [filterPrice, setFilterPrice] = useState(() => {
    return localStorage.getItem('sri_krishna_marketplace_price') || 'all';
  });
  const [filterFacing, setFilterFacing] = useState(() => {
    return localStorage.getItem('sri_krishna_marketplace_facing') || 'all';
  });
  const [showMyListingsOnly, setShowMyListingsOnly] = useState(() => {
    return localStorage.getItem('sri_krishna_marketplace_my_listings') === 'true';
  });
  const [showPendingOnly, setShowPendingOnly] = useState(() => {
    return localStorage.getItem('sri_krishna_marketplace_pending_only') === 'true';
  });
  const [filterPurpose, setFilterPurpose] = useState('all'); // 'all', 'sale', 'rent'
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const filterContainerRef = useRef(null);

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

  useEffect(() => {
    localStorage.setItem('sri_krishna_marketplace_sub_tab', activeSubTab);
  }, [activeSubTab]);

  useEffect(() => {
    localStorage.setItem('sri_krishna_marketplace_search', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem('sri_krishna_marketplace_type', filterType);
  }, [filterType]);

  useEffect(() => {
    localStorage.setItem('sri_krishna_marketplace_price', filterPrice);
  }, [filterPrice]);

  useEffect(() => {
    localStorage.setItem('sri_krishna_marketplace_facing', filterFacing);
  }, [filterFacing]);

  useEffect(() => {
    localStorage.setItem('sri_krishna_marketplace_my_listings', String(showMyListingsOnly));
  }, [showMyListingsOnly]);

  useEffect(() => {
    localStorage.setItem('sri_krishna_marketplace_pending_only', String(showPendingOnly));
  }, [showPendingOnly]);

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
  const [isRental, setIsRental] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formImages, setFormImages] = useState([]); // Array of base64 strings

  // Editing State variables
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editType, setEditType] = useState('plot');
  const [editPrice, setEditPrice] = useState('');
  const [editSize, setEditSize] = useState('');
  const [editFacing, setEditFacing] = useState('East');
  const [editLocation, setEditLocation] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImages, setEditImages] = useState([]); // Array of base64 strings
  const [editContactName, setEditContactName] = useState('');
  const [editContactPhone, setEditContactPhone] = useState('');
  const [editIsRental, setEditIsRental] = useState(false);
  
  // Carousel active image indicator
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedProp]);

  // Autoplay carousel rotation when viewing property details
  useEffect(() => {
    if (!selectedProp || isEditing) return;
    const images = getImagesArray(selectedProp.image);
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImageIndex(prev => (prev + 1) % images.length);
    }, 3000); // Auto rotate every 3 seconds

    return () => clearInterval(interval);
  }, [selectedProp, activeImageIndex, isEditing]);

  const compressAndAddImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const max_width = 600;
          const scale = max_width / img.width;
          
          if (img.width > max_width) {
            canvas.width = max_width;
            canvas.height = img.height * scale;
          } else {
            canvas.width = img.width;
            canvas.height = img.height;
          }
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          const base64Data = canvas.toDataURL('image/jpeg', 0.45);
          resolve(base64Data);
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const handleEditImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (editImages.length + files.length > 5) {
      alert('You can upload a maximum of 5 photos per listing.');
      return;
    }
    
    setFormLoading(true);
    const promises = files.map(file => compressAndAddImage(file));
    const base64Results = await Promise.all(promises);
    setEditImages(prev => [...prev, ...base64Results].slice(0, 5));
    setFormLoading(false);
  };

  const handleStartEdit = () => {
    if (!selectedProp) return;
    setEditTitle(selectedProp.title);
    setEditType(selectedProp.type);
    setEditPrice(selectedProp.price);
    setEditSize(selectedProp.size);
    setEditFacing(selectedProp.facing);
    setEditLocation(selectedProp.location);
    setEditDescription(selectedProp.description);
    setEditImages(getImagesArray(selectedProp.image));
    setEditContactName(selectedProp.contactName);
    setEditContactPhone(selectedProp.contactPhone);
    setEditIsRental(selectedProp.is_rental || false);
    setIsEditing(false); // Reset editing form state first
    setIsEditing(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editTitle || !editPrice || !editSize || !editLocation || !editDescription || !editContactPhone || !editContactName) {
      alert('All fields are mandatory, including Description.');
      return;
    }
    if (editImages.length === 0) {
      alert('Please upload at least one property image.');
      return;
    }

    const FATHER_NAME = 'Murali Krishna Reddy';
    const FATHER_PHONE = '+91 8985961113';

    const finalContactName = editIsRental ? editContactName : FATHER_NAME;
    const finalContactPhone = editIsRental ? editContactPhone : FATHER_PHONE;
    const isDefaultProp = typeof selectedProp.id === 'string' && selectedProp.id.startsWith('prop-');
    const serializedImages = editImages.length > 0 ? JSON.stringify(editImages) : '/logo.jpeg';

    if (isSupabaseConfigured && user && !isDefaultProp) {
      try {
        const { error } = await supabase
          .from('properties')
          .update({
            title: editTitle,
            type: editType,
            price: editPrice,
            size: editSize,
            facing: editFacing,
            location: editLocation,
            description: editDescription,
            contact_name: finalContactName,
            contact_phone: finalContactPhone,
            image_url: serializedImages,
            is_rental: editIsRental,
            tag: editIsRental ? 'Rental' : 'Owner Listed'
          })
          .eq('id', selectedProp.id);

        if (error) throw error;
        
        const updatedProp = {
          ...selectedProp,
          title: editTitle,
          type: editType,
          price: editPrice,
          size: editSize,
          facing: editFacing,
          location: editLocation,
          description: editDescription,
          contactName: finalContactName,
          contactPhone: finalContactPhone,
          image: serializedImages,
          is_rental: editIsRental,
          tag: editIsRental ? 'Rental' : 'Owner Listed'
        };
        setSelectedProp(updatedProp);
        setIsEditing(false);
        fetchProperties();
      } catch (err) {
        alert(err.message || 'Failed to update listing.');
      }
    } else {
      if (isDefaultProp) {
        // Save edit to edited defaults list in localStorage
        const editedSaved = localStorage.getItem('sri_krishna_edited_defaults');
        let editedDefaults = [];
        if (editedSaved) {
          try {
            editedDefaults = JSON.parse(editedSaved);
          } catch (e) {}
        }
        
        const newEdit = {
          id: selectedProp.id,
          title: editTitle,
          type: editType,
          price: editPrice,
          size: editSize,
          facing: editFacing,
          location: editLocation,
          description: editDescription,
          contactName: editContactName,
          contactPhone: editContactPhone,
          is_rental: editIsRental,
          tag: editIsRental ? 'Rental' : 'Owner Listed'
        };

        // Replace existing edit or add new
        editedDefaults = editedDefaults.filter(ed => ed.id !== selectedProp.id);
        editedDefaults.push(newEdit);
        localStorage.setItem('sri_krishna_edited_defaults', JSON.stringify(editedDefaults));

        const updatedProp = {
          ...selectedProp,
          ...newEdit,
          tag: editIsRental ? 'Rental' : 'Owner Listed'
        };
        setSelectedProp(updatedProp);
        setIsEditing(false);
        fetchProperties();
      } else {
        // Local storage edit save
        const saved = localStorage.getItem('sri_krishna_marketplace_listings');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            const updated = parsed.map(p => {
              if (p.id === selectedProp.id) {
                return {
                  ...p,
                  title: editTitle,
                  type: editType,
                  price: editPrice,
                  size: editSize,
                  facing: editFacing,
                  location: editLocation,
                  description: editDescription,
                  contactName: finalContactName,
                  contactPhone: finalContactPhone,
                  image: serializedImages,
                  is_rental: editIsRental,
                  tag: editIsRental ? 'Rental' : 'Local Listing'
                };
              }
              return p;
            });
            localStorage.setItem('sri_krishna_marketplace_listings', JSON.stringify(updated));
            
            const updatedProp = {
              ...selectedProp,
              title: editTitle,
              type: editType,
              price: editPrice,
              size: editSize,
              facing: editFacing,
              location: editLocation,
              description: editDescription,
              contactName: finalContactName,
              contactPhone: finalContactPhone,
              image: serializedImages,
              is_rental: editIsRental,
              tag: editIsRental ? 'Rental' : 'Local Listing'
            };
            setSelectedProp(updatedProp);
            setIsEditing(false);
            setListings([...getProcessedDefaults().map(p => ({ ...p, approved: true })), ...updated]);
          } catch (err) {}
        }
      }
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (formImages.length + files.length > 5) {
      alert('You can upload a maximum of 5 photos per listing.');
      return;
    }
    
    setFormLoading(true);
    const promises = files.map(file => compressAndAddImage(file));
    const base64Results = await Promise.all(promises);
    setFormImages(prev => [...prev, ...base64Results].slice(0, 5));
    setFormLoading(false);
  };

  // 1. Pre-fill listing contact details when user changes
  useEffect(() => {
    if (user) {
      setFormContactName(user.user_metadata?.name || '');
      setFormContactPhone(user.user_metadata?.phone || '');
    }
  }, [user]);

  const getProcessedDefaults = () => {
    const deletedSaved = localStorage.getItem('sri_krishna_deleted_defaults');
    let deletedDefaults = [];
    if (deletedSaved) {
      try {
        deletedDefaults = JSON.parse(deletedSaved);
      } catch (e) {}
    }

    const editedSaved = localStorage.getItem('sri_krishna_edited_defaults');
    let editedDefaults = [];
    if (editedSaved) {
      try {
        editedDefaults = JSON.parse(editedSaved);
      } catch (e) {}
    }

    return DEFAULT_PROPERTIES
      .filter(p => !deletedDefaults.includes(p.id))
      .map(p => {
        const edit = editedDefaults.find(ed => ed.id === p.id);
        return edit ? { ...p, ...edit } : p;
      });
  };

  // 2. Fetch Listings (Supabase with Local Fallback)
  const fetchProperties = async () => {
    if (!cachedListings) {
      setIsLoading(true);
    }
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
          propertyCode: item.property_code,
          title: item.title,
          type: item.type,
          price: item.price,
          size: item.size,
          facing: item.facing,
          location: item.location,
          description: item.description,
          image: item.image_url || '/logo.jpeg',
          contactName: item.contact_name,
          contactPhone: item.contact_phone,
          tag: item.tag || 'Owner Listed',
          date: item.created_at.split('T')[0],
          user_id: item.user_id,
          approved: item.approved,
          is_rental: item.is_rental || false
        }));

        // Database is the single source of truth when configured.
        // We do not fall back to or merge local default properties.
        cachedListings = dbListings;
        setListings(dbListings);
      } catch (err) {
        console.error('Failed to load from Supabase database.', err);
        setListings([]);
      }
    } else {
      loadLocalFallbacks();
    }
    setIsLoading(false);
  };

  const loadLocalFallbacks = () => {
    const processedDefaults = getProcessedDefaults();
    const saved = localStorage.getItem('sri_krishna_marketplace_listings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        let updated = false;
        let nextSeq = Number(localStorage.getItem('sri_krishna_property_code_seq'));
        if (!nextSeq) {
          let maxCode = 1009;
          parsed.forEach(p => {
            const codeNum = Number(p.propertyCode);
            if (codeNum && codeNum > maxCode) {
              maxCode = codeNum;
            }
          });
          nextSeq = maxCode + 1;
        }

        const mappedParsed = parsed.map(p => {
          if (!p.propertyCode) {
            p.propertyCode = nextSeq;
            nextSeq += 1;
            updated = true;
          }
          return p;
        });

        if (updated) {
          localStorage.setItem('sri_krishna_marketplace_listings', JSON.stringify(mappedParsed));
          localStorage.setItem('sri_krishna_property_code_seq', String(nextSeq));
        }

        setListings([...processedDefaults.map(p => ({ ...p, approved: true })), ...mappedParsed]);
      } catch (e) {
        setListings(processedDefaults.map(p => ({ ...p, approved: true })));
      }
    } else {
      setListings(processedDefaults.map(p => ({ ...p, approved: true })));
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [user]);

  const formatCurrency = (val) => {
    const num = Number(val);
    if (!isNaN(num) && num > 0) {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(num);
    }
    // If it's text like '65 Lakhs', display as-is with ₹ prefix
    return val ? `₹${val}` : '₹0';
  };

  // 4. Form submission handler for new listing
  const handleAddProperty = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!formTitle || !formPrice || !formSize || !formLocation || !formDescription || !formContactPhone || !formContactName) {
      setFormError('All fields are mandatory, including Description.');
      return;
    }
    if (formImages.length === 0) {
      setFormError('Please upload at least one property image.');
      return;
    }

    setFormLoading(true);
    const isAdmin = user && user.email === 'reddygarigsr@gmail.com';
    const serializedImages = formImages.length > 0 ? JSON.stringify(formImages) : '/logo.jpeg';

    const FATHER_NAME = 'Murali Krishna Reddy';
    const FATHER_PHONE = '+91 8985961113';

    const finalContactName = isRental ? formContactName : FATHER_NAME;
    const finalContactPhone = isRental ? formContactPhone : FATHER_PHONE;

    if (isSupabaseConfigured && user) {
      // Save directly to Supabase cloud Database
      try {
        const { data, error } = await supabase
          .from('properties')
          .insert([{
            title: formTitle,
            type: formType,
            price: formPrice,
            size: formSize,
            facing: formFacing,
            location: formLocation,
            description: formDescription || 'No description provided.',
            contact_name: finalContactName,
            contact_phone: finalContactPhone,
            image_url: serializedImages,
            tag: isRental ? 'Rental' : 'Owner Listed',
            user_id: user.id,
            approved: isAdmin, // Automatically approve if listed by Admin
            is_rental: isRental
          }]);
 
        if (error) throw error;
        setFormSubmitted(true);
        fetchProperties();
      } catch (err) {
        setFormError(err.message || 'Failed to list property in cloud database.');
      }
    } else {
      // Mock / Offline LocalStorage Save
      
      // Determine the next property code sequentially
      let nextSeq = Number(localStorage.getItem('sri_krishna_property_code_seq'));
      if (!nextSeq) {
        let maxCode = 1009; // Default properties end at 1009
        const savedListings = localStorage.getItem('sri_krishna_marketplace_listings');
        if (savedListings) {
          try {
            const parsed = JSON.parse(savedListings);
            parsed.forEach(p => {
              const codeNum = Number(p.propertyCode);
              if (codeNum && codeNum > maxCode) {
                maxCode = codeNum;
              }
            });
          } catch (e) {}
        }
        nextSeq = maxCode + 1;
      }
      
      const assignedCode = nextSeq;
      localStorage.setItem('sri_krishna_property_code_seq', String(nextSeq + 1));

      const newProperty = {
        id: `custom-${Date.now()}`,
        propertyCode: assignedCode,
        title: formTitle,
        type: formType,
        price: formPrice,
        size: formSize,
        facing: formFacing,
        location: formLocation,
        description: formDescription || 'No description provided.',
        contactName: finalContactName,
        contactPhone: finalContactPhone,
        image: serializedImages,
        tag: isRental ? 'Rental' : 'Local Listing',
        date: new Date().toISOString().split('T')[0],
        user_id: user ? user.id : 'local-test-user',
        approved: isAdmin,
        is_rental: isRental
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
      setListings([...getProcessedDefaults().map(p => ({ ...p, approved: true })), ...updatedSaved]);
      setFormSubmitted(true);
    }
    
    // Reset inputs
    setFormTitle('');
    setFormPrice('');
    setFormSize('');
    setFormLocation('');
    setFormDescription('');
    setFormImages([]);
    setIsRental(false);
    setFormLoading(false);
  };

  // 5. Delete Listing handler (checks ownership or admin privileges)
  const handleDeleteListing = async (propId) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    
    const isAdmin = user && user.email === 'reddygarigsr@gmail.com';
    const isDefaultProp = typeof propId === 'string' && propId.startsWith('prop-');

    if (isSupabaseConfigured && user && !isDefaultProp) {
      try {
        const query = supabase
          .from('properties')
          .delete()
          .eq('id', propId);
        
        // If not admin, restrict deletion query to the user's own properties
        if (!isAdmin) {
          query.eq('user_id', user.id);
        }

        const { error } = await query;
        if (error) throw error;
        setSelectedProp(null);
        fetchProperties();
      } catch (err) {
        alert(err.message || 'Failed to delete listing.');
      }
    } else {
      if (isDefaultProp) {
        // Save deletion to localStorage for default properties
        const deletedSaved = localStorage.getItem('sri_krishna_deleted_defaults');
        let deletedDefaults = [];
        if (deletedSaved) {
          try {
            deletedDefaults = JSON.parse(deletedSaved);
          } catch (e) {}
        }
        if (!deletedDefaults.includes(propId)) {
          deletedDefaults.push(propId);
          localStorage.setItem('sri_krishna_deleted_defaults', JSON.stringify(deletedDefaults));
        }
        setSelectedProp(null);
        fetchProperties();
      } else {
        // Local storage delete for custom properties
        const saved = localStorage.getItem('sri_krishna_marketplace_listings');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            const filtered = parsed.filter(p => {
              if (p.id === propId) {
                // Delete only if admin or if the user is the owner
                return !isAdmin && p.user_id !== user?.id;
              }
              return true;
            });
            localStorage.setItem('sri_krishna_marketplace_listings', JSON.stringify(filtered));
            setListings([...getProcessedDefaults().map(p => ({ ...p, approved: true })), ...filtered]);
            setSelectedProp(null);
          } catch (err) {}
        }
      }
    }
  };

  // 5.1 Approve Listing handler (admin only)
  const handleApproveListing = async (propId) => {
    if (!window.confirm('Approve this listing to make it visible to the public?')) return;
    
    if (isSupabaseConfigured && user && user.email === 'reddygarigsr@gmail.com') {
      try {
        const { error } = await supabase
          .from('properties')
          .update({ approved: true })
          .eq('id', propId);

        if (error) throw error;
        setSelectedProp(null);
        fetchProperties();
      } catch (err) {
        alert(err.message || 'Failed to approve listing.');
      }
    } else {
      // Local storage approve
      const saved = localStorage.getItem('sri_krishna_marketplace_listings');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const updated = parsed.map(p => p.id === propId ? { ...p, approved: true } : p);
          localStorage.setItem('sri_krishna_marketplace_listings', JSON.stringify(updated));
          setListings([...getProcessedDefaults().map(p => ({ ...p, approved: true })), ...updated]);
          setSelectedProp(null);
        } catch (err) {}
      }
    }
  };

  // Filtering Logic
  const filteredListings = listings.filter((prop) => {
    const isAdmin = user && user.email === 'reddygarigsr@gmail.com';
    const isPropApproved = prop.approved !== false; // Default true for hardcoded defaults

    // If "Pending Approval" tab is active (only admin can access it)
    if (showPendingOnly) {
      return !isPropApproved; // Show only unapproved listings
    }

    // If "My Listings" tab is selected, filter strictly by user ownership (approved and pending)
    if (showMyListingsOnly) {
      return prop.user_id === user?.id;
    }

    // Otherwise, this is the public Browse view
    // Unapproved listings are NEVER shown here (must use My Listings or Pending Approval tabs)
    if (!isPropApproved) {
      return false;
    }

    // Filter by Buy vs Rent
    if (filterPurpose === 'sale' && prop.is_rental) {
      return false;
    }
    if (filterPurpose === 'rent' && !prop.is_rental) {
      return false;
    }

    if (searchQuery) {
      const query = searchQuery.trim().toLowerCase().replace(/[:\s]+/g, '');
      const cleanId = prop.propertyCode ? String(prop.propertyCode) : '';
      const cleanIdPrefixed = `id${cleanId}`;
      const textToSearch = `${prop.title} ${prop.location} ${prop.description}`.toLowerCase().replace(/[:\s]+/g, '');

      const matchText = textToSearch.includes(query);
      const matchId = cleanId && cleanId.includes(query);
      const matchPrefixedId = cleanIdPrefixed && cleanIdPrefixed.includes(query);

      if (!matchText && !matchId && !matchPrefixedId) {
        return false;
      }
    }
    if (filterType !== 'all' && prop.type !== filterType) {
      return false;
    }
    if (filterFacing !== 'all' && prop.facing !== filterFacing) {
      return false;
    }
    if (filterPrice !== 'all') {
      const price = Number(prop.price) || 0;
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
      <div className="panel marketplace-tabs-header">
        <button 
          className={`filter-btn ${activeSubTab === 'browse' && !showMyListingsOnly && !showPendingOnly ? 'active' : ''}`}
          onClick={() => { setActiveSubTab('browse'); setShowMyListingsOnly(false); setShowPendingOnly(false); setFormSubmitted(false); }}
          style={{ fontSize: '0.85rem', padding: '8px 16px' }}
        >
          Browse Properties
        </button>
        {user && (
          <button 
            className={`filter-btn ${activeSubTab === 'browse' && showMyListingsOnly ? 'active' : ''}`}
            onClick={() => { setActiveSubTab('browse'); setShowMyListingsOnly(true); setShowPendingOnly(false); setFormSubmitted(false); }}
            style={{ fontSize: '0.85rem', padding: '8px 16px' }}
          >
            My Listings
          </button>
        )}
        {user && user.email === 'reddygarigsr@gmail.com' && (
          <button 
            className={`filter-btn ${activeSubTab === 'browse' && showPendingOnly ? 'active' : ''}`}
            onClick={() => { setActiveSubTab('browse'); setShowMyListingsOnly(false); setShowPendingOnly(true); setFormSubmitted(false); }}
            style={{ fontSize: '0.85rem', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px', borderColor: 'var(--accent-gold)', color: 'var(--accent-gold)' }}
          >
            🔒 Pending Approval
          </button>
        )}
        <button 
          className={`filter-btn ${activeSubTab === 'list' ? 'active' : ''}`}
          onClick={() => { setActiveSubTab('list'); setShowMyListingsOnly(false); setShowPendingOnly(false); }}
          style={{ fontSize: '0.85rem', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <PlusIcon /> List Your Property
        </button>
      </div>

      {activeSubTab === 'browse' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Segmented Buy / Rent Purpose Filter */}
          <div style={{ display: 'flex', gap: '10px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '6px' }}>
            <button
              className={`filter-btn ${filterPurpose === 'all' ? 'active' : ''}`}
              onClick={() => setFilterPurpose('all')}
              style={{ flex: 1, fontSize: '0.8rem', padding: '8px 0', border: 'none', borderRadius: '6px', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}
            >
              <AllListingsIcon />
              <span>All Listings</span>
            </button>
            <button
              className={`filter-btn ${filterPurpose === 'sale' ? 'active' : ''}`}
              onClick={() => setFilterPurpose('sale')}
              style={{ flex: 1, fontSize: '0.8rem', padding: '8px 0', border: 'none', borderRadius: '6px', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}
            >
              <ForSaleIcon />
              <span>For Sale</span>
            </button>
            <button
              className={`filter-btn ${filterPurpose === 'rent' ? 'active' : ''}`}
              onClick={() => setFilterPurpose('rent')}
              style={{ flex: 1, fontSize: '0.8rem', padding: '8px 0', border: 'none', borderRadius: '6px', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}
            >
              <ForRentIcon />
              <span>For Rent</span>
            </button>
          </div>
          
          {/* Filters Panel */}
          <div className="panel" style={{ padding: '16px' }} ref={filterContainerRef}>
            <div className="filters-grid-wrapper">
              
              {/* Search Bar & Toggle Button */}
              <div className="search-filter-row">
                <div style={{ position: 'relative', flex: 1 }}>
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
                
                <button 
                  className={`filter-toggle-btn ${showMobileFilters ? 'active' : ''}`}
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  type="button"
                >
                  <FilterIcon /> 
                  <span>Filters</span>
                  {(filterType !== 'all' || filterPrice !== 'all' || filterFacing !== 'all') && (
                    <span className="filter-active-badge"></span>
                  )}
                </button>
              </div>

              {/* Filtering dropdowns */}
              <div className={`marketplace-filters-container ${showMobileFilters ? 'mobile-show' : ''}`}>
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
            <div className="panel" style={{ padding: '80px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(197, 168, 128, 0.15)',
                borderTopColor: 'var(--accent-gold)',
                borderRadius: '50%',
                animation: 'btn-spin 1s linear infinite'
              }}></div>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Loading premium listings...</span>
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '20px' }}>
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
                      src={getImagesArray(prop.image)[0]} 
                      alt={prop.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} 
                    />
                    <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px', flexDirection: 'row', flexWrap: 'wrap' }}>
                      <div style={{ background: 'rgba(11,15,23,0.8)', border: '1px solid var(--accent-gold)', borderRadius: '4px', padding: '4px 8px', fontSize: '0.65rem', fontWeight: '700', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <TagIcon /> {prop.tag}
                      </div>
                      {prop.propertyCode && (
                        <div style={{ background: 'rgba(11,15,23,0.8)', border: '1px solid var(--accent-gold)', borderRadius: '4px', padding: '4px 8px', fontSize: '0.65rem', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center' }}>
                          ID: {prop.propertyCode}
                        </div>
                      )}
                    </div>
                    {prop.approved === false && (
                      <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(239, 68, 68, 0.95)', border: '1px solid var(--accent-red)', borderRadius: '4px', padding: '4px 8px', fontSize: '0.65rem', fontWeight: '700', color: '#fff' }}>
                        ⚠️ Pending Approval
                      </div>
                    )}
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
              onClick={() => { setSelectedProp(null); setIsEditing(false); }}
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
                {isEditing ? (
                  <form onSubmit={handleSaveEdit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', color: 'var(--accent-gold)' }}>Edit Property Details</h3>
                    
                    <div className="form-group">
                      <label>Listing Title</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        required 
                      />
                    </div>

                    <div className="form-row" style={{ gap: '12px' }}>
                      <div className="form-group">
                        <label>Property Type</label>
                        <CustomSelect 
                          value={editType}
                          onChange={setEditType}
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
                          value={editFacing}
                          onChange={setEditFacing}
                          options={[
                            { value: 'East', label: 'East Facing' },
                            { value: 'West', label: 'West Facing' },
                            { value: 'North', label: 'North Facing' },
                            { value: 'South', label: 'South Facing' }
                          ]}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <input 
                        type="checkbox" 
                        id="edit-is-rental-checkbox"
                        checked={editIsRental}
                        onChange={(e) => setEditIsRental(e.target.checked)}
                        style={{ cursor: 'pointer', width: '16px', height: '16px', margin: 0 }}
                      />
                      <label htmlFor="edit-is-rental-checkbox" style={{ fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', margin: 0, userSelect: 'none', color: 'var(--accent-gold)' }}>
                        List as a Rental Property (For Rent)
                      </label>
                    </div>

                    <div className="form-row" style={{ gap: '12px' }}>
                      <div className="form-group">
                        <label>{editIsRental ? 'Monthly Rent (INR)' : 'Asking Price (INR)'}</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder={editIsRental ? 'e.g. 15,000 or 12k per month' : 'e.g. 65,00,000 or 65 Lakhs'}
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          required 
                        />
                      </div>

                      <div className="form-group">
                        <label>Property Size</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={editSize}
                          onChange={(e) => setEditSize(e.target.value)}
                          required 
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Location / Address</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={editLocation}
                        onChange={(e) => setEditLocation(e.target.value)}
                        required 
                      />
                    </div>

                    <div className="form-group">
                      <label>Detailed Description</label>
                      <textarea 
                        className="form-input" 
                        rows="3" 
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Update Images (Required, Max 5 photos)</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        className="form-input"
                        onChange={handleEditImageUpload}
                        multiple
                        style={{ background: 'transparent', border: '1px dashed var(--border-color)', padding: '5px' }}
                        disabled={editImages.length >= 5}
                      />
                      {editImages.length > 0 && (
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                          {editImages.map((imgUrl, idx) => (
                            <div 
                              key={idx} 
                              style={{ 
                                position: 'relative', 
                                height: '60px', 
                                width: '90px', 
                                borderRadius: '4px', 
                                overflow: 'hidden', 
                                border: '1px solid var(--border-color)' 
                              }}
                            >
                              <img src={imgUrl} alt={`Edit Preview ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <button
                                type="button"
                                onClick={() => setEditImages(prev => prev.filter((_, i) => i !== idx))}
                                style={{ 
                                  position: 'absolute', 
                                  top: '2px', 
                                  right: '2px', 
                                  width: '16px', 
                                  height: '16px', 
                                  borderRadius: '50%', 
                                  background: 'rgba(239, 68, 68, 0.9)', 
                                  border: 'none', 
                                  color: '#fff', 
                                  fontSize: '0.65rem', 
                                  cursor: 'pointer', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center' 
                                }}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                      <h5 style={{ color: 'var(--accent-gold)', marginBottom: '10px' }}>Private Contact Information</h5>
                      <div className="form-row" style={{ gap: '12px' }}>
                        <div className="form-group">
                          <label>Owner Name</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            value={editContactName}
                            onChange={(e) => setEditContactName(e.target.value)}
                            required 
                          />
                        </div>
                        <div className="form-group">
                          <label>Phone number(whatsapp)</label>
                          <input 
                            type="tel" 
                            className="form-input" 
                            value={editContactPhone}
                            onChange={(e) => setEditContactPhone(e.target.value)}
                            required 
                          />
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'flex-end' }}>
                      <button 
                        type="button" 
                        className="filter-btn" 
                        onClick={() => setIsEditing(false)}
                        style={{ padding: '8px 20px', cursor: 'pointer' }}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="gold-button"
                        style={{ padding: '8px 20px', cursor: 'pointer' }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div style={{ height: '300px', position: 'relative', background: '#090c12', overflow: 'hidden' }}>
                      <img 
                        src={getImagesArray(selectedProp.image)[activeImageIndex] || '/logo.jpeg'} 
                        alt={selectedProp.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                      <button 
                        onClick={() => { setSelectedProp(null); setIsEditing(false); }}
                        style={{ position: 'absolute', top: '15px', right: '15px', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(11,15,23,0.8)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', zIndex: 10, justifyContent: 'center' }}
                      >
                        ×
                      </button>

                      {/* Carousel controls */}
                      {getImagesArray(selectedProp.image).length > 1 && (
                        <>
                          <button 
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => (prev - 1 + getImagesArray(selectedProp.image).length) % getImagesArray(selectedProp.image).length); }}
                            style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(11,15,23,0.7)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', zIndex: 10, justifyContent: 'center' }}
                          >
                            ‹
                          </button>
                          <button 
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => (prev + 1) % getImagesArray(selectedProp.image).length); }}
                            style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(11,15,23,0.7)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', zIndex: 10, justifyContent: 'center' }}
                          >
                            ›
                          </button>
                        </>
                      )}

                      <div style={{ position: 'absolute', bottom: '15px', left: '15px', background: 'var(--accent-gold)', color: '#0b0f17', fontWeight: '800', fontSize: '1.1rem', padding: '6px 14px', borderRadius: '4px', zIndex: 5 }}>
                        {formatCurrency(selectedProp.price)}
                      </div>
                    </div>

                    {/* Thumbnails Row */}
                    {getImagesArray(selectedProp.image).length > 1 && (
                      <div style={{ display: 'flex', gap: '8px', padding: '12px 24px 0', overflowX: 'auto', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border-color)' }}>
                        {getImagesArray(selectedProp.image).map((imgUrl, idx) => (
                          <div 
                            key={idx}
                            onClick={() => setActiveImageIndex(idx)}
                            style={{ 
                              width: '60px', 
                              height: '45px', 
                              borderRadius: '4px', 
                              overflow: 'hidden', 
                              border: idx === activeImageIndex ? '2px solid var(--accent-gold)' : '1px solid var(--border-color)', 
                              cursor: 'pointer',
                              flexShrink: 0
                            }}
                          >
                            <img src={imgUrl} alt="Thumbnail preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: '700', letterSpacing: '1.5px' }}>
                            {selectedProp.type} Property • {selectedProp.facing} Facing
                          </span>
                          {selectedProp.propertyCode && (
                            <span style={{ display: 'inline-block', marginLeft: '10px', background: 'rgba(197,168,128,0.15)', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)', borderRadius: '4px', padding: '2px 6px', fontSize: '0.65rem', fontWeight: '700' }}>
                              ID: {selectedProp.propertyCode}
                            </span>
                          )}
                          {selectedProp.approved === false && (
                            <span style={{ display: 'inline-block', marginLeft: '10px', background: 'rgba(239,68,68,0.15)', border: '1px solid var(--accent-red)', color: 'var(--accent-red)', borderRadius: '4px', padding: '2px 6px', fontSize: '0.65rem', fontWeight: '700' }}>
                              Pending Approval
                            </span>
                          )}
                          <h3 style={{ fontSize: '1.3rem', marginTop: '4px' }}>{selectedProp.title}</h3>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>📍 {selectedProp.location}</p>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                          {/* Approve button: Only visible to the admin if the property is unapproved */}
                          {user && user.email === 'reddygarigsr@gmail.com' && selectedProp.approved === false && (
                            <button 
                              onClick={() => handleApproveListing(selectedProp.id)}
                              className="gold-button" 
                              style={{ padding: '6px 12px', fontSize: '0.75rem', cursor: 'pointer' }}
                            >
                              ✓ Approve
                            </button>
                          )}

                          {/* Edit button: Visible to owner OR admin */}
                          {user && (user.email === 'reddygarigsr@gmail.com' || selectedProp.user_id === user.id) && (
                            <button 
                              onClick={handleStartEdit}
                              className="filter-btn" 
                              style={{ borderColor: 'var(--accent-gold)', color: 'var(--accent-gold)', padding: '6px 12px', fontSize: '0.75rem', cursor: 'pointer' }}
                            >
                              Edit Details
                            </button>
                          )}
                          
                          {/* Delete button: Visible to owner OR admin */}
                          {user && (user.email === 'reddygarigsr@gmail.com' || selectedProp.user_id === user.id) && (
                            <button 
                              onClick={() => handleDeleteListing(selectedProp.id)}
                              className="filter-btn" 
                              style={{ borderColor: 'var(--accent-red)', color: 'var(--accent-red)', padding: '6px 12px', fontSize: '0.75rem', cursor: 'pointer' }}
                            >
                              Delete Listing
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="form-row" style={{ gap: '10px', background: '#1c2436', padding: '12px 16px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
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
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                              Phone: {selectedProp.contactPhone}
                            </p>
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
                  </>
                )}

              </div>
            </div>
          )}

        </div>
      ) : (
        /* List Your Property Tab (Enforces Authentication) */
        !user ? (
          /* Render Login Prompt */
          <div className="panel" style={{ maxWidth: '480px', margin: '40px auto', width: '100%', textAlign: 'center', padding: '40px 20px' }}>
            <span style={{ fontSize: '2.5rem', color: 'var(--accent-gold)', display: 'block', marginBottom: '15px' }}>🔒</span>
            <h4 style={{ marginBottom: '10px' }}>Login Required</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '20px' }}>
              You must be logged in to submit a property listing. Create an account or log in with your Google account to proceed.
            </p>
            <button 
              onClick={() => setActiveTab('login')} 
              className="gold-button"
              style={{ width: '100%', padding: '12px' }}
            >
              Login / Create Account
            </button>
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

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <input 
                      type="checkbox" 
                      id="is-rental-checkbox"
                      checked={isRental}
                      onChange={(e) => setIsRental(e.target.checked)}
                      style={{ cursor: 'pointer', width: '16px', height: '16px', margin: 0 }}
                    />
                    <label htmlFor="is-rental-checkbox" style={{ fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', margin: 0, userSelect: 'none', color: 'var(--accent-gold)' }}>
                      List as a Rental Property (For Rent)
                    </label>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>{isRental ? 'Monthly Rent (INR)' : 'Asking Price (INR)'}</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder={isRental ? 'e.g. 15,000 or 12k per month' : 'e.g. 65,00,000 or 65 Lakhs'}
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
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Property Images (Required, Max 5 photos)</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="form-input"
                      onChange={handleImageUpload}
                      multiple
                      style={{ background: 'transparent', border: '1px dashed var(--border-color)', padding: '10px' }}
                      disabled={formImages.length >= 5}
                    />
                    {formImages.length > 0 && (
                      <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
                        {formImages.map((imgUrl, idx) => (
                          <div 
                            key={idx} 
                            style={{ 
                              position: 'relative', 
                              height: '80px', 
                              width: '120px', 
                              borderRadius: '4px', 
                              overflow: 'hidden', 
                              border: '1px solid var(--border-color)' 
                            }}
                          >
                            <img src={imgUrl} alt={`Preview ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <button
                              type="button"
                              onClick={() => setFormImages(prev => prev.filter((_, i) => i !== idx))}
                              style={{ 
                                position: 'absolute', 
                                top: '4px', 
                                right: '4px', 
                                width: '20px', 
                                height: '20px', 
                                borderRadius: '50%', 
                                background: 'rgba(239, 68, 68, 0.9)', 
                                border: 'none', 
                                color: '#fff', 
                                fontSize: '0.75rem', 
                                cursor: 'pointer', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
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
                        <label>Phone number(whatsapp)</label>
                        <input 
                          type="tel" 
                          className="form-input" 
                          placeholder="Enter your phone number"
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
