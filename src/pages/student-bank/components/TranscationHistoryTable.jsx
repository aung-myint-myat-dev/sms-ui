import {
  ImageIcon,
  Pencil,
  RotateCcwClock,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { ImageDialog } from "./ImageDialog";
import { DescriptionDialog } from "./DescriptionDialog";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { api } from "../../../lib/api";
import { isCreditBalance } from "../lib/is-credit-balance";

export function TranscationHistoriesTable({
  histories,
  mainBalance,
  onEdit,
  fetchBank,
}) {
  const [showImages, setShowImages] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const [selectedImages, setSelectedImages] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedTranscationId, setSelectedTranscationId] =
    useState(null);

  const handleShowImageDialog = (images) => {
    setSelectedImages(images);
    setShowImages(true);
  };

  const handleCloseImageDialog = () => {
    setSelectedImages(null);
    setShowImages(false);
  };

  const handleShowDescription = (des) => {
    setSelectedDescription(des);
    setShowDescription(true);
  };

  const handleCloseDescriptionDialog = () => {
    setSelectedDescription("");
    setShowDescription(false);
  };

  const handleShowDeleteConfirmationDialog = (id) => {
    setShowDeleteConfirmation(true);
    setSelectedTranscationId(id);
  };

  const handleCloseDeleteConfirmationDialog = () => {
    setShowDeleteConfirmation(false);
    setSelectedTranscationId(null);
  };

  const deleteTranscation = async () => {
    if (selectedTranscationId) {
      await api.delete(`transcations/${selectedTranscationId}`);
    }

    fetchBank();
    handleCloseDeleteConfirmationDialog();
  };

  return (
    <>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <RotateCcwClock className="size-4" />
          <span>Transcation Histories</span>
        </div>

        <div className="flex items-center gap-1">
          <h2 className="text-sm font-bold text-zinc-600">
            Main Balance
          </h2>

          <span
            className={`inline-block px-4 py-1.5 text-md font-bold ${
              isCreditBalance(mainBalance)
                ? "text-red-500"
                : "text-zinc-500"
            }`}
          >
            {Number(mainBalance).toLocaleString()} MMK
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-zinc-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-zinc-50">
                <th className="px-6 py-2.5 text-left text-sm font-medium text-zinc-700">
                  Date
                </th>

                <th className="px-4 py-2.5 text-left text-sm font-medium text-zinc-700">
                  Description
                </th>

                <th className="px-4 py-2.5 text-left text-sm font-medium text-zinc-700">
                  Cash-in
                </th>

                <th className="px-4 py-2.5 text-left text-sm font-medium text-zinc-700">
                  Cash-out
                </th>

                <th className="px-4 py-2.5 text-left text-sm font-medium text-zinc-700">
                  Payment Method
                </th>

                <th className="px-4 py-2.5 text-right text-sm font-medium text-zinc-700">
                  Balance
                </th>

                <th className="px-6 py-2.5 text-right text-sm font-medium text-zinc-700">
                  Images
                </th>

                <th className="px-6 py-2.5 text-right text-sm font-medium text-zinc-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {histories.map((history, index) => (
                <tr
                  key={index}
                  className="border-b last:border-0 hover:bg-zinc-50"
                >
                  <td className="max-w-32 px-6 py-3 text-sm text-zinc-600">
                    {history.date}
                  </td>

                  <td className="max-w-60 px-4 py-3 text-sm text-zinc-600">
                    <button
                      className="line-clamp-2 text-start hover:underline"
                      onClick={() =>
                        handleShowDescription(
                          history.description
                        )
                      }
                    >
                      {history.description}
                    </button>
                  </td>

                  <td className="px-4 py-3 text-sm text-zinc-600">
                    {history.transcation_type === "cash_in"
                      ? Number(
                          history.amount
                        ).toLocaleString() + " MMK"
                      : "-"}
                  </td>

                  <td className="px-4 py-3 text-sm text-red-600">
                    {history.transcation_type === "cash_out"
                      ? Number(history.amount)
                          .toLocaleString()
                          .replace("-", "") + " MMK"
                      : "-"}
                  </td>

                  <td className="px-4 py-3 text-sm text-zinc-600">
                    {history.payment_method?.toLocaleUpperCase() ??
                      "-"}
                  </td>

                  <td
                    className={`px-4 py-3 text-right text-sm font-semibold ${
                      isCreditBalance(history.amount)
                        ? "text-red-500"
                        : "text-zinc-600"
                    }`}
                  >
                    <span>
                      {Number(history.remaing_balance)
                        .toLocaleString()
                        .replace("-", "")}
                    </span>{" "}
                    MMK
                  </td>

                  <td className="px-4 py-3 text-sm text-zinc-600">
                    <div className="relative ml-auto size-12 overflow-hidden rounded-sm border">
                      {history.images.length > 0 ? (
                        <>
                          <img
                            src={history.images[0].image_url}
                            alt=""
                            className="h-full w-full object-cover"
                          />

                          {history.images.length > 1 && (
                            <span className="absolute left-1/2 top-1/2 flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                              +{history.images.length}
                            </span>
                          )}

                          <button
                            onClick={() =>
                              handleShowImageDialog(
                                history.images
                              )
                            }
                            className="absolute left-0 top-0 h-full w-full cursor-pointer"
                          />
                        </>
                      ) : (
                        <ImageIcon className="h-full w-full text-zinc-300" />
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-3">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => onEdit(history)}
                        type="button"
                      >
                        <Pencil className="size-4 cursor-pointer text-yellow-500" />
                      </button>

                      <button
                        onClick={() =>
                          handleShowDeleteConfirmationDialog(
                            Number(history.id)
                          )
                        }
                        type="button"
                      >
                        <Trash2 className="size-4 cursor-pointer text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showImages && (
        <ImageDialog
          images={selectedImages}
          closeDialog={handleCloseImageDialog}
        />
      )}

      {showDescription && (
        <DescriptionDialog
          description={selectedDescription}
          closeDialog={handleCloseDescriptionDialog}
        />
      )}

      <DeleteConfirmationDialog
        title="Delete transcation!"
        onClose={handleCloseDeleteConfirmationDialog}
        open={showDeleteConfirmation}
        onConfirm={deleteTranscation}
      />
    </>
  );
}
