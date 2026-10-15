import { ACADEMIC_YEAR_FIELDS } from "../constants/academicYearConstants";
import { formatAcademicYear } from "../utils/academicYearUtils";

export function validateAcademicYear(values) {
  const errors = {};
  const startYear = Number(values.start_year);

  if (!Number.isInteger(startYear) || startYear < 1900 || startYear > 9998) {
    errors.start_year = "Enter a start year between 1900 and 9998.";
  }

  for (const field of ACADEMIC_YEAR_FIELDS) {
    if (!values[field.name]) {
      errors[field.name] = `${field.label} is required.`;
    }
  }

  if (
    values.school_opening_date &&
    values.school_closing_date &&
    values.school_closing_date < values.school_opening_date
  ) {
    errors.school_closing_date =
      "School closing date must be on or after the opening date.";
  }

  if (
    values.registration_open_date &&
    values.registration_close_date &&
    values.registration_close_date < values.registration_open_date
  ) {
    errors.registration_close_date =
      "Registration close date must be on or after the open date.";
  }

  return errors;
}

export function toAcademicYearPayload(values) {
  return {
    academic_year: formatAcademicYear(values.start_year),
    school_opening_date: values.school_opening_date,
    school_closing_date: values.school_closing_date,
    registration_open_date: values.registration_open_date,
    registration_close_date: values.registration_close_date,
    status: values.status,
  };
}
