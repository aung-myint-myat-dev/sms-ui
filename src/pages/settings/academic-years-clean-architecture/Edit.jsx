import { useMemo } from "react";
import { AcademicYearDetails } from "./components/AcademicYearDetails";
import { DisplayCard } from "./components/DisplayCard";
import { useAcademicYearForm } from "./hooks/useAcademicYearForm";
import { getAcademicYearStatus, getStartYear } from "./utils/academicYearUtils";
import { toAcademicYearPayload } from "./validation/academicYearValidation";

export function Edit({ academicYear, onCancel, onSave }) {
  const initialValues = useMemo(
    () => ({
      start_year: String(getStartYear(academicYear.academic_year) ?? ""),
      school_opening_date: academicYear.school_opening_date ?? "",
      school_closing_date: academicYear.school_closing_date ?? "",
      registration_open_date: academicYear.registration_open_date ?? "",
      registration_close_date: academicYear.registration_close_date ?? "",
    }),
    [academicYear],
  );

  const form = useAcademicYearForm(initialValues, async (values) => {
    const payload = toAcademicYearPayload(values);
    await onSave(academicYear.id, {
      ...payload,
      status: getAcademicYearStatus(payload.academic_year),
    });
  });

  const { values, errors, handleChange, handleSubmit, saving, submitError } =
    form;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between rounded-[10px] border border-[#C4CDC7] bg-[#E9F6EC] px-6 py-4">
        <div className="flex flex-col items-start">
          <label
            htmlFor="edit-start-year"
            className="text-[18px] font-bold text-[#6A6969]"
          >
            Edit academic year
          </label>
          <div className="flex items-center gap-1">
            <input
              id="edit-start-year"
              name="start_year"
              type="number"
              min="1900"
              max="9998"
              required
              value={values.start_year}
              onChange={handleChange}
              className="w-[95px] bg-transparent text-[24px] font-black text-[#228B22] focus:outline-none"
              aria-invalid={Boolean(errors.start_year)}
              aria-describedby={
                errors.start_year ? "start_year-error" : undefined
              }
            />
            <span className="text-[24px] font-black text-[#228B22]">
              - {Number(values.start_year || 0) + 1}
            </span>
          </div>
          {errors.start_year && (
            <p id="start_year-error" className="text-xs text-red-600" role="alert">
              {errors.start_year}
            </p>
          )}
        </div>
        <div className="size-[50px] shrink-0 overflow-hidden rounded-[8px]">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7BTzVBuyix9HxdRfxQG0QuVYQsSD318utuBHVtJvM7A&s=10"
            alt="School logo"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <DisplayCard title="Edit your academic year information here">
        <AcademicYearDetails
          academicYear={academicYear}
          editable
          values={values}
          errors={errors}
          onChange={handleChange}
        />
        {submitError && (
          <p className="mt-3 text-sm text-red-600" role="alert">
            {submitError}
          </p>
        )}
        <div className="mt-4 flex justify-end">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="h-[30px] rounded-[8px] bg-red-600 px-4 text-[12px] font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="h-[30px] rounded-[8px] bg-[#228B22] px-4 text-[12px] font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </DisplayCard>
    </form>
  );
}
