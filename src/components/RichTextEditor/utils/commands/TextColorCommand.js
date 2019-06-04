import UICommand from '../UICommand';
import applyMark from '../applyMark';
import findNodesWithSameMark from '../findNodesWithSameMark';
import isTextStyleMarkCommandEnabled from '../isTextStyleMarkCommandEnabled';

class TextColorCommand extends UICommand {
  isEnabled = (state) => {
    return isTextStyleMarkCommandEnabled(state, 'mark-text-color');
  };

  getColor = (
    state
  ) => {
    const { doc, selection, schema } = state;
    const markType = schema.marks['mark-text-color'];
    const { from, to } = selection;
    const result = findNodesWithSameMark(doc, from, to, markType);
    return result ? result.mark.attrs.color : null;
  };

  execute = (
    state,
    dispatch,
    view,
    color
  ) => {
    if (dispatch && color !== undefined) {
      const { schema } = state;
      let { tr } = state;
      const markType = schema.marks['mark-text-color'];
      const attrs = color ? { color } : null;
      tr = applyMark(
        state.tr.setSelection(state.selection),
        schema,
        markType,
        attrs
      );
      if (tr.docChanged || tr.storedMarksSet) {
        // If selection is empty, the color is added to `storedMarks`, which
        // works like `toggleMark`
        // (see https://prosemirror.net/docs/ref/#commands.toggleMark).
        dispatch && dispatch(tr);
        return true;
      }
    }
    return false;
  };
}

export default TextColorCommand;
