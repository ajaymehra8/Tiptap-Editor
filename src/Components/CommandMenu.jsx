import { useState, useEffect } from "react";

const commands = [
  { name: "Heading", command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run() },
  { name: "Bold", command: (editor) => editor.chain().focus().toggleBold().run() },
  { name: "HighLight", command: (editor) => editor.chain().focus().toggleHighlight().run() },
];

const CommandMenu = ({ editor }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Use showMenu state from storage
  const visible = editor?.storage?.slashCommand?.showMenu ?? false;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!visible) return;
      
      if (event.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev + 1) % commands.length);
      } else if (event.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev - 1 + commands.length) % commands.length);
      } else if (event.key === "Enter") {
        commands[selectedIndex].command(editor);
        editor.storage.slashCommand.showMenu = false; // Close menu
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
            editor.storage.slashCommand.showMenu = false;
          }}
        >
          {cmd.name}
        </div>
      ))}
    </div>
  ) : null;
};

export default CommandMenu;
