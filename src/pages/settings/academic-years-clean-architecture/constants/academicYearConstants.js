export const ACADEMIC_YEAR_STORAGE_KEY = "sms-ui:academic-years";

export const ACADEMIC_YEAR_FIELDS = [
  {
    name: "school_opening_date",
    label: "School Opening Date",
  },
  {
    name: "school_closing_date",
    label: "School Closing Date",
  },
  {
    name: "registration_open_date",
    label: "Registration Open Date",
  },
  {
    name: "registration_close_date",
    label: "Registration Close Date",
  },
];

export const INITIAL_ACADEMIC_YEARS = [
  {
    id: 1,
    academic_year: "2022 - 2023",
    school_opening_date: "2022-06-01",
    school_closing_date: "2023-03-31",
    registration_open_date: "2022-04-01",
    registration_close_date: "2022-05-25",
    total_students: 450,
    status: "completed",
  },
  {
    id: 2,
    academic_year: "2023 - 2024",
    school_opening_date: "2023-06-01",
    school_closing_date: "2024-03-31",
    registration_open_date: "2023-04-01",
    registration_close_date: "2023-05-25",
    total_students: 520,
    status: "completed",
  },
  {
    id: 3,
    academic_year: "2024 - 2025",
    school_opening_date: "2024-06-01",
    school_closing_date: "2025-03-31",
    registration_open_date: "2024-04-01",
    registration_close_date: "2024-05-25",
    total_students: 610,
    status: "completed",
  },
  {
    id: 4,
    academic_year: "2025 - 2026",
    school_opening_date: "2025-06-01",
    school_closing_date: "2026-03-31",
    registration_open_date: "2025-04-01",
    registration_close_date: "2025-05-25",
    total_students: 680,
    status: "completed",
  },
  {
    id: 5,
    academic_year: "2026 - 2027",
    school_opening_date: "2026-06-01",
    school_closing_date: "2027-03-31",
    registration_open_date: "2026-04-01",
    registration_close_date: "2026-05-25",
    total_students: 0,
    status: "active",
  },
];

export const EMPTY_ACADEMIC_YEAR = {
  academic_year: "",
  school_opening_date: "",
  school_closing_date: "",
  registration_open_date: "",
  registration_close_date: "",
};
