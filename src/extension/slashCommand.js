import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";

export const SlashCommand = Extension.create({
  name: "slashCommand",

  addCommands() {
    return {
      openCommandMenu:
        () =>
        ({ editor }) => {
          if (editor) {
            editor.storage.slashCommand.showMenu = true;
            editor.commands.focus();
          }
          return true;
        },
      closeCommandMenu:
        () =>
        ({ editor }) => {
          if (editor) {
            console.log("Closing Command Menu");
            editor.storage.slashCommand.showMenu = false;
          }
          return true;
        },
    };
  },

  addStorage() {
    return {
      showMenu: false,
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("slashCommand"),
        props: {
          handleKeyDown: (view, event) => {
            const editor = this.editor;
            if (!editor) return false;

            const text = editor.getText();

            if (event.key === "/") {
              if (text.length === 0) {
                editor.commands.openCommandMenu();
              }
              return false;
            } else {
                const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

              if (!arrowKeys.includes(event.key)&& editor.storage.slashCommand.showMenu) {
                if(event.key==='Enter'){
                    return true;
                }
                editor.commands.closeCommandMenu();
              }
            }

            return false;
          },
        },
      }),
    ];
  },
});
