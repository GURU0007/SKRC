import React, { useState, useEffect, useRef } from 'react';

const LegacyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#hero-legacy-gold-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="hero-legacy-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#f5e6c8" />
      </linearGradient>
    </defs>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"/>
    <path d="M12 2a5 5 0 0 0-5 5v5a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z"/>
  </svg>
);

const RegistryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#hero-reg-blue-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="hero-reg-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00b4db" />
        <stop offset="100%" stopColor="#0083b0" />
      </linearGradient>
    </defs>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#hero-leaf-green-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="hero-leaf-green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#11998e" />
        <stop offset="100%" stopColor="#38ef7d" />
      </linearGradient>
    </defs>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58 0 8a13 13 0 0 1-8 10Z"/>
    <path d="M9 10H4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-5"/>
  </svg>
);

const SolarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#hero-solar-gold-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="hero-solar-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#f5e6c8" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M20 12h2"/><path d="M2 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
  </svg>
);

const IoTIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#hero-iot-blue-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="hero-iot-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00b4db" />
        <stop offset="100%" stopColor="#0083b0" />
      </linearGradient>
    </defs>
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 18h6"/><path d="M10 6h4"/><path d="M8 10h8"/><path d="M12 14v4"/>
  </svg>
);

const CompassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#hero-comp-green-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="hero-comp-green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#11998e" />
        <stop offset="100%" stopColor="#38ef7d" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
);

const ArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
);

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

const sliderSlides = [
  {
    image: 'sk_villa.jpg',
    alt: 'Sri Krishna Legacy & Trust',
    title: <>Building Legacies, <span>Engineering Trust</span></>,
    desc: 'Over 15 years of construction legacy in real estate Industry, delivering structural excellence, premium residential properties, and transparent legal registry titles.',
    points: [
      { icon: <LegacyIcon />, val: '15+ Years', lbl: 'Industry Legacy' },
      { icon: <RegistryIcon />, val: '100% Clear', lbl: 'Legal Registry Titles' },
      { icon: <LeafIcon />, val: 'Premium Quality', lbl: 'Pixel-Precise Builds' }
    ]
  },
  {
    image: 'slider_solar_villa.jpg',
    alt: 'Sri Krishna Green Solar energy integration',
    title: <>Clean Solar Energy <span>& Net Metering</span></>,
    desc: 'Modern villas integrated with high-efficiency rooftop monocrystalline solar panels. Export surplus energy to the government grid to offset monthly utility bills.',
    points: [
      { icon: <SolarIcon />, val: 'Rooftop Panels', lbl: 'solar panels' },
      { icon: <SolarIcon />, val: 'Grid Sync', lbl: 'Net Metering Ready' },
      { icon: <LeafIcon />, val: 'Eco-Friendly', lbl: 'Zero Emissions Living' }
    ]
  },
  {
    image: 'slider_smart_home.jpg',
    alt: 'Sri Krishna IoT Smart Home Automation',
    title: <>Smart IoT <span>Home Automation</span></>,
    desc: 'Modern smart home automation backbones. Control lights, fans, air conditioners, and water heaters directly from your phone or with voice assistants.',
    points: [
      { icon: <IoTIcon />, val: 'Smart App Switches', lbl: 'Control From Anywhere' },
      { icon: <IoTIcon />, val: 'Voice Commands', lbl: 'Alexa & Google Sync' },
      { icon: <SolarIcon />, val: 'Power Scheduling', lbl: 'Automated Timers' }
    ]
  },
  {
    image: 'slider_layout.jpg',
    alt: 'Sri Krishna Gated land layouts',
    title: <>Premium Gated <span>Land Layouts</span></>,
    desc: 'Beautiful land layouts at Kurnool. Ready for immediate build with modern layouts, DTCP approvals, and complete civil infrastructure.',
    points: [
      { icon: <CompassIcon />, val: 'DTCP Approved', lbl: 'Approved Sanctions' },
      { icon: <CompassIcon />, val: '33-Ft Concrete', lbl: 'Wide Gated Roads' },
      { icon: <RegistryIcon />, val: 'Water & Drains', lbl: 'Complete Infrastructure' }
    ]
  }
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isForceResume, setIsForceResume] = useState(false);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isHovered && !isForceResume) {
        return;
      }
      setCurrentSlide((prev) => (prev + 1) % sliderSlides.length);
    }, 4500); // Rotate every 4.5 seconds for a premium feel
    return () => clearInterval(timer);
  }, [isHovered, isForceResume]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsForceResume(false);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsForceResume(true);
    }, 15000); // Max 15 seconds pause limit
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsForceResume(false);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handlePrevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? sliderSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % sliderSlides.length);
  };

  const activeSlide = sliderSlides[currentSlide];

  return (
    <section className="hero-section">
      {/* Animated Text Section - key attribute triggers unmount/remount for smooth transition animations */}
      <div key={currentSlide} className="hero-content hero-text-fade-in">
        <h1 className="hero-title">{activeSlide.title}</h1>
        <p className="hero-desc">{activeSlide.desc}</p>
        <div className="hero-stats">
          {activeSlide.points.map((pt, idx) => (
            <div key={idx} className="stat-item">
              <div className="stat-icon-wrapper">
                {pt.icon}
              </div>
              <div className="stat-text-wrapper">
                <span className="stat-val">{pt.val}</span>
                <span className="stat-lbl">{pt.lbl}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Auto-playing Image Carousel */}
      <div 
        className="hero-image-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="hero-image-wrapper">
          {sliderSlides.map((slide, index) => (
            <img
              key={index}
              src={`${import.meta.env.BASE_URL}${slide.image}`}
              alt={slide.alt}
              className={`hero-img slider-img ${index === currentSlide ? 'active' : ''}`}
            />
          ))}
          
          {/* Slider Indicators (Pill/Dots overlay) */}
          <div className="slider-dots">
            {sliderSlides.map((_, index) => (
              <span
                key={index}
                className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          
          {/* Left/Right manual navigation arrows */}
          <button 
            className="slider-arrow prev" 
            onClick={handlePrevSlide} 
            aria-label="Previous Slide"
          >
            <ArrowLeft />
          </button>
          <button 
            className="slider-arrow next" 
            onClick={handleNextSlide} 
            aria-label="Next Slide"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
