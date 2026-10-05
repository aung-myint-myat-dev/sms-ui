import React, { useState } from "react";

export function Switch({
  checked: externalChecked,
  onChange,
  disabled = false,
}) {
  const [internalChecked, setInternalChecked] = useState(false);

  const isChecked =
    externalChecked !== undefined ? externalChecked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;

    const newCheckedState = !isChecked;

    if (externalChecked === undefined) {
      setInternalChecked(newCheckedState);
    }

    onChange?.(newCheckedState);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      onClick={handleToggle}
      className={`
        relative inline-flex
        h-[15px] w-[28px]
        shrink-0 items-center
        rounded-full p-0
        transition-colors duration-200 ease-in-out
        focus:outline-none cursor-pointer
        disabled:cursor-not-allowed disabled:opacity-50
        ${isChecked ? "bg-green-800" : "bg-gray-300"}
      `}
    >
      <span
        className={`
          pointer-events-none
          absolute
          top-[2.5px] left-[2.5px]
          size-[10px]
          rounded-full
          bg-white
          shadow-sm
          transition-transform duration-200 ease-in-out
          ${isChecked ? "translate-x-[13px]" : "translate-x-0"}
        `}
      />
    </button>
  );
}