import { CalendarDaysIcon } from "lucide-react";
import { ACADEMIC_YEAR_FIELDS } from "../constants/academicYearConstants";
import { formatAcademicDate } from "../utils/academicYearUtils";

function DetailField({ field, value, editable, error, onChange }) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-4 rounded-[10px] border border-[#C8D6E7] bg-white px-4 py-3 sm:gap-8 sm:px-5">
      <div className="flex w-10 shrink-0 items-center justify-center sm:w-[13%]">
        <CalendarDaysIcon className="size-8 text-[#228B22] sm:size-[39px]" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1 rounded-[10px] sm:px-5 sm:py-2.5">
        <label
          htmlFor={field.name}
          className="text-[14px] font-semibold text-[#A6A6A6]"
        >
          {field.label}
        </label>
        {editable ? (
          <input
            id={field.name}
            name={field.name}
            type="date"
            value={value ?? ""}
            onChange={onChange}
            required
            className="w-full min-w-0 bg-transparent text-[16px] font-semibold focus:outline-none"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${field.name}-error` : undefined}
          />
        ) : (
          <span className="text-[16px] font-semibold text-zinc-800">
            {formatAcademicDate(value)}
          </span>
        )}
        {error && (
          <span
            id={`${field.name}-error`}
            className="text-xs text-red-600"
            role="alert"
          >
            {error}
          </span>
        )}
      </div>
      {editable && (
        <CalendarDaysIcon className="size-6 shrink-0 text-[#A8A8A8]" />
      )}
    </div>
  );
}

export function AcademicYearDetails({
  academicYear,
  editable = false,
  values = academicYear,
  errors = {},
  onChange,
}) {
  if (!academicYear) {
    return (
      <p className="text-sm text-zinc-500">
        No active academic year is available.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
      {ACADEMIC_YEAR_FIELDS.map((field) => (
        <DetailField
          key={field.name}
          field={field}
          value={values?.[field.name]}
          editable={editable}
          error={errors[field.name]}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
