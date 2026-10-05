export function TextInput({ label, name, className = "", value, error, onChange, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-[14px] font-normal font-roboto">{label}</label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
        className={` w-[260px] h-[40px] rounded-[8px] border border-[#0000004D] px-3 text-[16px] font-[500] font-roboto outline-none focus:border-green-700 ${className} `} />
        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}
    </div>
  )
}