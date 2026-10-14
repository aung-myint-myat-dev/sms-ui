import { useState } from "react";
import { TABS } from "./constants/examConstants";
import { ExamSetupsTab } from "./components/ExamSetupsTab";
import { ExamTypesTab } from "./components/ExamTypesTab";
import { GradingSystemsTab } from "./components/GradingSystemsTab";
import { StudentMarksTab } from "./components/StudentMarksTab";
import { useExamSetups } from "./hooks/useExamSetups";
import { useExamTypes } from "./hooks/useExamTypes";
import { useGradingSystems } from "./hooks/useGradingSystems";
import { useStudentMarks } from "./hooks/useStudentMarks";

export function Exams() {
  const [selectedTab, setSelectedTab] = useState("student-marks");
  const examSetups = useExamSetups();
  const gradingSystems = useGradingSystems();
  const examTypes = useExamTypes();
  const studentMarks = useStudentMarks({
    examTypes: examTypes.examTypes,
    allExamSetUps: examSetups.allExamSetUps,
  });

  const handleChange = (event, setForm, setErrors) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors?.((previous) => ({ ...previous, [name]: "" }));
  };

  const handleToggleCheck = (event, setForm) => {
    const { name, checked } = event.target;
    setForm((previous) => ({ ...previous, [name]: checked }));
  };

  return (
    <div className="w-full h-full overflow-hidden py-3 px-6 font-roboto flex flex-col gap-2">
      <div className="flex items-center gap-3 border-b pb-1 border-[#D9D9D980]">
        <div className="size-[55px] bg-[#228B22] text-white flex items-center justify-center rounded-[10px]">
          Icon
        </div>
        <div>
          <h2 className="font-semibold text-[18px]">Exams</h2>
          <p className="font-normal text-[12px] text-[#483939CC]">
            View student marks and exam results
          </p>
        </div>
      </div>

      <div className="inline-flex w-max items-center gap-1 rounded-lg bg-[#228B221A] p-1">
        {TABS.map((tab) => {
          const isActive = tab.value === selectedTab;
          return (
            <button
              onClick={() => setSelectedTab(tab.value)}
              key={tab.id}
              type="button"
              className={`flex h-[34px] items-center justify-center rounded-md ${isActive ? "bg-white" : "text-[#00000099]"} px-4 text-[14px] font-semibold leading-none whitespace-nowrap cursor-pointer transition-colors`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-hidden">
        <StudentMarksTab {...studentMarks} examTypes={examTypes.examTypes} selectedTab={selectedTab} />
        <ExamTypesTab
          {...examTypes}
          allExamSetUps={examSetups.allExamSetUps}
          handleChange={handleChange}
          handleToggleCheck={handleToggleCheck}
          selectedTab={selectedTab}
        />
        <GradingSystemsTab
          {...gradingSystems}
          allExamSetUps={examSetups.allExamSetUps}
          handleChange={handleChange}
          selectedTab={selectedTab}
        />
        <ExamSetupsTab
          {...examSetups}
          examTypes={examTypes.examTypes}
          gradingSystems={gradingSystems.gradingSystems}
          handleChange={handleChange}
          selectedTab={selectedTab}
        />
      </div>
    </div>
  );
}

export default Exams;
