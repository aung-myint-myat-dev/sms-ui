import { useRef, useState } from "react";
import { EMPTY_EXAM_TYPE_FORM } from "../constants/examConstants";
import { exam_types } from "../data/data";

export function useExamTypes() {
  const [editingExamType, setEditingExamType] = useState(null);
  const [examTypeFormDate, setExamTypeFormData] = useState(EMPTY_EXAM_TYPE_FORM);
  const [, setExamTypeFormErrors] = useState({ name: "" });
  const [examTypes, setExamTypes] = useState(exam_types);
  const examTypeNameInputRef = useRef(null);

  const handleSaveExamType = () => {
    if (!examTypeFormDate.name.trim()) {
      setExamTypeFormErrors({ name: "Exam name is required" });
      return;
    }
    const id = Math.max(0, ...examTypes.map((item) => Number(item.id))) + 1;
    setExamTypes((previous) => [...previous, { ...examTypeFormDate, id }]);
    setExamTypeFormData(EMPTY_EXAM_TYPE_FORM);
  };

  const handleUpdateExamType = () => {
    if (!examTypeFormDate.name.trim()) {
      setExamTypeFormErrors({ name: "Exam name is required" });
      return;
    }
    setExamTypes((previous) => previous.map((exam) =>
      exam.id === editingExamType.id
        ? { ...exam, ...examTypeFormDate, id: exam.id }
        : exam
    ));
    setEditingExamType(null);
    setExamTypeFormData(EMPTY_EXAM_TYPE_FORM);
  };

  const handleDeleteExamType = (exam, allExamSetUps = []) => {
    if (allExamSetUps.some((setup) => Number(setup.exam_type_id) === Number(exam.id))) {
      window.alert("Delete the exam setups using this exam type before deleting it.");
      return;
    }
    if (window.confirm("Are you sure want to delete?")) {
      setExamTypes((previous) => previous.filter((item) => item.id !== exam.id));
    }
  };

  const handleToggleExamTypeActiveStatus = (exam) => {
    setExamTypes((previous) => previous.map((item) =>
      item.id === exam.id ? { ...item, is_active: !item.is_active } : item
    ));
  };

  const handleEditExamType = (exam) => {
    setEditingExamType(exam);
    setExamTypeFormData({ ...exam });
    setTimeout(() => examTypeNameInputRef.current?.focus(), 50);
  };

  const handleCancelEditExamType = () => {
    setEditingExamType(null);
    setExamTypeFormData(EMPTY_EXAM_TYPE_FORM);
  };

  return {
    examTypes,
    editingExamType,
    examTypeFormDate,
    setExamTypeFormData,
    setExamTypeFormErrors,
    examTypeNameInputRef,
    handleSaveExamType,
    handleUpdateExamType,
    handleDeleteExamType,
    handleToggleExamTypeActiveStatus,
    handleEditExamType,
    handleCancelEditExamType,
  };
}
