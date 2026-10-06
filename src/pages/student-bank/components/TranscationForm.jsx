import { useEffect, useState } from "react";
import { ClipboardPlus, Save, X } from "lucide-react";
import axios from "axios";
import { Button } from "../../settings/payments/components/ui/Button";
import { TranscationTypeRadio } from "./TranscationTypeRadio";
import { api } from "../../../lib/api";
import { DateInput } from "./transcation-form/DateInput";
import { AmountInput } from "./transcation-form/AmountInput";
import { DescriptionInput } from "./transcation-form/DescriptionInput";
import { PaymentMethodSelect } from "./transcation-form/PaymentMethodSelect";
import { ImageUpload } from "./transcation-form/FileUpload";

const emptyForm = () => ({
  student_bank_id: "",
  date: new Date().toISOString().split("T")[0],
  transcation_type: "cash_in",
  amount: "",
  description: "",
  payment_method: "",
  images: [],
  existing_image_ids: [],
});

const emptyFormErrors = () => ({
  student_bank_id: "",
  date: "",
  transcation_type: "",
  amount: "",
  description: "",
  payment_method: "",
  images: "",
});

export function TranscationForm({
  id,
  onAfterSubmit,
  cancelEdit,
  isEdit,
  selectedTranscation,
}) {
  const [enableForm, setEnableForm] = useState(false);
  const [transcationForm, setTranscationForm] = useState(emptyForm());
  const [errors, setErrors] = useState(emptyFormErrors());

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTranscationForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user changes it
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleImagesChange = (files) => {
    setTranscationForm((prev) => {
      // Retain original DB images when adding new files during edit
      const existingDbImages = prev.images.filter(
        (img) => !(img instanceof File)
      );

      return {
        ...prev,
        images: [...existingDbImages, ...files],
      };
    });

    setErrors((prev) => ({
      ...prev,
      images: "",
    }));
  };

  const resetForm = () => {
    setTranscationForm(emptyForm());
    setErrors(emptyFormErrors());
  };

  const handleEnableForm = () => {
    setEnableForm(true);
  };

  const handleDisableForm = () => {
    resetForm();
    setEnableForm(false);
    cancelEdit();
  };

  const validate = () => {
    const newErrors = emptyFormErrors();

    if (!transcationForm.transcation_type) {
      newErrors.transcation_type =
        "Transcation type is required.";
    }

    if (!transcationForm.date) {
      newErrors.date = "Date is required.";
    }

    if (
      transcationForm.amount === "" ||
      transcationForm.amount === null ||
      transcationForm.amount === undefined
    ) {
      newErrors.amount = "Amount field is required.";
    }

    if (!transcationForm.payment_method) {
      newErrors.payment_method =
        "Payment method is required.";
    }

    const hasErrors = Object.values(newErrors).some(Boolean);

    setErrors(newErrors);

    return !hasErrors;
  };

  const submitForm = async () => {
    if (!validate()) return;

    try {
      const formData = new FormData();

      formData.append("student_bank_id", id);
      formData.append("date", transcationForm.date);
      formData.append(
        "transcation_type",
        transcationForm.transcation_type
      );
      formData.append("amount", transcationForm.amount);
      formData.append(
        "description",
        transcationForm.description
      );
      formData.append(
        "payment_method",
        transcationForm.payment_method
      );

      transcationForm.images.forEach((item) => {
        if (item instanceof File) {
          formData.append("images[]", item);
        } else {
          formData.append(
            "existing_image_ids[]",
            String(item.id)
          );
        }
      });

      if (isEdit && selectedTranscation) {
        formData.append("_method", "PUT");

        await api.post(
          `transcations/${selectedTranscation.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await api.post("transcations", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      onAfterSubmit();
      resetForm();
      setEnableForm(false);
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 422
      ) {
        const serverErrors = error.response.data?.errors;

        if (serverErrors) {
          setErrors((prev) => ({
            ...prev,
            student_bank_id:
              serverErrors.student_bank_id?.[0] ?? "",
            date: serverErrors.date?.[0] ?? "",
            transcation_type:
              serverErrors.transcation_type?.[0] ?? "",
            amount: serverErrors.amount?.[0] ?? "",
            description:
              serverErrors.description?.[0] ?? "",
            payment_method:
              serverErrors.payment_method?.[0] ?? "",
            images: serverErrors.images?.[0] ?? "",
          }));
        }

        return;
      }

      console.error(
        "Transcation store error:",
        error
      );
    }
  };

  useEffect(() => {
    if (isEdit && selectedTranscation) {
      setTranscationForm({
        student_bank_id:
          selectedTranscation.student_bank_id,
        transcation_type:
          selectedTranscation.transcation_type,
        date: selectedTranscation.date,
        amount: String(selectedTranscation.amount),
        description:
          selectedTranscation.description,
        payment_method:
          selectedTranscation.payment_method,
        images: selectedTranscation.images ?? [],
      });

      handleEnableForm();
    } else {
      resetForm();
    }
  }, [isEdit, selectedTranscation]);

  return (
    <div className="col-span-3 grid h-50 w-full grid-cols-3 rounded-md border p-2 shadow-xs">
      {/* First Column */}
      <div className="grid h-full grid-rows-3 gap-4 overflow-hidden p-2">
        {/* Cash In / Cash Out */}
        <div className="flex items-center gap-2">
          <TranscationTypeRadio
            id="cash_in_radio"
            name="transcation_type"
            disabled={!enableForm}
            onChange={handleChange}
            checked={
              transcationForm.transcation_type === "cash_in"
            }
            value="cash_in"
            label="Cash in"
          />

          <TranscationTypeRadio
            id="cash_out_radio"
            name="transcation_type"
            disabled={!enableForm}
            onChange={handleChange}
            checked={
              transcationForm.transcation_type === "cash_out"
            }
            value="cash_out"
            label="Cash out"
          />
        </div>

        {/* Date */}
        <DateInput
          name="date"
          value={transcationForm.date}
          onChange={handleChange}
          enable={enableForm}
          error={errors.date}
        />

        {/* Amount */}
        <AmountInput
          enable={enableForm}
          value={transcationForm.amount}
          onChange={handleChange}
          error={errors.amount}
        />
      </div>

      {/* Second Column */}
      <div className="grid h-full grid-rows-3 gap-4 overflow-hidden p-2">
        <DescriptionInput
          enable={enableForm}
          value={transcationForm.description}
          onChange={handleChange}
          error={errors.description}
        />

        <PaymentMethodSelect
          enable={enableForm}
          value={transcationForm.payment_method}
          onChange={handleChange}
          error={errors.payment_method}
        />
      </div>

      {/* Third Column */}
      <div className="grid h-full grid-rows-3 gap-4 overflow-hidden p-2">
        {/* Image */}
        <ImageUpload
          enable={enableForm}
          images={transcationForm.images}
          error={errors.images}
          onChange={handleImagesChange}
        />

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 p-2">
          {enableForm ? (
            <>
              <Button
                icon={X}
                onClick={handleDisableForm}
                className="flex-1"
                variant="danger"
              >
                Cancel
              </Button>

              <Button
                icon={Save}
                onClick={submitForm}
                className="flex-1"
              >
                Save
              </Button>
            </>
          ) : (
            <Button
              onClick={handleEnableForm}
              icon={ClipboardPlus}
              className="w-full"
            >
              Add New Transcation
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
