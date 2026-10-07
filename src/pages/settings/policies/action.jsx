import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "./components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { policies } from "./data";
import { api } from "../../../lib/api";

const toolbarButtons = [
  { label: "Paragraph", type: "paragraph", className: "font-medium" },
  { label: "B", type: "bold", className: "font-bold" },
  { label: "I", type: "italic", className: "italic" },
  { label: "U", type: "underline", className: "underline" },
  { label: "≡", type: "list", className: "tracking-tight" },
  { label: "☰", type: "list-ol", className: "tracking-tight" },
  { label: "≣", type: "align", className: "tracking-tight" },
];

const defaultDescription = [
  "• Personal Information: Student grades, attendance, health records, and family contact details are kept strictly confidential.",
  "• Data Usage: Data collected in the app is used solely for educational, administrative, and communication purposes within the school.",
  "• No Third-Party Sharing: Student and family data will never be sold or shared with external commercial entities.",
].join("\n");

export function PolicyActionForm() {
  const { id, type } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isUpdateMode = /\/(update|edit)$/.test(location.pathname) || /\/\d+\/edit$/.test(location.pathname);
  const modeLabel = isUpdateMode ? `Update ${type.charAt(0).toUpperCase() + type.slice(1)} Policies` : 
   `Create ${type.charAt(0).toUpperCase() + type.slice(1)} Policies` ;

  const emptyFrom = {
    type: '',
    title: '',
    description: '',
  }
  const emptyErrors = {
    type: '',
    title: '',
    description: '',
  }

  const [updatingId, setUpdatingID] = useState(null)
  const [formData, setFormData] = useState(emptyFrom)
  const [errors, setErrors] = useState(emptyErrors)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }))
  }

  const validateForm = (form) => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required.";
    }
    setErrors({
      ...emptyErrors,
      ...newErrors,
    });
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async () => {
    if (!validateForm(formData)) { return }

    if (id && isUpdateMode && updatingId) {
      try {
        const res = api.put(`policies/${updatingId}`, formData)
        navigate(-1)
      } catch (error) {
        console.log('updating policy error: ', error)
      }
    } else {
      try {
        const payload = {
          ...formData,
          type: type
        }
        const res = api.post('policies', payload)
        navigate(-1)
      } catch (error) {
        console.log('store policy error', error)
      }
    }
  }

  useEffect(() => {
    if (!id || !isUpdateMode) {
      setFormData((prev) => ({
        ...prev,
        type: type || "",
      }))
      return
    }

    const fetchPolicy = async () => {
      try {
        const res = await api.get(`policies/${id}`)
        const data = res.data.data
        setUpdatingID(data.id)
        delete data.id
        setFormData(data)
      } catch (error) {
        console.log("fetching policy error", error)
      }
    }

    fetchPolicy()
  }, [id, isUpdateMode, type])

  return (
    <div className="p-6 h-full w-full font-roboto flex flex-col">
      <div className="border-b border-[#D9D9D980] pb-1 flex items-center justify-between">
        <h2 className="font-roboto font-semibold text-[18px] flex items-center gap-3">
          <button className="size-[24px]" onClick={() => navigate(-1)}>
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
            <label className="block text-[15px] font-semibold text-[#1F1F1F]">
              Title <span className="text-[#D93025]">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter policy title"
              className="w-full h-[42px] rounded-[4px] border border-[#D9D9D9] bg-transparent px-3 text-[15px] text-[#333333] placeholder:text-[#7C7C7C] outline-none focus:border-[#228B22]"
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2 flex-1 flex flex-col">
            <label className="block text-[15px] font-semibold text-[#1F1F1F]">
              Description <span className="text-[#D93025]">*</span>
            </label>

            <div className="border border-[#D9D9D9] rounded-[4px] h-full overflow-hidden">
              <div className="flex items-center gap-4 h-[46px] px-3 border-b border-[#D9D9D9] bg-[#E6E6E64F] text-[15px] text-[#000000]">
                <div className="flex items-center gap-4 text-[16px] font-bold ml-1">
                  {toolbarButtons.map((button) => (
                    <button
                      key={button.type}
                      type="button"
                      className={`cursor-pointer ${button.className}`}
                    >
                      {button.label}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                placeholder={defaultDescription}
                value={formData.description}
                onChange={handleChange}
                name="description"
                className="w-full h-full max-h-[437px] resize-none border-0 bg-transparent px-4 py-3 text-[15px] leading-7 text-[#1F1F1F] outline-none"
              />
            </div>

            {errors.description && (
              <p className="text-xs text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" size="lg" onClick={() => navigate(-1)} className="min-w-[110px]">
              Cancel
            </Button>
            <Button onClick={submitForm} size="lg" className="min-w-[110px] bg-[#228B22] hover:bg-[#1c741c] text-white">
              {isUpdateMode ? "Update" : "Confirm"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
