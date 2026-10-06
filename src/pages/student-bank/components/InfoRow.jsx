export function InfoRow({ label, value }) {
  return (
    <div className="flex items-center gap-3">
      <p className="w-24 shrink-0 text-sm text-zinc-500">
        {label}
      </p>

      <div className="flex-1 border-b border-dashed border-zinc-300" />

      <span className="w-48 shrink-0 text-right text-sm font-medium text-zinc-800">
        {value}
      </span>
    </div>
  );
}
