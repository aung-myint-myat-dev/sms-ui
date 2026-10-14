export function splitPoliciesByType(policies = []) {
  return {
    schoolPolicies: policies.filter((policy) => policy.type === "school"),
    appPolicies: policies.filter((policy) => policy.type === "app"),
  };
}

export function getPolicyActionMode(pathname = "") {
  return /\/(update|edit)$/.test(pathname) || /\/\d+\/edit$/.test(pathname)
    ? "update"
    : "create";
}

export function getPolicyTypeLabel(type = "") {
  return type ? `${type.charAt(0).toUpperCase()}${type.slice(1)}` : "";
}
