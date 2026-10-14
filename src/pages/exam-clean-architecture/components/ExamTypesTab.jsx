import { Check, PencilLineIcon, Plus, Trash2, X } from "lucide-react";
import { Switch } from "../../settings/exams/components/ui/Switch";
import { TABS } from "../constants/examConstants";

export function ExamTypesTab(props) {
  const {
    selectedTab,
    examTypes,
    allExamSetUps,
    editingExamType,
    examTypeFormDate,
    examTypeNameInputRef,
    handleChange,
    setExamTypeFormData,
    setExamTypeFormErrors,
    handleToggleCheck,
    handleCancelEditExamType,
    handleUpdateExamType,
    handleToggleExamTypeActiveStatus,
    handleEditExamType,
    handleDeleteExamType,
    handleSaveExamType,
  } = props;

  return (
    <>
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
                  {/* Exisiting exam types table */}
                  {examTypes.length > 0 ? (
                    examTypes.map((exam, index) => (
                      <tr key={exam.id} className="border-b border-[#0000001F]">

                        {/* ID Column */}
                        <td className="font-normal text-[14px] py-[10px] px-2 text-center">
                          {index + 1}
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

                              <button onClick={() => handleDeleteExamType(exam, allExamSetUps)}>
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
                          disabled={!examTypeFormDate.name.trim()}
                          className="flex w-[180px] items-center justify-center gap-1 bg-[#228B22] hover:bg-[#1e7b1e] text-white rounded-[8px] py-1.5 px-3 mx-auto disabled:bg-[#228b229d] text-[12px] font-semibold transition-colors cursor-pointer"
                        >
                          <Plus className="size-[14px]" />
                          <span>Save Exam</span>
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </div>
        )}
    </>
  );
}
