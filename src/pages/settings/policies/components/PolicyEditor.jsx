import { useEditor, EditorContent, useEditorState } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Italic, List, ListOrdered, UnderlineIcon } from "lucide-react"
import { RichTextToolBarButton } from "./RichTextToolBarButton"
import { useEffect } from "react"

export default function PolicyEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        hardBreak: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value || "",
    onUpdate: ({editor}) => {
      onChange(editor.getHTML())
    }
  })

  const {
    isBold,
    isItalic,
    isUnderline,
    isBulletList,
    isOrderedList,
    isLeft,
    isCenter,
    isRight,
    isJustify,
  } = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: editor?.isActive("bold") ?? false,
      isItalic: editor?.isActive("italic") ?? false,
      isUnderline: editor?.isActive("underline") ?? false,
      isBulletList: editor?.isActive("bulletList") ?? false,
      isOrderedList: editor?.isActive("orderedList") ?? false,
      isLeft: editor?.isActive({ textAlign: "left" }) ?? false,
      isCenter: editor?.isActive({ textAlign: "center" }) ?? false,
      isRight: editor?.isActive({ textAlign: "right" }) ?? false,
      isJustify: editor?.isActive({ textAlign: "justify" }) ?? false,
    }),
  })

  if (!editor) {
    return null
  }

  const toolbar = [
    {
      id: 1,
      icon: Bold,
      onClick: () => editor.chain().focus().toggleBold().run(),
      active: isBold,
    },
    {
      id: 2,
      icon: Italic,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      active: isItalic,
    },
    {
      id: 3,
      icon: UnderlineIcon,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      active: isUnderline,
    },
    {
      id: 4,
      icon: List,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      active: isBulletList,
    },
    {
      id: 5,
      icon: ListOrdered,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      active: isOrderedList,
    },
    {
      id: 6,
      icon: AlignLeft,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      active: isLeft,
    },
    {
      id: 7,
      icon: AlignCenter,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      active: isCenter,
    },
    {
      id: 8,
      icon: AlignRight,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      active: isRight,
    },
    {
      id: 9,
      icon: AlignJustify,
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      active: isJustify,
    },
  ]

  useEffect(() => {
    if(!editor) { return }

    if(value !== editor.getHTML()) {
      editor.commands.setContent(value || "" || false)
    }
  }, [value, editor])

  return (
    <div className="relative w-full h-full flex flex-col rounded-lg border border-[#D9D9D9] overflow-hidden overflow-y-auto">
      {/* Toolbar */}
      <div className="sticky inset-0 z-50 flex items-center gap-1 border-b border-[#D9D9D9] bg-[#E6E6E64F] p-2">
        {toolbar.map((tool) => (
          <RichTextToolBarButton
            key={tool.id}
            onClick={tool.onClick}
            isActive={tool.active}
            icon={tool.icon}
          />
        ))}
      </div>

      <EditorContent
        editor={editor}
        className="tiptap p-2"
      />
    </div>
  )
}