import { X } from "lucide-react";
import { Button } from "../../settings/payments/components/ui/Button";

export function ImageDialog({ images, closeDialog }) {
  return (
    <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center bg-zinc-900/50 p-2 backdrop-blur-sm">
      <button
        onClick={closeDialog}
        className="h-full flex-1"
      />

      <div className="relative flex h-full w-full max-w-2xl flex-col gap-6 overflow-hidden rounded-md border bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Transcation images
            </h2>

            <p className="text-sm text-zinc-500">
              Here are your transcation images.
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

        <div className="min-h-0 flex-1 overflow-y-auto p-1">
          <div className="grid auto-rows-fr grid-cols-2 gap-2">
            {images?.map((image, index) => (
              <div
                key={image.id || index}
                className="relative aspect-square w-full overflow-hidden rounded-md border bg-muted shadow-xs"
              >
                <img
                  src={image.image_url}
                  alt="Transaction attachment"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Button onClick={closeDialog} variant="danger">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
