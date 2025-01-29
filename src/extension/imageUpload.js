import { Extension } from '@tiptap/core';

const ImageUpload = Extension.create({
  name: 'imageUpload',

  addCommands() {
    return {
      insertImage: (url) => ({ commands }) => {
        return commands.insertContent({
          type: 'image', // Use the image node type
          attrs: {
            src: url, // Set the image source attribute
            width: 200, // Initial width, can be adjusted later
            height: 200, // Initial height, can be adjusted later
          },
        });
      },
    };
  },
  
  addKeyboardShortcuts() {
    console.log("ImageUpload extension loaded"); 

    return {
      "Mod-l": ({ editor }) => {
        const imageUploadExtension = editor.extensionManager.extensions.find(
          (ext) => ext.name === 'imageUpload'
        );
  
        if (imageUploadExtension) {
          // Call the action directly
          imageUploadExtension.config.addMenuItems()[0].action(editor);
        }
        return true;
      },
    };
  },
  addMenuItems() {
    return [
      {
        name: 'image-upload',
        icon: '📷', // Image icon for the button
        action: (editor) => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*'; // Restrict to image files only

          input.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
              // Create a FileReader to read the image
              const reader = new FileReader();
              reader.onload = (e) => {
                const imageUrl = e.target.result; // Get base64 URL
                editor.commands.insertImage(imageUrl); // Insert image to editor
              };
              reader.readAsDataURL(file);
            }
          });

          input.click(); // Open file picker dialog
        },
      },
      {
        name: 'image-url',
        icon: '🔗', // Link icon for inserting image URL
        action: (editor) => {
          const url = prompt('Enter the image URL:');
          if (url) {
            editor.commands.insertImage(url); // Insert image from URL
          }
        },
      },
    ];
  },
});

export default ImageUpload;
