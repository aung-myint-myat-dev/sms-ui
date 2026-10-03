import { cn } from "../../../../../lib/utils";

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  disabled = false,
  type = "button",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors outline-none disabled:opacity-50 disabled:pointer-events-none rounded-[8px] font-roboto font-semibold cursor-pointer";

  const variants = {
    primary: "bg-[#228B22] active:bg-[#29A829] text-white hover:bg-green-700 focus:ring-green-500",
    secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus:ring-zinc-400",
    outline: "border border-[#228B22] bg-transparent text-[#228B22] hover:bg-[#EAFAEA]",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    ghost: "bg-transparent text-zinc-700 hover:bg-zinc-100 focus:ring-zinc-400",
  };

  const sizes = {
    sm: "h-[24px] px-[12px] text-[10px] gap-1.5",
    md: "h-[30px] px-[16px] text-[12px] gap-2",
    lg: "h-[38px] px-[20px] text-[14px] gap-2.5",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {/* Left Icon */}
      {Icon && iconPosition === "left" && (
        <Icon className={size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4"} />
      )}

      {/* Button Content */}
      {children && <span>{children}</span>}

      {/* Right Icon */}
      {Icon && iconPosition === "right" && (
        <Icon className={size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4"} />
      )}
    </button>
  );
}