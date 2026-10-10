import { CalendarDaysIcon } from "lucide-react";

export function CurrentAcademicYearDisplayForm({
  label,
  name,
  value,
  onChange,
  isDisable,
}) {
  return (
    <div className="flex flex-col items-start max-w-fit">
      <label
        htmlFor={name}
        className="font-bold text-[18px] text-[#6A6969]"
      >
        {label || "Current Academic Year"}
      </label>

      <div className="flex items-center gap-1">
        <input
          id={name}
          className="w-[180px] text-[24px] font-black text-[#228B22] focus:outline-none"
          type="text"
          name={name}
          value={value ?? ""}
          onChange={onChange}
          disabled={isDisable}
        />

        <label htmlFor={name} className="cursor-pointer shrink-0">
          <CalendarDaysIcon className="text-[#A8A8A8] size-[26px]" />
        </label>
      </div>
    </div>
  );
}