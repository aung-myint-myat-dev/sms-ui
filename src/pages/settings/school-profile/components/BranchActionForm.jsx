import { X } from "lucide-react";
import { Button } from "../../payments/components/ui/Button";
import { InformationCard } from "./InformationCard";
import { TextInput } from "./TextInput";
import { LogoImageUpload } from "./LogoImageUpload";
import { useState } from "react";
import { fakeBranches } from "../data";
import { BranchImageUpload } from "./BranchImageUpload";

export function BranchActionForm({ closeForm }) {

  const emptyForm = {
    school_name: '',
    type_of_institution: '',
    branch: '',
    established_year: '',
    website_url: '',
    branch_image: '',
    phone_number_1: '',
    phone_number_2: '',
    email_address: '',
    campus_address: '',
    logo_image: '',
  }

  const emptyErrors = {
    school_name: '',
    type_of_institution: '',
    branch: '',
    established_year: '',
    website_url: '',
    branch_image: '',
    phone_number_1: '',
    phone_number_2: '',
    email_address: '',
    campus_address: '',
    logo_image: '',
  }
  const [formData, setFormData] = useState(emptyForm)
  const [errors, setErrors] = useState(emptyErrors)
  const [previewBranchImage, setPreviewBranchImage] = useState('')
  const [previewLogo, setPreviewLogo] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setErrors((prev) => ({
      ...prev,
      [name]: ''
    }))
  }

  const handleUpload = (e) => {
    const { name, value, files } = e.target

    if (name === "branch_image") {
      setPreviewBranchImage(
        URL.createObjectURL(files[0])
      )
    }

    if (name === "logo_image") {
      setPreviewLogo(
        URL.createObjectURL(files[0])
      )
    }

    setFormData((prev) => ({
      ...prev,
      [name]: files[0]
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }))
  }

  const cancelUpload = (key) => {
    if (key === 'branch_image') {
      setPreviewBranchImage('')
    }

    if (key === 'logo_image') {
      setPreviewLogo('')
    }

    setFormData((prev) => ({
      ...prev,
      [key]: ''
    }))
  }

  const validate = (form) => {
    const newErrors = {};

    if (!form.school_name.trim()) {
      newErrors.school_name = "School name is required.";
    }

    if (!form.type_of_institution.trim()) {
      newErrors.type_of_institution = "Type of institution is required.";
    }

    if (!form.branch.trim()) {
      newErrors.branch = "Branch is required.";
    }

    if (!form.established_year.toString().trim()) {
      newErrors.established_year = "Established year is required.";
    }

    if (!form.website_url.trim()) {
      newErrors.website_url = "Website URL is required.";
    }

    if (!form.phone_number_1.trim()) {
      newErrors.phone_number_1 = "Phone number 1 is required.";
    }

    if (!form.phone_number_2.trim()) {
      newErrors.phone_number_2 = "Phone number 2 is required.";
    }

    if (!form.email_address.trim()) {
      newErrors.email_address = "Email address is required.";
    }

    if (!form.campus_address.trim()) {
      newErrors.campus_address = "Campus address is required.";
    }

    if (!form.branch_image) {
      newErrors.branch_image = "Branch image is required.";
    }

    if (!form.logo_image) {
      newErrors.logo_image = "Logo image is required.";
    }

    setErrors({
      ...emptyErrors,
      ...newErrors,
    });

    return Object.keys(newErrors).length === 0;
  };

  const submitForm = () => {
    if (!validate(formData)) { return }

    const payload = {
      ...formData,
      id: fakeBranches.length + 1,
    }
    fakeBranches.push(payload)
    closeForm()
  }
  return (
    <div className="flex-1 flex flex-col gap-4 overflow-y-auto overflow-hidden p-4 border border-[#0000004D] rounded-lg bg-zinc-50 scrollbar-hide">

      {/* Branch Image Upload & Preview Image */}
      <div className={`h-[170px] w-full rounded-[18px] border border-[#0000004D] p-2 flex items-center gap-4`}>

        {/* Preview Branch Image */}
        {previewBranchImage && (
          <div className="w-[261px] h-full rounded-[10px]">
            <div className="h-full relative overflow-hidden rounded-[10px]">
              <img
                src={previewBranchImage}
                alt="branch-image"
                className="size-full object-cover"
              />
            </div>
          </div>
        )}

        <BranchImageUpload
          error={errors.branch_image}
          name="branch_image"
          onChange={handleUpload}
          label={previewBranchImage ? 'Rechoose Branch Image' : 'Upload Branch Image'}
        />
      </div>

      <InformationCard title="Create branch" isActionForm={true} onClickActionButton={closeForm}>
        <div className="grid grid-cols-3 grid-rows-4 gap-6 px-4">

          {/* School Name Input */}
          <div>
            <TextInput
              name="school_name"
              onChange={handleChange}
              value={formData.school_name}
              label="School Name"
              error={errors.school_name}
            />
          </div>

          {/* Type Of Institution Input */}
          <div>
            <TextInput
              name="type_of_institution"
              onChange={handleChange}
              value={formData.type_of_institution}
              label="Type of Institution"
              error={errors.type_of_institution}
            />
          </div>

          {/* Branch Input */}
          <div>
            <TextInput
              name="branch"
              onChange={handleChange}
              value={formData.branch}
              label="Branch"
              error={errors.branch}
            />
          </div>

          {/* Phone Number 1 Input */}
          <div>
            <TextInput
              name="phone_number_1"
              onChange={handleChange}
              value={formData.phone_number_1}
              label="Phone Number 1"
              error={errors.phone_number_1}
            />
          </div>

          {/* Phone Number 2 Input */}
          <div>
            <TextInput
              name="phone_number_2"
              onChange={handleChange}
              value={formData.phone_number_2}
              label="Phone Number 2"
              error={errors.phone_number_2}
            />
          </div>

          {/* Established Year Input */}
          <div>
            <TextInput
              name="established_year"
              onChange={handleChange}
              value={formData.established_year}
              label="Established Year"
              error={errors.established_year}
            />
          </div>

          {/* Website Url Input */}
          <div>
            <TextInput
              name="website_url"
              onChange={handleChange}
              value={formData.website_url}
              label="Website URL"
              error={errors.website_url}
            />
          </div>

          {/* Email Address Input */}
          <div>
            <TextInput
              name="email_address"
              onChange={handleChange}
              value={formData.email_address}
              label="Email Address"
              error={errors.email_address}
            />
          </div>

          {/* Branch Logo Input */}
          <div className="row-span-2 min-h-0 min-w-0 overflow-hidden">
            {previewLogo ? (
              <div className={`relative h-full w-full min-h-0 overflow-hidden border ${errors.logo_image ? 'border-red-500' : 'border-zinc-300'} rounded-md flex items-center justify-center`}>
                <button
                  type="button"
                  onClick={() => cancelUpload('logo_image')}
                  className="absolute top-0 right-0 py-1.5 px-3 bg-red-500 rounded-bl-md text-white font-semibold cursor-pointer"
                >
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
              <LogoImageUpload
                name="logo_image"
                onChange={handleUpload}
                label="Logo"
                error={errors.logo_image}
              />
            )}
          </div>

          {/* Campus Address Input */}
          <div className="col-span-2">
            <TextInput
              name="campus_address"
              onChange={handleChange}
              value={formData.campus_address}
              label="Campus Address"
              error={errors.campus_address}
            />
          </div>
        </div>

        <div className="text-end mt-4">
          <Button onClick={submitForm} className="w-[151px] h-[38px] bg-[#228B22]">
            Save
          </Button>
        </div>
      </InformationCard>
    </div>

  )
}