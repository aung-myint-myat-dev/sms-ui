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

export const hasExamTimeOverlap = (formats = []) => (
  formats.some((format) => isExamTimeOverlapping(format, formats))
);

export const validateGradingSystemForm = (form) => {
  const errors = {};

  if (!form.name?.trim()) {
    errors.name = "Grading system name is required.";
  }

  const max = Number(form.max_mark);
  const pass = Number(form.pass_mark);

  if (
    form.max_mark === "" ||
    form.max_mark == null ||
    !Number.isFinite(max) ||
    max <= 0
  ) {
    errors.max_mark = "Valid max mark is required.";
  }

  if (
    form.pass_mark === "" ||
    form.pass_mark == null ||
    !Number.isFinite(pass) ||
    pass < 0
  ) {
    errors.pass_mark = "Valid pass mark is required.";
  } else if (Number.isFinite(max) && pass > max) {
    errors.pass_mark = "Pass mark cannot exceed max mark.";
  }

  const ranges = form.ranges ?? [];

  if (ranges.length === 0) {
    errors.ranges = "At least one grading range is required.";
  } else {
    const hasInvalidRange = ranges.some((range) => {
      const from = Number(range.from);
      const to = Number(range.to);

      return (
        !range.grading?.trim() ||
        range.from === "" ||
        range.from == null ||
        range.to === "" ||
        range.to == null ||
        !Number.isFinite(from) ||
        !Number.isFinite(to) ||
        from < 0 ||
        from > to ||
        (Number.isFinite(max) && to > max)
      );
    });

    if (hasInvalidRange) {
      errors.ranges = "Please complete all grading ranges correctly.";
    } else if (hasGradingRangeOverlap(ranges)) {
      errors.ranges = "Grading ranges must not overlap.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateExamSetUpForm = (form) => {
  const errors = {};

  if (
    form.exam_type_id === "" ||
    form.exam_type_id == null
  ) {
    errors.exam_type_id = "Exam type is required.";
  }

  const formats = form.formats.filter((format) => Boolean(format.is_active) === true) ?? [];

  if (formats.length === 0) {
    errors.formats = "At least one exam format is required.";
  } else {
    const hasIncompleteFormat = formats.some(
      (format) =>
        !format.subject_id ||
        !format.date ||
        !format.start_time ||
        !format.end_time
    );

    if (hasIncompleteFormat) {
      errors.formats = "Please complete all exam formats.";
    } else {
      const hasOverlap = formats.some((format) =>
        isExamTimeOverlapping(format, formats)
      );

      if (hasOverlap) {
        errors.formats = "Exam times must not overlap.";
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};