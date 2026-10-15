import { useMemo } from "react";
import { AcademicYearForm } from "./components/AcademicYearForm";
import { EMPTY_ACADEMIC_YEAR } from "./constants/academicYearConstants";
import { useAcademicYearForm } from "./hooks/useAcademicYearForm";
import { getAcademicYearStatus } from "./utils/academicYearUtils";
import { toAcademicYearPayload } from "./validation/academicYearValidation";

export function Create({ onCancel, onCreate }) {
  const defaults = useMemo(
    () => ({
      ...EMPTY_ACADEMIC_YEAR,
      start_year: String(new Date().getFullYear()),
    }),
    [],
  );

  const form = useAcademicYearForm(defaults, async (values) => {
    const payload = toAcademicYearPayload(values);
    await onCreate({
      ...payload,
      status: getAcademicYearStatus(payload.academic_year),
    });
  });

  return (
    <AcademicYearForm
      form={form}
      onCancel={onCancel}
      submitLabel="Create academic year"
    />
  );
}
