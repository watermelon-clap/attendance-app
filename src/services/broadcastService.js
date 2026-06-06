import { supabase } from "./supabase";

//create broadcast
export async function createBroadcast(
  payload
) {
  const { data, error } =
    await supabase
      .from("broadcasts")
      .insert(payload)
      .select();

  if (error) throw error;

  return data;
}

//get broadcasts
export async function getBroadcasts() {
  const { data, error } =
    await supabase
      .from("broadcasts")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  if (error) throw error;

  return data;
}

export async function deleteBroadcast(id) {
  const { error } = await supabase
    .from("broadcasts")
    .delete()
    .eq("id", id);

  if (error) throw error;
}