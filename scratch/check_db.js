import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Parse .env manually
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/);
  if (match) {
    const key = match[1].trim();
    let val = match[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    envVars[key] = val;
  }
});

const supabaseUrl = envVars.VITE_SUPABASE_URL || '';
const supabaseAnonKey = envVars.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
  console.error("Supabase credentials not found in .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDatabase() {
  console.log("Connecting to Supabase project:", supabaseUrl);
  
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('id, title, approved, created_at, user_id');
      
    if (error) {
      console.error("Error fetching properties from Supabase:", error);
      return;
    }
    
    console.log(`\nSuccess! Found ${data.length} total properties in your Supabase database:\n`);
    data.forEach((p, i) => {
      console.log(`${i + 1}. [ID: ${p.id}]`);
      console.log(`   Title: ${p.title}`);
      console.log(`   Approved: ${p.approved}`);
      console.log(`   Created At: ${p.created_at}`);
      console.log(`   User ID: ${p.user_id}`);
      console.log("   --------------------------------------");
    });
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

checkDatabase();
