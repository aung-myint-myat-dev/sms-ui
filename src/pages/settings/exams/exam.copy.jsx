import { useEffect, useMemo, useRef, useState } from "react";
import { calculateDuration, getExamName, getGradingSystemName, getSubjectName, getSubjectsByGrade, TABS } from "./utlis";
import { classes, exam_setups, exam_types, grades, grading_systems, studentMarks, subjects } from "./data";
import { Check, ChevronLeft, ChevronRightSquare, File, FileText, GraduationCap, Minus, NotebookPen, Pencil, PencilLineIcon, Plus, Save, Search, Settings, Trash2, X } from "lucide-react";
import { Switch } from "./components/ui/Switch";

export function Exams() {
  const [selectedTab, setSelectedTab] = useState('student-marks')

  // Global Handelers
  const handleChange = (event, setForm, setErrors) => {
    const { name, value } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
    setErrors?.((prev) => ({
      ...prev,
      [name]: '',
    }))
  }
  const handleToggleCheck = (event, setForm) => {
    const { name, checked } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: checked
    }))
  }

  // Stduetn Marks States, Actions And Handelers
  const emptyStudentMarkForm = {
    myanmar: '',
    english: '',
    math: '',
    physic: '',
    chemistry: '',
    bio: '',
  }
  const emptyStudentMarkFormErrors = {
    myanmar: '',
    english: '',
    math: '',
    physic: '',
    chemistry: '',
    bio: '',
  }
  const [selectedGradeId, setSelectedGradeId] = useState('')
  const [selectedClassId, setSelectedClassId] = useState('')
  const [selectedExamTypeId, setSelectedExamTypeId] = useState('')
  const [isEnteringMarks, setIsEnteringMarks] = useState(false)
  const [studentMarksForm, setStudentMarkForm] = useState({})
  const [marks, setMarks] = useState(studentMarks)
  const [studentMarksFormErrors, setStudentMarkFormErrors] = useState({})
  const [searchQuery, setSearchQuery] = useState('')

  const handleEnterMarks = () => {
    const forms = {};
    const errors = {};
    filteredStudentMarks.forEach((student) => {
      forms[student.id] = {
        ...emptyStudentMarkForm,
        myanmar: student.myanmar ?? "",
        english: student.english ?? "",
        math: student.math ?? "",
        physic: student.physic ?? "",
        chemistry: student.chemistry ?? "",
        bio: student.bio ?? "",
      };

      errors[student.id] = {
        ...emptyStudentMarkFormErrors,
      };
    });

    setStudentMarkForm(forms);
    setStudentMarkFormErrors(errors);

    setIsEnteringMarks(true);
  };
  const handleCancelMarks = () => {
    setStudentMarkForm({});
    setStudentMarkFormErrors({});
    setIsEnteringMarks(false);
  };
  const handleStudentMarkChange = (studentId, event) => {
    const { name, value } = event.target
    if (value !== "" && (!/^\d+$/.test(value) || Number(value) > 101)) {
      return;
    }
    setStudentMarkForm((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [name]: value,
      }
    }))
  }
  const calculateTotalMarks = (studentId) => {
    const marks = studentMarksForm[studentId];
    if (!marks) return 0;
    const subjects = ["myanmar", "english", "math", "physic", "chemistry", "bio",];
    return subjects.reduce((total, subject) => {
      return total + Number(marks[subject] || 0);
    }, 0);
  };
  const handleSaveStudentMarks = () => {
    // Save marks api call here

    // Demo action
    setMarks((prev) => prev.map((student) => {
      const marks = studentMarksForm[student.id]
      if (!marks) return

      return {
        ...student,
        ...Object.fromEntries(
          Object.entries(marks).map(([subject, value]) => [
            subject,
            value === "" ? null : Number(value)
          ])
        ),
        total: calculateTotalMarks(student.id),
      }
    }))
    // After save successfully
    handleCancelMarks();
  }


  // Exam Type States, Actions and Handelers
  const emptyExamTypeForm = {
    name: '',
    has_report_card: false,
    is_active: true,
  }
  const emptyExamTypeFormErrors = {
    name: '',
  }
  const [editingExamType, setEditingExamType] = useState(null)
  const [examTypeFormDate, setExamTypeFormData] = useState(emptyExamTypeForm)
  const [examTypeFormErrors, setExamTypeFormErrors] = useState(emptyExamTypeFormErrors)
  const [examTypes, setExamTypes] = useState(exam_types)
  const examTypeNameInputRef = useRef(null)

  const handleSaveExamType = () => {
    // Store exam type api call here.

    // Demo Action
    const id = examTypes.length + 1;
    const payload = {
      ...examTypeFormDate,
      id,
    }
    setExamTypes(prev => [...prev, payload])

    // After store successfully
    setExamTypeFormData(emptyExamTypeForm)
  }
  const handleUpdateExamType = () => {
    // Update exam type api call here.
    console.log(examTypeFormDate);
    const examType = examTypes.find((exam) => exam.id === editingExamType.id)
    const oldId = examType.id
    Object.assign(examType, {
      ...examTypeFormDate,
      id: oldId
    })
    // After update Success
    setEditingExamType(null)
    setExamTypeFormData(emptyExamTypeForm)
  }
  const handleDelteExamType = (exam) => {
    // Delete exam type api call here
    const examtypes = examTypes.filter((item) => item.id !== exam.id)
    setExamTypes(examtypes)
    console.log(exam)
  }
  const handleToggleExamTypeActiveStatus = (exam) => {
    // Patch exam type status API call here

    // Demo action
    setExamTypes((prev) =>
      prev.map((item) =>
        item.id === exam.id
          ? { ...item, is_active: !item.is_active }
          : item
      )
    );
  };
  const handleEditExamType = (exam) => {
    setEditingExamType(exam)
    setTimeout(() => {
      examTypeNameInputRef?.current.focus();
    }, 50)
  }
  const handleCancelEditExamType = () => {
    setEditingExamType(null)
    setExamTypeFormData(emptyExamTypeForm)
  }


  // Grading System Staes, Actions and Handelers
  const emptyGradingSystemForm = {
    name: '',
    max_mark: 0,
    pass_mark: 0,
    ranges: [
      {
        id: 1,
        grading: '',
        from: '',
        to: '',
      }
    ]
  }
  const emptyGradingSystemFormError = {
    name: '',
    max_mark: '',
    pass_mark: '',
    ranges: [
      {
        grading: '',
        from: '',
        to: '',
      }
    ]
  }
  const [gradingSystems, setGradingSystems] = useState(grading_systems)
  const [gradingSystemForm, setGradingSystemForm] = useState(emptyGradingSystemForm)
  const [gradingSystemFormErrors, setGradingSystemFormErrors] = useState(emptyGradingSystemFormError)
  const [showGradingSystemActionForm, setShowGradingSystemActionForm] = useState(false)
  const [editingGradingSystem, setEditingGradingSystem] = useState(null)
  const lastRange = gradingSystemForm.ranges.at(-1)

  const isRangeIncomplete = !lastRange?.grading.trim() || lastRange?.from === '' || lastRange?.to === ''
  const handleCreateGradingSystem = () => {
    setShowGradingSystemActionForm(true)
    setEditingGradingSystem(null)
  }
  const handleSaveGradingSystem = () => {
    // Store grading system API call here

    //demo action
    const payload = {
      ...gradingSystemForm,
      id: gradingSystems.length + 1
    }
    setGradingSystems(prev => [...prev, payload])
    handleCloseGradingSystemActionForm();
  }
  const handleEditGradingSystem = (grading) => {
    setEditingGradingSystem(grading)
    setShowGradingSystemActionForm(true)
  }
  const handleUpdateGradingSystem = (id) => {
    // Update grading system API call here

    // Demo action
    const system = gradingSystems.find((item) => item.id === id)
    const oldId = system.id
    Object.assign(system, {
      ...gradingSystemForm,
      id: oldId,
    })
    handleCloseGradingSystemActionForm();
  }
  const handleDleteGradingSystem = (id) => {
    const systems = gradingSystems.filter((item) => item.id !== id)
    setGradingSystems(systems)
    handleCloseGradingSystemActionForm();
  }
  const handleCloseGradingSystemActionForm = () => {
    setShowGradingSystemActionForm(false)
    setGradingSystemForm(emptyGradingSystemForm)
    setGradingSystemFormErrors(emptyGradingSystemFormError)
    setEditingGradingSystem(null)
  }
  const handleAddRange = () => {
    setGradingSystemForm((prev) => ({
      ...prev,
      ranges: [
        ...prev.ranges,
        {
          id: prev.ranges.length + 1,
          grading: "",
          form: 0,
          to: 0,
        }
      ]
    }))
  }
  const handleRemoveRange = (id) => {
    setGradingSystemForm((prev) => ({
      ...prev,
      ranges: prev.ranges.filter((range) => range.id !== id),
    }));
  };
  const handleRangeChange = (id, event) => {
    const { name, value } = event.target
    setGradingSystemForm((prev) => ({
      ...prev,
      ranges: prev.ranges.map((range) =>
        range.id === id
          ? {
            ...range,
            [name]: value,
          }
          : range
      ),
    }));
  };


  // Exam Set UP States, Actions and handelers
  const emptySetUpForm = {
    exam_type_id: '',
    grade_id: '',
    grading_system_id: '',
    formats: [
      {
        id: '',
        subject_id: '',
        subject_name: '',
        date: '',
        start_time: '',
        end_time: '',
        duration: 0,
        max_mark: 0,
        pass_mark: 0,
        d_mark: '',
        is_active: true,
      }
    ]
  }
  const [selectedSetUpGrade, setSelectedSetUpGrade] = useState(null)
  const [examSetUps, setExamSetUps] = useState(null);
  const [showSetUpActionForm, setShowSetUpActionForm] = useState(false)
  const [setUpForm, setSetUpForm] = useState(emptySetUpForm)
  const [editingSetUp, setEditingSetUp] = useState(null)

  const handleFormatChange = (id, e) => {
    const { name, value } = e.target
    setSetUpForm((prev) => ({
      ...prev,
      formats: prev.formats.map((format) => {
        if (format.id !== id) return format

        const updatedFormat = {
          ...format,
          [name]: value
        }

        if (name === "start_time" || name === "end_time") {
          updatedFormat.duration = calculateDuration(updatedFormat.start_time, updatedFormat.end_time);
        }

        return updatedFormat;
      })
    }))
  }
  const handleToggleSetUpActive = (id) => {
    setSetUpForm((prev) => ({
      ...prev,
      formats: prev.formats.map((format) =>
        format.id === id ? {
          ...format,
          is_active: !format.is_active
        } : format
      )
    }))
  }
  const handleSelectSetUpGrade = (id) => {
    const grade = grades.find((item) => item.id === id);
    if (!grade) return;

    setSelectedSetUpGrade(grade);
  };
  const handleChangeGradingSystemId = (systemId) => {
    if (!systemId || systemId === 'none') {
      setSetUpForm((prevForm) => ({
        ...prevForm,
        grading_system_id: '',
        formats: prevForm.formats.map((item) => ({
          ...item,
          max_mark: 0,
          pass_mark: 0,
        }))
      }));
      return;
    }

    const selectedSystem = gradingSystems.find((sys) => sys.id === Number(systemId));
    if (!selectedSystem) return;

    setSetUpForm((prevForm) => ({
      ...prevForm,
      grading_system_id: selectedSystem.id,
      formats: prevForm.formats.map((formatItem) => ({
        ...formatItem,
        max_mark: selectedSystem.max_mark,
        pass_mark: selectedSystem.pass_mark,
      })),
    }));
  }
  const handleCancelSelectSetUpGarde = () => {
    setSelectedSetUpGrade(null)
    setSetUpForm(emptySetUpForm)
    setShowSetUpActionForm(false)
  }
  const handleCreateSetUp = () => {
    setShowSetUpActionForm(true)
    const matchedSubjects = getSubjectsByGrade(selectedSetUpGrade.id, subjects);
    const newFormats = matchedSubjects.map((subject) => ({
      id: crypto.randomUUID(),
      subject_id: subject.id,
      subject_name: subject.name,
      date: '',
      start_time: '',
      end_time: '',
      duration: 0,
      max_mark: 0,
      pass_mark: 0,
      d_mark: '',
      is_active: true,
    }));

    setSetUpForm((prevForm) => ({
      ...prevForm,
      grading_system_id: "",
      grade_id: selectedSetUpGrade.id,
      formats: newFormats.length > 0 ? newFormats : [
        {
          id: '',
          subject_id: '',
          subject_name: '',
          date: '',
          start_time: '',
          end_time: '',
          duration: 0,
          max_mark: 0,
          pass_mark: 0,
          d_mark: '',
          is_active: true,
        }
      ]
    }));
  }
  const handleSaveSetUp = () => {
    console.log(setUpForm)
    setExamSetUps((prev) => [...prev, setUpForm])
    handleCloseSetUpActionForm()
  }
  const handleEditSetUp = (setUp) => {
    setEditingSetUp(setUp)
    setShowSetUpActionForm(true)
  }
  const handleUpdateSetUp = () => {
    setExamSetUps((prev) => 
     prev.map((item) => item.id === editingSetUp.id ? {...setUpForm} : item ))
    handleCloseSetUpActionForm()
  }
  const handleCloseSetUpActionForm = () => {
    setShowSetUpActionForm(false)
    setEditingSetUp(null)
  }



  const filteredClasses = useMemo(() => {
    if (selectedGradeId) {
      return classes.filter((c) => c.grade_id === Number(selectedGradeId))
    }
  }, [selectedGradeId])

  const filteredStudentMarks = useMemo(() => {
    if (selectedClassId && selectedExamTypeId) {
      return marks.filter((mark) =>
        mark.class_id === Number(selectedClassId) &&
        mark.exam_id === Number(selectedExamTypeId)
      );
    }
    return [];
  }, [marks, selectedClassId, selectedExamTypeId]);


  // Exam Type Edit
  useEffect(() => {
    if (editingExamType) {
      setExamTypeFormData(editingExamType)
    }
  }, [editingExamType])

  // Grading System Edit
  useEffect(() => {
    if (editingGradingSystem) {
      setGradingSystemForm(editingGradingSystem)
    }
  }, [editingGradingSystem])

  useEffect(() => {
    if(editingSetUp) {
      setSetUpForm(editingSetUp)
    }
  }, [editingSetUp])

  useEffect(() => {
    if (selectedSetUpGrade) {
      const setUps = exam_setups.filter((item) => item.grade_id === selectedSetUpGrade.id)
      setExamSetUps(setUps)
    }
  }, [selectedSetUpGrade])

  return (
    <div className="w-full h-full overflow-hidden py-3 px-6 font-roboto flex flex-col gap-2">

      {/* Page Header */}
      <div className="flex items-center gap-3 border-b pb-1 border-[#D9D9D980]">
        {/* Icon */}
        <div className="size-[55px] bg-[#228B22] text-white flex items-center justify-center rounded-[10px]">Icon</div>

        {/* Text */}
        <div>
          <h2 className="font-semibold text-[18px]">Exams</h2>
          <p className="font-normal text-[12px] text-[#483939CC]">View student marks and exam results</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="inline-flex w-max items-center gap-1 rounded-lg bg-[#228B221A] p-1">
        {TABS.map((tab) => {
          const isActive = tab.value === selectedTab
          return (
            <button
              onClick={() => setSelectedTab(tab.value)}
              key={tab.id}
              type="button"
              className={`flex h-[34px] items-center justify-center rounded-md ${isActive ? 'bg-white' : 'text-[#00000099]'} px-4 text-[14px] font-semibold leading-none whitespace-nowrap cursor-pointer transition-colors`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="flex-1 overflow-hidden">

        {/* Student Marks */}
        {selectedTab === TABS[0].value && (
          <div className="h-full overflow-hidden flex flex-col gap-3">

            {/* Dropdowns */}
            <div className="mt-2 flex items-center gap-10">

              {/* Grade Dropdown */}
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="grade" className="font-normal text-[14px]">Grade</label>
                <select
                  value={selectedGradeId}
                  onChange={(e) => {
                    setSelectedGradeId(e.target.value)
                    setSelectedClassId("")
                    setSelectedExamTypeId("")
                  }}
                  name="grade"
                  id="grade"
                  className="text-[14px] font-normal text-[#00000099] h-[39px] border border-[#0000001F] rounded-[8px] focus:outline-none px-3">

                  <option value="">Select grade</option>
                  {grades.map((grade) => (
                    <option className="text-black" value={grade.id} key={grade.id}>{grade.label}</option>
                  ))}
                </select>
              </div>

              {/* Class Dropdown */}
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="class" className="font-normal text-[14px]">Class</label>
                <select
                  value={selectedClassId ?? ""}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  name="class"
                  id="class"
                  className="text-[14px] font-normal text-[#00000099] h-[39px] border border-[#0000001F] rounded-[8px] focus:outline-none px-3">

                  <option value="" disabled>Select class</option>
                  {filteredClasses?.map((item) => (
                    <option className="text-black" value={item.id} key={item.id}>{item.label}</option>
                  ))}
                </select>
              </div>

              {/* Exam Type Dropdown */}
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="exam_type" className="font-normal text-[14px]">Exam Type</label>
                <select
                  value={selectedExamTypeId ?? ""}
                  onChange={(e) => setSelectedExamTypeId(e.target.value)}
                  name="exam_type"
                  id="exam_type"
                  className="text-[14px] font-normal text-[#00000099] h-[39px] border border-[#0000001F] rounded-[8px] focus:outline-none px-3">
                  <option value="" disabled>Select exam type</option>
                  {exam_types.map((exam_type) => (
                    <option className="text-black" value={exam_type.id} key={exam_type.id}>{exam_type.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Student Marks Table*/}
            {filteredStudentMarks?.length > 0 ? (
              <div className="px-1">
                {/* Search and Enter Marks */}
                <div className="mt-4 flex items-center justify-between w-full">
                  {/* Search Bar */}
                  <div className="w-full max-w-[327px] h-[39px] box-border flex items-center gap-2 border border-[#0000001F] rounded-full px-3 bg-white shrink-0">
                    <Search className="size-[18px] text-[#00000099] shrink-0" />
                    <input
                      value={searchQuery}
                      // onChange={(e) => setSearchQuery(e.target.value)}
                      type="text"
                      placeholder="Search Student"
                      className="w-full h-full text-[14px] bg-transparent focus:outline-none placeholder:text-[#00000066] leading-none"
                    />
                  </div>

                  {/* Enter Mark Buttons */}
                  <div className="flex items-center justify-end gap-2 min-w-[260px]">
                    {isEnteringMarks ? (
                      <>
                        <button
                          type="button"
                          onClick={handleCancelMarks}
                          className="h-[39px] flex items-center justify-center px-8 border border-[#0000001F] rounded-full text-[14px] font-normal cursor-pointer shrink-0"
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          onClick={handleSaveStudentMarks}
                          className="h-[39px] flex items-center justify-center gap-1.5 px-4 bg-[#228B22] hover:bg-[#1e7b1e] rounded-full text-white text-[14px] font-semibold cursor-pointer shrink-0"
                        >
                          <Save className="size-[15px] shrink-0" />
                          <span>Save Marks</span>
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={handleEnterMarks}
                        className="h-[39px] flex items-center justify-center gap-1.5 px-4 bg-[#228B22] hover:bg-[#1e7b1e] rounded-full text-white text-[14px] font-semibold cursor-pointer shrink-0"
                      >
                        <NotebookPen className="size-[15px] shrink-0" />
                        <span>Enter Mark</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Table */}
                <div className="mt-2 border border-[#0000001F] rounded-tl-[8px] rounded-tr-[8px] overflow-hidden">
                  <table className="w-full">

                    <colgroup>
                      <col style={{ width: "5%" }} />
                      <col style={{ width: "26%" }} />
                      <col style={{ width: "6%" }} />
                      <col style={{ width: "6%" }} />
                      <col style={{ width: "6%" }} />
                      <col style={{ width: "6%" }} />
                      <col style={{ width: "6%" }} />
                      <col style={{ width: "6%" }} />
                      <col style={{ width: "7%" }} />
                      {!isEnteringMarks && (
                        <>
                          <col style={{ width: "6%" }} />
                          <col style={{ width: "16%" }} />
                        </>
                      )}
                    </colgroup>
                    <thead>
                      <tr className="bg-[#A8A8A833] border-b-2 border-[#0000001F]">
                        <th className="text-[14px] font-[500] py-[13px] px-2 leading-none">No</th>
                        <th className="text-[14px] text-left font-[500] py-[13px] px-2 leading-none">Student Name</th>
                        <th className="text-[14px] font-[500] py-[13px] px-2 leading-none">Myanmar</th>
                        <th className="text-[14px] font-[500] py-[13px] px-2 leading-none">English</th>
                        <th className="text-[14px] font-[500] py-[13px] px-2 leading-none">Mathematics</th>
                        <th className="text-[14px] font-[500] py-[13px] px-2 leading-none">Physics</th>
                        <th className="text-[14px] font-[500] py-[13px] px-2 leading-none">Chemistry</th>
                        <th className="text-[14px] font-[500] py-[13px] px-2 leading-none">Bio</th>
                        <th className="text-[14px] font-[500] py-[13px] px-2 leading-none">Total</th>
                        {!isEnteringMarks && (
                          <>
                            <th className="text-[14px] font-[500] py-[13px] px-2 leading-none">Rank</th>
                            <th className="text-[14px] font-[500] py-[13px] px-2 leading-none">Report Card</th>
                          </>
                        )}
                      </tr>
                    </thead>

                    <tbody>
                      {filteredStudentMarks.map((mark) => {
                        const examType = exam_types.find((type) => type.id === mark.exam_id)
                        const hasReport = examType?.has_report_card

                        return (
                          <tr key={mark.id} className="border-b border-[#0000001F]">
                            {/* Id */}
                            <td className="font-normal text-[14px] py-[10px] px-2 text-center">{mark.id}</td>

                            {/* Student Name */}
                            <td className="font-normal text-[14px] py-[10px] px-2 text-left">{mark.student_name}</td>

                            {/* Myanmar */}
                            <td className="font-normal text-[14px] py-[10px] px-2 text-center">
                              {isEnteringMarks ? (
                                <input
                                  name="myanmar"
                                  value={studentMarksForm[mark.id]?.myanmar ?? ""}
                                  onChange={(e) => handleStudentMarkChange(mark.id, e)}
                                  className="border border-[#0000001F] text-center rounded-[8px] h-[32px] w-[98px] px-2" type="text" />
                              ) : mark.myanmar ?? '-'}
                            </td>

                            {/* English */}
                            <td className="font-normal text-[14px] py-[10px] px-2 text-center">
                              {isEnteringMarks ? (
                                <input
                                  type="text"
                                  name="english"
                                  value={studentMarksForm[mark.id]?.english ?? ""}
                                  onChange={(e) => handleStudentMarkChange(mark.id, e)}
                                  className="border border-[#0000001F] text-center rounded-[8px] h-[32px] w-[98px] px-2"
                                />
                              ) : mark.english ?? '-'}
                            </td>

                            {/* Math */}
                            <td className="font-normal text-[14px] py-[10px] px-2 text-center">
                              {isEnteringMarks ? (
                                <input
                                  name="math"
                                  value={studentMarksForm[mark.id]?.math ?? ""}
                                  onChange={(e) => handleStudentMarkChange(mark.id, e)}
                                  className="border border-[#0000001F] text-center rounded-[8px] h-[32px] w-[98px] px-2" type="text" />
                              ) : mark.math ?? '-'}
                            </td>

                            {/* Physic */}
                            <td className="font-normal text-[14px] py-[10px] px-2 text-center">
                              {isEnteringMarks ? (
                                <input
                                  name="physic"
                                  value={studentMarksForm[mark.id]?.physic ?? ""}
                                  onChange={(e) => handleStudentMarkChange(mark.id, e)}
                                  className="border border-[#0000001F] text-center rounded-[8px] h-[32px] w-[98px] px-2" type="text" />
                              ) : mark.physic ?? '-'}
                            </td>

                            {/* Chemistry */}
                            <td className="font-normal text-[14px] py-[10px] px-2 text-center">
                              {isEnteringMarks ? (
                                <input
                                  name="chemistry"
                                  value={studentMarksForm[mark.id]?.chemistry ?? ""}
                                  onChange={(e) => handleStudentMarkChange(mark.id, e)}
                                  className="border border-[#0000001F] text-center rounded-[8px] h-[32px] w-[98px] px-2" type="text" />
                              ) : mark.chemistry ?? '-'}
                            </td>

                            {/* Bio */}
                            <td className="font-normal text-[14px] py-[10px] px-2 text-center">
                              {isEnteringMarks ? (
                                <input
                                  name="bio"
                                  value={studentMarksForm[mark.id]?.bio ?? ""}
                                  onChange={(e) => handleStudentMarkChange(mark.id, e)}
                                  className="border border-[#0000001F] text-center rounded-[8px] h-[32px] w-[98px] px-2" type="text" />
                              ) : mark.bio ?? '-'}
                            </td>

                            {/* Total */}
                            <td className="font-normal text-[14px] py-[10px] px-2 text-center">
                              {isEnteringMarks ? (
                                <input
                                  type="text"
                                  value={calculateTotalMarks(mark.id)}
                                  readOnly
                                  className="border border-[#0000001F] text-center rounded-[8px] h-[32px] w-[74px] px-2 bg-[#D9D9D980]"
                                />
                              ) : (
                                mark.total ?? 0
                              )}
                            </td>

                            {!isEnteringMarks && (
                              <>
                                {/* Rank */}
                                <td className="font-normal text-[14px] py-[10px] px-2 text-center">
                                  {isEnteringMarks ? (
                                    <input className="border border-[#0000001F] rounded-[8px] h-[32px] w-[98px] px-2" type="text" />
                                  ) : '-'}
                                </td>

                                {/* Report Card */}
                                <td className="font-normal text-[14px] py-[10px] px-2 text-center">
                                  {hasReport ? (
                                    <button className="cursor pointer flex items-center gap-1 bg-[#228B221A] rounded-[8px] py-1 px-2 mx-auto hover:bg-[#228B2226] transition-colors">
                                      <File className="size-[14px] text-[#228B22]" />
                                      <span className="font-[500] text-[12px] text-[#228B22]">Download PDF</span>
                                    </button>
                                  ) : " - "}
                                </td>
                              </>
                            )}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="border border-[#0000001F] rounded-[8px] flex-1 flex items-center justify-center">
                <div className="w-full max-w-[300px] flex flex-col gap-3 items-center">
                  {/* Icon */}
                  <div className="size-[100px] bg-[#D9D9D9] rounded-full flex items-center justify-center">
                    <FileText className="size-[55px]" />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col text-center">
                    <h2 className="font-semibold text-[18px]">No Data Found !</h2>
                    <p className="font-normal text-[14px] text-[#00000099]">Please select a grade, class and exam type,
                      to view the results.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Exam Type */}
        {selectedTab === TABS[1].value && (
          <div>
            <div className="mt-2 border border-[#0000001F] rounded-tl-[8px] rounded-tr-[8px] overflow-hidden">
              <table className="w-full table-fixed">
                {/* Column Group */}
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "50%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                </colgroup>

                {/* Table Header */}
                <thead>
                  <tr className="bg-[#A8A8A833] border-b-2 border-[#0000001F]">
                    <th className="text-[14px] font-[500] py-[13px] px-2 text-center leading-none">ID</th>
                    <th className="text-[14px] text-left font-[500] py-[13px] px-2 leading-none">Exam Name</th>
                    <th className="text-[14px] font-[500] py-[13px] px-2 text-center leading-none">Has Report Card</th>
                    <th className="text-[14px] font-[500] py-[13px] px-2 text-center leading-none">Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {/* Store exam type form row */}
                  {!editingExamType && (
                    <tr className="border-b border-[#0000001F]">
                      <td className="font-normal text-[14px] py-[10px] px-2 text-center">-</td>
                      <td className="font-normal text-[14px] py-[10px] px-2 text-left">
                        <input
                          type="text"
                          value={examTypeFormDate.name ?? ""}
                          name="name"
                          onChange={(e) => handleChange(e, setExamTypeFormData, setExamTypeFormErrors)}
                          placeholder="Enter exam name (e.g. Mid-term)"
                          className="border border-[#0000001F] rounded-[4px] h-[36px] w-full max-w-[414px] px-3 text-[14px] focus:outline-none focus:border-[#228B22]"
                        />
                      </td>
                      <td className="font-normal text-[14px] py-[10px] px-2 text-center">
                        <input
                          type="checkbox"
                          name="has_report_card"
                          checked={examTypeFormDate.has_report_card ? true : false}
                          onChange={(e) => handleToggleCheck(e, setExamTypeFormData)}
                          className="size-[16px] accent-[#228B22] cursor-pointer"
                        />
                      </td>
                      <td>
                        <button
                          onClick={handleSaveExamType}
                          className="flex items-center justify-center gap-1 bg-[#228B22] hover:bg-[#1e7b1e] text-white rounded-[8px] py-1.5 px-3 mx-auto text-[12px] font-semibold transition-colors cursor-pointer"
                        >
                          <Save className="size-[14px]" />
                          <span>Save Exam</span>
                        </button>
                      </td>
                    </tr>
                  )}

                  {/* Exisiting exam types table */}
                  {examTypes.length > 0 ? (
                    examTypes.map((exam) => (
                      <tr key={exam.id} className="border-b border-[#0000001F]">

                        {/* ID Column */}
                        <td className="font-normal text-[14px] py-[10px] px-2 text-center">
                          {exam.id}
                        </td>

                        {/* Exam Name Column */}
                        <td className="font-normal text-[14px] py-[10px] px-2 text-left">
                          {editingExamType && editingExamType.id === exam.id ? (
                            <input
                              ref={examTypeNameInputRef}
                              type="text"
                              name="name"
                              placeholder="Enter exam name (e.g. Mid-term)"
                              value={examTypeFormDate.name}
                              onChange={(e) => handleChange(e, setExamTypeFormData, setExamTypeFormErrors)}
                              className="border border-[#0000001F] rounded-[4px] h-[36px] w-full max-w-[414px] px-3 text-[14px] focus:outline-none focus:border-[#228B22]"
                            />
                          ) : exam.name}
                        </td>

                        {/* Has Report Card Checkbox Column */}
                        <td className="font-normal text-[14px] py-[10px] px-2 text-center">
                          {editingExamType && editingExamType.id === exam.id ? (
                            <input
                              type="checkbox"
                              name="has_report_card"
                              checked={examTypeFormDate.has_report_card}
                              onChange={(e) => handleToggleCheck(e, setExamTypeFormData)}
                              className="size-[16px] accent-[#228B22] cursor-pointer"
                            />
                          ) : (
                            <input
                              type="checkbox"
                              disabled
                              checked={exam.has_report_card}
                              className="size-[16px] accent-[#228B22] cursor-pointer"
                            />
                          )}
                        </td>

                        {/* Actions Column (Save Exam) */}
                        <td className="font-normal text-[14px] py-[10px] px-2 text-center">

                          {editingExamType && editingExamType.id === exam.id ? (
                            <div className="flex items-center gap-3 justify-center">

                              {/* Cancel Button */}
                              <button
                                onClick={handleCancelEditExamType}
                                className="border border-[#0000001F] rounded-[4px] size-[30px] flex items-center justify-center cursor-pointer">
                                <X className="size-[18px] text-red-500" />
                              </button>

                              {/* Update Button */}
                              <button
                                onClick={handleUpdateExamType}
                                className="border border-[#0000001F] rounded-[4px] size-[30px] flex items-center justify-center cursor-pointer">
                                <Check className="size-[18px] text-green-500" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 justify-center">
                              <Switch
                                checked={exam.is_active}
                                onChange={() => handleToggleExamTypeActiveStatus(exam)}
                              />

                              <button onClick={() => handleEditExamType(exam)}>
                                <PencilLineIcon className="size-[18px] text-[#2F00FF]" />
                              </button>

                              <button onClick={() => handleDelteExamType(exam)}>
                                <Trash2 className="size-[18px] text-[#FF0000]" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-6 text-gray-500 text-[14px]">
                        No Exam Types available. Please add one.
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </div>
        )}

        {/* Grading System */}
        {selectedTab === TABS[2].value && (
          <div className="h-full overflow-hidden overflow-y-auto scrollbar-hide flex flex-col gap-4">
            {/* Form */}
            <div className="flex flex-col gap-3 py-4 px-4 border border-[#0000001F] rounded-[8px] mt-2">
              {/* Title & Des & Create Button */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-[18px]">Grading System</h2>
                  <p className="font-normal text-[12px] text-[#483939CC]">Manage grade ranges and total marks settings</p>
                </div>

                {!showGradingSystemActionForm && (
                  <button
                    onClick={handleCreateGradingSystem}
                    className="h-[39px] rounded-full w-[168px] bg-[#228B22] border border-[#228B22] font-semibold text-[14px] text-white cursor-pointer">
                    + Add Grading System
                  </button>
                )}
              </div>

              {showGradingSystemActionForm && (
                <>
                  {/* Form Head*/}
                  <div className="p-[20px] bg-[#228B221A] rounded-[8px] flex items-end gap-5">
                    <div className=" flex flex-col gap-1 flex-1">
                      <label className="font-normal text-[14px]" htmlFor="grading_system_name">Grading System Name</label>
                      <input
                        id="grading_system_name"
                        name="name"
                        value={gradingSystemForm.name ?? ""}
                        onChange={(e) => handleChange(e, setGradingSystemForm)}
                        placeholder="Enter grading system name ..."
                        type="text"
                        className="border border-[#0000001F] rounded-[8px] w-full py-2 px-4 font-normal text-[14px] focus:outline-none bg-white" />
                    </div>

                    <div className=" flex flex-col gap-1 min-w-[221px]">
                      <label className="font-normal text-[14px]" htmlFor="max_mark">Maximum Mark</label>
                      <input
                        name="max_mark"
                        value={gradingSystemForm.max_mark ?? ""}
                        onChange={(e) => handleChange(e, setGradingSystemForm)}
                        placeholder="Enter exam maximum marks ..."
                        id="max_mark"
                        type="text"
                        className="border border-[#0000001F] rounded-[8px] w-full py-2 px-4 font-normal text-[14px] focus:outline-none bg-white" />
                    </div>

                    <div className=" flex flex-col gap-1 min-w-[221px]">
                      <label className="font-normal text-[14px]" htmlFor="pass_mark">Pass Mark</label>
                      <input
                        id="pass_mark"
                        name="pass_mark"
                        value={gradingSystemForm.pass_mark ?? ""}
                        onChange={(e) => handleChange(e, setGradingSystemForm)}
                        placeholder="Enter exam pass marks ..."
                        type="text"
                        className="border border-[#0000001F] rounded-[8px] w-full py-2 px-4 font-normal text-[14px] focus:outline-none bg-white" />
                    </div>

                    {/* Actions Buttons */}
                    <div className="flex items-end gap-3">
                      <button
                        onClick={handleCloseGradingSystemActionForm}
                        type="button"
                        className="h-[39px] flex items-center justify-center px-12 border border-[#0000001F] bg-white rounded-full text-[14px] font-normal cursor-pointer shrink-0"
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={editingGradingSystem ? () => handleUpdateGradingSystem(editingGradingSystem.id) : handleSaveGradingSystem}
                        className="h-[39px] flex items-center justify-center gap-1.5 px-6 bg-[#228B22] hover:bg-[#1e7b1e] rounded-full text-white text-[14px] font-semibold cursor-pointer shrink-0"
                      >
                        <Save className="size-[15px] shrink-0" />
                        <span>{editingGradingSystem ? 'Update Grading' : 'Save Grading'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Ragnes Form Table */}
                  <div className="flex items-start gap-3">
                    {/* Table Form */}
                    <div className="border border-[#0000001F] rounded-tl-[8px] rounded-tr-[8px] overflow-hidden">
                      <table className="w-full table-fixed">
                        {/* Column Group */}
                        <colgroup>
                          <col style={{ width: "5%" }} />
                          <col style={{ width: "30%" }} />
                          <col style={{ width: "30%" }} />
                          <col style={{ width: "30%" }} />
                          <col style={{ width: "4%" }} />
                        </colgroup>

                        {/* Table Header */}
                        <thead>
                          <tr className="bg-[#A8A8A833] border-b-2 border-[#0000001F]">
                            <th className="text-[14px] font-[500] py-[13px] px-2 text-center leading-none">No</th>
                            <th className="text-[14px] text-left font-[500] py-[13px] px-2 leading-none">Grading</th>
                            <th className="text-[14px] font-[500] py-[13px] px-2 text-left leading-none">From Marks</th>
                            <th className="text-[14px] font-[500] py-[13px] px-2 text-left leading-none">To Marks</th>
                            <th className="text-[14px] font-[500] py-[13px] px-2 text-left leading-none"></th>
                          </tr>
                        </thead>

                        <tbody>
                          {gradingSystemForm.ranges?.map((range, index) => (
                            <tr key={range.id} className="border-b border-[#0000001F]">
                              <td className="font-normal text-[14px] py-[10px] px-2 text-center">{range.id}</td>
                              <td className="font-normal text-[14px] py-[10px] px-2 text-left">
                                <input
                                  type="text"
                                  value={range.grading ?? ""}
                                  name="grading"
                                  onChange={(e) => handleRangeChange(range.id, e)}
                                  placeholder="A+"
                                  className="border border-[#0000001F] rounded-[4px] h-[36px] w-full max-w-[414px] px-3 text-[14px] focus:outline-none focus:border-[#228B22]"
                                />
                              </td>
                              <td className="font-normal text-[14px] py-[10px] px-2 text-left">
                                <input
                                  type="text"
                                  value={range.from ?? ""}
                                  name="from"
                                  onChange={(e) => handleRangeChange(range.id, e)}
                                  placeholder="80"
                                  className="border border-[#0000001F] rounded-[4px] h-[36px] w-full max-w-[414px] px-3 text-[14px] focus:outline-none focus:border-[#228B22]"
                                />
                              </td>
                              <td className="font-normal text-[14px] py-[10px] px-2 text-left">
                                <input
                                  type="text"
                                  value={range.to ?? ""}
                                  name="to"
                                  onChange={(e) => handleRangeChange(range.id, e)}
                                  placeholder="100"
                                  className="border border-[#0000001F] rounded-[4px] h-[36px] w-full max-w-[414px] px-3 text-[14px] focus:outline-none focus:border-[#228B22]"
                                />
                              </td>
                              <td>
                                {index === gradingSystemForm.ranges.length - 1 ? (
                                  <button
                                    onClick={handleAddRange}
                                    disabled={isRangeIncomplete}
                                    className={`size-[32.5px] cursor-pointer text-white rounded-full flex items-center justify-center ${isRangeIncomplete ? 'bg-[#228b2292]' : 'bg-[#228B22]'}`}>
                                    <Plus />
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleRemoveRange(range.id)}
                                    className={`size-[32.5px] cursor-pointer text-white rounded-full flex items-center justify-center bg-[#FF0000]`}>
                                    <Minus />
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Grading Systems Tabel */}
            {!showGradingSystemActionForm && (
              <div className="flex-1 overflow-y-auto">
                {gradingSystems?.length > 0 ? (
                  <div className="h-full overflow-hidden space-y-2 overflow-y-auto scrollbar-hide">
                    {/* Grading System Cards */}
                    {gradingSystems.map((grading) => (
                      <div key={grading.id} className="border border-[#0000001F] rounded-[8px] pt-4 pb-2 px-4">
                        {/* Card Title & Action Buttons */}
                        <div className="flex items-center">
                          <div className="flex flex-col gap-1 flex-1">
                            <h2 className="font-semibold text-[18px]">{grading.name}</h2>
                            <p className="text-[12px] text-[#483939CC]">Maximum Mark - <span className="text-green-700">{grading.max_mark}</span> / Pass Mark - <span className="text-red-700">{grading.pass_mark}</span></p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            {/* Edit Button */}
                            <button
                              onClick={() => handleEditGradingSystem(grading)}
                              className="flex items-center gap-1 border border-[#2F00FF1A] rounded-[6px] h-[39px] px-4 bg-[#2F00FF1A] text-[#2F00FF] text-[14px]">
                              <Pencil className="size-[14px]" />
                              Edit
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleDleteGradingSystem(grading.id)}
                              className="flex items-center gap-1 border border-[#FF00001A] rounded-[6px] h-[39px] px-4 bg-[#FF00001A] text-[#FF0000] text-[14px]">
                              <Trash2 className="size-[14px]" />
                              Delete
                            </button>
                          </div>
                        </div>

                        {/* Ranges Table */}
                        <div className="border border-[#0000001F] rounded-tl-[8px] rounded-tr-[8px] overflow-hidden mt-2">
                          <table className="w-full table-fixed">
                            {/* Column Group */}
                            <colgroup>
                              <col style={{ width: "5%" }} />
                              <col style={{ width: "32%" }} />
                              <col style={{ width: "32%" }} />
                              <col style={{ width: "32%" }} />
                            </colgroup>

                            {/* Table Header */}
                            <thead>
                              <tr className="bg-[#A8A8A833] border-b-2 border-[#0000001F]">
                                <th className="text-[14px] font-[500] py-[13px] px-2 text-center leading-none">No</th>
                                <th className="text-[14px] text-left font-[500] py-[13px] px-2 leading-none">Grading</th>
                                <th className="text-[14px] font-[500] py-[13px] px-2 text-center leading-none">From Marks</th>
                                <th className="text-[14px] font-[500] py-[13px] px-2 text-center leading-none">To Marks</th>
                              </tr>
                            </thead>

                            <tbody>
                              {grading.ranges.map((range) => (
                                <tr key={range.id} className="border-b border-[#0000001F]">
                                  <td className="font-normal text-[14px] py-[10px] px-2 text-center">{range.id}</td>
                                  <td className="font-normal text-[14px] py-[10px] px-2 text-left">{range.grading}</td>
                                  <td className="font-normal text-[14px] py-[10px] px-2 text-center">{range.from}</td>
                                  <td className="font-normal text-[14px] py-[10px] px-2 text-center">{range.to}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border border-[#0000001F] rounded-[8px] h-full flex items-center justify-center">
                    <div className="w-full max-w-[300px] flex flex-col gap-3 items-center">
                      {/* Icon */}
                      <div className="size-[100px] bg-[#D9D9D9] rounded-full flex items-center justify-center">
                        <GraduationCap className="size-[55px]" />
                      </div>

                      {/* Text */}
                      <div className="flex flex-col text-center">
                        <h2 className="font-semibold text-[18px]">No Grading System Found !</h2>
                        <p className="font-normal text-[14px] text-[#00000099]">Click the button to add a new grading system.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Exam Setup */}
        {selectedTab === TABS[3].value && (
          <div className="h-full overflow-hidden pt-2">

            {selectedSetUpGrade ? (
              // Tables Information
              <div className="h-full flex flex-col gap-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Back to grades button */}
                    <button
                      onClick={handleCancelSelectSetUpGarde}
                      className="cursor-pointer">
                      <ChevronLeft size={18} />
                    </button>
                    <h2 className="font-semibold text-[18px]">{selectedSetUpGrade.label}</h2>
                  </div>

                  {/* Create Set Up Button */}
                  {!showSetUpActionForm && (
                    <button
                      onClick={handleCreateSetUp}
                      className="cursor-pointer h-[39px] flex items-center px-4 bg-[#228B22] text-white rounded-full font-semibold text-[14px]">
                      + Add New Set Up
                    </button>
                  )}
                </div>

                {showSetUpActionForm ? (
                  // Show Form
                  <div className="border flex-1 overflow-hidden overflow-y-auto border border-[#0000001F] rounded-[8px] p-2">

                    {/* Form Header */}
                    <div className="p-[20px] bg-[#228B221A] rounded-[8px] flex items-end gap-5">

                      <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="exam_type_id" className="font-normal text-[14px]">Exam Type</label>
                        <select
                          id="exam_type_id"
                          name="exam_type_id"
                          value={setUpForm.exam_type_id ?? ""}
                          onChange={(e) => handleChange(e, setSetUpForm)}
                          className="text-[14px] font-normal text-[#00000099] h-[39px] bg-white border border-[#0000001F] rounded-[8px] focus:outline-none px-3">
                          <option value="" disabled>Chose exam type</option>
                          {examTypes?.map((item) => (
                            <option className="text-black" value={item.id} key={item.id}>{item.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="grading_system_id" className="font-normal text-[14px]">Grading System</label>
                        <select
                          id="grading_system_id"
                          name="grading_system_id"
                          value={setUpForm.grading_system_id ?? ""}
                          onChange={(e) => handleChangeGradingSystemId(e.target.value)}
                          className="text-[14px] font-normal text-[#00000099] h-[39px] bg-white border border-[#0000001F] rounded-[8px] focus:outline-none px-3">
                          <option value="" disabled>Choose grading system</option>
                          <option value="none">None</option>
                          {gradingSystems?.map((item) => (
                            <option className="text-black" value={item.id} key={item.id}>{item.name}</option>
                          ))}
                        </select>
                      </div>


                      {/* Actions Buttons */}
                      <div className="flex items-end gap-3">
                        <button
                          onClick={handleCloseSetUpActionForm}
                          type="button"
                          className="h-[39px] flex items-center justify-center px-12 border border-[#0000001F] bg-white rounded-full text-[14px] font-normal cursor-pointer shrink-0"
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          onClick={editingSetUp ? handleUpdateSetUp : handleSaveSetUp}
                          className="h-[39px] flex items-center justify-center gap-1.5 px-6 bg-[#228B22] hover:bg-[#1e7b1e] rounded-full text-white text-[14px] font-semibold cursor-pointer shrink-0"
                        >
                          <Save className="size-[15px] shrink-0" />
                          <span>{editingSetUp ? 'Update Set Up' : 'Save Set Up'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Exam Format Form Table */}
                    <div className="border border-[#0000001F] rounded-tl-[8px] rounded-tr-[8px] overflow-hidden mt-2">
                      <table className="w-full table-fixed">
                        {/* Column Group */}
                        <colgroup>
                          <col style={{ width: "5%" }} />
                          <col style={{ width: "25%" }} />
                          <col style={{ width: "9.285%" }} />
                          <col style={{ width: "9.285%" }} />
                          <col style={{ width: "9.285%" }} />
                          <col style={{ width: "9.285%" }} />
                          <col style={{ width: "9.285%" }} />
                          <col style={{ width: "9.285%" }} />
                          <col style={{ width: "9.285%" }} />
                          <col style={{ width: "5%" }} />
                        </colgroup>

                        {/* Table Header */}
                        <thead>
                          <tr className="bg-[#A8A8A833] border-b-2 border-[#0000001F]">
                            <th className="text-[14px] font-[500] py-[13px] px-2 text-center leading-none">No</th>
                            <th className="text-[14px] text-left font-[500] py-[13px] px-2 leading-none">Subject</th>
                            <th className="text-[14px] text-left font-[500] py-[13px] px-2 leading-none">Date</th>
                            <th className="text-[14px] font-[500] py-[13px] px-2 text-left leading-none">Start Time</th>
                            <th className="text-[14px] font-[500] py-[13px] px-2 text-left leading-none">End Time</th>
                            <th className="text-[14px] font-[500] py-[13px] px-2 text-left leading-none">Duration</th>
                            <th className="text-[14px] font-[500] py-[13px] px-2 text-left leading-none">Maxi Mark</th>
                            <th className="text-[14px] font-[500] py-[13px] px-2 text-left leading-none">Pass Mark</th>
                            <th className="text-[14px] font-[500] py-[13px] px-2 text-left leading-none">D - Mark</th>
                            <th className="text-[14px] font-[500] py-[13px] px-2 text-left leading-none">Active</th>
                          </tr>
                        </thead>

                        <tbody>
                          {setUpForm.formats.map((format, index) => (
                            <tr key={format.id} className="border-b border-[#0000001F]">
                              <td className="font-normal text-[14px] py-[10px] px-2 text-center">{index + 1}</td>

                              <td className="font-normal text-[14px] py-[10px] px-2 text-left">{format.subject_name}</td>

                              {/* Date */}
                              <td className="font-normal text-[14px] py-[10px] px-2 text-left">
                                <input
                                  type="date"
                                  value={format.date ?? ""}
                                  name="date"
                                  onChange={(e) => handleFormatChange(format.id, e)}
                                  className="border border-[#0000001F] rounded-[4px] h-[36px] w-full max-w-[414px] px-3 text-[14px] focus:outline-none focus:border-[#228B22]"
                                />
                              </td>

                              {/* Start Time */}
                              <td className="font-normal text-[14px] py-[10px] px-2 text-left">
                                <input
                                  type="time"
                                  value={format.start_time ?? ""}
                                  name="start_time"
                                  onChange={(e) => handleFormatChange(format.id, e)}
                                  className="border border-[#0000001F] rounded-[4px] h-[36px] w-full max-w-[414px] px-3 text-[14px] focus:outline-none focus:border-[#228B22]"
                                />
                              </td>

                              {/* End Time */}
                              <td className="font-normal text-[14px] py-[10px] px-2 text-left">
                                <input
                                  type="time"
                                  value={format.end_time ?? ""}
                                  name="end_time"
                                  onChange={(e) => handleFormatChange(format.id, e)}
                                  placeholder="100"
                                  className="border border-[#0000001F] rounded-[4px] h-[36px] w-full max-w-[414px] px-3 text-[14px] focus:outline-none focus:border-[#228B22]"
                                />
                              </td>

                              {/* Duration */}
                              <td className="font-normal text-[14px] py-[10px] px-2 text-left">
                                <input
                                  type="text"
                                  value={format.duration ?? '-'}
                                  name="duration"
                                  disabled
                                  onChange={(e) => handleFormatChange(format.id, e)}
                                  className="border border-[#0000001F] rounded-[4px] h-[36px] w-full max-w-[414px] px-3 text-[14px] focus:outline-none bg-[#D9D9D980] text-center"
                                />
                              </td>

                              {/* Max Mark */}
                              <td className="font-normal text-[14px] py-[10px] px-2 text-left">
                                <input
                                  type="text"
                                  value={format.max_mark ?? ""}
                                  name="max_mark"
                                  onChange={(e) => handleFormatChange(format.id, e)}
                                  className="border border-[#0000001F] rounded-[4px] h-[36px] w-full max-w-[414px] px-3 text-center text-[14px] focus:outline-none focus:border-[#228B22]"
                                />
                              </td>

                              {/* Pass Mark */}
                              <td className="font-normal text-[14px] py-[10px] px-2 text-left">
                                <input
                                  type="text"
                                  value={format.pass_mark ?? ""}
                                  name="pass_mark"
                                  onChange={(e) => handleFormatChange(format.id, e)}
                                  className="border border-[#0000001F] rounded-[4px] h-[36px] w-full max-w-[414px] px-3 text-center text-[14px] focus:outline-none focus:border-[#228B22]"
                                />
                              </td>

                              {/* D Mark */}
                              <td className="font-normal text-[14px] py-[10px] px-2 text-left">
                                <input
                                  type="text"
                                  value={format.d_mark ?? ""}
                                  name="d_mark"
                                  onChange={(e) => handleFormatChange(format.id, e)}
                                  className="border border-[#0000001F] rounded-[4px] h-[36px] w-full max-w-[414px] px-3 text-[14px] focus:outline-none focus:border-[#228B22]"
                                />
                              </td>

                              {/* Switch */}
                              <td className="font-normal text-[14px] py-[10px] px-2 text-left">
                                <Switch
                                  checked={format.is_active}
                                  onChange={() => handleToggleSetUpActive(format.id)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Setup Table */}
                    {examSetUps?.length > 0 ? (
                      <div className="space-y-2 overflow-hidden overflow-y-auto scrollbar-hide">
                        {examSetUps.map((setUp, index) => (
                          <div key={index} className="border border-[#0000001F] rounded-[8px] p-4 flex-1 flex flex-col gap-3">
                            {/* Set Up Title And Actions Buttons */}
                            <div className="flex items-center justify-between">
                              <h1 className="font-semibold text-[18px]">{`${getExamName(setUp.exam_type_id)} / (${getGradingSystemName(setUp.grading_system_id)})`}</h1>

                              <div className="flex items-center gap-2">
                                {/* Edit Button */}
                                <button
                                  onClick={() => handleEditSetUp(setUp)}
                                  className="flex items-center gap-1 border border-[#2F00FF1A] rounded-[6px] h-[39px] px-4 bg-[#2F00FF1A] text-[#2F00FF] text-[14px]">
                                  <Pencil className="size-[14px]" />
                                  Edit
                                </button>

                                {/* Delete Button */}
                                <button
                                  // onClick={() => handleDleteGradingSystem(grading.id)}
                                  className="flex items-center gap-1 border border-[#FF00001A] rounded-[6px] h-[39px] px-4 bg-[#FF00001A] text-[#FF0000] text-[14px]">
                                  <Trash2 className="size-[14px]" />
                                  Delete
                                </button>
                              </div>
                            </div>

                            {/* Format Table */}
                            <div className="border border-[#0000001F] rounded-tl-[8px] rounded-tr-[8px] overflow-hidden">
                              <table className="w-full table-fixed">
                                {/* Column Group */}
                                <colgroup>
                                  <col style={{ width: "5%" }} />
                                  <col style={{ width: "25%" }} />
                                  <col style={{ width: "10%" }} />
                                  <col style={{ width: "10%" }} />
                                  <col style={{ width: "10%" }} />
                                  <col style={{ width: "10%" }} />
                                  <col style={{ width: "10%" }} />
                                  <col style={{ width: "10%" }} />
                                  <col style={{ width: "10%" }} />
                                </colgroup>

                                {/* Table Header */}
                                <thead>
                                  <tr className="bg-[#A8A8A833] border-b-2 border-[#0000001F]">
                                    <th className="text-[14px] font-[500] py-[13px] px-2 text-center leading-none">No</th>
                                    <th className="text-[14px] text-left font-[500] py-[13px] px-2 leading-none">Subject</th>
                                    <th className="text-[14px] font-[500] py-[13px] px-2 text-left leading-none">Date</th>
                                    <th className="text-[14px] font-[500] py-[13px] px-2 text-center leading-none">Start Time</th>
                                    <th className="text-[14px] font-[500] py-[13px] px-2 text-center leading-none">End Time</th>
                                    <th className="text-[14px] font-[500] py-[13px] px-2 text-center leading-none">Duration</th>
                                    <th className="text-[14px] font-[500] py-[13px] px-2 text-center leading-none">Max Mark</th>
                                    <th className="text-[14px] font-[500] py-[13px] px-2 text-center leading-none">Pass Mark</th>
                                    <th className="text-[14px] font-[500] py-[13px] px-2 text-center leading-none">D - Mark</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {setUp.formats?.map((format, index) => (
                                    <tr key={index} className="border-b border-[#0000001F]">
                                      <td className="font-normal text-[14px] py-[10px] px-2 text-center">{index}</td>
                                      <td className="font-normal text-[14px] py-[10px] px-2 text-left">{getSubjectName(format.subject_id)}</td>
                                      <td className="font-normal text-[14px] py-[10px] px-2 text-left">{format.date}</td>
                                      <td className="font-normal text-[14px] py-[10px] px-2 text-center">{format.start_time}</td>
                                      <td className="font-normal text-[14px] py-[10px] px-2 text-center">{format.end_time}</td>
                                      <td className="font-normal text-[14px] py-[10px] px-2 text-center">{format.duration} Min</td>
                                      <td className="font-normal text-[14px] py-[10px] px-2 text-center">{format.max_mark}</td>
                                      <td className="font-normal text-[14px] py-[10px] px-2 text-center">{format.max_mark}</td>
                                      <td className="font-normal text-[14px] py-[10px] px-2 text-center">{format.d_mark}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Show No Data found
                      <div className="flex-1 border border-[#0000001F] rounded-[8px] flex items-center justify-center">
                        <div className="w-full max-w-[300px] flex flex-col gap-3 items-center">
                          {/* Icon */}
                          <div className="size-[100px] bg-[#D9D9D9] rounded-full flex items-center justify-center">
                            <Settings className="size-[55px]" />
                          </div>

                          {/* Text */}
                          <div className="flex flex-col text-center">
                            <h2 className="font-semibold text-[18px]">No Set Up Found !</h2>
                            <p className="font-normal text-[14px] text-[#00000099]">Click the button to add a new set up.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              // Grades container
              <div className="grid grid-cols-4 gap-6">
                {/* Grade Card */}
                {grades.map((grade) => (
                  <div key={grade.id} className="relative h-[70px] group border border-[#0000001F] bg-[#D9D9D980] rounded-[8px] flex items-center justify-between px-4 overflow-hidden">
                    <h2 className="font-semibold text-[14px]">{grade.label}</h2>
                    <ChevronRightSquare size={22} className="text-[#0000001F] group-hover:text-black transition-colors duration-200" />
                    <button onClick={() => handleSelectSetUpGrade(grade.id)} className="absolute inset-0 z-10 bg-transparent active:bg-[#efefef80] size-full cursor-pointer" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
