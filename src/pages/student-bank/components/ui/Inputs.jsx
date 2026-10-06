export function TextInput() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">
        Student Name
      </label>

      <input
        type="text"
        placeholder="Enter student name"
        className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
      />
    </div>
  );
}

export function DateInput() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">
        Date of Birth
      </label>

      <input
        type="date"
        placeholder="Select date"
        className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-700 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
      />
    </div>
  );
}

export function TextAreaInput() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">
        Address
      </label>

      <textarea
        placeholder="Enter your address"
        rows={2}
        className="w-full resize-none rounded-md border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
      />
    </div>
  );
}

export function ImageUpload() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">
        Student Photo
      </label>

      <label
        htmlFor="student-image"
        className="flex size-14 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50 transition hover:border-zinc-400 hover:bg-zinc-100"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-400 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5V7.75A2.75 2.75 0 015.75 5h12.5A2.75 2.75 0 0121 7.75v8.5A2.75 2.75 0 0118.25 19H8.5M3 16.5l4.5-4.5 3 3 3-3 5.5 5.5M15.5 9.5h.01"
            />
          </svg>
        </div>

        <span className="mt-2 text-xs font-medium text-zinc-600">
          Upload image
        </span>

        <span className="mt-1 text-[11px] text-zinc-400">
          PNG, JPG up to 5MB
        </span>

        <input
          id="student-image"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
        />
      </label>
    </div>
  );
}

export function SelectInput() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">
        Grade
      </label>

      <select
        defaultValue=""
        className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-700 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
      >
        <option value="" disabled>
          Select grade
        </option>

        <option value="grade-1">Grade-1</option>
        <option value="grade-2">Grade-2</option>
        <option value="grade-3">Grade-3</option>
      </select>
    </div>
  );
}
