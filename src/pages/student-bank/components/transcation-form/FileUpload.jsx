import React, { useEffect, useState } from "react";

export function ImageUpload({
  enable,
  images,
  error,
  onChange,
}) {
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    const urls = images.map((img) => {
      if (img instanceof File) {
        return URL.createObjectURL(img);
      }

      return img.image_url;
    });

    setPreviewUrls(urls);

    return () => {
      urls.forEach((url, index) => {
        if (images[index] instanceof File) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [images]);

  const firstPreviewUrl = previewUrls[0];
  const remainingImageCount = Math.max(images.length - 1, 0);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files ?? []);

    if (newFiles.length === 0) return;

    // Merge existing selected File objects with new ones
    const existingFiles = images.filter((img) => img instanceof File);

    onChange([...existingFiles, ...newFiles]);

    event.target.value = "";
  };

  return (
    <div className="row-span-2 overflow-hidden">
      <div className="grid h-full grid-cols-3 gap-2">
        {/* Preview Container */}
        {firstPreviewUrl && (
          <div className="relative overflow-hidden rounded-md border bg-zinc-100">
            <img
              src={firstPreviewUrl}
              alt="Transaction Preview"
              className="h-full w-full object-cover"
            />

            {/* Remaining Count Overlay */}
            {remainingImageCount > 0 && (
              <div className="absolute bottom-1 right-1 flex h-7 min-w-7 items-center justify-center rounded-full bg-black/70 px-2 text-xs font-medium text-white">
                +{remainingImageCount}
              </div>
            )}
          </div>
        )}

        {/* File Input Label */}
        <label
          className={`
            ${images.length > 0 ? "col-span-2" : "col-span-3"}
            flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed
            ${
              enable
                ? "border-zinc-300 hover:bg-zinc-100"
                : "cursor-not-allowed border-zinc-100"
            }
            bg-zinc-50 transition
          `}
        >
          <div
            className={`mb-2 flex h-9 w-9 items-center justify-center rounded-full ${
              enable ? "bg-white" : "bg-zinc-200"
            } shadow-sm`}
          >
            <span className="text-xl text-zinc-500">+</span>
          </div>

          <span
            className={`text-xs font-medium ${
              enable ? "text-zinc-700" : "text-zinc-300"
            }`}
          >
            Upload image
          </span>

          <span
            className={`mt-1 text-[10px] font-medium ${
              enable ? "text-zinc-700" : "text-zinc-300"
            }`}
          >
            PNG, JPG, WEBP
          </span>

          {error && (
            <span className="mt-1 text-xs text-red-500">
              {error}
            </span>
          )}

          <input
            disabled={!enable}
            name="images"
            type="file"
            onChange={handleFileChange}
            multiple
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}