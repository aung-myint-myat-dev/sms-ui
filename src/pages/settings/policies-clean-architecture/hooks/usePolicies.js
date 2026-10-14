import { useCallback, useEffect, useState } from "react";
import { policyApi } from "../api/policyApi";

export function usePolicies() {
  const [policies, setPolicies] = useState([]);
  const [deletePolicy, setDeletePolicy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchPolicies = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      setPolicies(await policyApi.getAll());
    } catch (requestError) {
      console.error("Fetching policies failed:", requestError);
      setError("Policies could not be loaded. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isCurrent = true;

    policyApi.getAll()
      .then((data) => {
        if (isCurrent) setPolicies(data);
      })
      .catch((requestError) => {
        console.error("Fetching policies failed:", requestError);
        if (isCurrent) setError("Policies could not be loaded. Please try again.");
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const deleteSelectedPolicy = async () => {
    if (!deletePolicy || isDeleting) return false;
    setIsDeleting(true);
    setError("");
    try {
      await policyApi.delete(deletePolicy.id);
      setPolicies((current) => current.filter((policy) => policy.id !== deletePolicy.id));
      setDeletePolicy(null);
      return true;
    } catch (requestError) {
      console.error("Deleting policy failed:", requestError);
      setError("The policy could not be deleted. Please try again.");
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    policies,
    deletePolicy,
    setDeletePolicy,
    isLoading,
    isDeleting,
    error,
    fetchPolicies,
    deleteSelectedPolicy,
  };
}
