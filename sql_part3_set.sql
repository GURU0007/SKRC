CREATE OR REPLACE FUNCTION public.set_auth_preference(user_email TEXT, method TEXT)
RETURNS VOID
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_auth_preferences (email, preferred_method, updated_at) VALUES (LOWER(user_email), method, NOW()) ON CONFLICT (email) DO UPDATE SET preferred_method = EXCLUDED.preferred_method, updated_at = NOW();
END;
$$ LANGUAGE plpgsql;
