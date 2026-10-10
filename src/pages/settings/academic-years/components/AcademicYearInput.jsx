import { CalendarDays } from "lucide-react";

export function AcademicYearInput({
  name,
  label,
  value,
  onChange,
  onChoose,
}) {
  const currentYear = new Date().getFullYear()
  const placeHolder = currentYear + ' - ' + Number(currentYear + 1)

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-semibold text-[16px]">{label}</label>
      <div className="relative focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#228B22] flex items-center px-6 gap-6 border border-[#0000004D] rounded-[8px] h-[49px]">
        <CalendarDays className="text-[#A8A8A8] size-6" />
        <input disabled type="text" id={name} value={value} onChange={onChange} className="w-full h-full focus:outline-none text-[18px] font-[500]" placeholder={placeHolder} />
        <button className="absolute cursor-pointer inset-0 w-full h-full z-10" onClick={onChoose} />
      </div>
    </div>
  )
}