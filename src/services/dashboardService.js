import { supabase } from "./supabase";

export async function getDashboardSummary(userId) {
  const { data } = await supabase
    .from("attendance")
    .select("*")
    .eq("user_id", userId);

  const totalDays = data?.length || 0;

  const presentDays =
    data?.filter(
      (item) => item.status === "Present"
    ).length || 0;

  const percentage =
    totalDays > 0
      ? ((presentDays / totalDays) * 100).toFixed(2)
      : 0;

  return {
    totalDays,
    presentDays,
    percentage,
  };
}

export async function getAdminStats() {
  const { count: users } =
    await supabase
      .from("profiles")
      .select("*", {
        count: "exact",
        head: true,
      });

  const { count: attendance } =
    await supabase
      .from("attendance")
      .select("*", {
        count: "exact",
        head: true,
      });

  const { count: broadcasts } =
    await supabase
      .from("broadcasts")
      .select("*", {
        count: "exact",
        head: true,
      });

  return {
    users,
    attendance,
    broadcasts,
  };
}

