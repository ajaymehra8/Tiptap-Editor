import { useState, useRef, useEffect } from "react";
import React from "react";

const MenuBar = ({ editor }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const btnRef = useRef(null);

  useEffect(() => {
    if (isDarkMode) {
      if (btnRef.current) btnRef?.current?.click();
    }
  }, [isDarkMode]);
  if (!editor) return null;

  // Function to check if the current color is the one applied
  const isActiveColor = (color) => {
    return editor.storage.editorColor.editorColor === color;
  };
  const openEmojiPicker = () => {
    // Trigger the emoji picker action from your editor extension
    const emojiPickerExtension = editor.extensionManager.extensions.find(
      (extension) => extension.name === "emojiPicker"
    );
    if (emojiPickerExtension) {
      emojiPickerExtension.config.addMenuItems().action(editor);
    }
  };
  const openImageUpload = () => {
    // Find the imageUpload extension
    const imageUploadExtension = editor.extensionManager.extensions.find(
      (ext) => ext.name === "imageUpload"
    );
    console.log(imageUploadExtension.config.addMenuItems);

    if (imageUploadExtension) {
      // Call the action directly
      imageUploadExtension.config.addMenuItems()[0].action(editor);
    }
  };

 
  

  return (
    <div className="menu-bar">
      <h1
        style={{
          color: "white",
          fontStyle: "Roboto,sans-serif",
          fontWeight: "500",
          letterSpacing: "1px",
          fontSize: "clamp(25px,4vw,30px)",
          cursor: "pointer",
        }}
      >
        <span>T</span>ext<span>E</span>ditor
      </h1>
      <div className="btns">
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={editor.isActive("highlight") ? "is-active " : ""}
        >
          <i className="bi bi-highlighter"></i>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active " : ""}
        >
          <i className="bi bi-type-bold"></i>
        </button>

        <button
          onClick={() => {
            console.log(editor.commands);
            editor.commands.setEditorColor("rgb(47, 47, 47)");
          }}
          ref={btnRef}
          className={isActiveColor("rgb(47, 47, 47)") ? "is-active" : ""}
        >
          <i className="bi bi-moon-stars"></i>
        </button>
        <button onClick={openEmojiPicker}>
          <i className="bi bi-emoji-smile"></i>
        </button>
        <button onClick={openImageUpload}>
          <i className="bi bi-image"></i>
        </button>
        
      </div>
    </div>
  );
};

export default MenuBar;
