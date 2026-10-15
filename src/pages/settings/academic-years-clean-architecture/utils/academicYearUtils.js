export function getStartYear(academicYear) {
  const match = String(academicYear ?? "").match(/^(\d{4})\s*-\s*\d{4}$/);
  return match ? Number(match[1]) : null;
}

export function formatAcademicYear(startYear) {
  const year = Number(startYear);
  return `${year} - ${year + 1}`;
}

export function getAcademicYearStatus(academicYear) {
  const startYear = getStartYear(academicYear);
  if (startYear === null) return "upcoming";

  const currentYear = new Date().getFullYear();
  if (startYear < currentYear) return "completed";
  if (startYear === currentYear) return "active";
  return "upcoming";
}

export function formatAcademicDate(value) {
  if (!value) return "—";
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function getCurrentAcademicYear(academicYears) {
  return academicYears.find((year) => year.status === "active") ?? null;
}
