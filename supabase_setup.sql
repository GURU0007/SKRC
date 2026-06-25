-- Sri Krishna Real Estate: Supabase Database Setup Script
-- Paste this script into the Supabase SQL Editor to set up your tables and security policies.

-- 1. Create the properties table
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

-- 2. Enable Row Level Security (RLS) on the table
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- 3. Create Security Policies

-- Policy A: Allow anyone (public) to view/select properties
CREATE POLICY "Allow public read access" 
  ON public.properties FOR SELECT 
  USING (true);

-- Policy B: Allow logged-in users to create properties
CREATE POLICY "Allow authenticated insert" 
  ON public.properties FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Policy C: Allow users to edit only their own listed properties
CREATE POLICY "Allow owner update" 
  ON public.properties FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy D: Allow users to delete only their own listed properties
CREATE POLICY "Allow owner delete" 
  ON public.properties FOR DELETE 
  USING (auth.uid() = user_id);
