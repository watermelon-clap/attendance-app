export function calculateHours(
  entry,
  exit
) {
  if (!entry || !exit) {
    return "-";
  }

  const start =
    new Date(`2000-01-01 ${entry}`);

  const end =
    new Date(`2000-01-01 ${exit}`);

  return (
    (
      (end - start) /
      1000 /
      60 /
      60
    ).toFixed(2)
  );
}
