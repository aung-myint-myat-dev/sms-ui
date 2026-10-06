import { Switch } from "./ui/Switch";

export function CashMethodCard() {
  return (
    <div className="h-[70px] w-full max-w-[255px] border border-[#228B22] rounded-[8px] flex items-center justify-center p-2.5 bg-[#228B220F]">

      <div className="w-full flex items-center justify-between">
        <h2>Cash</h2>
        <Switch checked={true} disabled/>
      </div>
    </div>
  )
}