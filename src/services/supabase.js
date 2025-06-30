import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://izsmxaqzrnknavdmpckz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6c214YXF6cm5rbmF2ZG1wY2t6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NTg2OTUsImV4cCI6MjA2NjMzNDY5NX0.9N1jjUDzUGlcAaEoT_shNcMahAOfiCNewvYN5-AyoHM";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
