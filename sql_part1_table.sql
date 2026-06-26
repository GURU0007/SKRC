-- User Auth Preferences table
CREATE TABLE IF NOT EXISTS public.user_auth_preferences (
  email TEXT PRIMARY KEY,
  preferred_method TEXT NOT NULL DEFAULT 'password',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.user_auth_preferences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read auth prefs" ON public.user_auth_preferences;
DROP POLICY IF EXISTS "Allow authenticated upsert auth prefs" ON public.user_auth_preferences;

CREATE POLICY "Allow public read auth prefs"
  ON public.user_auth_preferences FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated upsert auth prefs"
  ON public.user_auth_preferences FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
