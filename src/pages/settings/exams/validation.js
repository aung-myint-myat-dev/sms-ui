export const isRangeOverlapping = (currentRange, ranges = []) => {
  const from = Number(currentRange.from);
  const to = Number(currentRange.to);

  // Skip incomplete or invalid values
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
    // Skip current range
    if (range.id === currentRange.id) return false;

    // Skip incomplete ranges
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

    // Skip invalid ranges
    if (
      !Number.isFinite(otherFrom) ||
      !Number.isFinite(otherTo) ||
      otherFrom > otherTo
    ) {
      return false;
    }

    // Check duplicate boundaries and overlapping ranges
    return from <= otherTo && to >= otherFrom;
  });
};

export const isExamTimeOverlapping = (currentFormat, formats) => {
  const { date, start_time, end_time } = currentFormat;

  // Skip incomplete formats
  if (!date || !start_time || !end_time) {
    return false;
  }

  // Invalid time range
  if (start_time >= end_time) {
    return true;
  }

  return formats.some((format) => {
    // Skip current format
    if (format.id === currentFormat.id) return false;

    // Only check exams on the same date
    if (format.date !== date) return false;

    // Skip incomplete formats
    if (!format.start_time || !format.end_time) {
      return false;
    }

    // Skip invalid time ranges
    if (format.start_time >= format.end_time) {
      return false;
    }

    // Check time overlap
    return (
      start_time < format.end_time &&
      end_time > format.start_time
    );
  });
};

// Grading System overlap validation
export const hasGradingRangeOverlap = (ranges = []) => {
  return ranges.some((range) =>
    isRangeOverlapping(range, ranges)
  );
};

export const validateGradingSystemForm = (form) => {
  const errors = {};

  // Required fields
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

  // Min mark must not exceed max mark
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

  // At least one range is required
  const ranges = form.ranges ?? [];

  if (ranges.length === 0) {
    errors.ranges = "At least one grading range is required.";
  } else if (hasGradingRangeOverlap(ranges)) {
    errors.ranges = "Grading ranges must not overlap.";
  }

  console.log(errors)
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Exam Setup time overlap validation
export const hasExamTimeOverlap = (formats = []) => {
  return formats.some((format) =>
    isExamTimeOverlapping(format, formats)
  );
};