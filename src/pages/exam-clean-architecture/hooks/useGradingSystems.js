import { useState } from "react";
import {
  EMPTY_GRADING_SYSTEM_FORM,
  EMPTY_GRADING_SYSTEM_FORM_ERRORS,
  makeEmptyGradingForm,
} from "../constants/examConstants";
import { grading_systems } from "../data/data";
import { validateGradingSystemForm } from "../utils/validation";

export function useGradingSystems() {
  const [gradingSystems, setGradingSystems] = useState(grading_systems);
  const [gradingSystemForm, setGradingSystemForm] = useState(EMPTY_GRADING_SYSTEM_FORM);
  const [gradingSystemFormErrors, setGradingSystemFormErrors] = useState(
    EMPTY_GRADING_SYSTEM_FORM_ERRORS
  );
  const [showGradingSystemActionForm, setShowGradingSystemActionForm] = useState(false);
  const [editingGradingSystem, setEditingGradingSystem] = useState(null);
  const lastRange = gradingSystemForm.ranges.at(-1);
  const isRangeIncomplete = !lastRange?.grading.trim() ||
    lastRange?.from === "" ||
    lastRange?.to === "";

  const validateGrading = () => {
    const max = Number(gradingSystemForm.max_mark);
    const pass = Number(gradingSystemForm.pass_mark);
    const ranges = gradingSystemForm.ranges;
    const valid = gradingSystemForm.name.trim() &&
      gradingSystemForm.max_mark !== "" && Number.isFinite(max) &&
      max > 0 && gradingSystemForm.pass_mark !== "" &&
      pass >= 0 && pass <= max &&
      ranges.length > 0 &&
      ranges.every((range) => range.grading.trim() &&
        range.from !== "" && range.to !== "" &&
        Number(range.from) >= 0 && Number(range.to) <= max &&
        Number(range.from) <= Number(range.to)) &&
      ranges.every((range, index) => ranges.every((other, otherIndex) =>
        index === otherIndex ||
        Number(range.to) < Number(other.from) ||
        Number(range.from) > Number(other.to)
      ));
    return Boolean(valid);
  };

  const handleCreateGradingSystem = () => {
    setGradingSystemForm(makeEmptyGradingForm());
    setShowGradingSystemActionForm(true);
    setEditingGradingSystem(null);
  };

  const handleSaveGradingSystem = () => {
    const validation = validateGradingSystemForm(gradingSystemForm);
    if (!validation.isValid) {
      setGradingSystemFormErrors(validation.errors);
      window.alert("Please fill all field");
      return;
    }

    const nextId = Math.max(0, ...gradingSystems.map((item) => Number(item.id) || 0)) + 1;
    const payload = {
      ...gradingSystemForm,
      id: nextId,
      max_mark: Number(gradingSystemForm.max_mark),
      pass_mark: Number(gradingSystemForm.pass_mark),
      ranges: (gradingSystemForm.ranges ?? []).map((range, index) => ({
        ...range,
        id: index + 1,
        from: Number(range.from),
        to: Number(range.to),
      })),
    };
    setGradingSystems((previous) => [...previous, payload]);
    handleCloseGradingSystemActionForm();
  };

  const handleEditGradingSystem = (grading) => {
    setEditingGradingSystem(grading);
    setGradingSystemForm({
      ...grading,
      ranges: grading.ranges.map((range) => ({ ...range })),
    });
    setShowGradingSystemActionForm(true);
  };

  const handleUpdateGradingSystem = (id) => {
    if (!validateGrading()) return;
    setGradingSystems((previous) => previous.map((system) => system.id === id ? {
      ...gradingSystemForm,
      id,
      max_mark: Number(gradingSystemForm.max_mark),
      pass_mark: Number(gradingSystemForm.pass_mark),
      ranges: gradingSystemForm.ranges.map((range) => ({
        ...range,
        from: Number(range.from),
        to: Number(range.to),
      })),
    } : system));
    handleCloseGradingSystemActionForm();
  };

  const handleDeleteGradingSystem = (id, allExamSetUps = []) => {
    if (allExamSetUps.some((setup) => Number(setup.grading_system_id) === Number(id))) {
      window.alert("Delete or update the exam setups using this grading system before deleting it.");
      return;
    }
    if (window.confirm("Are you sure want to delte?")) {
      setGradingSystems((previous) => previous.filter((item) => item.id !== id));
      handleCloseGradingSystemActionForm();
    }
  };

  const handleCloseGradingSystemActionForm = () => {
    setShowGradingSystemActionForm(false);
    setGradingSystemForm(makeEmptyGradingForm());
    setGradingSystemFormErrors(EMPTY_GRADING_SYSTEM_FORM_ERRORS);
    setEditingGradingSystem(null);
  };

  const handleAddRange = () => {
    setGradingSystemForm((previous) => ({
      ...previous,
      ranges: [
        ...previous.ranges,
        { id: crypto.randomUUID(), grading: "", from: "", to: "" },
      ],
    }));
  };

  const handleRangeChange = (id, event) => {
    const { name, value } = event.target;
    setGradingSystemForm((previous) => ({
      ...previous,
      ranges: previous.ranges.map((range) => range.id === id
        ? { ...range, [name]: value }
        : range
      ),
    }));
  };

  return {
    gradingSystems,
    gradingSystemForm,
    setGradingSystemForm,
    gradingSystemFormErrors,
    showGradingSystemActionForm,
    editingGradingSystem,
    isRangeIncomplete,
    handleCreateGradingSystem,
    handleSaveGradingSystem,
    handleEditGradingSystem,
    handleUpdateGradingSystem,
    handleDeleteGradingSystem,
    handleCloseGradingSystemActionForm,
    handleAddRange,
    handleRangeChange,
  };
}
