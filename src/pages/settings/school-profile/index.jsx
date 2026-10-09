import { useEffect, useRef, useState } from "react"
import { SettingRightSidebar } from "../../components/SettingRightSidebar"
import { BranchImage } from "./components/BranchImage"
import { BranchActionForm } from "./components/BranchActionForm"
import { fakeBranches } from "./data"
import { SchoolInformationDisplayForm } from "./components/SchoolInformationDisplayForm"
import { ContactInformationDisplayForm } from "./components/ContactInformationDisplayForm"
import { DeleteConfirmationDialog } from "./components/DeleteConfirmationDialog"
import { Plus } from "lucide-react"

export function SchoolProfile() {
  const [branches, setBranches] = useState([])
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [deletingBranch, setDeletingBranch] = useState(null)
  const [showActionForm, setShowActionForm] = useState(false)
  const itemRefs = useRef({})

  const selectedSchoolInformation = {
    id: selectedBranch?.id,
    school_name: selectedBranch?.school_name,
    type_of_institution: selectedBranch?.type_of_institution,
    branch: selectedBranch?.branch,
    established_year: selectedBranch?.established_year,
    website_url: selectedBranch?.website_url,
    logo_image: selectedBranch?.logo_image,
  }

  const selectedContactInformation = {
    id: selectedBranch?.id,
    phone_number_1: selectedBranch?.phone_number_1,
    phone_number_2: selectedBranch?.phone_number_2,
    email_address: selectedBranch?.email_address,
    campus_address: selectedBranch?.campus_address,
  }

  const handleShowActionForm = () => {
    setShowActionForm(true)
    setSelectedBranch(null)
  }

  const handleDelteBranch = (branch) => {
    setDeletingBranch(branch)
  }

  const handleCloseDeleteDialog = () => {
    setDeletingBranch(null)
  }

  const handleCloseActionForm = () => {
    setShowActionForm(false)
    setSelectedBranch(null)
    setIsEdit(false)
  }

  const handleSelectBranch = (branch) => {
    setSelectedBranch(branch)
    itemRefs.current[branch.id]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }

  const updateSchoolInformation = (data) => {
    Object.assign(selectedSchoolInformation, data)
  }

  const updateContactInformation = (data) => {
    Object.assign(selectedContactInformation, data)
  }

  const delteBranch = (branch) => {
    const newbranches = branches.filter((item) => item.id !== branch.id)
    setBranches(newbranches)
    const mainBranch = newbranches.find((item) => item.is_main_branch === true)
    if (deletingBranch.id === selectedBranch.id) {
      handleSelectBranch(mainBranch)
    }
    handleCloseDeleteDialog()
  }

  useEffect(() => {
    setBranches(fakeBranches)
    setSelectedBranch(fakeBranches[0])
  }, [showActionForm])

  return (
    <div className="p-6 h-full w-full flex flex-col font-roboto">
      {/* Heading */}
      <div className="border-b border-[#D9D9D980] pb-1 flex items-center justify-between">
        <h2 className="font-roboto font-semibold text-[18px]">
          Setting / School Profile
        </h2>
      </div>

      {/* Main and Right Sidebar Container */}
      <div className="flex gap-4 mt-4 h-full w-full overflow-hidden overflow-y-auto">

        {showActionForm ? (
          // Branch Create Form
          <BranchActionForm closeForm={handleCloseActionForm} />
        ) : (

          // Main Container
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto overflow-hidden p-4 border border-[#0000004D] rounded-lg bg-zinc-50 scrollbar-hide">

            {/* Branches */}
            <div className="relative h-[170px] w-full rounded-[18px] border border-[#0000004D] p-2 flex items-center gap-4">

              {/* Branch Images - X Scroll */}
              <div className="scrollbar-hide flex-1 flex gap-4 min-w-0 h-full overflow-x-auto overflow-y-hidden p-2 pr-18">
                <div className="flex items-center gap-4 h-full w-max">
                  {branches.map((branch) => (
                    <BranchImage
                      onDelete={() => handleDelteBranch(branch)}
                      ref={(el) => {
                        itemRefs.current[String(branch.id)] = el
                      }}
                      selectBranch={() => handleSelectBranch(branch)}
                      key={branch.id}
                      url={branch.branch_image}
                      isActive={branch.id === selectedBranch?.id}
                      canDelete={!branch.is_main_branch} />
                  ))}
                </div>

              </div>
              {/* Add Branch Button */}
              <button onClick={handleShowActionForm} className="absolute size-12 bottom-4 right-4 border z-50 border-dashed bg-zinc-100 border-[#0000004D] rounded-[10px] text-[16px] font-semibold text-[#00000080] flex items-center justify-center">
                <Plus className="size-6" />
              </button>
            </div>

            <SchoolInformationDisplayForm
              data={selectedSchoolInformation}
              onUpdate={updateSchoolInformation}
            />

            <ContactInformationDisplayForm
              data={selectedContactInformation}
              onUpdate={updateContactInformation}
            />
          </div>
        )}

        <SettingRightSidebar />
      </div >

      <DeleteConfirmationDialog title="Delete Branch" description="Are you sure want to delete this branch. This action cannot be reverse." onClose={handleCloseDeleteDialog} open={deletingBranch} onConfirm={() => delteBranch(deletingBranch)} loading={false} />
    </div >
  )
}