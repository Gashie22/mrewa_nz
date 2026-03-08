import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const logRequestToDB = async (service) => {
  if (!service) return;
  const { error } = await supabase.from("service_requests").insert([
    {
      service_id: service.id,
      status: "inquiry_started",
      client_description: `Web Portal selection: ${service.service_name}`,
    },
  ]);
  if (error) console.error("Log error:", error);
};
