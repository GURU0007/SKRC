-- Sri Krishna Real Estate: Supabase Setup
-- Paste into Supabase SQL Editor

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL, -- 'plot', 'villa', 'apartment', 'commercial'
  price NUMERIC NOT NULL,
  size TEXT NOT NULL,
  facing TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  image_url TEXT DEFAULT '/logo.jpeg',
  contact_name TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  tag TEXT DEFAULT 'Owner Listed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

-- 2. Add approved column and backfill
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS approved BOOLEAN DEFAULT FALSE;
UPDATE public.properties SET approved = true WHERE approved IS NULL;

-- 3. Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- 4. Clean old policies
DROP POLICY IF EXISTS "Allow public read access" ON public.properties;
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.properties;
DROP POLICY IF EXISTS "Allow owner update" ON public.properties;
DROP POLICY IF EXISTS "Allow owner delete" ON public.properties;
DROP POLICY IF EXISTS "Allow owner or admin update" ON public.properties;
DROP POLICY IF EXISTS "Allow owner or admin delete" ON public.properties;

-- 5. Create Policies

-- Policy A: Read access (approved listings public, unapproved for owner or admin)
CREATE POLICY "Allow public read access" 
  ON public.properties FOR SELECT 
  USING (approved = true OR auth.uid() = user_id OR (auth.jwt() ->> 'email') = 'reddygarigsr@gmail.com');

-- Policy B: Insert access (authenticated only)
CREATE POLICY "Allow authenticated insert" 
  ON public.properties FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Policy C: Update access (owner or admin)
CREATE POLICY "Allow owner or admin update" 
  ON public.properties FOR UPDATE 
  USING (auth.uid() = user_id OR (auth.jwt() ->> 'email') = 'reddygarigsr@gmail.com')
  WITH CHECK (auth.uid() = user_id OR (auth.jwt() ->> 'email') = 'reddygarigsr@gmail.com');

-- Policy D: Delete access (owner or admin)
CREATE POLICY "Allow owner or admin delete" 
  ON public.properties FOR DELETE 
  USING (auth.uid() = user_id OR (auth.jwt() ->> 'email') = 'reddygarigsr@gmail.com');

-- 6. RPC Function to check if an email exists in auth.users
CREATE OR REPLACE FUNCTION public.check_email_exists(user_email TEXT)
RETURNS BOOLEAN
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users WHERE email = user_email
  );
END;
$$ LANGUAGE plpgsql;

-- 7. User Auth Preferences table (stores preferred login method per email)
CREATE TABLE IF NOT EXISTS public.user_auth_preferences (
  email TEXT PRIMARY KEY,
  preferred_method TEXT NOT NULL DEFAULT 'password', -- 'otp' or 'password'
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.user_auth_preferences ENABLE ROW LEVEL SECURITY;

-- Clean old policies
DROP POLICY IF EXISTS "Allow public read auth prefs" ON public.user_auth_preferences;
DROP POLICY IF EXISTS "Allow authenticated upsert auth prefs" ON public.user_auth_preferences;

-- Policy: Anyone can read preferences (needed before login to determine method)
CREATE POLICY "Allow public read auth prefs"
  ON public.user_auth_preferences FOR SELECT
  USING (true);

-- Policy: Authenticated users can insert/update their own preference
CREATE POLICY "Allow authenticated upsert auth prefs"
  ON public.user_auth_preferences FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 8. RPC: Get auth preference for an email (callable without auth)
CREATE OR REPLACE FUNCTION public.get_auth_preference(user_email TEXT)
RETURNS TEXT
SECURITY DEFINER
AS $$
DECLARE
  pref TEXT;
BEGIN
  SELECT preferred_method INTO pref
  FROM public.user_auth_preferences
  WHERE email = LOWER(user_email);
  
  RETURN pref; -- Returns NULL if no preference set
END;
$$ LANGUAGE plpgsql;

-- 9. RPC: Set auth preference for an email (callable by authenticated users)
CREATE OR REPLACE FUNCTION public.set_auth_preference(user_email TEXT, method TEXT)
RETURNS VOID
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_auth_preferences (email, preferred_method, updated_at)
  VALUES (LOWER(user_email), method, NOW())
  ON CONFLICT (email) DO UPDATE SET
    preferred_method = EXCLUDED.preferred_method,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;
