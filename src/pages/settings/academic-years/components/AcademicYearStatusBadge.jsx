export function AcademicYearStatusBadge({ status }) {
  const baseStyle = 'py-[3px] border-[0.5px] rounded-[10px] max-w-max px-4 text-[10px] font-[700] capitalize'

  const statusClass = {
    active: 'bg-[#BCF5C9] border-[#306E0080]',
    completed: 'bg-[#2F00FF1A] border-[#306E0033]',
  }
  return (
    <div className={`${baseStyle} ${statusClass[status]}`}>
      {status}
    </div>
  )
}