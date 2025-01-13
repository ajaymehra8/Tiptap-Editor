import { Extension } from "@tiptap/core";

const EditorColor = Extension.create({
  name: "editorColor",
  addStorage() {
    return {
      editorColor: null, // Store the editor color here
    };
  },

  // Remove the attribute and directly manipulate the editor container
  addCommands() {
    return {
      setEditorColor:
        (color) =>
        ({ view }) => {
          // Apply the background color to the editor container
          const currentColor = view.dom.style.backgroundColor;
console.log(color,currentColor);
          // Toggle between the color and white
          if (currentColor === color) {
            view.dom.style.color="black";
            this.storage.editorColor = "white"; // Set the editor color in storage

            view.dom.style.backgroundColor = "white"; // Set to default white if already the color
          } else {
            view.dom.style.backgroundColor = color; // Set to the new color if not
            this.storage.editorColor = color; // Set the editor color in storage

            view.dom.style.color="white";

          }
        },
    };
  },
});

export default EditorColor;
