import { X } from "lucide-react";

export function BranchImage({ isActive, url, selectBranch, ref, canDelete, onDelete }) {

  return (
    <div className={`relative w-65.25 h-full rounded-[10px] ${isActive && 'outline-3 outline-[#228B22] outline-offset-2'}`}>
      {canDelete && (
        <button onClick={onDelete} className="absolute -top-2 -right-2 bg-red-500/90 size-8 text-white rounded-full flex items-center justify-center cursor-pointer z-10">
          <X className="size-4" />
        </button>
      )}
      <div className="h-full relative overflow-hidden rounded-[10px]">
        <button ref={ref} onClick={selectBranch} className={`absolute inset-0 w-full h-full ${isActive ? '' : 'bg-zinc-950/30'}`}></button>
        {url ? (
          <img src={url} alt="branch-image" className="size-full object-cover" />
        ) : (

          <img src={'https://ksport.ie/cdn/shop/collections/school-placeholder_61620676-036c-467b-94b3-819582166526.png?v=1621501328'} alt="branch-image" className="size-full object-cover" />
        )}
      </div>
    </div>
  )
}