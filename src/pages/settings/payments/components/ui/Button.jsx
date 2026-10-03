import React from "react";
import { cn } from "../../../../../lib/utils"; // မိမိ utils file လမ်းကြောင်းထည့်ပါ

export function Button({
  children,
  className,
  variant = "primary", // primary, secondary, outline, danger, ghost
  size = "md",         // sm, md, lg
  icon: Icon,          // Lucide Icon (သို့) React Component Icon
  iconPosition = "left", // 'left' | 'right'
  disabled = false,
  type = "button",
  ...props             // onClick, id, aria-*, etc. စသည့် အခြား HTML Props အားလုံး လက်ခံမည်
}) {
  // Base CSS Styles
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-[8px] font-roboto font-semibold";

  // Variant Styles
  const variants = {
    primary: "bg-[#228B22] text-white hover:bg-green-700 focus:ring-green-500",
    secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus:ring-zinc-400",
    outline: "border border-zinc-300 bg-transparent text-zinc-700 hover:bg-zinc-50 focus:ring-zinc-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    ghost: "bg-transparent text-zinc-700 hover:bg-zinc-100 focus:ring-zinc-400",
  };

  // Size Styles
  const sizes = {
    sm: "h-[24px] px-[12px] text-[10px] gap-1.5",
    md: "h-[30px] px-[16px] text-[12px] gap-2",   // <--- မူရင်း Medium Size
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