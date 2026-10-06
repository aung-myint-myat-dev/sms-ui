import { Pencil } from "lucide-react";
import { Switch } from "./ui/Switch";
import { useState } from "react";
import { api } from "../../../../lib/api";

export function PaymentMethodCard({ data = {}, onEdit }) {
  const {
    id,
    type,
    payment_name,
    account_name,
    phone_number,
    account_number,
    is_active,
  } = data;
  const [isActive, setIsActive] = useState(is_active);
  const displayNumber = type === "mobile" ? phone_number : account_number;

  const handleSwitchChange = async (id) => {
    setIsActive(!isActive)
    try {
      await api.patch(`payments/${id}/toggle-active`)
    } catch (error) {
      console.log("toggle active payment error: ", error)
    }
  }

  return (
    <div className="w-full max-w-[225px] h-[78px] border border-[#0000004D] rounded-[8px] p-2.5 flex flex-col justify-between bg-white">

      {/* Payment Name and Switch */}
      <div className="flex items-center justify-between">
        <h2 className="text-[14px] font-semibold font-roboto">{payment_name}</h2>
        <Switch checked={isActive} onChange={() => handleSwitchChange(id)} />
      </div>

      {/* Name, Phone Number / Account Number, Edit Button */}
      <div className="flex items-center justify-between gap-2">
        <div className="truncate min-w-0">
          <h2 className="text-[12px] font-semibold font-roboto truncate" title={account_name}>
            {account_name}
          </h2>
          <p className="text-[12px] mt-0.5 font-semibold font-roboto text-gray-600 truncate">
            {displayNumber}
          </p>
        </div>

        <button
          onClick={() => onEdit && onEdit(data)}
          className="w-[24px] h-[24px] shrink-0 border rounded-[3px] border-[#00000066] flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <Pencil className="w-[15px] h-[15px] text-[#125300]" />
        </button>
      </div>
    </div>
  );
}