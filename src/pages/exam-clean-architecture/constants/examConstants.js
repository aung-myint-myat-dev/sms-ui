export const TABS = [
  { id: 1, label: "Student Marks", value: "student-marks" },
  { id: 2, label: "Exam Type", value: "exam-types" },
  { id: 3, label: "Grading System", value: "grading-systems" },
  { id: 4, label: "Exam Set Up", value: "exam-set-up" },
];

export const EMPTY_EXAM_TYPE_FORM = {
  name: "",
  has_report_card: false,
  is_active: true,
};

export const EMPTY_GRADING_SYSTEM_FORM = {
  name: "",
  max_mark: 0,
  pass_mark: 0,
  ranges: [{ id: 1, grading: "", from: "", to: "" }],
};

export const EMPTY_GRADING_SYSTEM_FORM_ERRORS = {
  name: "",
  max_mark: "",
  pass_mark: "",
  ranges: [{ grading: "", from: "", to: "" }],
};

export const EMPTY_SET_UP_FORM = {
  exam_type_id: "",
  grade_id: "",
  grading_system_id: "",
  formats: [
    {
      id: "",
      subject_id: "",
      subject_name: "",
      date: "",
      start_time: "",
      end_time: "",
      duration: 0,
      max_mark: 0,
      pass_mark: 0,
      d_mark: "",
      is_active: true,
    },
  ],
};

export const makeEmptyGradingForm = () => ({
  name: "",
  max_mark: "",
  pass_mark: "",
  ranges: [{ id: "", grading: "", from: "", to: "" }],
});
