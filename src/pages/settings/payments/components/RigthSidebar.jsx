import { NavLink, useLocation } from "react-router-dom"

export function RightSidebar() {
  const links = [
    { id: 1, label: 'School Profile', url: '#' },
    { id: 2, label: 'Academic Year', url: '#' },
    { id: 3, label: 'Role & Permissions', url: '#' },
    { id: 4, label: 'Payments', url: '/settings/payments' },
    { id: 5, label: 'Policies', url: '#' },
  ]
  const location = useLocation()
  return (
    <div className="h-full max-h-175 min-h-16 w-full max-w-49.5 border border-[#0000004D] rounded-[10px] py-6 px-3.25">
      <ul className="space-y-3">
        {links.map((link) => {
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
  )
}