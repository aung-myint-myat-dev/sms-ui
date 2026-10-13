export function Switch({ checked = false, onChange, disabled = false }) {
  return (
    <label
      className={`
        relative inline-flex h-[18px] w-[28px]
        shrink-0 items-center rounded-full
        transition-colors duration-200
        ${checked ? "bg-[#228B22]" : "bg-gray-300"}
        ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
      `}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
        className="sr-only"
      />

      <span
        className={`
          absolute left-[2px] top-[2px]
          size-[14px] rounded-full bg-white
          shadow-sm transition-transform duration-200
          ${checked ? "translate-x-[10px]" : "translate-x-0"}
        `}
      />
    </label>
  );
}