import { useState } from "react";
import { validateAcademicYear } from "../validation/academicYearValidation";

export function useAcademicYearForm(initialValues, onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setSubmitError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateAcademicYear(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSaving(true);
    setSubmitError("");
    try {
      await onSubmit(values);
    } catch (cause) {
      setSubmitError(cause.message || "Unable to save the academic year.");
    } finally {
      setSaving(false);
    }
  };

  return { values, errors, saving, submitError, handleChange, handleSubmit };
}
