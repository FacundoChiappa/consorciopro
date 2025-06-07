import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jjnpmxwiilxnynvhsbil.supabase.co'; // <- reemplaza con tu URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqbnBteHdpaWx4bnludmhzYmlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMzI5NzAsImV4cCI6MjA2NDkwODk3MH0.nMHClcEyzAMA9AH4E-6v63zH_og2yRUs8HOC0A4LKkk'; // <- reemplaza con tu API key

export const supabase = createClient(supabaseUrl, supabaseKey);
