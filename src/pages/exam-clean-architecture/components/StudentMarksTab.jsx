import { File, FileText, NotebookPen, Save, Search } from "lucide-react";
import { TABS } from "../constants/examConstants";
import { grades } from "../data/data";
import { getStudentName, getSubjectName, hasReportCard } from "../utils/examUtils";

export function StudentMarksTab(props) {
  const {
    selectedTab,
    selectedGradeId,
    setSelectedGradeId,
    selectedClassId,
    setSelectedClassId,
    selectedExamTypeId,
    setSelectedExamTypeId,
    setSearchQuery,
    filteredClasses,
    availableExamTypes,
    selectedStudentMarks,
    filteredStudentMarks,
    sortedStudentMarks,
    studentRanks,
    examSubjects,
    examTypes,
    isEnteringMarks,
    searchQuery,
    studentMarksForm,
    handleStudentMarkChange,
    handleCancelMarks,
    handleSaveStudentMarks,
    handleEnterMarks,
  } = props;

  return (
    <>
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
                    setSearchQuery("")
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
                  onChange={(e) => {
                    setSelectedClassId(e.target.value)
                    setSearchQuery("")
                  }}
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
                  onChange={(e) => {
                    setSelectedExamTypeId(e.target.value)
                    setSearchQuery("")
                  }}
                  name="exam_type"
                  id="exam_type"
                  className="text-[14px] font-normal text-[#00000099] h-[39px] border border-[#0000001F] rounded-[8px] focus:outline-none px-3">
                  <option value="" disabled>Select exam type</option>
                  {availableExamTypes.map((exam_type) => (
                    <option className="text-black" value={exam_type.id} key={exam_type.id}>{exam_type.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Student Marks Table*/}
            {selectedStudentMarks?.length > 0 ? (
              <div className="px-1">
                {/* Search and Enter Marks */}
                <div className="mt-4 flex items-center justify-between w-full">
                  {/* Search Bar */}
                  <div className="w-full max-w-[327px] h-[39px] box-border flex items-center gap-2 border border-[#0000001F] rounded-full px-3 bg-white shrink-0">
                    <Search className="size-[18px] text-[#00000099] shrink-0" />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
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
                      {examSubjects.map((subject) => (
                        <col key={subject.id} style={{ width: "6%" }} />
                      ))}
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
                        {examSubjects.map((subject) => (
                          <th key={subject.id} className="text-[14px] font-[500] py-[13px] px-2 leading-none">{getSubjectName(subject.subject_id)}</th>
                        ))}
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
                      {sortedStudentMarks?.map(({ student, mark, total }, index) => {
                        const hasreportcard = hasReportCard(selectedExamTypeId, examTypes)
                        return (
                          <tr key={student.id} className="border-b border-[#0000001F]">
                            <td className="font-normal text-[14px] py-[10px] px-2 text-center">{index + 1}</td>
                            <td className="font-normal text-[14px] py-[10px] px-2 text-left">{getStudentName(student.id)}</td>

                            {examSubjects.map((subject) => {
                              const subjectMarks = isEnteringMarks
                                ? studentMarksForm[student.id] ?? {}
                                : mark?.subject_marks ?? {};
                              return (
                                <td key={subject.id} className="font-normal text-[14px] py-[10px] px-2 text-center">
                                  {isEnteringMarks ? (
                                    <input
                                      type="number"
                                      min="0"
                                      max={subject.max_mark}
                                      disabled={!isEnteringMarks}
                                      value={subjectMarks[subject.subject_id] ?? ""}
                                      onChange={(event) =>
                                        handleStudentMarkChange(
                                          student.id,
                                          subject.subject_id,
                                          subject.max_mark,
                                          event
                                        )
                                      }
                                      className="border border-[#0000001F] text-center rounded-[8px] h-[32px] w-[98px] px-2"
                                    />
                                  ) : (subjectMarks[subject.subject_id] ?? '-')}
                                </td>
                              );
                            })}

                            <td className="font-normal text-[14px] py-[10px] px-2 text-center">
                              {isEnteringMarks ? (
                                <input
                                  type="text"
                                  name="total"
                                  value={examSubjects.reduce((sum, subject) => sum + Number(studentMarksForm[student.id]?.[subject.subject_id] || 0), 0) ?? total}
                                  readOnly
                                  className="border border-[#0000001F] text-center rounded-[8px] h-[32px] w-[74px] px-2 bg-[#D9D9D980]"
                                />
                              ) : (
                                total ?? 0
                              )}
                            </td>
                            {!isEnteringMarks && (
                              <>
                                <td className="p-3 text-center">{studentRanks.get(student.id) ?? "-"}</td>
                                {/* Report Card */}
                                <td className="font-normal text-[14px] py-[10px] px-2 text-center">
                                  {hasreportcard ? (
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
                  {sortedStudentMarks?.length === 0 && <p className="py-6 text-center text-sm text-gray-500">No students match your search.</p>}
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
    </>
  );
}
