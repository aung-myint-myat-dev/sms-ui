import { Pencil, Trash2 } from "lucide-react";
import { formatAcademicDate } from "../utils/academicYearUtils";

function StatusBadge({ status }) {
  const classes = {
    active: "border-[#306E0080] bg-[#BCF5C9] text-[#306E00]",
    completed: "border-[#306E0033] bg-[#2F00FF1A] text-[#306E00]",
    upcoming: "border-amber-300 bg-amber-50 text-amber-800",
  };

  return (
    <span
      className={`inline-flex max-w-max rounded-[10px] border-[0.5px] px-4 py-[3px] text-[10px] font-bold capitalize ${classes[status] ?? "border-zinc-300 bg-zinc-100 text-zinc-700"}`}
    >
      {status}
    </span>
  );
}

export function AcademicYearTable({
  academicYears,
  onEdit,
  onDelete,
}) {
  if (academicYears.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500">
        No academic years have been created yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200">
      <table className="w-full min-w-[1100px] border-collapse">
        <thead className="text-[#228B22]">
          <tr>
            <th className="bg-[#E9F6EC] px-3 py-2.5 text-[14px] font-semibold">Academic Year</th>
            <th className="bg-[#E9F6EC] px-3 py-2.5 text-[14px] font-semibold">School Opening</th>
            <th className="bg-[#E9F6EC] px-3 py-2.5 text-[14px] font-semibold">School Closing</th>
            <th className="bg-[#E9F6EC] px-3 py-2.5 text-left text-[14px] font-semibold">Registration Open</th>
            <th className="bg-[#E9F6EC] px-3 py-2.5 text-left text-[14px] font-semibold">Registration Close</th>
            <th className="bg-[#E9F6EC] px-3 py-2.5 text-[14px] font-semibold">Total Students</th>
            <th className="bg-[#E9F6EC] px-3 py-2.5 text-left text-[14px] font-semibold">Status</th>
            <th className="bg-[#E9F6EC] px-3 py-2.5 text-[14px] font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {academicYears.map((year) => (
            <tr key={year.id} className="border-b border-[#0000004D] hover:bg-zinc-200">
              <td className="px-3 py-2.5 text-center text-[12px] font-semibold">{year.academic_year}</td>
              <td className="px-3 py-2.5 text-center text-[12px] font-semibold">
                {formatAcademicDate(year.school_opening_date)}
              </td>
              <td className="px-3 py-2.5 text-center text-[12px] font-semibold">
                {formatAcademicDate(year.school_closing_date)}
              </td>
              <td className="px-3 py-2.5 text-left text-[12px] font-semibold">
                {formatAcademicDate(year.registration_open_date)}
              </td>
              <td className="px-3 py-2.5 text-left text-[12px] font-semibold">
                {formatAcademicDate(year.registration_close_date)}
              </td>
              <td className="px-3 py-2.5 text-center text-[12px] font-semibold">{year.total_students ?? 0}</td>
              <td className="px-3 py-2.5 text-left text-[12px] font-semibold">
                <StatusBadge status={year.status} />
              </td>
              <td className="px-3 py-2.5 text-center text-[12px] font-semibold">
                <div className="flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(year)}
                    aria-label={`Edit ${year.academic_year}`}
                    className="flex size-[22px] items-center justify-center rounded-[4px] border-[0.5px] border-[#306E0099] bg-white text-[#306E00] hover:bg-[#E9F6EC]"
                  >
                    <Pencil size={10} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(year)}
                    aria-label={`Delete ${year.academic_year}`}
                    className="flex size-[22px] items-center justify-center rounded-[4px] border-[0.5px] border-red-300 bg-white text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
