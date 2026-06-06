import { supabase } from "./supabase";

export async function login(username, password) {
  try {
    const { data: profile, error: profileError } =
      await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .maybeSingle();
    
    if (profileError) throw profileError;

    if (!profile.is_active) {
      throw new Error(
        "Account not activated by administrator"
      );
    }

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: profile.email,
        password,
      });

    if (error) throw error;

    return {
      user: data.user,
      profile,
    };
  } catch (err) {
    throw err;
  }
}

//logout
export async function logout() {
  const { error } =
    await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

//get current user
export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function register(form) {

  const {
    full_name,
    username,
    email,
    password,
  } = form;

  const {
    data,
    error,
  } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  const userId =
    data.user.id;

  const {
    error: profileError,
  } = await supabase
    .from("profiles")
    .insert({
      id: userId,
      full_name,
      username,
      email,
      role: "user",
      is_active: false,
    });

  if (profileError) {
    throw profileError;
  }

  return data;
}