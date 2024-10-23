import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wlmfsetclkodtgiacsnx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsbWZzZXRjbGtvZHRnaWFjc254Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0NjUwNDYsImV4cCI6MjA0NTA0MTA0Nn0.C4A5t3OeYmIWrTR3rIwumgu6G72RAzFhfG63RLTpn2o";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
