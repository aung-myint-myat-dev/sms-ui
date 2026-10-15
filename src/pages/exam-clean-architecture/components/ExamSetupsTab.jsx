import { ChevronLeft, ChevronRightSquare, Pencil, Save, Settings, Trash2 } from "lucide-react";
import { Switch } from "../../settings/exams/components/ui/Switch";
import { TABS } from "../constants/examConstants";
import { grades } from "../data/data";
import { getExamName, getGradingSystemName, getSubjectName } from "../utils/examUtils";
import { isExamTimeOverlapping } from "../utils/validation";

export function ExamSetupsTab(props) {
  const {
    selectedTab,
    selectedSetUpGrade,
    handleCancelSelectSetUpGrade,
    showSetUpActionForm,
    handleCreateSetUp,
    setUpForm,
    setSetUpForm,
    handleChange,
    handleChangeGradingSystemId,
    gradingSystems,
    handleCloseSetUpActionForm,
    editingSetUp,
    handleUpdateSetUp,
    handleSaveSetUp,
    handleFormatChange,
    handleToggleSetUpActive,
    examTypes,
    examSetUps,
    handleEditSetUp,
    handleDeleteSetUp,
    handleSelectSetUpGrade,
  } = props;

  return (
    <>
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
                      onClick={handleCancelSelectSetUpGrade}
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
                          onChange={(e) => handleChangeGradingSystemId(e.target.value, gradingSystems)}
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
                          {/* Setup Format Form Row */}
                          {setUpForm.formats.map((format, index) => {
                            const isOverlapingTime = isExamTimeOverlapping(format, setUpForm.formats)
                            const inputClassName = `border rounded-[4px] h-[36px] w-full max-w-[414px] px-3 text-[14px] focus:outline-none ${isOverlapingTime ? "border-red-500 focus:border-red-500" : "border-[#0000001F] focus:border-[#228B22]"}`;

                            return (
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
                                    className={inputClassName}
                                  />
                                </td>

                                {/* Start Time */}
                                <td className="font-normal text-[14px] py-[10px] px-2 text-left">
                                  <input
                                    type="time"
                                    value={format.start_time ?? ""}
                                    name="start_time"
                                    onChange={(e) => handleFormatChange(format.id, e)}
                                    className={inputClassName}
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
                                    className={inputClassName}
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
                                <td className="font-normal text-[14px] py-[10px] px-2">
                                  <input
                                    type="text"
                                    value={format.d_mark ?? ""}
                                    name="d_mark"
                                    onChange={(e) => handleFormatChange(format.id, e)}
                                    className="border border-[#0000001F] rounded-[4px] h-[36px] w-full max-w-[414px] px-3 text-[14px] text-center focus:outline-none focus:border-[#228B22]"
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
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* If exam setups lenght is grater than 0 */}
                    {examSetUps?.length > 0 ? (
                      // Exam setup cards container
                      <div className="space-y-2 overflow-hidden overflow-y-auto scrollbar-hide">
                        {examSetUps.map((setUp) => (
                          // Exam setup card
                          <div key={setUp.id} className="border border-[#0000001F] rounded-[8px] p-4 flex-1 flex flex-col gap-3">
                            {/* Title, edit and delete buttons */}
                            <div className="flex items-center justify-between">
                              {/* Title */}
                              <h1 className="font-semibold text-[18px]">{`${getExamName(setUp.exam_type_id, examTypes)} / (${getGradingSystemName(setUp.grading_system_id, gradingSystems) || 'No grading system'})`}</h1>

                              {/* Action buttons container */}
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
                                  onClick={() => handleDeleteSetUp(setUp.id)}
                                  className="flex items-center gap-1 border border-[#FF00001A] rounded-[6px] h-[39px] px-4 bg-[#FF00001A] text-[#FF0000] text-[14px]">
                                  <Trash2 className="size-[14px]" />
                                  Delete
                                </button>
                              </div>
                            </div>

                            {/* Exam setup's formats table */}
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
                                    <tr key={format.id ?? format.subject_id} className={`border-b border-[#0000001F] ${!format.is_active && 'text-zinc-400'}`}>
                                      <td className="font-normal text-[14px] py-[10px] px-2 text-center">{index + 1}</td>
                                      <td className="font-normal text-[14px] py-[10px] px-2 text-left">{getSubjectName(format.subject_id)}</td>
                                      <td className="font-normal text-[14px] py-[10px] px-2 text-left">
                                        {format.is_active ? format.date : '-'}

                                      </td>
                                      <td className="font-normal text-[14px] py-[10px] px-2 text-center">
                                        {format.is_active ? format.start_time : '-'}
                                      </td>
                                      <td className="font-normal text-[14px] py-[10px] px-2 text-center">
                                        {format.is_active ? format.end_time : '-'}
                                      </td>
                                      <td className="font-normal text-[14px] py-[10px] px-2 text-center">
                                        {format.is_active ? `${format.duration} min` : '-'}
                                      </td>
                                      <td className="font-normal text-[14px] py-[10px] px-2 text-center">
                                        {format.is_active ? format.max_mark : '-'}
                                      </td>
                                      <td className="font-normal text-[14px] py-[10px] px-2 text-center">
                                        {format.is_active ? format.pass_mark : '-'}
                                      </td>
                                      <td className="font-normal text-[14px] py-[10px] px-2 text-center">
                                        {format.is_active ? format.d_mark : '-'}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // If no exam setups found,
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
    </>
  );
}
