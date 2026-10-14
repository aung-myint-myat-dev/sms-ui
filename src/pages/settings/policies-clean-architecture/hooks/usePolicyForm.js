import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  EMPTY_POLICY_ERRORS,
  EMPTY_POLICY_FORM,
} from "../constants/policyConstants";
import { policyApi } from "../api/policyApi";
import { getPolicyActionMode } from "../utils/policyUtils";
import { validatePolicyForm } from "../validation/policyValidation";

export function usePolicyForm() {
  const { id, type } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isUpdateMode = getPolicyActionMode(location.pathname) === "update";
  const [updatingId, setUpdatingId] = useState(null);
  const [formData, setFormData] = useState(() => ({
    ...EMPTY_POLICY_FORM,
    type: type || "",
  }));
  const [errors, setErrors] = useState(EMPTY_POLICY_ERRORS);
  const [isLoading, setIsLoading] = useState(Boolean(id && isUpdateMode));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestError, setRequestError] = useState("");

  useEffect(() => {
    if (!id || !isUpdateMode) return undefined;
    let isCurrent = true;

    const fetchPolicy = async () => {
      try {
        const policy = await policyApi.getById(id);
        if (!isCurrent) return;
        setUpdatingId(policy.id);
        setFormData({
          type: policy.type ?? type ?? "",
          title: policy.title ?? "",
          description: policy.description ?? "",
        });
      } catch (error) {
        console.error("Fetching policy failed:", error);
        if (isCurrent) setRequestError("The policy could not be loaded. Please try again.");
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };

    fetchPolicy();
    return () => {
      isCurrent = false;
    };
  }, [id, isUpdateMode, type]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
    setRequestError("");
  };

  const submitForm = async () => {
    const validation = validatePolicyForm(formData);
    setErrors({ ...EMPTY_POLICY_ERRORS, ...validation.errors });
    if (!validation.isValid || isSubmitting) return false;

    setIsSubmitting(true);
    setRequestError("");
    try {
      if (id && isUpdateMode && updatingId) {
        await policyApi.update(updatingId, formData);
      } else {
        await policyApi.create({ ...formData, type });
      }
      navigate(-1);
      return true;
    } catch (error) {
      console.error(isUpdateMode ? "Updating policy failed:" : "Creating policy failed:", error);
      setRequestError("The policy could not be saved. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    type,
    formData,
    errors,
    isUpdateMode,
    isLoading,
    isSubmitting,
    requestError,
    handleChange,
    submitForm,
    navigate,
  };
}
