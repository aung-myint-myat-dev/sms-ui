import {
  exam_types,
  gradeSubjects,
  grading_systems,
  students,
  subjects,
} from "../data/data";

export const getSubjectsByGrade = (gradeId, subjectRecords = subjects) => {
  const subjectIds = gradeSubjects
    .filter((item) => Number(item.grade_id) === Number(gradeId))
    .map((item) => item.subject_id);
  return subjectRecords.filter((subject) => subjectIds.includes(Number(subject.id)));
};

export const getExamName = (examTypeId, examTypes = exam_types) => (
  examTypes.find((item) => Number(item.id) === Number(examTypeId))?.name ?? ""
);

export const getGradingSystemName = (id, gradingSystems = grading_systems) => (
  gradingSystems.find((item) => Number(item.id) === Number(id))?.name ?? ""
);

export const getSubjectName = (id, subjectRecords = subjects) => (
  subjectRecords.find((item) => Number(item.id) === Number(id))?.name ?? ""
);

export const calculateDuration = (startTime, endTime) => {
  if (!startTime || !endTime) return 0;

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  const start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;

  return end > start ? end - start : 0;
};

export const getStudentName = (id, studentRecords = students) => {
  const student = studentRecords.find((item) => Number(item.id) === Number(id));
  return student?.student_name ?? student?.name ?? "";
};

export const hasReportCard = (id, examTypes) => (
  examTypes.find((item) => Number(item.id) === Number(id))?.has_report_card ?? false
);
