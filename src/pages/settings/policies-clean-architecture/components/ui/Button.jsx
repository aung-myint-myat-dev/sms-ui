export function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  ...props
}) {
  const variants = {
    primary: "bg-theme active:bg-[#29A829] text-white hover:bg-green-700 focus:ring-green-500",
    outline: "border border-[#228B22] bg-transparent text-[#228B22] hover:bg-[#EAFAEA]",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };
  const sizes = {
    md: "h-[30px] px-[16px] text-[12px]",
    lg: "h-[38px] px-[20px] text-[14px]",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-medium transition-colors outline-none disabled:opacity-50 disabled:pointer-events-none rounded-[8px] font-roboto font-semibold cursor-pointer ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
