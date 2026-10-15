import { useMemo, useState } from "react";
import { EMPTY_SET_UP_FORM } from "../constants/examConstants";
import { exam_setups, grades, subjects } from "../data/data";
import { calculateDuration, getSubjectsByGrade } from "../utils/examUtils";
import { validateExamSetUpForm } from "../utils/validation";

export function useExamSetups() {
  const [selectedSetUpGrade, setSelectedSetUpGrade] = useState(null);
  const [showSetUpActionForm, setShowSetUpActionForm] = useState(false);
  const [setUpForm, setSetUpForm] = useState(EMPTY_SET_UP_FORM);
  const [editingSetUp, setEditingSetUp] = useState(null);
  const [allExamSetUps, setAllExamSetUps] = useState(() =>
    exam_setups.map((item, index) => ({
      ...item,
      id: item.id ?? `seed-${index}`,
      formats: item.formats.map((format) => ({ ...format })),
    }))
  );

  const handleFormatChange = (id, event) => {
    const { name, value } = event.target;
    setSetUpForm((previous) => ({
      ...previous,
      formats: previous.formats.map((format) => {
        if (format.id !== id) return format;
        const updatedFormat = { ...format, [name]: value };
        if (name === "start_time" || name === "end_time") {
          updatedFormat.duration = calculateDuration(
            updatedFormat.start_time,
            updatedFormat.end_time
          );
        }
        return updatedFormat;
      }),
    }));
  };

  const handleToggleSetUpActive = (id) => {
    setSetUpForm((previous) => ({
      ...previous,
      formats: previous.formats.map((format) => format.id === id
        ? { ...format, is_active: !format.is_active }
        : format
      ),
    }));
  };

  const handleSelectSetUpGrade = (id) => {
    const grade = grades.find((item) => item.id === id);
    if (grade) setSelectedSetUpGrade(grade);
  };

  const handleChangeGradingSystemId = (systemId, gradingSystems = []) => {
    if (!systemId || systemId === "none") {
      setSetUpForm((previous) => ({
        ...previous,
        grading_system_id: "",
        formats: previous.formats.map((format) => ({
          ...format,
          max_mark: 0,
          pass_mark: 0,
        })),
      }));
      return;
    }

    const selectedSystem = gradingSystems.find(
      (system) => system.id === Number(systemId)
    );
    if (!selectedSystem) return;

    setSetUpForm((previous) => ({
      ...previous,
      grading_system_id: selectedSystem.id,
      formats: previous.formats.map((format) => ({
        ...format,
        max_mark: selectedSystem.max_mark,
        pass_mark: selectedSystem.pass_mark,
      })),
    }));
  };

  const handleCancelSelectSetUpGrade = () => {
    setSelectedSetUpGrade(null);
    setSetUpForm(EMPTY_SET_UP_FORM);
    setShowSetUpActionForm(false);
  };

  const handleCreateSetUp = () => {
    setEditingSetUp(null);
    setShowSetUpActionForm(true);
    const matchedSubjects = getSubjectsByGrade(selectedSetUpGrade.id, subjects);
    const newFormats = matchedSubjects.map((subject) => ({
      id: crypto.randomUUID(),
      subject_id: subject.id,
      subject_name: subject.name,
      date: "",
      start_time: "",
      end_time: "",
      duration: 0,
      max_mark: 0,
      pass_mark: 0,
      d_mark: "",
      is_active: true,
    }));

    setSetUpForm({
      ...EMPTY_SET_UP_FORM,
      grading_system_id: "",
      grade_id: selectedSetUpGrade.id,
      formats: newFormats.length > 0 ? newFormats : EMPTY_SET_UP_FORM.formats,
    });
  };

  const validateSetUp = () => {
    const valid = setUpForm.exam_type_id &&
      setUpForm.grade_id &&
      setUpForm.formats.length > 0 &&
      setUpForm.formats.every((format) =>
        Number(format.max_mark) >= 0 &&
        Number(format.pass_mark) >= 0 &&
        Number(format.pass_mark) <= Number(format.max_mark) &&
        (!format.start_time || !format.end_time || format.end_time > format.start_time)
      );

    if (!valid) {
      window.alert("Select an exam type and check subject marks and times.");
      return false;
    }
    const duplicateSetUp = allExamSetUps.some((setup) =>
      setup.id !== editingSetUp?.id &&
      Number(setup.grade_id) === Number(setUpForm.grade_id) &&
      Number(setup.exam_type_id) === Number(setUpForm.exam_type_id)
    );
    if (duplicateSetUp) {
      window.alert("An exam setup already exists for this grade and exam type.");
      return false;
    }
    return true;
  };

  const handleSaveSetUp = () => {
    const validation = validateExamSetUpForm(setUpForm)

    if(!validation.isValid) {
      console.log(validation.errors)
      return;
    }
    const payload = {
      ...setUpForm,
      id: crypto.randomUUID(),
      exam_type_id: Number(setUpForm.exam_type_id),
      grade_id: Number(setUpForm.grade_id),
      grading_system_id: setUpForm.grading_system_id === ""
        ? null
        : Number(setUpForm.grading_system_id),
    };
    setAllExamSetUps((previous) => [...previous, payload]);
    handleCloseSetUpActionForm();
  };

  const handleEditSetUp = (setUp) => {
    setEditingSetUp(setUp);
    setSetUpForm({
      ...setUp,
      formats: setUp.formats.map((format) => ({ ...format })),
    });
    setShowSetUpActionForm(true);
  };

  const handleUpdateSetUp = () => {
    const validation = validateExamSetUpForm(setUpForm)
    if(!validation.isValid) {
      console.log(validation.errors)
      return;
    }
    setAllExamSetUps((previous) => previous.map((item) => item.id === editingSetUp.id
      ? {
        ...setUpForm,
        id: editingSetUp.id,
        exam_type_id: Number(setUpForm.exam_type_id),
        grade_id: Number(setUpForm.grade_id),
        grading_system_id: setUpForm.grading_system_id === ""
          ? null
          : Number(setUpForm.grading_system_id),
      }
      : item
    ));
    handleCloseSetUpActionForm();
  };

  const handleDeleteSetUp = (id) => {
    if (!window.confirm("Delete this exam setup?")) return;
    setAllExamSetUps((previous) => previous.filter((item) => item.id !== id));
  };

  const handleCloseSetUpActionForm = () => {
    setShowSetUpActionForm(false);
    setEditingSetUp(null);
    setSetUpForm(EMPTY_SET_UP_FORM);
  };

  const examSetUps = useMemo(
    () => selectedSetUpGrade
      ? allExamSetUps.filter(
        (item) => Number(item.grade_id) === Number(selectedSetUpGrade.id)
      )
      : null,
    [selectedSetUpGrade, allExamSetUps]
  );

  return {
    selectedSetUpGrade,
    examSetUps,
    showSetUpActionForm,
    setUpForm,
    setSetUpForm,
    editingSetUp,
    allExamSetUps,
    handleFormatChange,
    handleToggleSetUpActive,
    handleSelectSetUpGrade,
    handleChangeGradingSystemId,
    handleCancelSelectSetUpGrade,
    handleCreateSetUp,
    handleSaveSetUp,
    handleEditSetUp,
    handleUpdateSetUp,
    handleDeleteSetUp,
    handleCloseSetUpActionForm,
  };
}
