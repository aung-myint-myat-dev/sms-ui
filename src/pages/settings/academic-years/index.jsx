import { Edit2, PencilIcon, School, SquareText, SquareX } from "lucide-react";
import { SettingRightSidebar } from "../../components/SettingRightSidebar";
import { AcademicYearDetailDisplayForm } from "./components/AcademicYearDetailDisplayFormCard";
import { DisplayCard } from "./components/DisplayCard";
import { TableData, TableHead, TableRow } from "./components/Table";
import { useEffect, useMemo, useState } from "react";
import { fakeAcademicYears } from "./academic-years";
import { AcademicYearStatusBadge } from "./components/AcademicYearStatusBadge";
import { Button } from "../payments/components/ui/Button";
import { CurrentAcademicYearDisplayForm } from "./components/CurrentAcademicYearDisplayForm";
import { CreateAcademicYearFormModal } from "./components/CreateAcademicYearFormModal";

export function AcademicYears() {
  const [academicYears, setAcademicYears] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(null)
  const [formData, setFormData] = useState({})

  const currentAcademicYear = useMemo(() => {
    const activeYear = academicYears?.find((year) => year.status === 'active')
    return activeYear
  }, [academicYears])

  const handleEditAcademicYear = (year) => {
    setIsEdit(true)
    setSelectedAcademicYear(year)
  }

  const handleCancelEditAcademicYear = () => {
    setIsEdit(false)
    setSelectedAcademicYear(null)
  }

  const handleCreateAcademicYear = () => {
    setShowCreateForm(true)
  }

  const closeCreateForm = () => {
    setShowCreateForm(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  useEffect(() => {
    setAcademicYears(fakeAcademicYears)
  }, [])

  useEffect(() => {
    if (currentAcademicYear && !isEdit) {
      setFormData(currentAcademicYear)
    }

    if (selectedAcademicYear && isEdit) {
      setFormData(selectedAcademicYear)
    }
  }, [currentAcademicYear, selectedAcademicYear])

  return (
    <div className="p-6 h-full w-full flex flex-col font-roboto">
      {/* Header */}
      <div className="border-b border-[#D9D9D980] pb-1 flex items-center justify-between">
        <h2 className="font-roboto font-semibold text-[18px]">
          Setting / Academic Years
        </h2>
      </div>

      {/* Main and Right Sidebar Container */}
      <div className="flex gap-4 mt-4 h-full w-full overflow-hidden overflow-y-auto">
        {/* Main */}
        <div className="flex-1 rounded-[10px] border border-[#C4CDC7] h-full space-y-4 bg-zinc-100 py-3 px-4 overflow-hidden overflow-y-auto scrollbar-hide">

          {/* Add Button */}
          <div className="flex justify-end">
            <button onClick={handleCreateAcademicYear} className="h-[32px] w-[146px] rounded-[8px] bg-[#228B22] flex items-center justify-center text-white font-[700] text-[12px]">
              Create Academic Year
            </button>
          </div>

          {/* Current Academic Year */}
          <div className={`border py-4 px-6 flex items-center justify-between rounded-[10px] ${isEdit && 'outline outline-offset-2 outline-[#228B22]'} border-[#C4CDC7]`}>
            {/* Left */}
            <CurrentAcademicYearDisplayForm
              name="academic_year"
              label={isEdit ? 'Edit academic year' : 'Current Academic Year'}
              value={formData.academic_year}
              onChange={handleChange}
            />

            {/* Logo */}
            <div className="size-[50px] rounded-[8px] overflow-hidden">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7BTzVBuyix9HxdRfxQG0QuVYQsSD318utuBHVtJvM7A&s=10" alt="school-logo" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Current Academic Year Detail */}
          <DisplayCard title={isEdit ? 'Edit your acdemic year informations here' : 'Academic Year Details'}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <AcademicYearDetailDisplayForm
                name="school_opening_date"
                value={formData?.school_opening_date}
                onChange={handleChange}
                icon={School}
                isDisable={!isEdit}
                label="School Opening Date"
              />

              <AcademicYearDetailDisplayForm
                name="school_closing _date"
                value={formData?.school_closing_date}
                onChange={handleChange}
                icon={School}
                isDisable={!isEdit}
                label="School Closign Date"
              />

              <AcademicYearDetailDisplayForm
                name="registration_open_date"
                value={formData.registration_open_date}
                onChange={handleChange}
                icon={SquareText}
                isDisable={!isEdit}
                label="Registration Open Date "
              />

              <AcademicYearDetailDisplayForm
                name="registration_close_date"
                value={formData.registration_close_date}
                onChange={handleChange}
                icon={SquareX}
                isDisable={!isEdit}
                label="Registration Close Date"
              />
            </div>

            {isEdit && selectedAcademicYear && (
              <div className="mt-4 flex items-center justify-end">
                <div className="flex items-center gap-3">
                  <Button onClick={handleCancelEditAcademicYear} variant="danger">Cancel</Button>
                  <Button>Save</Button>
                </div>
              </div>
            )}

          </DisplayCard>

          {/* Academic Years Table */}
          <DisplayCard title="Academic Years">
            <div className="border border-[#0000004D] rounded-[8px] w-full overflow-x-auto">
              <table className="w-full min-w-[1100px]">
                <thead>
                  <TableRow>
                    <TableHead>Academic Year</TableHead>
                    <TableHead>School Opening</TableHead>
                    <TableHead>School Closing</TableHead>
                    <TableHead className="text-left">Registration Open</TableHead>
                    <TableHead className="text-left">Registration Close</TableHead>
                    <TableHead>Total Students</TableHead>
                    <TableHead className="text-left">Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>

                </thead>

                <tbody className="h-12">
                  {academicYears?.map((year) => (
                    <TableRow key={year.id}>
                      <TableData>{year.academic_year}</TableData>
                      <TableData>{year.school_opening_date}</TableData>
                      <TableData>{year.school_closing_date}</TableData>
                      <TableData className="text-left">{year.registration_open_date}</TableData>
                      <TableData className="text-left">{year.registration_close_date}</TableData>
                      <TableData>{year.total_students}</TableData>
                      <TableData className="text-left">
                        <AcademicYearStatusBadge status={year.status} />
                      </TableData>
                      <TableData>
                        <div className="flex items-center justify-center">
                          <button onClick={() => handleEditAcademicYear(year)} className="flex items-center justify-center border-[0.5px] border-[#306E0099] rounded-[4px] bg-white size-[22px]">
                            <PencilIcon className="size-[10.04px] text-[#306E00]" />
                          </button>
                        </div>
                      </TableData>
                    </TableRow>
                  ))}
                </tbody>
              </table>
            </div>
          </DisplayCard>
        </div>

        <SettingRightSidebar />
      </div>

      <CreateAcademicYearFormModal open={showCreateForm} onClose={closeCreateForm}/>
    </div>
  )
}