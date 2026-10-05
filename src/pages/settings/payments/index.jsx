import { useState } from "react";
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
const FORM_STEP = {
  NONE: "",
  SYSTEM_CHOOSE: "system_choose",
  FORM: "form",
};
const emptyForm = {
  payment_system: "",
  payment_name: "",
  account_holder_name: "",
  phone_number: "",
  account_number: "",
  is_active: false,
};
const emptyError = {
  payment_system: "",
  payment_name: "",
  account_holder_name: "",
  phone_number: "",
  account_number: "",
};

export function Payments() {
  const [paymentFormStep, setPaymentFormStep] = useState(FORM_STEP.NONE);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [formData, setFormData] = useState({ ...emptyForm });
  const [errors, setErrors] = useState({ ...emptyError });

  const mobileWallets = methods.filter( (method) => method.payment_system === "mobile_wallet" );
  const bankings = methods.filter( (method) => method.payment_system === "banking" );

  const openCreateForm = () => {
    setIsEdit(false);
    setSelectedPayment(null);
    setFormData({ ...emptyForm });
    setErrors({ ...emptyError });
    setPaymentFormStep(FORM_STEP.SYSTEM_CHOOSE);
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
    setPaymentFormStep(FORM_STEP.SYSTEM_CHOOSE);
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

    if (!form.payment_system.trim()) {
      newErrors.payment_system = "Payment system is required.";
    }

    if (!form.payment_name.trim()) {
      newErrors.payment_name = "Payment name is required.";
    }

    if (!form.account_holder_name.trim()) {
      newErrors.account_holder_name =
        "Account holder name is required.";
    }

    if (form.payment_system === "mobile_wallet") {
      if (!form.phone_number.trim()) {
        newErrors.phone_number = "Phone number is required.";
      }
    }

    if (form.payment_system === "banking") {
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

  const submitPaymentForm = (e) => {
    e.preventDefault();
    if (!validateForm(formData)) { return; }

    if (isEdit && selectedPayment) {
      const method = methods.find(
        (item) => item.id === selectedPayment.id
      );

      if (method) {
        Object.assign(method, formData);
      }
    }

    else {
      methods.push({
        ...formData,
        id: Date.now(),
      });
    }

    console.log("Methods:", methods);

    closeForm();
  };

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
                {mobileWallets.map((wallet) => (
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
                {bankings.map((banking) => (
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
        open={paymentFormStep === FORM_STEP.SYSTEM_CHOOSE}
        onClose={closeForm}
      >
        <ModalContent>
          <ModalTitle> Select Payment System </ModalTitle>

          <div className="mt-4 flex gap-3">

            <PaymentSystemRadio
              name="payment_system"
              value="mobile_wallet"
              label="Mobile"
              checked={
                formData.payment_system === "mobile_wallet"
              }
              onChange={handleChange}
            />

            <PaymentSystemRadio
              name="payment_system"
              value="banking"
              label="Banking"
              checked={
                formData.payment_system === "banking"
              }
              onChange={handleChange}
            />

          </div>

          {errors.payment_system && (
            <p className="text-sm text-red-500 mt-2">
              {errors.payment_system}
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
              disabled={!formData.payment_system}
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
                formData.payment_system === "mobile_wallet"
                  ? "Wallet Name"
                  : "Banking Name"
              }
              name="payment_name"
            />

            {/* Account Holder */}
            <TextInput
              value={formData.account_holder_name}
              error={errors.account_holder_name}
              onChange={handleChange}
              label="Account Holder Name"
              name="account_holder_name"
            />

            {/* Account Number */}
            {formData.payment_system === "banking" && (
              <TextInput
                value={formData.account_number}
                error={errors.account_number}
                onChange={handleChange}
                label="Account Number"
                name="account_number"
              />
            )}

            {/* Phone Number */}
            {formData.payment_system === "mobile_wallet" && (
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