import { Trash2, X } from 'lucide-react'
import { Button } from '../../settings/payments/components/ui/Button'

export function DeleteConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title = 'Delete this item?',
  description = 'This action cannot be undone. This item will be permanently deleted.',
  loading = false,
}) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center rounded-xl border border-zinc-200 bg-white p-6 shadow-xl">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute right-4 top-4 rounded-full p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 disabled:pointer-events-none disabled:opacity-50"
        >
          <X className="size-4" />
        </button>

        {/* Icon */}
        <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-red-100 text-red-600">
          <Trash2 className="size-5" />
        </div>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-zinc-900">
            {title}
          </h2>

          <p className="mt-2 pr-6 text-sm leading-6 text-zinc-500">
            {description}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex w-full items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={loading}
            className="w-full"
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="danger"
            icon={Trash2}
            onClick={onConfirm}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  )
}