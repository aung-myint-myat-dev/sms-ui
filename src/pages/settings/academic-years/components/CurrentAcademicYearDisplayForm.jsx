import { useEffect, useState } from "react";
import { CalendarDaysIcon } from "lucide-react";
import { YearPicker } from "../../../../components/YearPicker";

export function CurrentAcademicYearDisplayForm({
  label,
  name,
  value,
  onChange,
  isDisable,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const oldYear = value ? Number(value.split('-')[0].trim()) : null

  useEffect(() => {
    if (isDisable) {
      setIsOpen(false);
    }
  }, [isDisable]);

  const handleConfirm = ({ name, value }) => {
    if (isDisable) return;

    onChange({
      target: {
        name,
        value,
      },
    });

    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-start max-w-fit">
      <label
        htmlFor={name}
        className="font-bold text-[18px] text-[#6A6969]"
      >
        {label || "Current Academic Year"}
      </label>

      <div className="relative flex items-center gap-1">
        <input
          id={name}
          className={`w-[180px] text-[24px] font-black text-[#228B22] focus:outline-none ${
            isDisable ? "cursor-not-allowed opacity-60" : ""
          }`}
          type="text"
          name={name}
          value={value ?? ""}
          onChange={onChange}
          disabled={isDisable}
        />

        <button
          type="button"
          className={`shrink-0 ${
            isDisable
              ? "cursor-not-allowed opacity-40"
              : "cursor-pointer"
          }`}
          disabled={isDisable}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Select academic year"
        >
          <CalendarDaysIcon className="text-[#A8A8A8] size-[26px]" />
        </button>

        {isOpen && !isDisable && (
          <div className="absolute left-0 top-full z-50 mt-2 min-w-[280px]">
            <YearPicker
              open={isOpen}
              onClose={() => setIsOpen(false)}
              name={name}
              value={oldYear}
              onConfirm={handleConfirm}
            />
          </div>
        )}
      </div>
    </div>
  );
}