"use client";

import { useCallback, useEffect } from "react";
import { useEditor, EditorContent, type Editor as TTEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { adminApi } from "@/lib/admin/client";

const lowlight = createLowlight(common);

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export default function Editor({ value, onChange, placeholder = "Yozishni boshlang..." }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: { levels: [1, 2, 3, 4] },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "javascript",
        HTMLAttributes: { class: "hljs" },
      }),
      Image.configure({ inline: false, HTMLAttributes: { loading: "lazy", decoding: "async" } }),
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" } }),
      Placeholder.configure({ placeholder }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "prose-content min-h-[400px] focus:outline-none p-5",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "<p></p>", false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!editor) return <div className="skeleton h-[500px] rounded-xl" />;

  return (
    <div className="rounded-xl ring-1 ring-ink-200 bg-white">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({ editor }: { editor: TTEditor }) {
  const setLink = useCallback(() => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL kiriting:", prev || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(async () => {
    const inp = document.createElement("input");
    inp.type = "file";
    inp.accept = "image/*";
    inp.onchange = async () => {
      const f = inp.files?.[0];
      if (!f) return;
      try {
        const res = await adminApi.upload<{ secure_url: string; url: string }>("/admin/upload", f);
        editor.chain().focus().setImage({ src: res.secure_url || res.url, alt: f.name }).run();
      } catch (err) {
        alert(`Yuklash xatosi: ${err instanceof Error ? err.message : String(err)}`);
      }
    };
    inp.click();
  }, [editor]);

  const setCodeBlockLang = useCallback(() => {
    const lang = window.prompt("Til (js, go, python, java, ts, sql, html, css, bash, ...):", "javascript");
    if (!lang) return;
    editor.chain().focus().toggleCodeBlock({ language: lang }).run();
  }, [editor]);

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-ink-100 p-2 bg-ink-50/40 rounded-t-xl sticky top-0 z-10">
      <Btn active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} label="B" title="Bold (Ctrl+B)" />
      <Btn active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} label="I" title="Italic" italic />
      <Btn active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()} label="S" title="Strikethrough" strike />
      <Sep />
      <Btn active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} label="H1" />
      <Btn active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} label="H2" />
      <Btn active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} label="H3" />
      <Sep />
      <Btn active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} label="• Ro'yxat" />
      <Btn active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} label="1. Ro'yxat" />
      <Btn active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} label="❝ Quote" />
      <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} label="―" title="Divider" />
      <Sep />
      <Btn active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()} label="‹/›" title="Inline code" />
      <Btn active={editor.isActive("codeBlock")} onClick={setCodeBlockLang} label="{ } Kod" title="Code block" />
      <Sep />
      <Btn active={editor.isActive("link")} onClick={setLink} label="🔗 Link" />
      <Btn onClick={addImage} label="🖼 Rasm" />
      <Btn
        onClick={() =>
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        }
        label="▦ Jadval"
      />
      <Sep />
      <Btn onClick={() => editor.chain().focus().undo().run()} label="↶" title="Undo" />
      <Btn onClick={() => editor.chain().focus().redo().run()} label="↷" title="Redo" />
    </div>
  );
}

function Btn({
  active,
  onClick,
  label,
  title,
  italic,
  strike,
}: {
  active?: boolean;
  onClick: () => void;
  label: string;
  title?: string;
  italic?: boolean;
  strike?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title || label}
      className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition ${
        active ? "bg-brand-600 text-white" : "text-ink-700 hover:bg-ink-100"
      } ${italic ? "italic" : ""} ${strike ? "line-through" : ""}`}
    >
      {label}
    </button>
  );
}

function Sep() {
  return <span className="mx-1 h-5 w-px bg-ink-200" />;
}
