import { createClient } from "@/lib/supabase/server";

export async function getUser() {
  const supabase = await createClient();

  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      // Don't log if it's just a missing session (normal for logged out users)
      if (error.message !== "Auth session missing!") {
        console.error("Error getting user:", error);
      }
      return null;
    }

    return user;
  } catch (error: any) {
    // Don't log AuthSessionMissingError - it's expected when not logged in
    if (error?.message !== "Auth session missing!") {
      console.error("Error getting user:", error);
    }
    return null;
  }
}

export async function getSession() {
  const supabase = await createClient();

  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      // Don't log if it's just a missing session (normal for logged out users)
      if (error.message !== "Auth session missing!") {
        console.error("Error getting session:", error);
      }
      return null;
    }

    return session;
  } catch (error: any) {
    // Don't log AuthSessionMissingError - it's expected when not logged in
    if (error?.message !== "Auth session missing!") {
      console.error("Error getting session:", error);
    }
    return null;
  }
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

export async function isAdmin() {
  const user = await getUser();

  if (!user) return false;

  // Check if user email matches admin email from env
  const adminEmail = process.env.ADMIN_EMAIL || "admin@yourportfolio.com";

  return user.email === adminEmail;
}
