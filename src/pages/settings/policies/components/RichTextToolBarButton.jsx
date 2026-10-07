export function RichTextToolBarButton({ onClick, isActive, icon: Icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`size-8 ${isActive ? 'bg-zinc-200' : ''} flex items-center justify-center rounded-md`}
    >
      <Icon className="size-4"/>
    </button>
  )
}