import { exam_types, gradeSubjects, grading_systems, subjects } from "./data";

export const TABS = [
  {
    id: 1,
    label: 'Student Marks',
    value: 'student-marks',
  },
  {
    id: 2,
    label: 'Exam Type',
    value: 'exam-types',
  },
  {
    id: 3,
    label: 'Grading System',
    value: 'grading-systems',
  },
  {
    id: 4,
    label: 'Exam Set Up',
    value: 'exam-set-up',
  }
]

export const getSubjectsByGrade = (gradeId, subjects) => {
  const subjectIds = gradeSubjects
    .filter(gs => gs.grade_id === gradeId)
    .map(gs => gs.subject_id);
  return subjects.filter(sub => subjectIds.includes(sub.id));
};

export const getExamName = (examTypeId) => {
  const examType = exam_types.find((item) => item.id === Number(examTypeId))

  return examType ? examType.name : '';
}

export const getGradingSystemName = (id) => {
  const sytem = grading_systems.find(item => item.id === Number(id))
  return sytem ? sytem.name : '';
}

export const getSubjectName = (id) => {
  return subjects.find((item) => item.id === id).name
}

export const calculateDuration = (startTime, endTime) => {
  if(!startTime || !endTime) return 0;

  const [startHour, startMinute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)

  const start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute

  return end > start ? end - start : 0;
}