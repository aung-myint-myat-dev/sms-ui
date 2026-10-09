import { ImagePlus } from "lucide-react";

export function LogoImageUpload({ label, name, error, onChange, size }) {
  return (
    <div className="h-full w-full">
      <label htmlFor="logo-image-upload" className={`cursor-pointer flex flex-col items-center justify-center border-2 border-dashed ${error ? 'border-red-500' : 'border-[#D9D9D9]'} rounded-[15px] h-full`}>
        <ImagePlus className={`${size ?? 'size-[50px]'} ${error ? 'text-red-500' : 'text-[#D9D9D9]'}`} />
        {error ? (
          <p className="text-red-500 text-xs">{error}</p>
        ) : (
          <span className="font-semibold text-[#D9D9D9]">{label}</span>
        )}
      </label>
      <input
        name={name}
        onChange={onChange}
        id="logo-image-upload" type="file" hidden />
    </div>
  )
}