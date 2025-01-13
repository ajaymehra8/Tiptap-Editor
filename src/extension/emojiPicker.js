import { Extension } from '@tiptap/core';

const EmojiPicker = Extension.create({
  name: 'emojiPicker',

  addCommands() {
    return {
      insertEmoji: (emoji) => ({ commands }) => {
        commands.insertContent(emoji);
      },
    };
  },

  addMenuItems() {
    return [
      {
        name: 'emoji-picker',
        icon: '😊',
        action: (editor) => {
          const emojiPicker = document.createElement('div');
          emojiPicker.style.position = 'absolute';
          emojiPicker.style.border = '1px solid #ccc';
          emojiPicker.style.backgroundColor = 'white';
          emojiPicker.style.padding = '5px';
          emojiPicker.style.zIndex = '1000';

          const emojis = ['😊', '😂', '😍', '😎', '🤔', '👍', '🙏', '🥺'];
          
          emojis.forEach((emoji) => {
            const emojiBtn = document.createElement('button');
            emojiBtn.innerText = emoji;
            emojiBtn.onclick = () => {
              editor.commands.insertEmoji(emoji); // Insert the selected emoji
              document.body.removeChild(emojiPicker); // Close picker after selection
            };
            emojiPicker.appendChild(emojiBtn);
          });

          document.body.appendChild(emojiPicker);
          
          // Position the picker relative to the editor or cursor
          const { top, left } = editor.view.dom.getBoundingClientRect();
          emojiPicker.style.top = `${top + 40}px`;
          emojiPicker.style.left = `${left}px`;
        },
      },
    ];
  },
});

export default EmojiPicker;
