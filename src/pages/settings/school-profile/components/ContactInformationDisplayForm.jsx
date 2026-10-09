import { Check, Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";
import { TextInput } from "./TextInput";
import { fakeBranches } from "../data";

export function ContactInformationDisplayForm({
  data,
  onUpdate,
  className
}) {
  const emptyErrors = {
    phone_number_1: '',
    phone_number_2: '',
    email_address: '',
    campus_address: '',
  }
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState(emptyErrors)
  const [disableForm, setDisabaleForm] = useState(true)
  const [isEdit, setIsEdit] = useState(false)

  const handleEdit = () => {
    setIsEdit(true)
    setDisabaleForm(false)
  }

  const handleCancelEdit = () => {
    setIsEdit(false)
    setDisabaleForm(true)
    setFormData(data ?? {})
    setErrors(emptyErrors)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const validate = (form) => {
    const newErrors = {}

    if (!form.email_address.trim()) {
      newErrors.email_address = "Email address is required"
    }

    if (!form.phone_number_1.trim()) {
      newErrors.phone_number_1 = "Email address is required"
    }

    if (!form.phone_number_2.trim()) {
      newErrors.phone_number_2 = "Email address is required"
    }

    if (!form.campus_address.trim()) {
      newErrors.campus_address = "Email address is required"
    }

    setErrors({
      ...emptyErrors,
      ...newErrors,
    })

    return Object.keys(errors).length === 0
  }

  const submitForm = () => {
    if (!validate(formData)) { return }
    onUpdate(formData)
    handleCancelEdit()
  }

  useEffect(() => {
    if(isEdit) {
      setIsEdit(false)
    }
    setFormData(data)
  }, [data])

  return (
    <div className={`flex flex-col bg-white gap-2 w-full p-3 border border-[#0000004D] rounded-[10px] ${className}`}>
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-[500] text-[#000000]">{isEdit ? 'Update Contact Information' : 'Contact Information'}</h2>

        {/* Edit Button */}
        {isEdit ? (
          <div className="flex items-center gap-2">
            <button onClick={handleCancelEdit} className="border cursor-pointer size-[32px] border-[#306E0099] rounded-[4px] flex items-center justify-center">
              <X className="size-[14px] text-[#306E00]" />
            </button>

            <button onClick={submitForm} className="border cursor-pointer size-[32px] border-[#306E0099] rounded-[4px] flex items-center justify-center">
              <Check className="size-[14px] text-[#306E00]" />
            </button>

          </div>
        ) : (
          <button onClick={handleEdit} className="border cursor-pointer size-[32px] border-[#306E0099] rounded-[4px] flex items-center justify-center">
            <Pencil className="size-[14px] text-[#306E00]" />
          </button>
        )}
      </div>


      <div className="flex-1">
        <div className="grid grid-cols-3 gap-6 px-6">
          <TextInput
            error={errors.email_address}
            name="email_address"
            onChange={handleChange}
            disabled={disableForm}
            value={formData?.email_address}
            label="Email Address" />

          <TextInput
            error={errors.phone_number_1}
            name="phone_number_1"
            onChange={handleChange}
            disabled={disableForm}
            value={formData?.phone_number_1}
            label="Phone Number 1" />

          <TextInput
            error={errors.phone_number_2}
            name="phone_number_2"
            onChange={handleChange}
            disabled={disableForm}
            value={formData?.phone_number_2}
            label="Phone Number 2"
          />

          <div className="col-span-3">
            <TextInput
              error={errors.campus_address}
              name="campus_address"
              onChange={handleChange}
              disabled={disableForm}
              value={formData?.campus_address}
              label="Campus Address" />
          </div>
        </div>
      </div>
    </div >
  )
}