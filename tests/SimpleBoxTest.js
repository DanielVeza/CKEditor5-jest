import { setData, parse } from '@ckeditor/ckeditor5-engine/src/dev-utils/model';
import VirtualTestEditor from './VirtualTestEditor';
import SimpleBoxEditing from "../js/SimpleBox/src/simpleboxediting";

describe('SimpleBox tests', () => {
  let editor;
  let model;

  beforeEach(async () => {
    const virtualEditor = await VirtualTestEditor.createEditor([SimpleBoxEditing]);
    editor = virtualEditor.editor;
    model = virtualEditor.model;
  });

  afterEach(() => {
    editor.destroy();
  });

  it('Test Simplebox downcasting', () => {
    // Set up the model.
    const data = `<simpleBox><simpleBoxTitle>The title</simpleBoxTitle><simpleBoxDescription><paragraph>The description</paragraph></simpleBoxDescription></simpleBox>`;

    // Expected markup after processing.
    const expected = `<section class="simple-box"><h2 class="simple-box-title">The title</h2><div class="simple-box-description"><p>The description</p></div></section>`;

    // Test conversion.
    setData(model, data);
    expect(editor.data.get()).toBe(expected);
  });
});