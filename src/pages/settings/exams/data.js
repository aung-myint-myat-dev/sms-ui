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

export const exam_types = [
  { id: 1, name: "Monthly Test (လစဉ်စစ်ဆေးမှု)", has_report_card: false, is_active: true },
  { id: 2, name: "First Term Exam (ပထမနှစ်ဝက် စာမေးပွဲ)", has_report_card: true, is_active: true },
  { id: 3, name: "Second Term Exam (ဒုတိယနှစ်ဝက် စာမေးပွဲ)", has_report_card: true, is_active: true },
  { id: 4, name: "Final Exam (နှစ်ဆုံး စာမေးပွဲ)", has_report_card: true, is_active: true }
];

export const studentMarks = [
  {
    id: 1,
    class_id: 23, // Grade 11-A (id: 23)
    exam_id: 2,  // First Term Exam (id: 2)
    roll: "1",
    student_name: "မောင်မောင်",
    myanmar: 85,
    english: 80,
    math: 90,
    physic: 75,
    chemistry: 70,
    bio: 82,
    total: 482,
    rank: 1
  },
  {
    id: 2,
    class_id: 23, // Grade 11-A
    exam_id: 2,
    roll: "2",
    student_name: "မမ",
    myanmar: 90,
    english: 88,
    math: 95,
    physic: 85,
    chemistry: 80,
    bio: 88,
    total: 526,
    rank: 2
  },
  {
    id: 3,
    class_id: 23, // Grade 11-A
    exam_id: 2,
    roll: "5",
    student_name: "Ko Nyein Maung",
    myanmar: null,
    english: null,
    math: null,
    physic: null,
    chemistry: null,
    bio: null,
    total: null,
    rank: null,
  },
  {
    id: 3,
    class_id: 1, // KG-A (id: 1)
    exam_id: 2,
    roll: "1",
    student_name: "အောင်အောင်",
    myanmar: 75,
    english: 70,
    math: 80,
    physic: 0,
    chemistry: 0,
    bio: 0,
    total: 225,
    rank: 1
  }
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