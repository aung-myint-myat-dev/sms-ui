export function PaymentSystemRadio({
  label = "Label",
  id = '',
  checked = false,
  ...props
}) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label
      htmlFor={inputId}
      className="
        peer
        flex h-[50px] w-[127px]
        cursor-pointer
        items-center justify-center
        rounded-[8px]
        border border-[#0000004D]
        text-[14px] font-normal
        text-zinc-700
        transition-colors
        hover:border-green-700
        hover:text-green-700

        has-checked:border-green-700
        has-checked:text-green-700
        has-checked:border-2
        has-checked:font-semibold
      "
    >
      {label}

      <input
        id={inputId}
        type="radio"
        checked={checked}
        {...props}
        className="hidden"
      />
    </label>
  );
}