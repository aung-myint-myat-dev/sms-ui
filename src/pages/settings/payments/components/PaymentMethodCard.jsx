import { Pencil } from "lucide-react";
import { Switch } from "./ui/Switch";

export function PaymentMethodCard({ data = {}, onEdit }) {
  const {
    provider_name = "",
    type = "wallet",
    account_name = "",
    phone_number = "",
    account_number = "",
    is_active = false,
  } = data;

  const displayNumber = type === "wallet" ? phone_number : account_number;

  return (
    <div className="w-full max-w-[225px] h-[70px] border border-[#0000004D] rounded-[8px] p-2.5 flex flex-col justify-between bg-white">
      {/* Payment Name and Switch */}
      <div className="flex items-center justify-between">
        <h2 className="text-[14px] font-semibold font-roboto">{provider_name}</h2>
        <Switch/>
      </div>

      {/* Name, Phone Number / Account Number, Edit Button */}
      <div className="flex items-center justify-between gap-2">
        <div className="truncate min-w-0">
          <h2 className="text-[12px] font-semibold font-roboto truncate" title={account_name}>
            {account_name}
          </h2>
          <p className="text-[10px] font-semibold font-roboto text-gray-600 truncate">
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