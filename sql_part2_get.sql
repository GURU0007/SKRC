CREATE OR REPLACE FUNCTION public.get_auth_preference(user_email TEXT)
RETURNS TEXT
SECURITY DEFINER
AS $$
DECLARE
  pref TEXT;
BEGIN
  SELECT preferred_method INTO pref FROM public.user_auth_preferences WHERE email = LOWER(user_email);
  RETURN pref;
END;
$$ LANGUAGE plpgsql;
