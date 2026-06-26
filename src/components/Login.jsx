import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

function Login({ user, setUser }) {
  const [authStep, setAuthStep] = useState('email'); // 'email', 'password', 'otp'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);

  const handleAuthError = (err) => {
    if (!err) return;
    let msg = err.message || String(err);
    if (msg === '{}' || msg === '[object Object]') {
      msg = 'Error sending verification code. Please check your Supabase Auth settings and make sure your Gmail SMTP password is correct.';
    }
    setAuthError(msg);
  };

  // Step 1: Check if Email exists
  const handleCheckEmail = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    let exists = false;

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.rpc('check_email_exists', {
          user_email: authEmail
        });
        
        if (error) {
          // Fallback if RPC doesn't exist: assume existing user so they can try password first
          console.warn("RPC check_email_exists not found. Defaulting to existing user flow.");
          exists = true;
        } else {
          exists = data;
        }
      } catch (err) {
        exists = true;
      }
    } else {
      // Sandbox fallback: assume testowner@gmail.com is existing, others are new
      exists = authEmail === 'testowner@gmail.com';
    }

    setIsExistingUser(exists);

    if (exists) {
      // Existing User -> Proceed to password prompt
      setAuthStep('password');
      setAuthLoading(false);
    } else {
      // New User -> Send OTP code and proceed to OTP verification
      if (isSupabaseConfigured) {
        const { error } = await supabase.auth.signInWithOtp({
          email: authEmail,
          options: {
            shouldCreateUser: true,
            emailRedirectTo: window.location.origin
          }
        });

        if (error) {
          handleAuthError(error);
          setAuthLoading(false);
          return;
        }
      } else {
        // Sandbox mock OTP send
        setAuthError('Sandbox Mode: Use code 123456 to verify.');
      }
      setAuthStep('otp');
      setAuthLoading(false);
    }
  };

  // Step 2A: Verify Password (Existing Users)
  const handleVerifyPassword = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword
        });

        if (error) {
          const errMsg = error.message || String(error);
          if (errMsg && typeof errMsg === 'string' && errMsg.toLowerCase().includes('invalid')) {
            setAuthError('Incorrect password. Please enter correct password.');
          } else {
            handleAuthError(error);
          }
        } else {
          setUser(data?.user || data?.session?.user || null);
          setAuthEmail('');
          setAuthPassword('');
          setAuthStep('email');
        }
      } else {
        // Sandbox mock password verify
        setTimeout(() => {
          if (authPassword === 'password') {
            setUser({
              id: 'mock-sandbox-user-id',
              email: authEmail,
              user_metadata: {
                name: authEmail.split('@')[0],
                phone: '+91 8985961113'
              }
            });
            setAuthEmail('');
            setAuthPassword('');
            setAuthStep('email');
          } else {
            setAuthError('Incorrect password. Please enter correct password.');
          }
          setAuthLoading(false);
        }, 800);
        return;
      }
    } catch (err) {
      console.error("Error in handleVerifyPassword:", err);
      const errMsg = err.message || String(err);
      if (errMsg && typeof errMsg === 'string' && errMsg.toLowerCase().includes('invalid')) {
        setAuthError('Incorrect password. Please enter correct password.');
      } else {
        setAuthError(errMsg);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Step 2B: Verify OTP Code (New Users or Existing Users selecting OTP)
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    if (isSupabaseConfigured) {
      let { data, error } = await supabase.auth.verifyOtp({
        email: authEmail,
        token: otpCode,
        type: 'email'
      });

      let finalData = data;

      if (error) {
        // Fallback to signup type
        const retry = await supabase.auth.verifyOtp({
          email: authEmail,
          token: otpCode,
          type: 'signup'
        });
        if (retry.error) {
          handleAuthError(retry.error);
          setAuthLoading(false);
          return;
        }
        finalData = retry.data;
      }

      setUser(finalData?.user || finalData?.session?.user || null);
      setAuthEmail('');
      setOtpCode('');
      setAuthStep('email');
    } else {
      // Sandbox mock OTP verify
      setTimeout(() => {
        if (otpCode === '123456') {
          setUser({
            id: 'mock-sandbox-user-id',
            email: authEmail,
            user_metadata: {
              name: authEmail.split('@')[0],
              phone: '+91 8985961113'
            }
          });
          setAuthEmail('');
          setOtpCode('');
          setAuthStep('email');
        } else {
          setAuthError('Invalid code. Use 123456 for sandbox testing.');
        }
        setAuthLoading(false);
      }, 800);
      return;
    }
    setAuthLoading(false);
  };

  // Trigger OTP for Existing User (when they click "Try another way")
  const handleSendOtpForExisting = async () => {
    setAuthError('');
    setAuthLoading(true);

    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signInWithOtp({
        email: authEmail,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: window.location.origin
        }
      });
      if (error) {
        // Fallback for new users: retry with shouldCreateUser: true if signup is required/blocked
        if (error.message && (error.message.includes('Signups not allowed') || error.message.includes('signup') || error.message.includes('not allowed'))) {
          const retry = await supabase.auth.signInWithOtp({
            email: authEmail,
            options: {
              shouldCreateUser: true,
              emailRedirectTo: window.location.origin
            }
          });
          if (retry.error) {
            handleAuthError(retry.error);
            setAuthLoading(false);
            return;
          }
        } else {
          handleAuthError(error);
          setAuthLoading(false);
          return;
        }
      }
    } else {
      setAuthError('Sandbox Mode: Use code 123456 to verify.');
    }
    setAuthStep('otp');
    setAuthLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setAuthError('');
    setAuthLoading(true);
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) {
        setAuthError(error.message);
        setAuthLoading(false);
      }
    } else {
      setTimeout(() => {
        setUser({
          id: 'mock-google-user-id',
          email: 'testowner@gmail.com',
          user_metadata: {
            name: 'Kurnool Owner (Google)',
            phone: '+91 8985961113'
          }
        });
        setAuthLoading(false);
      }, 800);
    }
  };

  const getPanelTitle = () => {
    if (authStep === 'email') return 'Sign In / Register';
    if (authStep === 'password') return 'Enter Password';
    if (authStep === 'otp') return 'Enter Verification Code';
    return 'Sign In';
  };

  return (
    <div className="panel" style={{ maxWidth: '450px', margin: '40px auto', width: '100%' }}>
      <div className="panel-header" style={{ justifyContent: 'center' }}>
        <h3 className="panel-title">{getPanelTitle()}</h3>
      </div>
      <div className="panel-content">
        
        {authStep === 'email' && (
          <>
            {/* Google OAuth */}
            <button 
              type="button"
              onClick={handleGoogleSignIn}
              className="filter-btn" 
              style={{ 
                width: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '10px', 
                padding: '12px 14px', 
                fontSize: '0.9rem',
                color: '#fff',
                borderColor: 'var(--accent-gold)',
                background: 'rgba(197, 168, 128, 0.05)',
                cursor: 'pointer',
                marginBottom: '15px',
                borderRadius: '6px',
                transition: 'all 0.2s ease'
              }}
              disabled={authLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <strong>Continue with Google</strong>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', color: 'var(--text-secondary)' }}>
              <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--border-color)' }} />
              <span style={{ padding: '0 10px', fontSize: '0.75rem' }}>OR SIGN IN WITH EMAIL</span>
              <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--border-color)' }} />
            </div>
          </>
        )}

        <form 
          onSubmit={
            authStep === 'email' 
              ? handleCheckEmail 
              : authStep === 'password' 
                ? handleVerifyPassword 
                : handleVerifyOtp
          } 
          style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
        >
          
          {/* Email field (Editable in step 1, read-only/disabled in others) */}
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="Enter email address" 
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
              required
              disabled={authStep !== 'email'}
            />
          </div>

          {/* Password field (Step 2 - Existing Users) */}
          {authStep === 'password' && (
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="Enter password" 
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                required
              />
            </div>
          )}

          {/* Verification Code field (Step 2 - New Users or OTP selected) */}
          {authStep === 'otp' && (
            <div className="form-group">
              <label>6-Digit Verification Code</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Enter 6-digit code" 
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                required
                maxLength={6}
                pattern="\d{6}"
                title="Please enter a 6-digit code"
              />
            </div>
          )}

          {authError && (
            <p style={{ 
              color: authError.includes('sent') || authError.includes('successfully') ? 'var(--accent-green)' : 'var(--accent-red)', 
              fontSize: '0.8rem', 
              margin: 0 
            }}>
              {authError}
            </p>
          )}

          <button 
            type="submit" 
            className="gold-button" 
            style={{ width: '100%', marginTop: '10px' }}
            disabled={authLoading}
          >
            {authLoading 
              ? 'Processing...' 
              : authStep === 'email' 
                ? 'Continue' 
                : authStep === 'password' 
                  ? 'Sign In' 
                  : 'Verify & Sign In'}
          </button>

          {/* Bottom navigation links to switch steps */}
          <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.8rem' }}>
            
            {authStep === 'password' && (
              <p style={{ color: 'var(--text-secondary)' }}>
                Try another way: Sign In using{' '}
                <span 
                  onClick={handleSendOtpForExisting} 
                  style={{ color: 'var(--accent-gold)', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Verification Code (OTP)
                </span>
              </p>
            )}

            {authStep !== 'email' && (
              <p style={{ color: 'var(--text-secondary)', marginTop: authStep === 'password' ? '10px' : '0px' }}>
                Want to change email?{' '}
                <span 
                  onClick={() => { 
                    setAuthStep('email'); 
                    setOtpCode(''); 
                    setAuthPassword(''); 
                    setAuthError(''); 
                  }} 
                  style={{ color: 'var(--accent-gold)', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Go Back
                </span>
              </p>
            )}

          </div>

        </form>
      </div>
    </div>
  );
}

export default Login;
