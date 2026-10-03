import { NavLink, useLocation } from "react-router-dom";
import { Button } from "./components/ui/Button";
import { PaymentMethodCard } from "./components/PaymentMethodCard";
import { paymentMethods } from "./data/payment-methods";
import { CashMethodCard } from "./components/CashMethodCard";

export function Payments() {
  const location = useLocation()
  const mobileWallets = paymentMethods.filter((method) => method.type === 'wallet')
  const bankings = paymentMethods.filter((method) => method.type === 'bank')
  const rightSidebarLinks = [
    { id: 1, label: 'School Profile', url: '#' },
    { id: 2, label: 'Academic Year', url: '#' },
    { id: 3, label: 'Role & Permissions', url: '#' },
    { id: 4, label: 'Payments', url: '/settings/payments' },
    { id: 5, label: 'Policies', url: '#' },
  ]
  return (
    <div className="p-6 h-full flex flex-col font-roboto">
      {/* Heading */}
      <div className="border-b border-[#D9D9D980] pb-1">
        <h2 className="font-roboto font-semibold text-[28px]">Setting / Payments</h2>
      </div>

      {/* Main and Right Sidebar */}
      <div className="flex gap-4 mt-4 h-full">

        {/* Main */}
        <div className="h-full max-h-150.5 w-full max-w-272.5 flex flex-col gap-6 border border-[#0000004D] rounded-[10px] p-4 overflow-hidden">

          {/* Heading */}
          <div className="flex items-center justify-between border-b border-[#228B22] pb-2">
            <h2 className="text-[16px] font-roboto leading-7 font-semibold">Payment Methods</h2>
            <Button>Create Payment</Button>
          </div>

          {/* Cards Container */}
          <div className="py-1 flex-1 space-y-8 pl-8 pe-5">

            {/* Cash Card */}
            <div>
              <div className="grid grid-cols-4 gap-8">
                <CashMethodCard/>
              </div>
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
        <div className="h-full max-h-175 min-h-16 w-full max-w-49.5 border border-[#0000004D] rounded-[10px] py-6 px-3.25">
          <ul className="space-y-3">
            {rightSidebarLinks.map((link) => {
              const isActive = location.pathname === link.url
              return (
                <li key={link.id}>
                  <NavLink to={link.url} className={`text-[14px] font-roboto font-semibold hover:underline hover:text-[#228B22] ${isActive && 'text-[#228B22] underline'}`}>
                    {link.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}