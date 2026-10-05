import { Button } from "./components/ui/Button";
import { PaymentMethodCard } from "./components/PaymentMethodCard";
import { methods } from "./data/payment-methods";
import { CashMethodCard } from "./components/CashMethodCard";
import { RightSidebar } from "./components/RigthSidebar";
import { Modal, ModalAction, ModalContent, ModalTitle } from "./components/ui/Modal";
import { useState } from "react";
import { PaymentSystemRadio } from "./components/PaymentSystemRadio";
import { TextInput } from "./components/ui/Input";

export function Payments() {
  const mobileWallets = methods.filter((method) => method.payment_system === 'mobile_wallet')
  const bankings = methods.filter((method) => method.payment_system === 'banking')
  const [paymentFormStep, setPaymentFormStep] = useState(0)
  const [isEdit, setIsEdit] = useState(false)
  const [isEditPaymentSystem, setIsPaymentSystem] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const emptyForm = {
    payment_system: '',
    payment_name: '',
    account_holder_name: '',
    phone_number: '',
    account_number: '',
    is_active: false,
  }
  const emptyError = {
    payment_system: '',
    payment_name: '',
    account_holder_name: '',
    phone_number: '',
    account_number: '',
  }
  const [formData, setFormData] = useState(emptyForm)
  const [errors, setErrors] = useState(emptyError)

  const nextStep = () => {
    setPaymentFormStep((prev) => prev + 1)
  }

  const previousStep = () => {
    setPaymentFormStep((prev) => prev - 1)
  }

  const closeForm = () => {
    setPaymentFormStep(0)
    setIsEdit(false)
    setSelectedPayment(null)
    setFormData(emptyForm)
    setErrors(emptyError)
  }

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

  const handleEdit = (payment) => {
    setIsEdit(true)
    setSelectedPayment(payment)
    setFormData(payment)
  }

  const validateForm = (form) => {
    const newErrors = {};

    if (!form.payment_system.trim()) {
      newErrors.payment_system = 'Payment system is required.';
    }

    if (!form.payment_name.trim()) {
      newErrors.payment_name = 'Payment name is required.';
    }

    if (!form.account_holder_name.trim()) {
      newErrors.account_holder_name = 'Account holder name is required.';
    }

    if (form.payment_system === 'mobile_wallet') {
      if (!form.phone_number.trim()) {
        newErrors.phone_number = 'Phone number is required.';
      }
    }

    if (form.payment_system === 'banking') {
      if (!form.account_number.trim()) {
        newErrors.account_number = 'Account number is required.';
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0;
  };

  const submitPaymentForm = (e) => {
    e.preventDefault()
    if(!validateForm(formData)) { return }

    if(isEdit && selectedPayment) {
      const method = methods.find((item) => item.id === selectedPayment.id)
      if(method) {
        Object.assign(method, formData)
      }
    } else {
      methods.push(formData)
    }
    console.log(formData)
    closeForm()
  }

  return (
    <div className="p-6 h-full flex flex-col font-roboto">

      {/* Page Header */}
      <div className="border-b border-[#D9D9D980] pb-1">
        <h2 className="font-roboto font-semibold text-[28px]">Setting / Payments</h2>
      </div>

      {/* Main and Right Sidebar */}
      <div className="flex gap-4 mt-4 h-full">

        {/* Main */}
        <div className="h-full max-h-150.5 w-full max-w-272.5 flex flex-col gap-6 border border-[#0000004D] rounded-[10px] p-4 overflow-hidden">

          {/* Heading And Create Button */}
          <div className="flex items-center justify-between border-b border-[#006D2C] pb-2">
            <h2 className="text-[16px] font-roboto leading-7 font-semibold">Payment Methods</h2>
            <Button onClick={() => setPaymentFormStep(1)}>Create Payment</Button>
          </div>

          {/* Payment Methods Cards Container */}
          <div className="py-1 flex-1 space-y-8 pl-8 pe-5">

            {/* Cash Card */}
            <div className="grid grid-cols-4 gap-8">
              <CashMethodCard />
            </div>

            {/* Mobile Wallets */}
            <div>
              <h2 className="text-[16px] text-theme font-semibold mb-3">Mobile Wallets</h2>
              <div className="grid grid-cols-4 gap-8">
                {mobileWallets.map((wallet) => (
                  <PaymentMethodCard key={wallet.id} data={wallet} onEdit={() => handleEdit(wallet)} />
                ))}
              </div>
            </div>

            {/* Bankings */}
            <div>
              <h2 className="text-[16px] text-theme font-semibold mb-3">Bankings</h2>
              <div className="grid grid-cols-4 gap-8">
                {bankings.map((banking) => (
                  <PaymentMethodCard key={banking.id} data={banking} onEdit={() => handleEdit(banking)} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>

      <Modal open={paymentFormStep === 1 | ( isEditPaymentSystem && selectedPayment )} onClose={closeForm}>
        <ModalContent>
          <ModalTitle>
            Select Payment System
          </ModalTitle>
          <div className="mt-4 flex gap-3">
            <PaymentSystemRadio
              name="payment_system"
              value={'mobile_wallet'}
              label="Mobile"
              checked={formData.payment_system === 'mobile_wallet'}
              onChange={handleChange}
            />

            <PaymentSystemRadio
              name="payment_system"
              value={'banking'}
              label="Banking"
              checked={formData.payment_system === 'banking'}
              onChange={handleChange}
            />
          </div>
          <ModalAction>
            <Button
              variant="outline"
              onClick={closeForm}
            >
              Cancel
            </Button>

            <Button disabled={!formData.payment_system} onClick={nextStep}>
              Next
            </Button>
          </ModalAction>
        </ModalContent>
      </Modal>

      <Modal open={paymentFormStep === 2 || (isEdit && selectedPayment)} onClose={closeForm}>
        <ModalContent>
          <form id="payment-form" onSubmit={submitPaymentForm} className="space-y-3.5">
            <TextInput value={formData.payment_name} error={errors.payment_name} onChange={handleChange} label={formData.payment_system === 'mobile_wallet' ? 'Wallet Name' : 'Banking Name'} name="payment_name" />

            <TextInput value={formData.account_holder_name} error={errors.account_holder_name} onChange={handleChange} label="Account Holder Name" name="account_holder_name" />

            {formData?.payment_system === 'banking' && (
              <TextInput value={formData.account_number} error={errors.account_number} onChange={handleChange} label="Account Number" name="account_number" />
            )}

            {formData?.payment_system === 'mobile_wallet' && (
              <TextInput value={formData.phone_number} error={errors.phone_number} onChange={handleChange} label="Phone Number" name="phone_number" />
            )}
          </form>
          <ModalAction>
            {!isEdit && !selectedPayment && (
              <Button variant="outline" onClick={previousStep}>Prev</Button>
            )}
            <Button type="submit" form="payment-form">
              {isEdit ? 'Update' : 'Confirm'}
            </Button>
          </ModalAction>
        </ModalContent>
      </Modal>
    </div>
  )
}