import { useEffect, useState } from "react";
import { Button } from "./components/ui/Button";
import { PaymentMethodCard } from "./components/PaymentMethodCard";
import { PaymentSystemRadio } from "./components/PaymentSystemRadio";
import { CashMethodCard } from "./components/CashMethodCard";
import { RightSidebar } from "./components/RigthSidebar";
import { TextInput } from "./components/ui/Input";
import {
  Modal,
  ModalAction,
  ModalContent,
  ModalTitle,
} from "./components/ui/Modal";
import { methods } from "./data/payment-methods";
import { api } from "../../../lib/api";
import { handleFormErrors } from "../../../lib/handle-form-errors";
const FORM_STEP = {
  NONE: "",
  TYPE_CHOOSE: "type_choose",
  FORM: "form",
};
const emptyForm = {
  type: "",
  payment_name: "",
  account_name: "",
  phone_number: "",
  account_number: "",
};

const emptyError = {
  type: "",
  payment_name: "",
  account_name: "",
  phone_number: "",
  account_number: "",
};

export function Payments() {
  const [payments, setPayments] = useState([]);
  const [paymentFormStep, setPaymentFormStep] = useState(FORM_STEP.NONE);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [formData, setFormData] = useState({ ...emptyForm });
  const [errors, setErrors] = useState({ ...emptyError });

  const mobilePayments = payments.filter((payment) => payment.type === 'mobile')
  const bankingPayments = payments.filter((payment) => payment.type === 'banking')

  const openCreateForm = () => {
    setIsEdit(false);
    setSelectedPayment(null);
    setFormData({ ...emptyForm });
    setErrors({ ...emptyError });
    setPaymentFormStep(FORM_STEP.TYPE_CHOOSE);
  };

  const openEditForm = (payment) => {
    setIsEdit(true);
    setSelectedPayment(payment);
    setFormData({
      ...payment,
    });
    setErrors({ ...emptyError });
    setPaymentFormStep(FORM_STEP.FORM);
  };

  const closeForm = () => {
    setPaymentFormStep(FORM_STEP.NONE);
    setIsEdit(false);
    setSelectedPayment(null);
    setFormData({ ...emptyForm });
    setErrors({ ...emptyError });
  };

  const nextStep = () => {
    setPaymentFormStep(FORM_STEP.FORM);
  };

  const previousStep = () => {
    setPaymentFormStep(FORM_STEP.TYPE_CHOOSE);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = (form) => {
    const newErrors = {};

    if (!form.type.trim()) {
      newErrors.type = "Payment system is required.";
    }

    if (!form.payment_name.trim()) {
      newErrors.payment_name = "Payment name is required.";
    }

    if (!form.account_name.trim()) {
      newErrors.account_name =
        "Account holder name is required.";
    }

    if (form.type === "mobile") {
      if (!form.phone_number.trim()) {
        newErrors.phone_number = "Phone number is required.";
      }
    }

    if (form.type === "banking") {
      if (!form.account_number.trim()) {
        newErrors.account_number = "Account number is required.";
      }
    }

    setErrors({
      ...emptyError,
      ...newErrors,
    });

    return Object.keys(newErrors).length === 0;
  };

  const fetchPayments = async () => {
    try {
      const res = await api.get('payments')
      const data = res.data.data
      if (data) {
        setPayments(data)
      }
    } catch (error) {
      console.log("fetching payments error: ", error)
    }
  }

  const submitPaymentForm = async (e) => {
    e.preventDefault();
    if (!validateForm(formData)) { return; }

    if (formData.type === 'mobile') {
      setFormData((prev) => ({
        ...prev,
        account_number: null,
      }))
    }
    if (formData.type === 'banking') {
      setFormData((prev) => ({
        ...prev,
        phone_number: null,
      }))
    }

    if (isEdit && selectedPayment) {
      try {
        await api.put(`payments/${selectedPayment.id}`, formData)
        await fetchPayments()
        closeForm();
      } catch (error) {
        handleFormErrors(error, setErrors)
        console.log("update payment error: ", error)
      }
    } else {
      try {
        await api.post('payments', formData)
        await fetchPayments()
        closeForm();
      } catch (error) {
        handleFormErrors(error, setErrors)
        console.log("store payment error: ", error)
      }
    }
  };

  useEffect(() => {
    fetchPayments()
  }, [])

  return (
    <div className="p-6 h-full flex flex-col font-roboto">

      {/* Header */}
      <div className="border-b border-[#D9D9D980] pb-1">
        <h2 className="font-roboto font-semibold text-[28px]">
          Setting / Payments
        </h2>
      </div>

      {/* Main and Right Sidebar */}
      <div className="flex gap-4 mt-4 h-full">

        {/* Main */}
        <div className="h-full max-h-150.5 w-full max-w-272.5 flex flex-col gap-6 border border-[#0000004D] rounded-[10px] p-4 overflow-hidden">

          {/* Heading */}
          <div className="flex items-center justify-between border-b border-theme pb-2">
            <h2 className="text-[16px] font-roboto leading-7 font-semibold">
              Payment Methods
            </h2>

            <Button onClick={openCreateForm}>
              Create Payment
            </Button>
          </div>

          {/* Payment Methods */}
          <div className="py-1 flex-1 space-y-8 pl-8 pe-5">

            {/* Cash */}
            <div className="grid grid-cols-4 gap-8">
              <CashMethodCard />
            </div>

            {/* Mobile Wallets */}
            <div>
              <h2 className="text-[16px] text-theme font-semibold mb-3">
                Mobile Wallets
              </h2>
              <div className="grid grid-cols-4 gap-8">
                {mobilePayments.map((wallet) => (
                  <PaymentMethodCard
                    key={wallet.id}
                    data={wallet}
                    onEdit={() => openEditForm(wallet)}
                  />
                ))}
              </div>
            </div>

            {/* Bankings */}
            <div>
              <h2 className="text-[16px] text-theme font-semibold mb-3">
                Bankings
              </h2>
              <div className="grid grid-cols-4 gap-8">
                {bankingPayments.map((banking) => (
                  <PaymentMethodCard
                    key={banking.id}
                    data={banking}
                    onEdit={() => openEditForm(banking)}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>

      {/* Payment System Select Modal */}
      <Modal
        open={paymentFormStep === FORM_STEP.TYPE_CHOOSE}
        onClose={closeForm}
      >
        <ModalContent>
          <ModalTitle> Select Payment System </ModalTitle>

          <div className="mt-4 flex gap-3">

            <PaymentSystemRadio
              name="type"
              value="mobile"
              label="Mobile"
              checked={
                formData.type === "mobile"
              }
              onChange={handleChange}
            />

            <PaymentSystemRadio
              name="type"
              value="banking"
              label="Banking"
              checked={
                formData.type === "banking"
              }
              onChange={handleChange}
            />

          </div>

          {errors.type && (
            <p className="text-sm text-red-500 mt-2">
              {errors.type}
            </p>
          )}

          <ModalAction>
            <Button
              variant="outline"
              onClick={closeForm}
            >
              Cancel
            </Button>

            <Button
              disabled={!formData.type}
              onClick={nextStep}
            >
              Next
            </Button>
          </ModalAction>
        </ModalContent>
      </Modal>

      {/* Payment Form Modal */}
      <Modal
        open={paymentFormStep === FORM_STEP.FORM}
        onClose={closeForm}
      >
        <ModalContent>
          <form
            id="payment-form"
            onSubmit={submitPaymentForm}
            className="space-y-3.5"
          >

            {/* Payment Name */}
            <TextInput
              value={formData.payment_name}
              error={errors.payment_name}
              onChange={handleChange}
              label={
                formData.type === "mobile"
                  ? "Wallet Name"
                  : "Banking Name"
              }
              name="payment_name"
            />

            {/* Account Holder */}
            <TextInput
              value={formData.account_name}
              error={errors.account_name}
              onChange={handleChange}
              label="Account Holder Name"
              name="account_name"
            />

            {/* Account Number */}
            {formData.type === "banking" && (
              <TextInput
                value={formData.account_number}
                error={errors.account_number}
                onChange={handleChange}
                label="Account Number"
                name="account_number"
              />
            )}

            {/* Phone Number */}
            {formData.type === "mobile" && (
              <TextInput
                value={formData.phone_number}
                error={errors.phone_number}
                onChange={handleChange}
                label="Phone Number"
                name="phone_number"
              />
            )}
          </form>

          <ModalAction>
            {/* Back */}
            <Button
              variant="outline"
              onClick={previousStep}
            >
              {isEdit ? "Edit System" : "Prev"}
            </Button>
            {/* Submit */}
            <Button
              type="submit"
              form="payment-form"
            >
              {isEdit ? "Update" : "Confirm"}
            </Button>
          </ModalAction>
        </ModalContent>
      </Modal>
    </div>
  );
}