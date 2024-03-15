import Editor from '@ckeditor/ckeditor5-core/src/editor/editor';
import { EditorUI } from '@ckeditor/ckeditor5-ui';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';

/**
 * A virtual editor for testing purposes.
 *
 * This is copied from the Ckeditor source. They don't export it, so we have to
 * copy it here manually.
 */
export default class VirtualTestEditor extends Editor {
  constructor(config) {
    super(config);

    // Create the ("main") root element of the model tree.
    this.model.document.createRoot();
  }

  initPlugins() {
    return super.initPlugins();
  }

  static create(config = {}) {
    return new Promise((resolve) => {
      const editor = new this(config);
      editor.ui = new EditorUI(editor);
      resolve(
        editor
          .initPlugins()
          .then(() => editor.data.init(config.initialData || ''))
          .then(() => {
            editor.fire('ready');
            return editor;
          }),
      );
    });
  }

  /**
   * Factory method for creating a new editor instance.
   */
  static async createEditor(addedPlugins) {
    let editor = null;
    let model = null;
    await VirtualTestEditor.create({
      plugins: [Paragraph, ...addedPlugins],
    })
      .then((newEditor) => {
        editor = newEditor;
        model = editor.model;
      })
      .catch((error) => {
        console.error(error);
      });
    return { editor, model };
  }
}