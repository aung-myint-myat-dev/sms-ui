import { useMemo } from "react";

export function useAcademicYearDetail(academicYears, id) {
  return useMemo(
    () =>
      academicYears.find((year) => String(year.id) === String(id)) ?? null,
    [academicYears, id],
  );
}
