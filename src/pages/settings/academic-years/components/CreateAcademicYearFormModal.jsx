import { Send, X } from "lucide-react";
import { useState } from "react";
import { AcademicYearDateInput } from "./AcademicDateInput";
import { Button } from "../../payments/components/ui/Button";
import { YearPicker } from "../../../../components/YearPicker";
import { AcademicYearInput } from "./AcademicYearInput";
import { DatePicker } from "./DatePicker";

export function CreateAcademicYearFormModal({
  open,
  onClose,
}) {

  const emptyForm = {
    academic_year: "",
    school_opening_date: "",
    school_closing_date: "",
    registration_open_date: "",
    registration_close_date: "",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [yearPicker, setYearPicker] = useState(null);
  const [datePicker, setDatePicker] = useState(null);

  const datePlaceholder = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric"
  })

  const handleYearConfirm = ({ name, value }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: String(value),
    }));
    setYearPicker(null);
  };

  const handleYearPick = (name, value) => {
    if (yearPicker) {
      setYearPicker(null)
    }
    setDatePicker(null)
    setYearPicker({ name, value })
  }

  const handleDatePick = (name, value) => {
    if (datePicker) {
      setDatePicker(null)
    }
    setYearPicker(null)
    setDatePicker({
      name,
      value,
      fromYear: startYear,
      toYear: startYear + 1,
    })
  }

  const handleDateConfirm = ({ name, value }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: String(value)
    }))
  }

  const handleCloseCreateForm = () => {
    setYearPicker(null)
    setDatePicker(null)
    setFormData(emptyForm)
    onClose()
  }

  const currentYear = new Date().getFullYear();
  const startYear = formData.academic_year ? Number(formData.academic_year.split('-')[0].trim()) : Number(currentYear)

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-start w-full h-full z-10 bg-zinc-950/50 p-2">
      <button
        type="button"
        onClick={handleCloseCreateForm}
        aria-label="Close modal"
        className="flex-1 h-full"
      />

      <div className="h-full flex items-start">
        {/* Year Picker */}
        <div className="flex flex-col flex-1 h-full w-[350px]">
          <button
            type="button"
            onClick={handleCloseCreateForm}
            className="flex-1"
            aria-label="Close modal"
          />

          <div className="w-full pe-2">
            <YearPicker
              open={yearPicker}
              name={yearPicker?.name}
              value={yearPicker?.value}
              onConfirm={handleYearConfirm}
              onClose={() => setYearPicker(null)}
            />

            <DatePicker open={datePicker}
              fromYear={datePicker?.fromYear}
              toYear={datePicker?.toYear}
              name={datePicker?.name}
              value={datePicker?.value}
              onClose={() => setDatePicker(null)}
              onConfirm={handleDateConfirm}
            />
          </div>
        </div>

        {/* Form */}
        <div className="w-[505px] bg-white h-full rounded-[15px] p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-semibold">
              Create Academic Year
            </h2>

            <button type="button" onClick={handleCloseCreateForm}>
              <X className="size-[16px]" />
            </button>
          </div>

          <div className="flex-1 space-y-3">
            <AcademicYearInput
              name="academic_year"
              value={formData.academic_year}
              label="Select Academic Year"
              onChoose={() => handleYearPick('academic_year', formData.academic_year)}
            />

            <AcademicYearDateInput
              disabled={!formData.academic_year}
              placeholder={datePlaceholder}
              name="school_opening_date"
              value={formData.school_opening_date}
              label="School Opening Date"
              onChoose={() => handleDatePick('school_opening_date', formData.school_opening_date)}
            />

            <AcademicYearDateInput
              disabled={!formData.academic_year}
              placeholder={datePlaceholder}
              name="school_closing_date"
              value={formData.school_closing_date}
              label="School Closing Date"
              onChoose={() => handleDatePick('school_closing_date', formData.school_closing_date)}
            />

            <AcademicYearDateInput
              disabled={!formData.academic_year}
              placeholder={datePlaceholder}
              name="registration_open_date"
              value={formData.registration_open_date}
              label="Registration Open Date"
              onChoose={() => handleDatePick('registration_open_date', formData.registration_open_date)}
            />

            <AcademicYearDateInput
              disabled={!formData.academic_year}
              placeholder={datePlaceholder}
              name="registration_close_date"
              value={formData.registration_close_date}
              label="Registration Close Date"
              onChoose={() => handleDatePick('registration_close_date', formData.registration_close_date)}
            />
          </div>

          <div className="flex items-center justify-end">
            <div className="flex items-center gap-2">
              <Button onClick={handleCloseCreateForm} variant="outline">
                Cancel
              </Button>

              <Button icon={Send} onClick={() => console.log(formData)}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}