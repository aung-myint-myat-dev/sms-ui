import { CalendarDaysIcon } from "lucide-react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { DatePicker } from "./DatePicker";

const GAP = 8;
const MARGIN = 8;

export function AcademicYearDetailDisplayForm({
  name,
  value,
  onChange,
  isDisable,
  label,
  icon: Icon,
  academicYear,
}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null);

  const inputRef = useRef(null);
  const pickerRef = useRef(null);

  const updatePosition = useCallback(() => {
    const input = inputRef.current;
    const picker = pickerRef.current;

    if (!input || !picker) return;

    const rect = input.getBoundingClientRect();

    const pickerWidth = picker.offsetWidth;
    const pickerHeight = picker.offsetHeight;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Available space around input
    const spaces = {
      bottom: viewportHeight - rect.bottom - GAP - MARGIN,
      top: rect.top - GAP - MARGIN,
      right: viewportWidth - rect.right - GAP - MARGIN,
      left: rect.left - GAP - MARGIN,
    };

    // Check which sides can fully fit the picker
    const canFit = {
      bottom: spaces.bottom >= pickerHeight,
      top: spaces.top >= pickerHeight,
      right: spaces.right >= pickerWidth,
      left: spaces.left >= pickerWidth,
    };

    // Prefer a side that fits, choosing the one with most free space
    const directions = ["bottom", "top", "right", "left"];

    const fittingDirections = directions.filter(
      (direction) => canFit[direction]
    );

    const candidates = fittingDirections.length
      ? fittingDirections
      : directions;

    const direction = candidates.reduce((best, current) => {
      return spaces[current] > spaces[best] ? current : best;
    });

    let top = 0;
    let left = 0;

    switch (direction) {
      case "bottom":
        top = rect.bottom + GAP;
        left = rect.left;
        break;

      case "top":
        top = rect.top - pickerHeight - GAP;
        left = rect.left;
        break;

      case "right":
        top = rect.top;
        left = rect.right + GAP;
        break;

      case "left":
        top = rect.top;
        left = rect.left - pickerWidth - GAP;
        break;
    }

    // Keep picker inside viewport
    left = Math.max(
      MARGIN,
      Math.min(left, viewportWidth - pickerWidth - MARGIN)
    );

    top = Math.max(
      MARGIN,
      Math.min(top, viewportHeight - pickerHeight - MARGIN)
    );

    setPosition({
      position: "fixed",
      top,
      left,
      zIndex: 1000,
    });
  }, []);

  // Recalculate on open, scroll and resize
  useLayoutEffect(() => {
    if (!open) return;

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  // Close on outside click or Escape
  useLayoutEffect(() => {
    if (!open) return;

    const handlePointerDown = (event) => {
      if (inputRef.current?.contains(event.target)) return;
      if (pickerRef.current?.contains(event.target)) return;

      setOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleToggle = () => {
    if (isDisable) return;

    setPosition(null);
    setOpen((prev) => !prev);
  };

  const handleConfirm = ({ name, value }) => {
    onChange?.({
      target: {
        name,
        value,
      },
    });

    setOpen(false);
  };

  const startYear = academicYear ? Number(academicYear.split('-')[0].trim()) : 2003
  
  return (
    <>
      {/* INPUT */}
      <div
        ref={inputRef}
        className={`relative bg-white border ${!isDisable
            ? "outline-1 outline-offset-2 outline-[#228B22]"
            : ""
          } border-[#C8D6E7] rounded-[10px] flex items-center justify-between gap-8 py-3 px-5`}
      >
        {/* Icon */}
        <div className="w-[13%] h-full flex items-center justify-end">
          <Icon className="size-[39px] text-[#228B22]" />
        </div>

        {/* Input */}
        <div className="flex-1 flex flex-col gap-1 py-2.5 px-5 group focus-within:outline outline-[#C8D6E7] rounded-[10px]">
          <label
            htmlFor={name}
            className="text-[14px] font-[600] text-[#A6A6A6]"
          >
            {label}
          </label>

          <input
            id={name}
            name={name}
            type="text"
            readOnly
            disabled={isDisable}
            value={value ?? ""}
            onClick={handleToggle}
            className="w-full text-[16px] font-[600] focus:outline-none cursor-pointer disabled:cursor-not-allowed"
          />
        </div>

        {/* Calendar Button */}
        <button
          type="button"
          disabled={isDisable}
          onClick={handleToggle}
          className="cursor-pointer disabled:cursor-not-allowed"
        >
          <CalendarDaysIcon className="text-[#A8A8A8] size-[26px]" />
        </button>
      </div>

      {/* DATE PICKER */}
      {open &&
        createPortal(
          <div
            ref={pickerRef}
            style={
              position ?? {
                position: "fixed",
                top: 0,
                left: 0,
                visibility: "hidden",
                zIndex: 1000,
              }
            }
            className="w-[350px] max-w-[calc(100vw-16px)]"
          >
            <DatePicker
              open={true}
              name={name}
              value={value}
              onClose={() => setOpen(false)}
              onConfirm={handleConfirm}
              fromYear={startYear}
              toYear={Number(startYear + 1)}
            />
          </div>,
          document.body
        )}
    </>
  );
}