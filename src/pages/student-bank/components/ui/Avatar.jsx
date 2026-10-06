export function Avatar({
  imageUrl,
}) {
  return (
    <div className="size-8 border rounded-full overflow-hidden">
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" />
      ) : (
        <div className="w-full h-full bg-theme text-white flex items-center justify-center font-semibold text-xs">PF</div>
      )}
    </div>
  )
}