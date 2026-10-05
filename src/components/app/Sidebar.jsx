import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCheck,
  CalendarCheck,
  CreditCard,
  Megaphone,
  CalendarDays,
  BookOpen,
  FileText,
  Newspaper,
  Stethoscope,
  Landmark,
  Contact2,
  Bus,
  UserCog,
  BookMarked,
  Settings,
  LogOut
} from 'lucide-react';

export function Sidebar() {
  const [activeMenu, setActiveMenu] = useState('Settings');

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Staff', icon: Users },
    { name: 'Teacher', icon: GraduationCap },
    { name: 'Student', icon: UserCheck },
    { name: 'Attendance', icon: CalendarCheck },
    { name: 'Fees & Payment', icon: CreditCard },
    { name: 'Announcement', icon: Megaphone },
    { name: 'Time Table & Calendar', icon: CalendarDays },
    { name: 'Class & Subject', icon: BookOpen },
    { name: 'Exams', icon: FileText },
    { name: 'School News', icon: Newspaper },
    { name: 'Student Health', icon: Stethoscope },
    { name: 'Student Bank', icon: Landmark },
    { name: 'ID Card', icon: Contact2 },
    { name: 'Ferry', icon: Bus },
    { name: 'HR', icon: UserCog },
    { name: 'Cash Book', icon: BookMarked },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-[223px] h-full bg-theme text-white flex flex-col justify-between p-3 select-none">
      {/* Top Header / Logo Section */}
      <div>
        <div className="flex items-center gap-3 p-2 border-b border-green-600/60 pb-3 mb-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1.5 shadow-sm">
            {/* School Logo Icon */}
            <div className="w-full h-full border-2 border-[#1e8a27] rounded-md flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-[#1e8a27]" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-sm leading-tight">Morning Star</h1>
            <p className="text-xs text-green-100">Private School</p>
          </div>
        </div>

        {/* Navigation Menu Links */}
        <nav className="space-y-0.5 overflow-y-auto max-h-[calc(100vh-170px)] pr-1 custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.name;

            return (
              <button
                key={item.name}
                onClick={() => setActiveMenu(item.name)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${isActive
                    ? 'bg-zinc-100 text-zinc-900 shadow-sm rounded-r-none -mr-3 w-[calc(100%+12px)]'
                    : 'text-white hover:bg-green-700/60'
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-zinc-900' : 'text-white'}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Profile Section */}
      <div className="bg-white text-zinc-800 rounded-xl p-2.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-[#1e8a27] text-white font-bold text-xs rounded-lg flex items-center justify-center shadow-xs">
            DC
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xs text-zinc-800 leading-tight">
              Danang Calvin
            </span>
            <span className="text-[10px] text-zinc-400 font-medium">Admin</span>
          </div>
        </div>

        <button
          title="Logout"
          className="text-zinc-500 hover:text-red-500 transition-colors p-1"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}