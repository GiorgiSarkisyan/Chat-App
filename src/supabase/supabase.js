import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lpdpgehlyfxfzuurxehh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwZHBnZWhseWZ4Znp1dXJ4ZWhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2OTU1MTEsImV4cCI6MjA0NTI3MTUxMX0.SPx4T0t0HYCZ5R-wIr91_6MPafzPGd_DwxxwY4VeF5U";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
