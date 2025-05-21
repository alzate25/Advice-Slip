import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://frtlgpxpelvzysczzocv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZydGxncHhwZWx2enlzY3p6b2N2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NTU1ODMsImV4cCI6MjA2MzQzMTU4M30.mNrpUfs70jKwrBqmNGraoXJuvkorSGoMy-0pJvkgi0w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
