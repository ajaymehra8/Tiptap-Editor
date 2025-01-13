import { Node } from "@tiptap/core";

const ImageNode = Node.create({
  name: "image",

  group: "block",
  inline: false,
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      width: {
        default: null,
      },
      height: {
        default: null,
      },
    };
  },

  renderHTML({ node }) {
    const { width, height } = node.attrs;
    return [
      "img",
      {
        src: node.attrs.src,
        width,
        height,
        style: "max-width: 100%; height: auto;",
      },
    ];
  },

  parseHTML() {
    return [
      {
        tag: "img[src]",
      },
    ];
  },

  addNodeView() {
    return (props) => {
      const { editor } = props; // Get the editor instance from props
      const img = document.createElement("img");
      img.src = props.node.attrs.src;

      // Set initial width and height if provided
      if (props.node.attrs.width) {
        img.style.width = `${props.node.attrs.width}px`;
      }
      if (props.node.attrs.height) {
        img.style.height = `${props.node.attrs.height}px`;
      }

      // Enable image resizing by dragging
      img.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = img.offsetWidth;
        const startHeight = img.offsetHeight;

        const mouseMoveHandler = (moveEvent) => {
          const deltaX = moveEvent.clientX - startX;
          const deltaY = moveEvent.clientY - startY;

          // Update image size
          img.style.width = `${startWidth + deltaX}px`;
          img.style.height = `${startHeight + deltaY}px`;

          // Ensure `updateAttributes` is used properly in the context
          console.log(props.node.id, props.node);
          if (editor.state.selection && editor.state.selection.empty) {
            const nodePos = editor.state.selection.$anchor.pos; // Get the node's position

            editor.commands.updateAttributes(nodePos, {
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

      return {
        dom: img,
      };
    };
  },
});

export default ImageNode;
