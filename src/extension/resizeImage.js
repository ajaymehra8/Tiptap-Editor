import { Node } from "@tiptap/core";

const ImageNode = Node.create({
  name: "image",
  group: "block",
  inline: false,
  atom: false,

  addAttributes() {
    return {
      src: { default: null },
      width: { default: null },
      height: { default: null },
    };
  },

  renderHTML({ node }) {
    return [
      "img",
      {
        src: node.attrs.src,
        width: node.attrs.width,
        height: node.attrs.height,
        style: "max-width: 100%; height: auto; cursor: grab;",
      },
    ];
  },

  parseHTML() {
    return [{ tag: "img[src]" }];
  },

  addNodeView() {
    return (props) => {
      const { editor } = props;
      const img = document.createElement("img");
      img.src = props.node.attrs.src;
      img.style.cursor = "grab";
      img.draggable = true;

      if (props.node.attrs.width) img.style.width = `${props.node.attrs.width}px`;
      if (props.node.attrs.height) img.style.height = `${props.node.attrs.height}px`;
   
      // Resizing logic
      img.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = img.offsetWidth;
        const startHeight = img.offsetHeight;

        const mouseMoveHandler = (moveEvent) => {
          const deltaX = moveEvent.clientX - startX;
          const deltaY = moveEvent.clientY - startY;

          img.style.width = `${startWidth + deltaX}px`;
          img.style.height = `${startHeight + deltaY}px`;

          if (editor.state.selection && editor.state.selection.empty) {
            editor.commands.updateAttributes(props.getPos(), {
              width: img.offsetWidth,
              height: img.offsetHeight,
            });
          }
        };

        const mouseUpHandler = () => {
          document.removeEventListener("mousemove", mouseMoveHandler);
          document.removeEventListener("mouseup", mouseUpHandler);
        };

        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
      });

      return { dom: img };
    };
  },
});

export default ImageNode;
