import { useEffect, useRef } from "react";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";
import "./styles.css";

const schema = {
  type: "array",
  title: "Domain Configuration",
  items: {
    type: "object",
    properties: {
      name: {
        type: "string",
        readOnly: true,
        template: "🌐 {{self}}",
        default: "rollin.io",
      },
      "maintenance-template": {
        type: "string",
        enum: ["rollin-v1", "pixelcraft-prod", "emergency"],
        readOnly: true,
        options: {
          enum_titles: ["🚀 Rollin", "🎨 Pixelcraft", "🚨 Emergency"],
        },
      },
      "new-link": {
        type: "boolean",
        readOnly: true,
        options: {
          input_type: "checkbox",
        },
      },
      "default-language": {
        type: "string",
        enum: ["en-US", "ja-JP", "kr-KR"],
        readOnly: true,
        options: {
          enum_titles: ["🇺🇸 English", "🇯🇵 日本語", "🇰🇷 한국어"],
        },
      },
    },
    required: ["name", "maintenance-template"],
  },
};

const initialData = [
  {
    name: "rollin.io",
    "maintenance-template": "rollin-v1",
    "new-link": true,
    "default-language": "en-US",
  },
];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<JSONEditor | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      editorRef.current = new JSONEditor(containerRef.current, {
        schema,
        startval: initialData,
        options: {
          mode: "view",
          modes: ["view"],
          theme: "barebones",
          iconlib: "none",
          disable_edit_json: true,
          disable_properties: true,
          disable_array_add: true,
          disable_array_delete: true,
          disable_array_reorder: true,
          show_errors: "never",
          layout: "grid",
          grid_columns: 4,
        },
      });
    }

    return () => {
      editorRef.current?.destroy();
    };
  }, []);

  return <div ref={containerRef} className="jsoneditor-container" />;
}
