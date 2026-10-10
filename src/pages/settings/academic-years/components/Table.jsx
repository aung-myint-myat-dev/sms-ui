export function TableRow({ children }) {
  return (
    <tr className="border-b border-[#0000004D] hover:bg-zinc-200">
      {children}
    </tr>
  )
}

export function TableHead({children, className}) {
  return (
    <th className={`py-2.5 px-3 font-semibold text-[14px] text-[#228B22] ${className}`}>
      {children}
    </th>
  )
}

export function TableData({ children, className }) {
  return (
    <td className={`py-2.5 px-3 text-center text-[12px] font-[600] ${className}`}>
      {children}
    </td>
  )
}