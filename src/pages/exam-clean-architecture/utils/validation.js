export const isRangeOverlapping = (currentRange, ranges = []) => {
  const from = Number(currentRange.from);
  const to = Number(currentRange.to);

  if (
    currentRange.from === "" ||
    currentRange.from == null ||
    currentRange.to === "" ||
    currentRange.to == null ||
    !Number.isFinite(from) ||
    !Number.isFinite(to) ||
    from > to
  ) {
    return false;
  }

  return ranges.some((range) => {
    if (range.id === currentRange.id) return false;
    if (
      range.from === "" ||
      range.from == null ||
      range.to === "" ||
      range.to == null
    ) {
      return false;
    }

    const otherFrom = Number(range.from);
    const otherTo = Number(range.to);
    if (
      !Number.isFinite(otherFrom) ||
      !Number.isFinite(otherTo) ||
      otherFrom > otherTo
    ) {
      return false;
    }

    return from <= otherTo && to >= otherFrom;
  });
};

export const isExamTimeOverlapping = (currentFormat, formats) => {
  const { date, start_time: startTime, end_time: endTime } = currentFormat;
  if (!date || !startTime || !endTime) return false;
  if (startTime >= endTime) return true;

  return formats.some((format) => {
    if (format.id === currentFormat.id || format.date !== date) return false;
    if (!format.start_time || !format.end_time) return false;
    if (format.start_time >= format.end_time) return false;

    return startTime < format.end_time && endTime > format.start_time;
  });
};

export const hasGradingRangeOverlap = (ranges = []) => (
  ranges.some((range) => isRangeOverlapping(range, ranges))
);

export const validateGradingSystemForm = (form) => {
  const errors = {};

  if (!form.grading_system_name?.trim()) {
    errors.grading_system_name = "Grading system name is required.";
  }
  if (
    form.max_mark === "" ||
    form.max_mark == null ||
    !Number.isFinite(Number(form.max_mark))
  ) {
    errors.max_mark = "Max mark is required.";
  }
  if (
    form.min_mark === "" ||
    form.min_mark == null ||
    !Number.isFinite(Number(form.min_mark))
  ) {
    errors.min_mark = "Min mark is required.";
  }
  if (
    form.min_mark !== "" &&
    form.min_mark != null &&
    form.max_mark !== "" &&
    form.max_mark != null &&
    Number.isFinite(Number(form.min_mark)) &&
    Number.isFinite(Number(form.max_mark)) &&
    Number(form.min_mark) > Number(form.max_mark)
  ) {
    errors.min_mark = "Min mark cannot exceed max mark.";
  }

  const ranges = form.ranges ?? [];
  if (ranges.length === 0) {
    errors.ranges = "At least one grading range is required.";
  } else if (hasGradingRangeOverlap(ranges)) {
    errors.ranges = "Grading ranges must not overlap.";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

export const hasExamTimeOverlap = (formats = []) => (
  formats.some((format) => isExamTimeOverlapping(format, formats))
);
