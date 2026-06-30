// Sri Krishna Real Estate: Simplified Email-First Authentication Flow V2
import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
);

function Login({ user, setUser, recoveryMode, setRecoveryMode, onLoginSuccess }) {
  const [authStep, setAuthStep] = useState('email'); // 'email', 'password', 'otp', 'register-profile'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSentForRegister, setOtpSentForRegister] = useState(false);

  useEffect(() => {
    setShowPassword(false);
  }, [authStep, recoveryMode]);

  useEffect(() => {
    if (user) {
      setAuthEmail(user.email || '');
      if (!user.user_metadata?.phone) {
        setAuthStep('register-profile');
      }
    }
  }, [user]);

  const handleAuthError = (err) => {
    if (!err) return;
    let msg = err.message || String(err);
    if (msg === '{}' || msg === '[object Object]') {
      msg = 'Error sending verification code. Please check your settings.';
    }
    setAuthError(msg);
  };

  const sendOtpForEmail = async (email, createUser = false) => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: createUser,
          emailRedirectTo: window.location.origin
        }
      });
      if (error) {
        handleAuthError(error);
        return false;
      }
    } else {
      setAuthError('Sandbox Mode: Use code 123456 to verify.');
    }
    return true;
  };

  // Step 1: Check if Email exists
  const handleCheckEmail = async (e) => {
    e.preventDefault();
    if (!authEmail) return;
    setAuthError('');
    setAuthLoading(true);

    let exists = false;
    let rpcFailed = false;

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.rpc('check_email_exists', {
          user_email: authEmail
        });
        if (error) {
          console.warn("RPC check_email_exists not found. Defaulting to password screen to prevent OTP spam.");
          exists = true;
        } else {
          exists = data;
        }
      } catch (err) {
        exists = true;
      }
      rpcFailed = true;
    } else {
      exists = authEmail === 'testowner@gmail.com';
    }

    setIsExistingUser(exists);

    if (exists) {
      setAuthStep('password');
      setAuthLoading(false);
    } else {
      // New user (or RPC missing): Send OTP to verify email first!
      setOtpSentForRegister(true);
      const success = await sendOtpForEmail(authEmail, true);
      if (success) {
        setAuthStep('otp');
        setAuthError('We have sent a verification code to your email. Please verify ownership first.');
      }
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
          if (errMsg && errMsg.toLowerCase().includes('invalid')) {
            setAuthError('Incorrect password. If you do not have a password set, please log in using OTP below.');
          } else {
            handleAuthError(error);
          }
        } else {
          setUser(data?.user || data?.session?.user || null);
          if (onLoginSuccess) onLoginSuccess('You have been logged in successfully.');
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
            setAuthError('Incorrect password. Use "password" for sandbox testing.');
          }
          setAuthLoading(false);
        }, 800);
        return;
      }
    } catch (err) {
      setAuthError(err.message || String(err));
    } finally {
      setAuthLoading(false);
    }
  };

  // Step 2B: Complete Profile (New Users after OTP Verification)
  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    if (!authPassword) return;
    if (authPassword !== confirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }
    setAuthError('');
    setAuthLoading(true);
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.updateUser({
          password: authPassword,
          data: {
            phone: authPhone,
            name: authEmail.split('@')[0]
          }
        });
        if (error) throw error;
        setUser(data?.user || null);
        if (onLoginSuccess) onLoginSuccess('You have been logged in successfully.');
        setAuthEmail('');
        setAuthPassword('');
        setConfirmPassword('');
        setAuthPhone('');
        setAuthStep('email');
      } else {
        // Sandbox mock registration complete
        setUser({
          id: 'mock-sandbox-user-id',
          email: authEmail,
          user_metadata: {
            name: authEmail.split('@')[0],
            phone: authPhone
          }
        });
        setAuthEmail('');
        setAuthPassword('');
        setConfirmPassword('');
        setAuthPhone('');
        setAuthStep('email');
      }
    } catch (err) {
      setAuthError(err.message || String(err));
    } finally {
      setAuthLoading(false);
    }
  };

  // Step 2C: Verify OTP Code (OTP Login or Email Verification)
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

      const activeUser = finalData?.user || finalData?.session?.user || null;
      
      if (activeUser) {
        // Check if this user already has profile metadata (phone number)
        const hasPhone = activeUser.user_metadata?.phone;
        
        if (hasPhone) {
          // User already has profile setup (existing user). Directly sign in!
          setUser(activeUser);
          if (onLoginSuccess) onLoginSuccess('You have been logged in successfully.');
          setAuthEmail('');
          setOtpCode('');
          setAuthStep('email');
        } else {
          // New user (needs to complete profile). Take to Complete Profile screen!
          setAuthStep('register-profile');
          setAuthError('Email verified successfully! Please complete your profile.');
        }
      } else {
        setAuthError('Failed to verify OTP code.');
      }
    } else {
      // Sandbox mock OTP verify
      setTimeout(() => {
        if (otpCode === '123456') {
          if (authEmail === 'testowner@gmail.com') {
            // Mock existing user
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
            // Mock new user
            setAuthStep('register-profile');
            setAuthError('Email verified successfully! Please complete your profile.');
          }
        } else {
          setAuthError('Invalid code. Use 123456 for sandbox testing.');
        }
        setAuthLoading(false);
      }, 800);
      return;
    }
    setAuthLoading(false);
  };

  // Send OTP trigger
  const handleSendOtpForExisting = async () => {
    setAuthError('');
    setAuthLoading(true);
    const success = await sendOtpForEmail(authEmail, false);
    if (success) {
      setAuthStep('otp');
      setOtpSentForRegister(false);
      setAuthError('We have sent a verification code to your email.');
    }
    setAuthLoading(false);
  };

  const handleResendOtp = async () => {
    setAuthError('');
    setAuthLoading(true);
    const success = await sendOtpForEmail(authEmail, true);
    if (success) {
      setAuthError('We have sent a new verification code to your email.');
    }
    setAuthLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!authEmail) return;
    setAuthError('');
    setAuthLoading(true);
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.auth.resetPasswordForEmail(authEmail, {
          redirectTo: `${window.location.origin}?type=recovery`
        });
        if (error) throw error;
        setAuthError('Password reset link sent to your email successfully!');
      } else {
        setAuthError('Sandbox Mode: Password reset link sent to your email.');
      }
    } catch (err) {
      setAuthError(err.message || String(err));
    } finally {
      setAuthLoading(false);
    }
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

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!authPassword) return;
    setAuthError('');
    setAuthLoading(true);
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.auth.updateUser({ password: authPassword });
        if (error) throw error;
        setAuthError('Password updated successfully!');
        setAuthPassword('');
        setTimeout(() => {
          setAuthError('');
          if (setRecoveryMode) setRecoveryMode(false);
        }, 1500);
      } else {
        setAuthError('Sandbox Mode: Password updated successfully.');
        setAuthPassword('');
        setTimeout(() => {
          setAuthError('');
          if (setRecoveryMode) setRecoveryMode(false);
        }, 1500);
      }
    } catch (err) {
      setAuthError(err.message || String(err));
    } finally {
      setAuthLoading(false);
    }
  };

  const getPanelTitle = () => {
    if (recoveryMode) return 'Set New Password';
    if (authStep === 'email') return 'Sign In / Register';
    if (authStep === 'password') return 'Enter Password';
    if (authStep === 'register-profile') return 'Complete Your Profile';
    if (authStep === 'otp') return otpSentForRegister ? 'Verify Your Email' : 'Enter Verification Code';
    return 'Sign In';
  };

  return (
    <div className="panel" style={{ maxWidth: '450px', margin: '40px auto', width: '100%' }}>
      <div className="panel-header" style={{ justifyContent: 'center' }}>
        <h3 className="panel-title">{getPanelTitle()}</h3>
      </div>
      <div className="panel-content">
        
        {recoveryMode ? (
          <form onSubmit={handleUpdatePassword} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div className="form-group">
              <label>New Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="form-input" 
                  placeholder="Enter new password" 
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  style={{ paddingRight: '45px', width: '100%' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                <input 
                  type="checkbox" 
                  id="recovery-show-pass"
                  checked={showPassword} 
                  onChange={(e) => setShowPassword(e.target.checked)} 
                  style={{ cursor: 'pointer', width: '14px', height: '14px', margin: 0 }}
                />
                <label htmlFor="recovery-show-pass" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer', margin: 0, userSelect: 'none' }}>
                  Show Password
                </label>
              </div>
            </div>
            {authError && (
              <p style={{ 
                color: authError.includes('successfully') ? 'var(--accent-green)' : 'var(--accent-red)', 
                fontSize: '0.8rem', 
                margin: 0 
              }}>
                {authError}
              </p>
            )}
            <button 
              type="submit" 
              className="gold-button" 
              style={{ 
                width: '100%', 
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                minHeight: '44px'
              }}
              disabled={authLoading}
            >
              {authLoading ? (
                <span className="btn-spinner" aria-label="loading"></span>
              ) : (
                'Save New Password'
              )}
            </button>
          </form>
        ) : (
          <>
            {authStep === 'email' && (
              <>
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
                    : authStep === 'register-profile'
                      ? handleCompleteProfile
                      : handleVerifyOtp
              } 
              style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
            >
              
              {/* Email field (Read-only on sub-steps) */}
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

              {/* Password field (Existing Users) */}
              {authStep === 'password' && (
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ margin: 0 }}>Password</label>
                    <span 
                      onClick={handleForgotPassword}
                      style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Forgot Password?
                    </span>
                  </div>
                  <div style={{ position: 'relative', marginTop: '6px' }}>
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      className="form-input" 
                      placeholder="Enter password" 
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      style={{ paddingRight: '45px', width: '100%' }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                    <input 
                      type="checkbox" 
                      id="login-show-pass"
                      checked={showPassword} 
                      onChange={(e) => setShowPassword(e.target.checked)} 
                      style={{ cursor: 'pointer', width: '14px', height: '14px', margin: 0 }}
                    />
                    <label htmlFor="login-show-pass" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer', margin: 0, userSelect: 'none' }}>
                      Show Password
                    </label>
                  </div>
                </div>
              )}

              {/* Complete Profile fields (New Users / Register Step) */}
              {authStep === 'register-profile' && (
                <>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      placeholder="Enter phone number (e.g. +91 9999999999)" 
                      value={authPhone}
                      onChange={(e) => setAuthPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Create Password</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        className="form-input" 
                        placeholder="Choose a password" 
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        style={{ paddingRight: '45px', width: '100%' }}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      className="form-input" 
                      placeholder="Confirm your password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                      <input 
                        type="checkbox" 
                        id="register-show-pass"
                        checked={showPassword} 
                        onChange={(e) => setShowPassword(e.target.checked)} 
                        style={{ cursor: 'pointer', width: '14px', height: '14px', margin: 0 }}
                      />
                      <label htmlFor="register-show-pass" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer', margin: 0, userSelect: 'none' }}>
                        Show Password
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* OTP Code field (Existing/OTP Users) */}
              {authStep === 'otp' && (
                <div className="form-group">
                  <label>{otpSentForRegister ? 'Email Verification Code' : '6-Digit Verification Code'}</label>
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
                  <div style={{ textAlign: 'right', marginTop: '6px', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Didn't receive the code? </span>
                    <span 
                      onClick={handleResendOtp} 
                      style={{ color: 'var(--accent-gold)', cursor: 'pointer', textDecoration: 'underline', fontWeight: '500' }}
                    >
                      Resend Code
                    </span>
                  </div>
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
                style={{ 
                  width: '100%', 
                  marginTop: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  minHeight: '44px'
                }}
                disabled={authLoading}
              >
                {authLoading ? (
                  <span className="btn-spinner" aria-label="loading"></span>
                ) : (
                  authStep === 'email' 
                    ? 'Continue' 
                    : authStep === 'password' 
                      ? 'Sign In' 
                      : authStep === 'register-profile'
                        ? 'Complete Profile'
                        : 'Verify & Sign In'
                )}
              </button>

              {/* Bottom links to toggle flows */}
              <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.8rem' }}>
                
                {authStep === 'password' && (
                  <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                      Or Sign In using{' '}
                      <span 
                        onClick={handleSendOtpForExisting} 
                        style={{ color: 'var(--accent-gold)', cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        Verification Code (OTP)
                      </span>
                    </p>
                  </div>
                )}

                {authStep === 'otp' && !otpSentForRegister && (
                  <div style={{ marginTop: '10px', marginBottom: '15px' }}>
                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                      Or Sign In using{' '}
                      <span 
                        onClick={() => {
                          setAuthStep('password');
                          setAuthError('');
                          setOtpCode('');
                        }} 
                        style={{ color: 'var(--accent-gold)', cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        Password
                      </span>
                    </p>
                  </div>
                )}

                {authStep !== 'email' && (
                  <p style={{ color: 'var(--text-secondary)', marginTop: '15px' }}>
                    Want to change email?{' '}
                    <span 
                      onClick={() => { 
                        setAuthStep('email'); 
                        setOtpCode(''); 
                        setAuthPassword(''); 
                        setConfirmPassword('');
                        setAuthPhone('');
                        setAuthError(''); 
                        setOtpSentForRegister(false);
                      }} 
                      style={{ color: 'var(--accent-gold)', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Go Back
                    </span>
                  </p>
                )}

              </div>

            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
