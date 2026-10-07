import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react"
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export function PolicyCard({ id, type, title, description, onDelete }) {
  const navigate = useNavigate();
  const [showDetail, setShowDetail] = useState(false);
  const borderColor = {
    school: 'border-[#006897]',
    app: 'border-[#97005B]'
  }
  return (
    <div className={`w-full min-h-6 p-[11px] border-[3px_1px_1px_1px] rounded-[10px] ${borderColor[type]}`}>
      <div className="flex items-center justify-between py-1.5">
        <h2 className="font-[500] text-[14px]">{title}</h2>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(`/settings/policies/${type}/${id}/edit`)} className="size-[28px] border-[0.5px] border-[#306E0099] rounded-[4px] flex items-center justify-center group cursor-pointer">
            <Pencil className="size-[13px] text-[#306E0099]" />
          </button>

          <button onClick={onDelete} className="size-[28px] border-[0.5px] border-[#6e000099] rounded-[4px] flex items-center justify-center group cursor-pointer">
            <Trash2 className="size-[13px] text-[#6e000099]" />
          </button>

          <button onClick={() => setShowDetail(!showDetail)} className="size-[28px] border-[0.5px] border-[#0d006e99] rounded-[4px] flex items-center justify-center group cursor-pointer">
            {showDetail ? (
              <ChevronUp className="size-[14px] text-[#0d006e99]" />
            ) : (
              <ChevronDown className="size-[14px] text-[#0d006e99]" />
            )}
          </button>
        </div>
      </div>
      {showDetail && (
        // <p className={`font-normal text-[14px] mt-1 text-left leading-[23px]`}>{description}</p>
        <div dangerouslySetInnerHTML={{
          __html: description
        }} className="policy-description"></div>
      )}
    </div>
  )
}