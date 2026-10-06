export function DescriptionInput({
  enable,
  value,
  onChange,
  error,
}) {
  return (
    <div className="relative row-span-2 rounded-sm border p-2 shadow-xs">
      <label
        htmlFor="description-input"
        className={`absolute -top-2 left-2 bg-white px-2 text-xs font-semibold ${
          enable ? "text-zinc-700" : "text-zinc-300"
        }`}
      >
        Description
      </label>

      <textarea
        id="description-input"
        disabled={!enable}
        name="description"
        value={value}
        onChange={onChange}
        placeholder="Enter description..."
        className={`h-full max-h-full w-full resize-none bg-transparent text-sm outline-none ${
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