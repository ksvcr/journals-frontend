import UICommand from '../UICommand';
import applyMark from '../applyMark';
import isTextStyleMarkCommandEnabled from '../isTextStyleMarkCommandEnabled';

function setFontSize(tr, schema, pt) {
  const markType = schema.marks['mark-font-size'];
  if (!markType) {
    return tr;
  }
  const attrs = pt ? { pt } : null;
  tr = applyMark(tr, schema, markType, attrs);
  return tr;
}

class FontSizeCommand extends UICommand {
  _popUp = null;
  _pt = 0;

  constructor(pt) {
    super();
    this._pt = pt;
  }

  isEnabled = (state) => {
    return isTextStyleMarkCommandEnabled(state, 'mark-font-size');
  };

  execute = (
    state,
    dispatch,
    view
  ) => {
    const { schema, selection } = state;
    const tr = setFontSize(state.tr.setSelection(selection), schema, this._pt);
    if (tr.docChanged || tr.storedMarksSet) {
      // If selection is empty, the color is added to `storedMarks`, which
      // works like `toggleMark`
      // (see https://prosemirror.net/docs/ref/#commands.toggleMark).
      dispatch && dispatch(tr);
      return true;
    }
    return false;
  };
}

export default FontSizeCommand;
