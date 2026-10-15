export function DisplayCard({ title, children }) {
  return (
    <div className="border border-[#0000004D] rounded-[10px] p-4 space-y-4">
      <h2 className="text-[18px] font-[600] text-[#228B22]">{title}</h2>

      <div>
        {children}
      </div>
    </div>
  )
}