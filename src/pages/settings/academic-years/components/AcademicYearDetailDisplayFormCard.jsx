import { CalendarDaysIcon } from "lucide-react";

export function AcademicYearDetailDisplayForm({
  name,
  value,
  onChange,
  isDisable,
  label,
  icon: Icon,
}) {
  return (
    <div className={`bg-white border ${!isDisable && 'outline-1 outline-offset-2 outline-[#228B22]'} border-[#C8D6E7] rounded-[10px] flex items-center justify-between gap-8 py-3 px-5`}>
      {/* Icon */}
      <div className="w-[13%] h-full flex items-center justify-end ">
        <Icon className="size-[39px] text-[#228B22]" />
      </div>

      <div className="flex-1 flex flex-col gap-1 py-2.5 px-5 group focus-within:outline outline-[#C8D6E7] rounded-[10px]">
        <label htmlFor={name} className="text-[14px] font-[600] text-[#A6A6A6]">{label}</label>
        <input disabled={isDisable} id={name} className="w-full text-[16px] font-[600] focus:outline-none" type="text" name={name} value={value ?? ""} onChange={onChange} />
      </div>

      <div>
        <label htmlFor={name} className="cursor-pointer">
          <CalendarDaysIcon className="text-[#A8A8A8] size-[26px]" />
        </label>
      </div>
    </div>
  )
}