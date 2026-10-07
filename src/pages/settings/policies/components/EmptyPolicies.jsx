export function EmptyPolicies({ icon: Icon, placeholder }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-max absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="size-[140px] bg-[#D9D9D933] rounded-full flex items-center justify-center">
        {Icon && (
          <Icon className="size-[60px] text-[#87878740]" />
        )}
      </div>
      <h2 className="text-[16px] font-semibold text-[#87878780]">{placeholder}</h2>
    </div>
  )
}