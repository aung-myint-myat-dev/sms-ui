import { Button } from "./components/ui/Button";
import { RightSidebar } from "./components/RigthSidebar";
import {
  Modal,
  ModalAction,
  ModalContent,
  ModalTitle,
} from "./components/ui/Modal";
import { PoliciesContainer } from "./components/PoliciesContainer";
import { ServerCog, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { PolicyRadion } from "./components/PolicyRadio";
import { useNavigate } from "react-router-dom";
import { EmptyPolicies } from "./components/EmptyPolicies";
import { PolicyCard } from "./components/PolicyCard";
import { api } from "../../../lib/api";

export function Policies() {
  const [policies, setPolicies] = useState([])
  const [showPolicyRadio, setShowPolicyRadio] = useState(false)
  const [selectedPolicyType, setSelectedPolicyType] = useState('')
  const [deletePolicy, setDeletePolicy] = useState(null)

  const schoolPolicies = policies?.filter((policy) => policy.type === 'school') ?? []
  const appPolicies = policies?.filter((policy) => policy.type === 'app') ?? []

  const navigate = useNavigate()

  const handleShowPolicyRadioModal = () => {
    setShowPolicyRadio(true)
  }

  const handleClosePolicyRadioModal = () => {
    setShowPolicyRadio(false)
    setSelectedPolicyType('')
  }

  const handlePolicyTypeChange = (e) => {
    setSelectedPolicyType(e.target.value)
  }

  const handleDeltePolicy = (policy) => {
    setDeletePolicy(policy)
  }

  const fetchPolicies = async () => {
    try {
      const res = await api.get('policies')
      const data = res.data.data
      if (data) {
        setPolicies(res.data.data)
      }
    } catch (error) {
      console.log("fetching policies error: ", error)
    }
  }

  const deletePolicyAction = async () => {
    try {
      await api.delete(`policies/${deletePolicy.id}`)
      fetchPolicies();
      setDeletePolicy(null)
    } catch (error) {
      console.log("deleting policy error:", error)
    }
  }


  useEffect(() => {
    fetchPolicies()
  }, [])


  return (
    <div className="p-6 h-full flex flex-col font-roboto">

      {/* Header */}
      <div className="border-b border-[#D9D9D980] pb-1 flex items-center justify-between">
        <h2 className="font-roboto font-semibold text-[18px]">
          Setting / Policies
        </h2>

        <Button onClick={handleShowPolicyRadioModal}>Create Policy</Button>
      </div>

      {/* Main and Right Sidebar */}
      <div className="flex gap-4 mt-4 h-full">

        {/* Main */}
        <div className="w-full flex items-start gap-4">
          <PoliciesContainer title="School Policies" showEditButton={schoolPolicies.length > 0}>
            {schoolPolicies?.length > 0 ? (
              <div className="space-y-2 overflow-hidden overflow-y-auto h-full scrollbar-hide ">
                {schoolPolicies.map((policy) => (
                  <PolicyCard onDelete={() => handleDeltePolicy(policy)} key={policy.id} type={policy.type} title={policy.title} description={policy.description} id={policy.id} />
                ))}
              </div>
            ) : (
              <EmptyPolicies icon={UsersRound} placeholder="No school policies here." />
            )}
          </PoliciesContainer>


          <PoliciesContainer title="App Policies" showEditButton={appPolicies.length > 0}>
            {appPolicies?.length > 0 ? (
              <div className="overflow-hidden overflow-y-auto h-full scrollbar-hide space-y-2">
                {appPolicies.map((policy) => (
                  <PolicyCard onDelete={() => handleDeltePolicy(policy)} key={policy.id} id={policy.id} type={policy.type} title={policy.title} description={policy.description} />
                ))}
              </div>
            ) : (
              <EmptyPolicies icon={ServerCog} placeholder="No app policies here." />
            )}
          </PoliciesContainer>
        </div>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>

      <Modal onClose={handleClosePolicyRadioModal} open={showPolicyRadio}>
        <ModalContent>
          <ModalTitle>Create Policies</ModalTitle>
          <div className="mt-4 flex gap-3">

            <PolicyRadion
              name="type"
              value="school"
              label="School Policies"
              checked={
                selectedPolicyType === "school"
              }
              onChange={handlePolicyTypeChange}
            />

            <PolicyRadion
              name="type"
              value="app"
              label="App Policies"
              checked={
                selectedPolicyType === "app"
              }
              onChange={handlePolicyTypeChange}
            />
          </div>

          <ModalAction>
            <Button
              variant="outline"
              onClick={handleClosePolicyRadioModal}
            >
              Cancel
            </Button>

            <Button
              onClick={() => navigate(`/settings/policies/${selectedPolicyType}/create`)}
              disabled={!selectedPolicyType}
            >
              Next
            </Button>
          </ModalAction>
        </ModalContent>
      </Modal>

      <Modal open={deletePolicy} onClose={() => setDeletePolicy(null)}>
        <ModalContent className="max-w-sm">
          <ModalTitle className='text-center'>Are you sure want to delete <br/> <span className="text-red-500">{deletePolicy?.title}</span> ?.</ModalTitle>
          <ModalAction>
            <Button onClick={() => setDeletePolicy(null)} variant="outline">Cancel</Button>
            <Button onClick={deletePolicyAction} variant="danger">Confirm</Button>
          </ModalAction>
        </ModalContent>
      </Modal>
    </div>
  );
}