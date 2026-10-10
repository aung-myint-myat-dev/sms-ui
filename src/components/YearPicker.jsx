import { ChevronLeftIcon, ChevronRightIcon, DamIcon } from "lucide-react";
import { Button } from "../pages/settings/payments/components/ui/Button";
import { useEffect, useRef, useState } from "react";

export function YearPicker({
  fromYear = 2004,
  toYear = new Date().getFullYear() + 5,
  open,
  name,
  value,
  onConfirm,
  onClose,
}) {
  const currentYear = new Date().getFullYear();

  const getInitialYear = () =>
    Math.min(toYear, Math.max(fromYear, currentYear));

  const getPageStart = (year) =>
    fromYear + Math.floor((year - fromYear) / 9) * 9;

  const [selectedYear, setSelectedYear] = useState(getInitialYear);
  const datePickerRef = useRef(null)
  const [pageStart, setPageStart] = useState(() =>
    getPageStart(getInitialYear())
  );

  useEffect(() => {
    const year = value
      ? Number(value)
      : getInitialYear();

    const validYear =
      Number.isInteger(year) &&
      year >= fromYear &&
      year <= toYear;

    const initialYear = validYear ? year : getInitialYear();

    setSelectedYear(initialYear);
    setPageStart(getPageStart(initialYear));
  }, [fromYear, toYear, value]);

  const handleClickOutside = (event) => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target) &&
      event.target.value !== value
    ) {
      onClose?.();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  if (!open) return null;

  const years = Array.from(
    { length: Math.min(9, toYear - pageStart + 1) },
    (_, index) => pageStart + index
  );

  const handlePrevious = () => {
    setPageStart((prev) => Math.max(fromYear, prev - 9));
  };

  const handleNext = () => {
    setPageStart((prev) =>
      Math.min(
        getPageStart(toYear),
        prev + 9
      )
    );
  };

  const handleConfirm = () => {
    onConfirm?.({
      name,
      value: selectedYear + ' - ' + Number(selectedYear + 1),
    });
  };


  // useEffect(() => {

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [onClose]);



  return (
    <div ref={datePickerRef} className="min-h-[242px] flex flex-col gap-3 w-full bg-white mr-2 p-4 rounded-[10px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[14px]">
          Select Year
        </h2>

        <div className="w-[30%] h-[24px] flex items-center justify-between">
          <button
            type="button"
            disabled={pageStart <= fromYear}
            onClick={handlePrevious}
            className="disabled:opacity-30"
          >
            <ChevronLeftIcon />
          </button>

          <button
            type="button"
            disabled={pageStart >= getPageStart(toYear)}
            onClick={handleNext}
            className="disabled:opacity-30"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {/* Years */}
      <div className="flex-1 grid grid-cols-3 gap-3">
        {years.map((year) => {
          const isChecked = year === selectedYear;

          return (
            <button
              type="button"
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`border h-[40px] rounded-[6px] font-semibold text-[14px]
                ${isChecked
                  ? "bg-[#228B2233] border-[#228B22]"
                  : "border-[#0000004D]"
                }`}
            >
              {year}
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>

        <Button onClick={handleConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
}