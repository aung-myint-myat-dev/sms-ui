import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../payments/components/ui/Button";

const MONTHS = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

const parseDate = (value) => {
  if (!value) return null;
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
};

export function DatePicker({
  open,
  onClose,
  name,
  value = "",
  onConfirm,
  minDate,
  maxDate,
  fromYear = 2004,
  toYear
}) {

  const today = new Date();
  const todayString = formatDate(today);

  const getInitialDate = () => {
    const parsedDate = parseDate(value)
    if(parsedDate) {
      return parsedDate
    }
    if (fromYear === today.getFullYear()) {
      return today;
    }
    return new Date(fromYear, 0, 1)
  }

  const datePickerRef = useRef(null)
  const [selectedDate, setSelectedDate] = useState(getInitialDate);
  const [viewDate, setViewDate] = useState(getInitialDate);
  const [view, setView] = useState("days");

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
    const date = getInitialDate();
    setSelectedDate(date);
    setViewDate(date);
    setView("days");
  }, [value, open, fromYear]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose])

  if (!open) return null;

  const min = parseDate(minDate);
  const max = parseDate(maxDate);

  const isDisabled = (date) => {
    const dateString = formatDate(date);
    return (
      (min && dateString < formatDate(min)) ||
      (max && dateString > formatDate(max))
    );
  };

  const changeMonth = (amount) => {
    setViewDate(
      (prev) => new Date(
        prev.getFullYear(),
        prev.getMonth() + amount,
        1
      )
    );
  };

  const firstDay = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth(),
    1
  ).getDay();

  const days = Array.from(
    { length: 42 },
    (_, index) => {
      const day = index - firstDay + 1;

      return new Date(
        viewDate.getFullYear(),
        viewDate.getMonth(),
        day
      );
    }
  );

  const handleConfirm = () => {
    onConfirm?.({
      name,
      value: formatDate(selectedDate),
    });
    onClose()
  };

  const handleMonthSelect = (month) => {
    setViewDate(
      new Date(viewDate.getFullYear(), month, 1)
    );
    setView("days");
  };

  const handleYearSelect = (year) => {
    setViewDate(
      new Date(year, viewDate.getMonth(), 1)
    );
    setView("months");
  };

  const yearStart =
    fromYear +
    Math.floor((viewDate.getFullYear() - fromYear) / 9) * 9;

  const years = Array.from(
    { length: 9 },
    (_, index) => yearStart + index
  ).filter((year) => year >= fromYear && year <= toYear);

  const isChangeMonthButtonDisabled = (direction) => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    if (direction === "prev") {
      return year < fromYear || (year === fromYear && month === 0);
    }

    if (direction === "next") {
      return (
        toYear !== undefined &&
        (year > toYear || (year === toYear && month === 11))
      );
    }

    return false;
  };

  return (
    <div ref={datePickerRef} className="w-full rounded-[10px] border border-gray-200 bg-white p-4 shadow-lg">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          className={`rounded-md p-1 hover:bg-gray-100 ${isChangeMonthButtonDisabled("prev") && 'text-zinc-300 cursor-not-allowed'}`}
          aria-label="Previous month"
          disabled={isChangeMonthButtonDisabled("prev")}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={() =>
            setView((prev) =>
              prev === "days" ? "months" : "days"
            )
          }
          className="flex items-center gap-3 rounded-md px-2 py-1 font-semibold hover:bg-gray-100"
        >
          {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
          {view === 'days' ? (
            <ChevronDown className="size-6" />
          ) : (
            <ChevronUp className="size-6" />
          )}
        </button>

        <button
          type="button"
          onClick={() => changeMonth(1)}
          className={`rounded-md p-1 hover:bg-gray-100 ${isChangeMonthButtonDisabled("next") && 'text-zinc-300 cursor-not-allowed '}`}
          aria-label="Next month"
          disabled={isChangeMonthButtonDisabled("next")}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Calendar */}
      {view === "days" && (
        <>
          <div className="grid grid-cols-7 gap-1 text-center">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="py-2 text-xs font-medium text-gray-500"
              >
                {day}
              </div>
            ))}

            {days.map((date, index) => {
              const dateString = formatDate(date);
              const isCurrentMonth =
                date.getMonth() === viewDate.getMonth();

              const isSelected =
                dateString === formatDate(selectedDate);

              const isToday = dateString === todayString;
              const disabled = isDisabled(date);

              return (
                <button
                  key={index}
                  type="button"
                  disabled={disabled}
                  onClick={() => setSelectedDate(date)}
                  className={`flex aspect-square items-center justify-center rounded-full text-sm
                    ${isSelected
                      ? "bg-green-700 text-white"
                      : isToday
                        ? "border border-green-700 text-green-700"
                        : "hover:bg-gray-100"
                    }
                    ${!isCurrentMonth ? "text-gray-300" : ""}
                    ${disabled ? "cursor-not-allowed opacity-30" : ""}
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Month Selection */}
      {view === "months" && (
        <div className="grid grid-cols-3 gap-2">
          {MONTHS.map((month, index) => (
            <button
              key={month}
              type="button"
              onClick={() => handleMonthSelect(index)}
              className={`rounded-md py-3 text-sm
                ${viewDate.getMonth() === index
                  ? "bg-green-700 text-white"
                  : "hover:bg-green-50"
                }`}
            >
              {month.slice(0, 3)}
            </button>
          ))}

          <div className="col-span-3 mt-2 flex justify-center">
            <button onClick={() => setView("years")} className="text-green-700 font-semibold text-sm hover:underline cursor-pointer">Choose Year</button>
          </div>
        </div>
      )}

      {/* Year Selection */}
      {view === "years" && (
        <div className="grid grid-cols-3 gap-2">
          {years.map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => handleYearSelect(year)}
              className={`rounded-md py-3 text-sm
                ${viewDate.getFullYear() === year
                  ? "bg-green-700 text-white"
                  : "hover:bg-green-50"
                }`}
            >
              {year}
            </button>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex justify-end gap-2 border-t border-gray-100 pt-3">
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