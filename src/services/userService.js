import { supabase } from "./supabase";

//get all users
export async function getUsers() {
  const { data, error } =
    await supabase
      .from("profiles")
      .select("*")
      .order("full_name");

  if (error) throw error;

  return data;
}

//activate user
export async function activateUser(id) {
  const { error } =
    await supabase
      .from("profiles")
      .update({
        is_active: true,
      })
      .eq("id", id);

  if (error) throw error;
}

//deactivate user
export async function deactivateUser(id) {
  const { error } =
    await supabase
      .from("profiles")
      .update({
        is_active: false,
      })
      .eq("id", id);

  if (error) throw error;
}