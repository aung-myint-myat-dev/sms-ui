import { X } from "lucide-react"

export function Modal({
  open,
  onClose,
  children,
}) {
  if (!open) { return }

  return (
    <div className="fixed w-full h-full inset-0 bg-zinc-900/50 flex items-start">
      {/* Overlay */}
      <button
        onClick={onClose}
        className="flex-1 h-full" />

      {/* Content */}
      <div className="min-w-2xl h-full p-2">
        <div className="w-full h-full bg-white rounded-lg p-6 relative flex flex-col gap-2">
          <button onClick={onClose} className="absolute top-6 right-6 size-10 rounded-full flex items-center justify-center hover:bg-zinc-200 transition-colors duration-200 cursor-pointer">
            <X className="size-5" />
          </button>
          {children}
        </div>
      </div>
    </div>
  )
}

export function ModalTitle({ title, description }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-[20px] font-semibold">{title}</h2>
        <p className="text-xs text-zinc-500">{description}</p>
      </div>
    </div>
  )
}

export function ModalContent({children}) {
  return (
    <div className="flex-1">
      {children}
    </div>
  )
}

export function ModalAction({children}) {
  return (
    <div className="h-12 flex items-center gap-2 justify-end">
      {children}
    </div>
  )
}