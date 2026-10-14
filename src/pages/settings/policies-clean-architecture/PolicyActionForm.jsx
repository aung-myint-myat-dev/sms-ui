import { ArrowLeft } from "lucide-react";
import {
  DEFAULT_POLICY_DESCRIPTION,
  DESCRIPTION_TOOLBAR_BUTTONS,
} from "./constants/policyConstants";
import { Button } from "./components/ui/Button";
import { usePolicyForm } from "./hooks/usePolicyForm";
import { getPolicyTypeLabel } from "./utils/policyUtils";

export function PolicyActionForm() {
  const {
    type,
    formData,
    errors,
    isUpdateMode,
    isLoading,
    isSubmitting,
    requestError,
    handleChange,
    submitForm,
    navigate,
  } = usePolicyForm();
  const modeLabel = `${isUpdateMode ? "Update" : "Create"} ${getPolicyTypeLabel(type)} Policies`;

  if (isLoading) {
    return (
      <div className="p-6 h-full w-full font-roboto" role="status">
        Loading policy...
      </div>
    );
  }

  return (
    <div className="p-6 h-full w-full font-roboto flex flex-col">
      <div className="border-b border-[#D9D9D980] pb-1 flex items-center justify-between">
        <h2 className="font-roboto font-semibold text-[18px] flex items-center gap-3">
          <button
            type="button"
            aria-label="Go back"
            className="size-[24px]"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="size-full" />
          </button>
          Setting / Policies
        </h2>
      </div>

      <div className="mt-4 w-full h-full border border-[#D9D9D9] rounded-[10px] px-4 py-6 flex flex-col">
        <h2 className="text-[16px] font-semibold text-[#228B22] leading-none mb-6">
          {modeLabel}
        </h2>

        <div className="space-y-6 flex-1 flex flex-col h-full">
          <div className="space-y-2">
            <label htmlFor="policy-title" className="block text-[15px] font-semibold text-[#1F1F1F]">
              Title <span className="text-[#D93025]">*</span>
            </label>
            <input
              id="policy-title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter policy title"
              aria-invalid={Boolean(errors.title)}
              className="w-full h-[42px] rounded-[4px] border border-[#D9D9D9] bg-transparent px-3 text-[15px] text-[#333333] placeholder:text-[#7C7C7C] outline-none focus:border-[#228B22]"
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
          </div>

          <div className="space-y-2 flex-1 flex flex-col">
            <label htmlFor="policy-description" className="block text-[15px] font-semibold text-[#1F1F1F]">
              Description <span className="text-[#D93025]">*</span>
            </label>
            <div className="border border-[#D9D9D9] rounded-[4px] h-full overflow-hidden">
              <div className="flex items-center gap-4 h-[46px] px-3 border-b border-[#D9D9D9] bg-[#E6E6E64F] text-[15px] text-[#000000]">
                <div className="flex items-center gap-4 text-[16px] font-bold ml-1">
                  {DESCRIPTION_TOOLBAR_BUTTONS.map((button) => (
                    <button
                      key={button.type}
                      type="button"
                      className={`cursor-pointer ${button.className}`}
                      aria-label={button.label}
                    >
                      {button.label}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                id="policy-description"
                placeholder={DEFAULT_POLICY_DESCRIPTION}
                value={formData.description}
                onChange={handleChange}
                name="description"
                aria-invalid={Boolean(errors.description)}
                className="w-full h-full max-h-[437px] resize-none border-0 bg-transparent px-4 py-3 text-[15px] leading-7 text-[#1F1F1F] outline-none"
              />
            </div>
            {errors.description && (
              <p className="text-xs text-red-500">{errors.description}</p>
            )}
          </div>

          {requestError && <p className="text-sm text-red-600" role="alert">{requestError}</p>}

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate(-1)}
              className="min-w-[110px]"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={submitForm}
              size="lg"
              className="min-w-[110px] bg-[#228B22] hover:bg-[#1c741c] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : isUpdateMode ? "Update" : "Confirm"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PolicyActionForm;
