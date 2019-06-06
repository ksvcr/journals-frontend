import { EditorView } from 'prosemirror-view';

// https://github.com/ProseMirror/prosemirror-view/blob/master/src/index.js
class CustomEditorView extends EditorView {
  constructor(place, props) {
    super(place, props);
    this.runtime = null;
    this.readOnly = true;
    this.disabled = true;
    this.placeholder = null;
  }

  destroy() {
    super.destroy();
    this._props = {};
  }
}

export default CustomEditorView;
