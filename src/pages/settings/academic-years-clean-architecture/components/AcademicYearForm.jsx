import { ACADEMIC_YEAR_FIELDS } from "../constants/academicYearConstants";

function FormField({ id, label, type, value, onChange, error, min, max }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[16px] font-semibold text-zinc-800">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        required
        className="h-[49px] rounded-[8px] border border-[#0000004D] bg-white px-5 text-[18px] font-medium focus:border-[#228B22] focus:outline-none focus:ring-1 focus:ring-[#228B22]"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function AcademicYearForm({
  form,
  onCancel,
  submitLabel,
}) {
  const { values, errors, saving, submitError, handleChange, handleSubmit } =
    form;

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col gap-4">
      <FormField
        id="start_year"
        label="Select Academic Year Start"
        type="number"
        value={values.start_year}
        onChange={handleChange}
        error={errors.start_year}
        min="1900"
        max="9998"
      />
      <div className="flex-1 space-y-3">
        {ACADEMIC_YEAR_FIELDS.map((field) => (
          <FormField
            key={field.name}
            id={field.name}
            label={field.label}
            type="date"
            value={values[field.name]}
            onChange={handleChange}
            error={errors[field.name]}
          />
        ))}
      </div>

      {submitError && (
        <p className="text-sm text-red-600" role="alert">
          {submitError}
        </p>
      )}

      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="h-[30px] rounded-[8px] border border-[#228B22] px-4 text-[12px] font-semibold text-[#228B22] hover:bg-[#EAFAEA] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="h-[30px] rounded-[8px] bg-[#228B22] px-4 text-[12px] font-semibold text-white hover:bg-green-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
