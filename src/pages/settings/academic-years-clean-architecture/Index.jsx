import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { SettingRightSidebar } from "../../components/SettingRightSidebar";
import { AcademicYearTable } from "./components/AcademicYearTable";
import { DisplayCard } from "./components/DisplayCard";
import { DeleteConfirmationDialog } from "./components/DeleteConfirmationDialog";
import { useAcademicYearList } from "./hooks/useAcademicYearList";
import { Create } from "./Create";
import { Edit } from "./Edit";
import { Show } from "./Show";
import { getCurrentAcademicYear } from "./utils/academicYearUtils";

export function AcademicYears() {
  const { academicYears, loading, error, refresh, create, update, remove } =
    useAcademicYearList();
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const sortedAcademicYears = useMemo(
    () =>
      [...academicYears].sort((left, right) =>
        right.academic_year.localeCompare(left.academic_year),
      ),
    [academicYears],
  );
  const activeAcademicYear = getCurrentAcademicYear(academicYears);

  const handleCreate = async (data) => {
    await create(data);
    setCreating(false);
  };

  const handleSave = async (id, data) => {
    await update(id, data);
    setEditing(null);
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    setDeleteError("");
    try {
      await remove(deleting.id);
      setDeleting(null);
    } catch (cause) {
      setDeleteError(cause.message || "Unable to delete the academic year.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col p-6 font-roboto">
      <div className="flex items-center justify-between border-b border-[#D9D9D980] pb-1">
        <h1 className="text-lg font-semibold">Setting / Academic Years</h1>
      </div>

      <div className="mt-4 flex h-full w-full gap-4 overflow-hidden overflow-y-auto">
        <main className="flex-1 space-y-4 overflow-y-auto rounded-[10px] border border-[#C4CDC7] bg-zinc-100 px-4 py-3">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setCreating(true)}
              className="flex h-[32px] w-[146px] items-center justify-center rounded-[8px] bg-[#228B22] text-[12px] font-bold text-white hover:bg-green-700"
            >
              Create Academic Year
            </button>
          </div>

          {error && (
            <div
              className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              role="alert"
            >
              <span>{error}</span>
              <button
                type="button"
                onClick={refresh}
                className="font-semibold underline"
              >
                Try again
              </button>
            </div>
          )}

          {loading ? (
            <DisplayCard title="Academic Year Details">
              <p className="text-sm text-zinc-500" role="status">
                Loading academic years...
              </p>
            </DisplayCard>
          ) : editing ? (
            <Edit
              key={editing.id}
              academicYear={editing}
              onCancel={() => setEditing(null)}
              onSave={handleSave}
            />
          ) : (
            <>
              <div className="flex items-center justify-between rounded-[10px] border border-[#C4CDC7] bg-[#E9F6EC] px-6 py-4">
                <div className="flex flex-col items-start">
                  <span className="text-[18px] font-bold text-[#6A6969]">
                    Current Academic Year
                  </span>
                  <span className="text-[24px] font-black text-[#228B22]">
                    {activeAcademicYear?.academic_year ?? "Not set"}
                  </span>
                </div>
                <div className="size-[50px] shrink-0 overflow-hidden rounded-[8px]">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7BTzVBuyix9HxdRfxQG0QuVYQsSD318utuBHVtJvM7A&s=10"
                    alt="School logo"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              <DisplayCard title="Academic Year Details">
                <Show
                  academicYears={academicYears}
                  id={activeAcademicYear?.id}
                />
              </DisplayCard>
            </>
          )}

          <DisplayCard title="Academic Years">
            {loading ? (
              <p className="text-sm text-zinc-500" role="status">
                Loading academic years...
              </p>
            ) : (
              <AcademicYearTable
                academicYears={sortedAcademicYears}
                onEdit={(year) => setEditing(year)}
                onDelete={(year) => {
                  setDeleteError("");
                  setDeleting(year);
                }}
              />
            )}
          </DisplayCard>
        </main>
        <SettingRightSidebar />
      </div>

      {creating && (
        <div
          className="fixed inset-0 z-40 flex bg-zinc-950/50 p-2"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setCreating(false);
            }
          }}
        >
          <button
            type="button"
            aria-label="Close create academic year form"
            onClick={() => setCreating(false)}
            className="flex-1"
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="academic-year-form-title"
            className="flex h-full w-full max-w-[505px] flex-col gap-4 rounded-[15px] bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <h2
                id="academic-year-form-title"
                className="text-[20px] font-semibold text-zinc-900"
              >
                Create Academic Year
              </h2>
              <button
                type="button"
                onClick={() => setCreating(false)}
                aria-label="Close create academic year form"
              >
                <X className="size-4" />
              </button>
            </div>
            <Create
              onCancel={() => setCreating(false)}
              onCreate={handleCreate}
            />
          </section>
        </div>
      )}

      <DeleteConfirmationDialog
        academicYear={deleting}
        deleting={deleteLoading}
        error={deleteError}
        onCancel={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
