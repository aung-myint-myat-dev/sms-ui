export const grades = [
  { id: 1, label: "KG", value: "kg" },
  { id: 2, label: "Grade 1", value: "grade_1" },
  { id: 3, label: "Grade 2", value: "grade_2" },
  { id: 4, label: "Grade 3", value: "grade_3" },
  { id: 5, label: "Grade 4", value: "grade_4" },
  { id: 6, label: "Grade 5", value: "grade_5" },
  { id: 7, label: "Grade 6", value: "grade_6" },
  { id: 8, label: "Grade 7", value: "grade_7" },
  { id: 9, label: "Grade 8", value: "grade_8" },
  { id: 10, label: "Grade 9", value: "grade_9" },
  { id: 11, label: "Grade 10", value: "grade_10" },
  { id: 12, label: "Grade 11", value: "grade_11" },
  { id: 13, label: "Grade 12", value: "grade_12" }
];

// 1. Subjects Data
export const subjects = [
  { id: 1, name: "Myanmar", code: "MYAN" },
  { id: 2, name: "English", code: "ENG" },
  { id: 3, name: "Mathematics", code: "MATH" },
  { id: 4, name: "Science", code: "SCI" },
  { id: 5, name: "Social Studies", code: "SOC" },
  { id: 6, name: "Physics", code: "PHYS" },
  { id: 7, name: "Chemistry", code: "CHEM" },
  { id: 8, name: "Biology", code: "BIO" },
  { id: 9, name: "Geography", code: "GEO" },
  { id: 10, name: "History", code: "HIST" },
  { id: 11, name: "Computer Science", code: "CS" }
];

// 2. Grade & Subjects Pivot Data (Many-to-Many Relationship)
export const gradeSubjects = [
  // KG (grade_id: 1) - Basic subjects
  { id: 1, grade_id: 1, subject_id: 1 }, // Myanmar
  { id: 2, grade_id: 1, subject_id: 2 }, // English
  { id: 3, grade_id: 1, subject_id: 3 }, // Math
  { id: 4, grade_id: 1, subject_id: 4 }, // Science

  // Grade 1 to 8 (grade_id: 2 to 9) - General Primary/Middle
  ...[2, 3, 4, 5, 6, 7, 8, 9].flatMap(gradeId => [
    { id: gradeId * 10 + 1, grade_id: gradeId, subject_id: 1 }, // Myanmar
    { id: gradeId * 10 + 2, grade_id: gradeId, subject_id: 2 }, // English
    { id: gradeId * 10 + 3, grade_id: gradeId, subject_id: 3 }, // Math
    { id: gradeId * 10 + 4, grade_id: gradeId, subject_id: 4 }, // Science
    { id: gradeId * 10 + 5, grade_id: gradeId, subject_id: 5 }  // Social
  ]),

  // Grade 10, 11, 12 (grade_id: 11, 12, 13) - High School (Sci/Arts combo example)
  { id: 101, grade_id: 11, subject_id: 1 }, // Myanmar
  { id: 102, grade_id: 11, subject_id: 2 }, // English
  { id: 103, grade_id: 11, subject_id: 3 }, // Math
  { id: 104, grade_id: 11, subject_id: 6 }, // Physics
  { id: 105, grade_id: 11, subject_id: 7 }, // Chemistry
  { id: 106, grade_id: 11, subject_id: 8 }, // Biology

  { id: 107, grade_id: 12, subject_id: 1 }, // Myanmar
  { id: 108, grade_id: 12, subject_id: 2 }, // English
  { id: 109, grade_id: 12, subject_id: 3 }, // Math
  { id: 110, grade_id: 12, subject_id: 6 }, // Physics
  { id: 111, grade_id: 12, subject_id: 7 }, // Chemistry
  { id: 112, grade_id: 12, subject_id: 9 }, // Geography

  { id: 113, grade_id: 13, subject_id: 1 }, // Myanmar
  { id: 114, grade_id: 13, subject_id: 2 }, // English
  { id: 115, grade_id: 13, subject_id: 3 }, // Math
  { id: 116, grade_id: 13, subject_id: 6 }, // Physics
  { id: 117, grade_id: 13, subject_id: 7 }, // Chemistry
  { id: 118, grade_id: 13, subject_id: 10 } // History
];

export const classes = [
  // KG (grade_id: 1)
  { id: 1, grade_id: 1, label: "KG-A", value: "kg_a" },
  { id: 2, grade_id: 1, label: "KG-B", value: "kg_b" },
  // Grade 1 (grade_id: 2)
  { id: 3, grade_id: 2, label: "Grade 1-A", value: "1_a" },
  { id: 4, grade_id: 2, label: "Grade 1-B", value: "1_b" },
  // Grade 2 (grade_id: 3)
  { id: 5, grade_id: 3, label: "Grade 2-A", value: "2_a" },
  { id: 6, grade_id: 3, label: "Grade 2-B", value: "2_b" },
  // Grade 3 (grade_id: 4)
  { id: 7, grade_id: 4, label: "Grade 3-A", value: "3_a" },
  { id: 8, grade_id: 4, label: "Grade 3-B", value: "3_b" },
  // Grade 4 (grade_id: 5)
  { id: 9, grade_id: 5, label: "Grade 4-A", value: "4_a" },
  { id: 10, grade_id: 5, label: "Grade 4-B", value: "4_b" },
  // Grade 5 (grade_id: 6)
  { id: 11, grade_id: 6, label: "Grade 5-A", value: "5_a" },
  { id: 12, grade_id: 6, label: "Grade 5-B", value: "5_b" },
  // Grade 6 (grade_id: 7)
  { id: 13, grade_id: 7, label: "Grade 6-A", value: "6_a" },
  { id: 14, grade_id: 7, label: "Grade 6-B", value: "6_b" },
  // Grade 7 (grade_id: 8)
  { id: 15, grade_id: 8, label: "Grade 7-A", value: "7_a" },
  { id: 16, grade_id: 8, label: "Grade 7-B", value: "7_b" },
  // Grade 8 (grade_id: 9)
  { id: 17, grade_id: 9, label: "Grade 8-A", value: "8_a" },
  { id: 18, grade_id: 9, label: "Grade 8-B", value: "8_b" },
  // Grade 9 (grade_id: 10)
  { id: 19, grade_id: 10, label: "Grade 9-A", value: "9_a" },
  { id: 20, grade_id: 10, label: "Grade 9-B", value: "9_b" },
  // Grade 10 (grade_id: 11)
  { id: 21, grade_id: 11, label: "Grade 10-A", value: "10_a" },
  { id: 22, grade_id: 11, label: "Grade 10-B", value: "10_b" },
  // Grade 11 (grade_id: 12)
  { id: 23, grade_id: 12, label: "Grade 11-A", value: "11_a" },
  { id: 24, grade_id: 12, label: "Grade 11-B", value: "11_b" },
  // Grade 12 (grade_id: 13)
  { id: 25, grade_id: 13, label: "Grade 12-A", value: "12_a" },
  { id: 26, grade_id: 13, label: "Grade 12-B", value: "12_b" }
];

export const students = [
  {
    id: 1,
    class_id: 23,
    student_name: "မောင်မောင်",
  },
  {
    id: 2,
    class_id: 23,
    student_name: "မမ",
  },
  {
    id: 3,
    class_id: 23,
    student_name: "အောင်အောင်",
  },
  {
    id: 4,
    class_id: 1,
    student_name: "Ko Ko",
  },
  {
    id: 5,
    class_id: 1,
    student_name: "Thae Lay",
  },
  {
    id: 6,
    class_id: 1,
    student_name: "Chit Chit",
  },
];

export const exam_types = [
  { id: 1, name: "Monthly Test (လစဉ်စစ်ဆေးမှု)", has_report_card: false, is_active: true },
  { id: 2, name: "First Term Exam (ပထမနှစ်ဝက် စာမေးပွဲ)", has_report_card: true, is_active: true },
  { id: 3, name: "Second Term Exam (ဒုတိယနှစ်ဝက် စာမေးပွဲ)", has_report_card: true, is_active: true },
  { id: 4, name: "Final Exam (နှစ်ဆုံး စာမေးပွဲ)", has_report_card: true, is_active: true }
];

export const studentMarks = [
];

export const grading_systems = [
  {
    id: 1,
    name: "Standard Grading System",
    max_mark: 100,
    pass_mark: 40,
    ranges: [
      { id: 1, grading: "A+", from: 90, to: 100 },
      { id: 2, grading: "A", from: 80, to: 89 },
      { id: 3, grading: "B+", from: 70, to: 79 },
      { id: 4, grading: "B", from: 60, to: 69 },
      { id: 5, grading: "C+", from: 50, to: 59 },
      { id: 6, grading: "C", from: 40, to: 49 },
      { id: 7, grading: "F", from: 0, to: 39 },
    ],
  },
  {
    id: 2,
    name: "Advanced Grading System",
    max_mark: 100,
    pass_mark: 50,
    ranges: [
      { id: 8, grading: "A+", from: 95, to: 100 },
      { id: 9, grading: "A", from: 85, to: 94 },
      { id: 10, grading: "B+", from: 75, to: 84 },
      { id: 11, grading: "B", from: 65, to: 74 },
      { id: 12, grading: "C", from: 50, to: 64 },
      { id: 13, grading: "F", from: 0, to: 49 },
    ],
  },
];

export const exam_setups = [
  {
    id: 1,
    exam_type_id: "1",
    grading_system_id: 1,
    grade_id: 6,
    grade_name: "Grade 5",
    formats: [
      {
        id: "e1a2b3c4-1111-2222-3333-444455556661",
        subject_id: 1,
        subject_name: "Myanmar",
        date: "2026-11-01",
        start_time: "09:00",
        end_time: "11:30",
        duration: 150,
        max_mark: 100,
        pass_mark: 40,
        d_mark: "75",
        is_active: true,
      },
      {
        id: "e1a2b3c4-1111-2222-3333-444455556662",
        subject_id: 2,
        subject_name: "English",
        date: "2026-11-02",
        start_time: "09:00",
        end_time: "11:30",
        duration: 150,
        max_mark: 100,
        pass_mark: 40,
        d_mark: "75",
        is_active: true,
      },
      {
        id: "e1a2b3c4-1111-2222-3333-444455556663",
        subject_id: 3,
        subject_name: "Mathematics",
        date: "2026-11-03",
        start_time: "09:00",
        end_time: "11:30",
        duration: 150,
        max_mark: 100,
        pass_mark: 40,
        d_mark: "75",
        is_active: true,
      },
      {
        id: "e1a2b3c4-1111-2222-3333-444455556664",
        subject_id: 4,
        subject_name: "Science",
        date: "2026-11-04",
        start_time: "09:00",
        end_time: "10:30",
        duration: 90,
        max_mark: 75,
        pass_mark: 30,
        d_mark: "60",
        is_active: true,
      },
      {
        id: "e1a2b3c4-1111-2222-3333-444455556665",
        subject_id: 5,
        subject_name: "Social Studies",
        date: "2026-11-05",
        start_time: "09:00",
        end_time: "10:30",
        duration: 90,
        max_mark: 75,
        pass_mark: 30,
        d_mark: "60",
        is_active: true,
      },
    ],
  },
  {
    id: 2,
    exam_type_id: "1",
    grading_system_id: 1,
    grade_id: 6,
    grade_name: "Grade 5",
    formats: [
      {
        id: "e2a2b3c4-1111-2222-3333-444455556661",
        subject_id: 1,
        subject_name: "Myanmar",
        date: "2026-11-01",
        start_time: "09:00",
        end_time: "11:30",
        duration: 150,
        max_mark: 100,
        pass_mark: 40,
        d_mark: "75",
        is_active: true,
      },
      {
        id: "e2a2b3c4-1111-2222-3333-444455556662",
        subject_id: 2,
        subject_name: "English",
        date: "2026-11-02",
        start_time: "09:00",
        end_time: "11:30",
        duration: 150,
        max_mark: 100,
        pass_mark: 40,
        d_mark: "75",
        is_active: true,
      },
      {
        id: "e2a2b3c4-1111-2222-3333-444455556663",
        subject_id: 3,
        subject_name: "Mathematics",
        date: "2026-11-03",
        start_time: "09:00",
        end_time: "11:30",
        duration: 150,
        max_mark: 100,
        pass_mark: 40,
        d_mark: "75",
        is_active: true,
      },
      {
        id: "e2a2b3c4-1111-2222-3333-444455556664",
        subject_id: 4,
        subject_name: "Science",
        date: "2026-11-04",
        start_time: "09:00",
        end_time: "10:30",
        duration: 90,
        max_mark: 75,
        pass_mark: 30,
        d_mark: "60",
        is_active: true,
      },
      {
        id: "e2a2b3c4-1111-2222-3333-444455556665",
        subject_id: 5,
        subject_name: "Social Studies",
        date: "2026-11-05",
        start_time: "09:00",
        end_time: "10:30",
        duration: 90,
        max_mark: 75,
        pass_mark: 30,
        d_mark: "60",
        is_active: true,
      },
    ],
  },
  {
    id: 3,
    exam_type_id: "2",
    grading_system_id: 2,
    grade_id: 9,
    grade_name: "Grade 8",
    formats: [
      {
        id: "f2b3c4d5-2222-3333-4444-555566677701",
        subject_id: 1,
        subject_name: "Myanmar",
        date: "2026-11-10",
        start_time: "09:00",
        end_time: "12:00",
        duration: 180,
        max_mark: 100,
        pass_mark: 40,
        d_mark: "80",
        is_active: true,
      },
      {
        id: "f2b3c4d5-2222-3333-4444-555566677702",
        subject_id: 2,
        subject_name: "English",
        date: "2026-11-11",
        start_time: "09:00",
        end_time: "12:00",
        duration: 180,
        max_mark: 100,
        pass_mark: 40,
        d_mark: "80",
        is_active: true,
      },
      {
        id: "f2b3c4d5-2222-3333-4444-555566677703",
        subject_id: 3,
        subject_name: "Mathematics",
        date: "2026-11-12",
        start_time: "09:00",
        end_time: "12:00",
        duration: 180,
        max_mark: 100,
        pass_mark: 40,
        d_mark: "80",
        is_active: true,
      },
      {
        id: "f2b3c4d5-2222-3333-4444-555566677704",
        subject_id: 4,
        subject_name: "Science",
        date: "2026-11-13",
        start_time: "09:00",
        end_time: "11:00",
        duration: 120,
        max_mark: 75,
        pass_mark: 30,
        d_mark: "60",
        is_active: true,
      },
    ],
  },
  {
    id: 4,
    exam_type_id: "3",
    grading_system_id: 1,
    grade_id: 12,
    grade_name: "Grade 11",
    formats: [
      {
        id: "c3d4e5f6-3333-4444-5555-666777888991",
        subject_id: 1,
        subject_name: "Myanmar",
        date: "2026-12-01",
        start_time: "09:00",
        end_time: "12:00",
        duration: 180,
        max_mark: 100,
        pass_mark: 40,
        d_mark: "80",
        is_active: true,
      },
      {
        id: "c3d4e5f6-3333-4444-5555-666777888992",
        subject_id: 2,
        subject_name: "English",
        date: "2026-12-02",
        start_time: "09:00",
        end_time: "12:00",
        duration: 180,
        max_mark: 100,
        pass_mark: 40,
        d_mark: "80",
        is_active: true,
      },
      {
        id: "c3d4e5f6-3333-4444-5555-666777888993",
        subject_id: 3,
        subject_name: "Mathematics",
        date: "2026-12-03",
        start_time: "09:00",
        end_time: "12:00",
        duration: 180,
        max_mark: 100,
        pass_mark: 40,
        d_mark: "80",
        is_active: true,
      },
      {
        id: "c3d4e5f6-3333-4444-5555-666777888994",
        subject_id: 6,
        subject_name: "Physics",
        date: "2026-12-04",
        start_time: "09:00",
        end_time: "12:00",
        duration: 180,
        max_mark: 100,
        pass_mark: 40,
        d_mark: "80",
        is_active: true,
      },
      {
        id: "c3d4e5f6-3333-4444-5555-666777888995",
        subject_id: 7,
        subject_name: "Chemistry",
        date: "2026-12-05",
        start_time: "09:00",
        end_time: "12:00",
        duration: 180,
        max_mark: 100,
        pass_mark: 40,
        d_mark: "80",
        is_active: true,
      },
      {
        id: "c3d4e5f6-3333-4444-5555-666777888996",
        subject_id: 8,
        subject_name: "Biology",
        date: "2026-12-06",
        start_time: "09:00",
        end_time: "12:00",
        duration: 180,
        max_mark: 100,
        pass_mark: 40,
        d_mark: "80",
        is_active: true,
      },
    ],
  },
];