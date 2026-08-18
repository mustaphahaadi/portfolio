import { supabase, isSupabaseConfigured } from "../lib/supabase";

/**
 * Generic helper to fetch data from Supabase tables with order sorting
 */
const fetchTableData = async (tableName, orderBy = "display_order") => {
  if (!isSupabaseConfigured) {
    return { data: null };
  }

  try {
    let query = supabase.from(tableName).select("*");
    
    // Try ordering by display_order if column exists, fallback to standard select
    if (orderBy) {
      query = query.order(orderBy, { ascending: true });
    }

    const { data, error } = await query;

    if (error) {
      console.warn(`Supabase query warning [${tableName}]:`, error.message);
      return { data: null };
    }

    return { data };
  } catch (err) {
    console.error(`Supabase error [${tableName}]:`, err);
    return { data: null };
  }
};

// API endpoints matching existing component contracts
export const getProfile = async () => {
  if (!isSupabaseConfigured) {
    return { data: null };
  }

  try {
    const { data, error } = await supabase.from("profile").select("*").limit(1).maybeSingle();
    if (error || !data) {
      return { data: null };
    }
    return { data };
  } catch (err) {
    console.error("Supabase getProfile error:", err);
    return { data: null };
  }
};

export const getProjects = () => fetchTableData("projects");
export const getTools = () => fetchTableData("tools");
export const getExperiences = () => fetchTableData("experiences");
export const getEducation = () => fetchTableData("education");
export const getServices = () => fetchTableData("services");
export const getTestimonials = () => fetchTableData("testimonials");
export const getCertifications = () => fetchTableData("certifications");

export const submitContact = async (formData) => {
  if (!isSupabaseConfigured) {
    // Simulated delay if Supabase isn't configured yet
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { data: { message: "Message received (offline mode)" } };
  }

  const { data, error } = await supabase.from("contact_messages").insert([
    {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return { data };
};

export default {
  getProfile,
  getProjects,
  getTools,
  getExperiences,
  getEducation,
  getServices,
  getTestimonials,
  getCertifications,
  submitContact,
};