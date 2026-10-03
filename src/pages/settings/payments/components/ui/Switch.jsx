import React, { useState } from "react";

export function Switch({ checked: externalChecked, onChange, disabled = false }) {
  const [internalChecked, setInternalChecked] = useState(false);
  const isChecked = externalChecked !== undefined ? externalChecked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const newCheckedState = !isChecked;
    if (externalChecked === undefined) {
      setInternalChecked(newCheckedState);
    }
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      onClick={handleToggle}
      className={`relative inline-flex h-3 w-[28px] h-[15px] shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${isChecked ? "bg-green-800" : "bg-gray-300"
        }`}
    >
      <span
        className={`pointer-events-none inline-block size-[10px] transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${isChecked ? "translate-x-[15px]" : "translate-x-[3px]"
          }`}
      />
    </button>
  );
}