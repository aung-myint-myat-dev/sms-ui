export function TextInput({ label, disabled,name, value, onChange, error }) {
  return (
    <div>
      <label htmlFor={label} className="font-normal text-[14px] mb-1.5 block">{label}</label>
      <input
        value={value ?? ''}
        name={name}
        onChange={onChange}
        id={label} disabled={disabled} type="text" className={`h-[49px] rounded-[8px] border border-[#00000033] w-full px-4 py-1.5 ${disabled ? 'text-zinc-400' : 'text-[#000000]'} font-[500] text-[16px]`} />
        {error && (
          <p className="text-xs text-red-500 mt-1.5">{error}</p>
        )}
    </div>
  )
}