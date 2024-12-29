import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import { Highlight } from "@tiptap/extension-highlight";
import Underline from '@tiptap/extension-underline';
import Italic from '@tiptap/extension-italic';  // Import italic extension
import "./App.css";
import MenuBar from "./Components/MenuBar";

// Custom Highlight and Underline Button

const App = () => {
  // Initialize the Tiptap editor with necessary extensions
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Highlight.configure({
        multicolor: true,
      }),
      Underline,
      Italic,  // Add italic extension
    ],
    content: "<p>Write here.</p>",
  });

  return (
    <div className="App">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
      />
    </div>
  );
};

export default App;
