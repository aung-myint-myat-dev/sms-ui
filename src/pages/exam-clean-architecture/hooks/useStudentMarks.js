import { useDeferredValue, useMemo, useState } from "react";
import { classes, exam_types, studentMarks, students } from "../data/data";
import { getStudentName } from "../utils/examUtils";

export function useStudentMarks({ examTypes = exam_types, allExamSetUps = [] } = {}) {
  const [selectedGradeId, setSelectedGradeId] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedExamTypeId, setSelectedExamTypeId] = useState("");
  const [isEnteringMarks, setIsEnteringMarks] = useState(false);
  const [studentMarksForm, setStudentMarkForm] = useState({});
  const [marks, setMarks] = useState(studentMarks);
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearch = useDeferredValue(searchQuery);

  const filteredClasses = useMemo(
    () => selectedGradeId
      ? classes.filter((item) => Number(item.grade_id) === Number(selectedGradeId))
      : [],
    [selectedGradeId]
  );

  const selectedStudents = useMemo(() => {
    const selectedClass = classes.find((item) =>
      Number(item.id) === Number(selectedClassId) &&
      Number(item.grade_id) === Number(selectedGradeId)
    );
    return selectedClass
      ? students.filter((student) => Number(student.class_id) === Number(selectedClass.id))
      : ["No students"];
  }, [selectedClassId, selectedGradeId]);

  const availableExamSetups = useMemo(() => {
    if (!selectedGradeId) return [];
    return allExamSetUps.filter(
      (setup) => Number(setup.grade_id) === Number(selectedGradeId)
    );
  }, [selectedGradeId, allExamSetUps]);

  const availableExamTypes = useMemo(() => {
    const examTypeIds = new Set(
      availableExamSetups.map((setup) => Number(setup.exam_type_id))
    );
    return examTypes.filter(
      (exam) => exam.is_active && examTypeIds.has(Number(exam.id))
    );
  }, [availableExamSetups, examTypes]);

  const selectedExamSetup = selectedExamTypeId
    ? availableExamSetups.find(
      (setup) => Number(setup.exam_type_id) === Number(selectedExamTypeId)
    ) ?? null
    : null;
  const selectedExamSetupId = selectedExamSetup?.id;
  const examSubjects = selectedExamSetup?.formats.filter((format) => format.is_active) ?? [];

  const selectedStudentMarks = !selectedClassId || !selectedExamTypeId || !selectedExamSetupId
    ? []
    : selectedStudents.map((student) => {
      const mark = marks.find((item) =>
        Number(item.student_id) === Number(student.id) &&
        Number(item.class_id) === Number(selectedClassId) &&
        Number(item.exam_type_id) === Number(selectedExamTypeId) &&
        String(item.exam_setup_id) === String(selectedExamSetupId)
      ) ?? null;
      const total = mark?.total ?? Object.values(mark?.subject_marks ?? {}).reduce(
        (sum, value) => sum + Number(value ?? 0),
        0
      );
      return { student, mark, total };
    });

  const searchTerm = deferredSearch.trim().toLocaleLowerCase();
  const filteredStudentMarks = searchTerm
    ? selectedStudentMarks.filter(({ student }) =>
      getStudentName(student.id).toLocaleLowerCase().includes(searchTerm))
    : selectedStudentMarks;
  const sortedStudentMarks = useMemo(
    () => [...filteredStudentMarks].sort((a, b) => Number(b.total) - Number(a.total)),
    [filteredStudentMarks]
  );

  const rankedStudents = [...selectedStudentMarks].sort(
    (a, b) => Number(b.total) - Number(a.total)
  );
  const studentRanks = new Map();
  rankedStudents.forEach((student, index) => {
    const previous = rankedStudents[index - 1];
    studentRanks.set(
      student.student.id,
      previous && Number(previous.total) === Number(student.total)
        ? studentRanks.get(previous.student.id)
        : index + 1
    );
  });

  const handleEnterMarks = () => {
    const forms = {};
    selectedStudentMarks.forEach(({ student, mark }) => {
      forms[student.id] = Object.fromEntries(
        examSubjects.map((subject) => [
          subject.subject_id,
          mark?.subject_marks?.[subject.subject_id] ?? "",
        ])
      );
    });
    setStudentMarkForm(forms);
    setIsEnteringMarks(true);
  };

  const handleCancelMarks = () => {
    setStudentMarkForm({});
    setIsEnteringMarks(false);
  };

  const handleStudentMarkChange = (studentId, subjectId, maxMark, event) => {
    const { value } = event.target;
    if (value !== "" && (!/^\d+$/.test(value) || Number(value) > Number(maxMark))) return;
    setStudentMarkForm((previous) => ({
      ...previous,
      [studentId]: {
        ...previous[studentId],
        [subjectId]: value,
      },
    }));
  };

  const handleSaveStudentMarks = () => {
    const updatedMarks = selectedStudentMarks.map(({ student, mark }) => {
      const activeSubjectMarks = Object.fromEntries(
        examSubjects.map((subject) => {
          const value = studentMarksForm[student.id]?.[subject.subject_id] ?? "";
          return [subject.subject_id, value === "" ? null : Number(value)];
        })
      );
      const subjectMarks = { ...mark?.subject_marks, ...activeSubjectMarks };
      const total = Object.values(activeSubjectMarks).reduce(
        (sum, value) => sum + Number(value ?? 0),
        0
      );

      return {
        ...mark,
        id: mark?.id ?? crypto.randomUUID(),
        student_id: student.id,
        class_id: Number(selectedClassId),
        exam_type_id: Number(selectedExamTypeId),
        exam_setup_id: selectedExamSetup.id,
        subject_marks: subjectMarks,
        total,
      };
    });

    setMarks((previous) => {
      const updatedByStudentId = new Map(
        updatedMarks.map((mark) => [Number(mark.student_id), mark])
      );
      const next = previous.filter((mark) => !(
        Number(mark.class_id) === Number(selectedClassId) &&
        Number(mark.exam_type_id) === Number(selectedExamTypeId) &&
        String(mark.exam_setup_id) === String(selectedExamSetup.id) &&
        updatedByStudentId.has(Number(mark.student_id))
      ));
      return [...next, ...updatedMarks];
    });
    handleCancelMarks();
  };

  return {
    selectedGradeId,
    setSelectedGradeId,
    selectedClassId,
    setSelectedClassId,
    selectedExamTypeId,
    setSelectedExamTypeId,
    isEnteringMarks,
    studentMarksForm,
    setStudentMarkForm,
    marks,
    setMarks,
    searchQuery,
    setSearchQuery,
    filteredClasses,
    selectedStudents,
    availableExamTypes,
    selectedExamSetup,
    examSubjects,
    selectedStudentMarks,
    sortedStudentMarks,
    studentRanks,
    handleEnterMarks,
    handleCancelMarks,
    handleStudentMarkChange,
    handleSaveStudentMarks,
  };
}
