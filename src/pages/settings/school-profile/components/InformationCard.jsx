import { Pencil, X } from "lucide-react";

export function InformationCard({ title, children, className, isActionForm, onClickActionButton }) {
  return (
    <div className={`flex flex-col bg-white gap-2 w-full p-3 border border-[#0000004D] rounded-[10px] ${className}`}>
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-[500] text-[#000000]">{title}</h2>

        {/* Edit Button */}
        {isActionForm ? (
          <button onClick={onClickActionButton} className="border cursor-pointer size-[32px] border-[#306E0099] rounded-[4px] flex items-center justify-center">
            <X className="size-[14px] text-[#306E00]" />
          </button>
        ) : (
          <button onClick={onClickActionButton} className="border cursor-pointer size-[32px] border-[#306E0099] rounded-[4px] flex items-center justify-center">
            <Pencil className="size-[14px] text-[#306E00]" />
          </button>
        )}
      </div>

      <div className="flex-1">
        {children}
      </div>
    </div >
  )
}