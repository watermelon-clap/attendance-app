import { supabase } from "./supabase";

//create attendance
export async function createAttendance(
  attendance
) {
  const { data, error } =
    await supabase
      .from("attendance")
      .insert({
        ...attendance,
        exit_time:
          attendance.exit_time || null,
      })
      .select();

  if (error) {
    if (error.code === "23505") {
      throw new Error(
        "Attendance has already been recorded for this user on the selected date."
      );
    }

    throw error;
  }

  return data;
}

//get user attendance
export async function getUserAttendance(
  userId
) {
  const { data, error } =
    await supabase
      .from("attendance")
      .select("*")
      .eq("user_id", userId)
      .order(
        "attendance_date",
        { ascending: false }
      );

  if (error) throw error;

  return data;
}

//get attendance by date
export async function getAttendanceByDate(
  date
) {
  const { data, error } =
    await supabase
      .from("attendance")
      .select(`
        *,
        profiles!attendance_user_id_fkey (
          full_name,
          username
        )
      `)
      .eq(
        "attendance_date",
        date
      );

  if (error) throw error;

  return data;
}

export async function updateAttendance(
  attendanceId,
  values
) {
  const { error } =
    await supabase
      .from("attendance")
      .update(values)
      .eq("id", attendanceId);

  if (error) throw error;
}

export async function deleteAttendance(
  id
) {
  const { error } =
    await supabase
      .from("attendance")
      .delete()
      .eq("id", id);

  if (error) throw error;
}

export async function getAttendanceReport() {

  const { data, error } =
    await supabase
      .from("attendance")
      .select(`
        *,
        profiles (
          full_name
        )
      `);

  if (error) throw error;

  return data;
}

export async function updateExitTime(
  attendanceId,
  exitTime
) {
  const { error } =
    await supabase
      .from("attendance")
      .update({
        exit_time: exitTime,
      })
      .eq("id", attendanceId);

  if (error) throw error;
}