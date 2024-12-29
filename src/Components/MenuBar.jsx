import React from "react";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

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
          className={editor.isActive("highlight") ? "is-active btn" : ""}
        >
          <i className="bi bi-highlighter"></i>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active btn" : ""}
        >
          <i className="bi bi-type-underline"></i>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active btn" : ""}
        >
          <i className="bi bi-type-italic"></i>
        </button>
      </div>
    </div>
  );
};

export default MenuBar;
