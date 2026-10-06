export function DateInput({
  enable,
  value,
  name,
  onChange,
  error,
}) {
  return (
    <div className="relative rounded-sm border p-2 shadow-xs">
      <label
        htmlFor="date-input"
        className={`absolute -top-2 left-2 bg-white px-2 text-xs font-semibold ${
          enable ? "text-zinc-700" : "text-zinc-300"
        }`}
      >
        Date
      </label>

      <input
        id="date-input"
        disabled={!enable}
        value={value}
        onChange={onChange}
        name={name}
        type="date"
        className={`h-full w-full bg-transparent text-sm outline-none ${
          enable ? "text-zinc-700" : "text-zinc-300"
        }`}
      />

      {error && (
        <span className="absolute -bottom-2 right-2 bg-white px-2 text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}