import { X } from "lucide-react";
import { Button } from "../../settings/payments/components/ui/Button";

export function DescriptionDialog({ description, closeDialog }) {
  return (
    <div
      onClick={closeDialog}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/50 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-xl flex-col gap-6 overflow-hidden rounded-md border bg-white p-6 shadow-xs"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Transaction Description
            </h2>

            <p className="text-sm text-zinc-500">
              Here is your transaction description.
            </p>
          </div>

          <Button
            onClick={closeDialog}
            variant="ghost"
            className="size-12 rounded-full"
          >
            <X className="size-4" />
          </Button>
        </div>

        <p className="text-lg text-zinc-700">
          {description}
        </p>

        <div className="flex items-center justify-end">
          <Button onClick={closeDialog} variant="danger">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
