import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://blluaqpzdtnldhwqtbiv.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbHVhcXB6ZHRubGRod3F0Yml2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyNTA4OTcsImV4cCI6MjEwMzgyNjg5N30.Ibdc187JuaozF3QGlq5OT3WAUY-65y_efgdcRn6qgFQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
