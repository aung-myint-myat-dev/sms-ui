export function validatePolicyForm(form) {
  const errors = {};

  if (!form.title.trim()) {
    errors.title = "Title is required.";
  }

  if (!form.description.trim()) {
    errors.description = "Description is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
