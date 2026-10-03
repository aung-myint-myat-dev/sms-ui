import { Button } from "./components/ui/Button";
import { PaymentMethodCard } from "./components/PaymentMethodCard";
import { paymentMethods } from "./data/payment-methods";
import { CashMethodCard } from "./components/CashMethodCard";
import { RightSidebar } from "./components/RigthSidebar";
import { Modal, ModalAction, ModalContent, ModalTitle } from "./components/ui/Modal";
import { useEffect, useState } from "react";
import { PaymentSystemRadio } from "./components/PaymentSystemRadio";
import { TextInput } from "./components/ui/Input";

export function Payments() {
  const mobileWallets = paymentMethods.filter((method) => method.type === 'wallet')
  const bankings = paymentMethods.filter((method) => method.type === 'bank')
  const [paymentFormStep, setPaymentFormStep] = useState(0)
  const [selectedSystem, setSelectedSystem] = useState('')

  const nextStep = () => {
    setPaymentFormStep((prev) => prev + 1)
  }

  const previousStep = () => {
    setPaymentFormStep((prev) => prev - 1)
  }

  const closeForm = () => {
    setPaymentFormStep(0)
    setSelectedSystem('')
  }

  const handleSystemChange = (e) => {
    setSelectedSystem(e.target.value)
  }

  const submitPaymentForm = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    formData.append("payment_system", selectedSystem)
    console.log(Object.fromEntries(formData))
    closeForm()
  }

  useEffect(() => {
    console.log(selectedSystem)
  }, [selectedSystem])
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
          <div className="flex items-center justify-between border-b border-[#228B22] pb-2">
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
              <h2 className="text-[16px] text-[#228B22] font-semibold mb-3">Mobile Wallets</h2>
              <div className="grid grid-cols-4 gap-8">
                {mobileWallets.map((wallet) => (
                  <PaymentMethodCard key={wallet.id} data={wallet} />
                ))}
              </div>
            </div>

            {/* Bankings */}
            <div>
              <h2 className="text-[16px] text-[#228B22] font-semibold mb-3">Bankings</h2>
              <div className="grid grid-cols-4 gap-8">
                {bankings.map((bank) => (
                  <PaymentMethodCard key={bank.id} data={bank} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>

      <Modal open={paymentFormStep === 1} onClose={closeForm}>
        <ModalContent>
          <ModalTitle>
            Select Payment System
          </ModalTitle>
          <div className="mt-4 flex gap-3">
            <PaymentSystemRadio
              name="payment_system"
              value={'mobile'}
              label="Mobile"
              checked={selectedSystem === 'mobile'}
              onChange={handleSystemChange}
            />

            <PaymentSystemRadio
              name="payment_system"
              value={'banking'}
              label="Banking"
              checked={selectedSystem === 'banking'}
              onChange={handleSystemChange}
            />
          </div>
          <ModalAction>
            <Button
              variant="outline"
              onClick={closeForm}
            >
              Cancel
            </Button>

            <Button disabled={!selectedSystem} onClick={nextStep}>
              Next
            </Button>
          </ModalAction>
        </ModalContent>
      </Modal>

      <Modal open={paymentFormStep === 2} onClose={closeForm}>
        <ModalContent>
          <form id="payment-form" onSubmit={submitPaymentForm} className="space-y-3.5">
            <TextInput label="Payment Name" name="payment_name"/>
            <TextInput label="Account Holder Name" name="account_holder_name"/>
            {selectedSystem === 'banking' && (
              <TextInput label="Account Number" name="account_number"/>
            )}

            {selectedSystem === 'mobile' && (
              <TextInput label="Phone Number" name="phone_number"/>
            )}
          </form>
          <ModalAction>
            <Button variant="outline" onClick={previousStep}>Prev</Button>
            <Button type="submit" form="payment-form">Confirm</Button>
          </ModalAction>
        </ModalContent>
      </Modal>
    </div>
  )
}