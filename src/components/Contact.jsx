import React, { useState } from 'react';
import CustomSelect from './CustomSelect';

// Icons
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

function Contact({ prefilledPlot, setPrefilledPlot }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState(prefilledPlot ? 'plot-booking' : 'construction');
  const [message, setMessage] = useState(prefilledPlot ? `I am interested in inquiring about Plot Layout Booking for Plot: ${prefilledPlot}` : '');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) return;
    
    setIsSubmitting(true);
    setErrorMsg('');

    // Web3Forms Access Token Setup:
    // To enable email alerts, register your email at https://web3forms.com
    // And paste the access key below (e.g. "a1b2c3d4-e5f6...")
    const accessKey = "d7754fef-60e5-4c01-80c5-000588d927ce"; 

    if (accessKey === "YOUR_ACCESS_KEY_HERE") {
      console.warn("Web3Forms Access Key is not configured. Simulating success message.");
      setTimeout(() => {
        setSubmitted(true);
        setIsSubmitting(false);
      }, 800);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name,
          email: email,
          phone: phone,
          inquiry_type: type,
          message: message
        })
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg("Failed to send inquiry. Please check details and try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="panel full-width-card">
      <div className="panel-header">
        <h3 className="panel-title"><PhoneIcon /> Contact Us</h3>
        <span className="brand-tagline">Sri Krishna Client Relations</span>
      </div>
      <div className="panel-content">
        <div className="contact-grid">
          
          {/* Contact form */}
          {submitted ? (
            <div style={{ padding: '40px', textAlign: 'center', background: '#1c2436', borderRadius: '6px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '2.5rem', color: 'var(--accent-green)' }}>✓</span>
              <h4 style={{ marginTop: '15px' }}>Quote Request Submitted Successfully</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '380px' }}>
                Thank you for reaching out, {name}. Our building consultants will review your site details and contact you within 24 business hours.
              </p>
              <button className="gold-button" style={{ marginTop: '20px' }} onClick={() => setSubmitted(false)}>
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="form-group">
                <label>Your Full Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter your name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    placeholder="Enter phone number" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email (Optional)</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="Enter email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Inquiry Type</label>
                <CustomSelect 
                  value={type} 
                  onChange={setType} 
                  options={[
                    { value: 'construction', label: 'Residential/Commercial Construction Quote' },
                    { value: 'plot-booking', label: 'Plot Booking / Purchase (SriKrishna X1)' },
                    { value: 'legal', label: 'Legal title verification / Approvals' }
                  ]}
                />
              </div>

              {type === 'plot-booking' && (
                <div className="form-group">
                  <label>Target Plot Reference</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. P-04" 
                    value={prefilledPlot}
                    onChange={(e) => setPrefilledPlot(e.target.value)}
                  />
                </div>
              )}

              <div className="form-group">
                <label>Message / Site Specifications</label>
                <textarea 
                  className="form-input" 
                  rows="4" 
                  placeholder="Provide specifications like land area, dimensions, or target plots..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {errorMsg && (
                <p style={{ color: 'var(--accent-red)', fontSize: '0.85rem', marginBottom: '15px' }}>
                  {errorMsg}
                </p>
              )}

              <button 
                type="submit" 
                className="gold-button" 
                style={{ alignSelf: 'flex-start', padding: '12px 28px' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          )}

          {/* Contact Details stack */}
          <div className="info-cards-stack">
            <div className="info-item-card">
              <span className="info-icon-wrapper"><PhoneIcon /></span>
              <div className="info-meta">
                <h5>R. Murali Krishna Reddy</h5>
                <p>+91 8985961113</p>
              </div>
            </div>

            <div className="info-item-card">
              <span className="info-icon-wrapper"><MailIcon /></span>
              <div className="info-meta">
                <h5>Official Email ID</h5>
                <p>contact.srikrishnarealestate@gmail.com</p>
              </div>
            </div>

            <div className="info-item-card">
              <span className="info-icon-wrapper"><MapPinIcon /></span>
              <div className="info-meta">
                <h5>Office Address</h5>
                <p>Bellary Rd, beside Union Bank, A.P. Transco Office, Sampath Nagar, Kurnool, Andhra Pradesh 518003</p>
              </div>
            </div>

            <div className="panel" style={{ padding: '16px', background: 'rgba(197,168,128,0.02)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h5 style={{ color: 'var(--accent-gold)' }}>Office Location & Directions:</h5>
              <div style={{ width: '100%', height: '150px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <iframe 
                  title="Office Location Map"
                  width="100%" 
                  height="100%" 
                  src="https://maps.google.com/maps?q=Sri%20Krishna%20Real%20Estate%20and%20constructions,%20Kurnool&t=&z=17&ie=UTF8&iwloc=&output=embed" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight="0" 
                  marginWidth="0"
                ></iframe>
              </div>
              <a 
                href="https://www.google.com/maps/place/Sri+Krishna+Real+Estate+and+constructions/@15.8248931,78.0251376,20z/data=!4m6!3m5!1s0x3bb5e7fc9d3ec739:0xe1c8cbe8a6be65ee!8m2!3d15.8248931!4d78.0251376!16s%2Fg%2F11n4spxvf9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="gold-button"
                style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center', fontSize: '0.8rem', padding: '8px 16px' }}
              >
                Get Directions on Google Maps
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;
