import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServerCog, UsersRound } from "lucide-react";
// import { SettingRightSidebar } from "../../../components/SettingRightSidebar";
import { POLICY_TYPE_OPTIONS } from "./constants/policyConstants";
import { usePolicies } from "./hooks/usePolicies";
import { splitPoliciesByType } from "./utils/policyUtils";
import { Button } from "./components/ui/Button";
import {
  Modal,
  ModalAction,
  ModalContent,
  ModalTitle,
} from "./components/ui/Modal";
import { EmptyPolicies } from "./components/EmptyPolicies";
import { PoliciesContainer } from "./components/PoliciesContainer";
import { PolicyCard } from "./components/PolicyCard";
import { PolicyTypeRadio } from "./components/PolicyTypeRadio";
import { SettingRightSidebar } from "../../components/SettingRightSidebar";

export function Policies() {
  const [showPolicyRadio, setShowPolicyRadio] = useState(false);
  const [selectedPolicyType, setSelectedPolicyType] = useState("");
  const navigate = useNavigate();
  const {
    policies,
    deletePolicy,
    setDeletePolicy,
    isLoading,
    isDeleting,
    error,
    fetchPolicies,
    deleteSelectedPolicy,
  } = usePolicies();
  const { schoolPolicies, appPolicies } = splitPoliciesByType(policies);

  const closePolicyTypeModal = () => {
    setShowPolicyRadio(false);
    setSelectedPolicyType("");
  };

  const policyCards = (items) => items.map((policy) => (
    <PolicyCard
      key={policy.id}
      id={policy.id}
      type={policy.type}
      title={policy.title}
      description={policy.description}
      onDelete={() => setDeletePolicy(policy)}
    />
  ));

  return (
    <div className="p-6 h-full flex flex-col font-roboto">
      <div className="border-b border-[#D9D9D980] pb-1 flex items-center justify-between">
        <h2 className="font-roboto font-semibold text-[18px]">Setting / Policies</h2>
        <Button onClick={() => setShowPolicyRadio(true)}>Create Policy</Button>
      </div>

      <div className="flex gap-4 mt-4 h-full">
        <div className="w-full flex items-start gap-4">
          <PoliciesContainer title="School Policies">
            {isLoading ? (
              <p className="text-sm text-gray-500">Loading policies...</p>
            ) : schoolPolicies.length > 0 ? (
              <div className="space-y-2 overflow-hidden overflow-y-auto h-full scrollbar-hide">
                {policyCards(schoolPolicies)}
              </div>
            ) : (
              <EmptyPolicies icon={UsersRound} placeholder="No school policies here." />
            )}
          </PoliciesContainer>

          <PoliciesContainer title="App Policies">
            {isLoading ? (
              <p className="text-sm text-gray-500">Loading policies...</p>
            ) : appPolicies.length > 0 ? (
              <div className="overflow-hidden overflow-y-auto h-full scrollbar-hide space-y-2">
                {policyCards(appPolicies)}
              </div>
            ) : (
              <EmptyPolicies icon={ServerCog} placeholder="No app policies here." />
            )}
          </PoliciesContainer>
        </div>
        <SettingRightSidebar />
      </div>

      {error && (
        <div className="mt-2 flex items-center justify-between text-sm text-red-600" role="alert">
          <span>{error}</span>
          <button type="button" onClick={fetchPolicies} className="underline">Retry</button>
        </div>
      )}

      <Modal onClose={closePolicyTypeModal} open={showPolicyRadio}>
        <ModalContent>
          <ModalTitle>Create Policies</ModalTitle>
          <div className="mt-4 flex gap-3">
            {POLICY_TYPE_OPTIONS.map((option) => (
              <PolicyTypeRadio
                key={option.value}
                name="type"
                value={option.value}
                label={option.label}
                checked={selectedPolicyType === option.value}
                onChange={(event) => setSelectedPolicyType(event.target.value)}
              />
            ))}
          </div>
          <ModalAction>
            <Button variant="outline" onClick={closePolicyTypeModal}>Cancel</Button>
            <Button
              onClick={() => navigate(`/settings/policies/${selectedPolicyType}/create`)}
              disabled={!selectedPolicyType}
            >
              Next
            </Button>
          </ModalAction>
        </ModalContent>
      </Modal>

      <Modal open={Boolean(deletePolicy)} onClose={() => setDeletePolicy(null)}>
        <ModalContent className="max-w-sm">
          <ModalTitle className="text-center">
            Are you sure want to delete <br />
            <span className="text-red-500">{deletePolicy?.title}</span> ?.
          </ModalTitle>
          {error && <p className="pt-3 text-sm text-red-600" role="alert">{error}</p>}
          <ModalAction>
            <Button onClick={() => setDeletePolicy(null)} variant="outline">Cancel</Button>
            <Button
              onClick={deleteSelectedPolicy}
              variant="danger"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Confirm"}
            </Button>
          </ModalAction>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Policies;
