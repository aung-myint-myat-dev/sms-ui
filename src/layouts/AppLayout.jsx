import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/app/Sidebar";

export function AppLayout() {
  return (
    <div className="h-screen flex items-start overflow-hidden bg-[#F1F1F1] w-full">
      {/* Side Bar */}
      <Sidebar />
      <div className="flex-1 h-full overflow-hidden p-2.5">
        <div className="w-full h-full bg-white rounded-[10px]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}