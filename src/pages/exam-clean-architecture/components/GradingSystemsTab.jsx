import { GraduationCap, Pencil, Plus, Save, Trash2 } from "lucide-react";
import { TABS } from "../constants/examConstants";
import { isRangeOverlapping } from "../utils/validation";

export function GradingSystemsTab(props) {
  const {
    selectedTab,
    showGradingSystemActionForm,
    handleCreateGradingSystem,
    gradingSystemForm,
    setGradingSystemForm,
    handleChange,
    handleCloseGradingSystemActionForm,
    editingGradingSystem,
    handleUpdateGradingSystem,
    handleSaveGradingSystem,
    handleRangeChange,
    isRangeIncomplete,
    handleAddRange,
    gradingSystems,
    allExamSetUps,
    handleEditGradingSystem,
    handleDeleteGradingSystem,
  } = props;

  return (
    <>
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
                        onChange={(e) => {
                          handleChange(e, setGradingSystemForm);
                          setGradingSystemForm((prev) => ({
                            ...prev,
                            pass_mark: ""
                          }))
                        }}
                        placeholder="Enter exam maximum marks ..."
                        id="max_mark"
                        type="number"
                        min={0}
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
                        type="number"
                        min={0}
                        max={gradingSystemForm?.max_mark ?? 400}
                        disabled={!String(gradingSystemForm.max_mark).trim() || Number(gradingSystemForm.max_mark) === 0}
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
                              <td className="font-normal text-[14px] py-[10px] px-2 text-center">{index + 1}</td>
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
                                  type="number"
                                  value={range.from ?? ""}
                                  name="from"
                                  onChange={(e) => handleRangeChange(range.id, e)}
                                  placeholder="80"
                                  min={0}
                                  max={gradingSystemForm.max_mark ?? 400}
                                  className={`border ${isRangeOverlapping(range, gradingSystemForm.ranges, gradingSystemForm.max_mark, gradingSystemForm.pass_mark) ? 'border-red-500' : 'border-[#0000001F] focus:border-[#228B22]'} rounded-[4px] h-[36px] w-full max-w-[414px] px-3 text-[14px] focus:outline-none`}
                                />
                              </td>
                              <td className="font-normal text-[14px] py-[10px] px-2 text-left">
                                <input
                                  type="number"
                                  value={range.to ?? ""}
                                  name="to"
                                  onChange={(e) => handleRangeChange(range.id, e)}
                                  placeholder="100"
                                  min={0}
                                  max={gradingSystemForm.max_mark ?? 400}
                                  className={`border ${isRangeOverlapping(range, gradingSystemForm.ranges, gradingSystemForm.max_mark, gradingSystemForm.pass_mark) ? 'border-red-500' : 'border-[#0000001F] focus:border-[#228B22]'} rounded-[4px] h-[36px] w-full max-w-[414px] px-3 text-[14px] focus:outline-none `}
                                />
                              </td>
                              <td>
                                {index === gradingSystemForm.ranges.length - 1 && (
                                  <button
                                    onClick={handleAddRange}
                                    disabled={isRangeIncomplete}
                                    className={`size-[32.5px] cursor-pointer text-white rounded-full flex items-center justify-center ${isRangeIncomplete ? 'bg-[#228b2292]' : 'bg-[#228B22]'}`}>
                                    <Plus />
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
                    {gradingSystems?.map((grading) => (
                      <div key={grading?.id} className="border border-[#0000001F] rounded-[8px] pt-4 pb-2 px-4">
                        {/* Card Title & Action Buttons */}
                        <div className="flex items-center">
                          <div className="flex flex-col gap-1 flex-1">
                            <h2 className="font-semibold text-[18px]">{grading?.name}</h2>
                            <p className="text-[12px] text-[#483939CC]">Maximum Mark - <span className="text-green-700">{grading?.max_mark}</span> / Pass Mark - <span className="text-red-700">{grading?.pass_mark}</span></p>
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
                              onClick={() => handleDeleteGradingSystem(grading?.id, allExamSetUps)}
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
                              {grading?.ranges.map((range) => (
                                <tr key={range?.id} className="border-b border-[#0000001F]">
                                  <td className="font-normal text-[14px] py-[10px] px-2 text-center">{range?.id}</td>
                                  <td className="font-normal text-[14px] py-[10px] px-2 text-left">{range?.grading}</td>
                                  <td className="font-normal text-[14px] py-[10px] px-2 text-center">{range?.from}</td>
                                  <td className="font-normal text-[14px] py-[10px] px-2 text-center">{range?.to}</td>
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
    </>
  );
}
