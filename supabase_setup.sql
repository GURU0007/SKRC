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
