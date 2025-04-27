import { useState, useEffect } from "react";

const commands = [
  {
    name: "Heading",
    command: (editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    name: "Bold",
    command: (editor) => editor.chain().focus().toggleBold().run(),
  },
  {
    name: "HighLight",
    command: (editor) => editor.chain().focus().toggleHighlight().run(),
  },
  {
    name: "Emoji Picker",
    command: (editor) => {
      const emojiPickerExtension = editor.extensionManager.extensions.find(
        (extension) => extension.name === "emojiPicker"
      );
      if (emojiPickerExtension) {
        emojiPickerExtension.config.addMenuItems().action(editor);
      }
    },
  },
  {
    name: "Upload Image",
    command: (editor) => {
        const imageUploadExtension = editor.extensionManager.extensions.find(
            (ext) => ext.name === "imageUpload"
          );
          console.log(imageUploadExtension.config.addMenuItems);
      
          if (imageUploadExtension) {
            // Call the action directly
            imageUploadExtension.config.addMenuItems()[0].action(editor);
          }
    },
  },
];

const CommandMenu = ({ editor }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const visible = editor?.storage?.slashCommand?.showMenu ?? false;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!visible) return;

      if (event.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev + 1) % commands.length);
      } else if (event.key === "ArrowUp") {
        setSelectedIndex(
          (prev) => (prev - 1 + commands.length) % commands.length
        );
      } else if (event.key === "Enter") {
        editor.storage.slashCommand.showMenu = false;

        commands[selectedIndex].command(editor);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, visible]);

  return visible ? (
    <div className="command-menu">
      {commands.map((cmd, index) => (
        <div
          key={cmd.name}
          className={`command-item ${selectedIndex === index ? "active" : ""}`}
          onClick={() => {
            cmd.command(editor);
          }}
        >
          {cmd.name}
        </div>
      ))}
    </div>
  ) : null;
};

export default CommandMenu;
