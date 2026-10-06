import { Search } from "lucide-react";
import { cn } from "../../../../lib/utils";

export function SearchInput({
  type = 'text',
  placeholder = 'Search',
  name,
  value,
  onChange,
  props,
  className,
}) {
  return (
    <div className={cn(className, 'border border-zinc-300 rounded-sm w-full h-9 flex overflow-hidden')}>
      <input
        className="outline-none w-full h-full px-3 text-sm"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />

      <div className="h-full aspect-square flex items-center justify-center">
        <Search className="size-4 text-zinc-400" />
      </div>
    </div>
  )
}