import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Bold from "@tiptap/extension-bold"; // Import bold extension
import Highlight from "@tiptap/extension-highlight";
import "./App.css";
import MenuBar from "./Components/MenuBar";
import EditorColor from "./extension/editorColor";
import EmojiPicker from "./extension/emojiPicker";
import ImageUpload from "./extension/imageUpload";
import ImageNode from "./extension/resizeImage";
import { SlashCommand } from "./extension/slashCommand";

import CommandMenu from "./Components/CommandMenu";
// Custom Highlight and Underline Button

const App = () => {
  // Initialize the Tiptap editor with necessary extensions
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      ImageNode,
      Highlight.configure({
        multicolor: true,
      }),
      EditorColor,
      EmojiPicker,
      ImageUpload,
      SlashCommand,
      Bold
    ],
    content: "<p></p>", 
    autofocus: true,
  });

  return (
    <div className="App">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      {editor && <CommandMenu editor={editor}/>}

    </div>
  );
};

export default App;
