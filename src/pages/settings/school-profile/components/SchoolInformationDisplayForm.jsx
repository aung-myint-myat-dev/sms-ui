import { Check, Pencil, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { TextInput } from "./TextInput";
import { LogoImageUpload } from "./LogoImageUpload";

export function SchoolInformationDisplayForm({
  data,
  onUpdate,
  className
}) {
  const emptyErrors = {
    id: '',
    school_name: '',
    type_of_institution: '',
    branch: '',
    established_year: '',
    website_url: '',
    logo_image: '',
  }
  const [errors, setErrors] = useState(emptyErrors)
  const [formData, setFormData] = useState({})
  const [disableForm, setDisabaleForm] = useState(true)
  const [isEdit, setIsEdit] = useState(false)
  const [previewLogo, setPreviewLogo] = useState('')

  const handleEdit = () => {
    setIsEdit(true)
    setDisabaleForm(false)
  }

  const handleCancelEdit = () => {
    setIsEdit(false)
    setErrors(emptyErrors)
    setDisabaleForm(true)
    setFormData(data ?? {})
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUpload = (e) => {
    const { name, files } = e.target
    if (files) {
      setPreviewLogo(URL.createObjectURL(files[0]))
      setFormData((prev) => ({
        ...prev,
        [name]: files[0]
      }))
    }
  }

  const cancelLogoUpload = () => {
    setPreviewLogo('')
    setFormData((prev) => ({
      ...prev,
      logo_image: data.logo_image,
    }))
  }

  const validate = (form) => {
    const newErrors = {}

    if(!form.school_name.trim()) {
      newErrors.school_name = "School Name is required."
    }

    if(!form.type_of_institution.trim()) {
      newErrors.type_of_institution = "School Name is required."
    }

    if(!form.branch.trim()) {
      newErrors.branch = "School Name is required."
    }

    if(!form.established_year.trim()) {
      newErrors.established_year = "School Name is required."
    }

    if(!form.website_url.trim()) {
      newErrors.website_url = "School Name is required."
    }

    if(!form.logo_image.trim()) {
      newErrors.logo_image = "School Name is required."
    }

    setErrors({
      ...emptyErrors,
      ...newErrors,
    })

    return Object.keys(newErrors).length === 0 
  }

  const submitForm = () => {
    if(!validate(formData)) {return}
    onUpdate(formData)
    handleCancelEdit()
  }

  useEffect(() => {
    if (isEdit) {
      setIsEdit(false)
    }
    setFormData(data)
  }, [data])

  return (
    <div className={`mt-4 flex flex-col bg-white gap-2 w-full p-3 border border-[#0000004D] rounded-[10px] ${className}`}>
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-[500] text-[#000000]">{isEdit ? 'Update School Information' : 'School Information'}</h2>

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
            name="school_name"
            onChange={handleChange}
            disabled={disableForm}
            value={formData?.school_name}
            label="School Name"
            error={errors?.school_name}
          />

          <TextInput
            name="type_of_institution"
            onChange={handleChange}
            disabled={disableForm}
            value={formData?.type_of_institution}
            label="Type of Institution"
            error={errors?.type_of_institution}
          />

          <TextInput
            name="branch"
            onChange={handleChange}
            disabled={disableForm}
            value={formData?.branch}
            label="Branch"
            error={errors?.branch}
          />

          {/* Logo Center Design */}
          {/* <div className="col-span-3 flex items-center gap-6">
            <div className="h-full flex-1">
              <TextInput
                name="established_year"
                onChange={handleChange}
                disabled={disableForm}
                value={formData?.established_year}
                label="Established Year"
              />
            </div>

            <div className="w-[49px] aspect-square overflow-hidden self-end rounded-md">
              <img src={formData?.logo_image} alt="Branch Logo" className="size-full object-cover" />
            </div>

            <div className="h-full flex-1">
              <TextInput
                name="website_url"
                onChange={handleChange}
                disabled={disableForm}
                value={formData?.website_url}
                label="Website URL"
              />
            </div>
          </div> */}

          <TextInput
            name="established_year"
            onChange={handleChange}
            disabled={disableForm}
            value={formData?.established_year}
            label="Established Year"
            error={errors?.established_year}
          />

          <TextInput
            name="website_url"
            onChange={handleChange}
            disabled={disableForm}
            value={formData?.website_url}
            label="Website URL"
            error={errors?.website_url}
          />

          {/* School Logo */}
          <div className="relative flex gap-3 items-start justify-center">
            {!isEdit && (
              <h2 className="absolute inset-0 font-normal text-[14px]">School Logo</h2>
            )}

            {previewLogo ? (
              <div className="relative size-[90px] min-h-0 overflow-hidden border border-zinc-300 rounded-md flex items-center justify-center">
                <button onClick={cancelLogoUpload} className="absolute top-0 right-0 p-1.5 bg-red-500 rounded-bl-md text-white font-semibold cursor-pointer">
                  <X className="size-4" />
                </button>
                <div className="size-24 overflow-hidden rounded-md">
                  <img
                    src={previewLogo}
                    alt="Logo Preview"
                    className="size-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="size-[90px] bg-[#F1F1F1 rounded-[5px] overflow-hidden">
                <img src={formData?.logo_image} className="size-full object-cover" />
              </div>

            )}

            {isEdit && (
              <div className="flex-1 h-full">
                <LogoImageUpload error={errors?.logo_image} size={'size-6'} name="logo_image" onChange={handleUpload} label="Upload School Logo" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  )
}