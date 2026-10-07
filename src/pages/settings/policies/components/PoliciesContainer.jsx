import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function PoliciesContainer({
  title,
  children,
}) {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-full max-h-150.5 max-w-272.5 flex flex-col gap-2 border border-[#0000004D] rounded-[10px] p-4 overflow-hidden">
      {/* Heading */}
      <h2 className="font-semibold text-[16px]">{title}</h2>

      <div className="space-y-2 flex-1 min-h-0">
        {children}
      </div>
    </div>
  )
}