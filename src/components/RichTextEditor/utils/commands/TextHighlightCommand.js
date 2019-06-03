// @flow

import ColorEditor from '../../components/ColorEditor';
import UICommand from '../UICommand';
import applyMark from '../applyMark';
import createPopUp from '../createPopUp';
import findNodesWithSameMark from '../findNodesWithSameMark';
import isTextStyleMarkCommandEnabled from '../isTextStyleMarkCommandEnabled';

class TextHighlightCommand extends UICommand {
  _popUp = null;

  isEnabled = (state) => {
    return isTextStyleMarkCommandEnabled(state, 'mark-text-hightlight');
  };

  waitForUserInput = (
    state,
    dispatch,
    view,
    event
  ) => {
    if (this._popUp) {
      return Promise.resolve(undefined);
    }
    const target = event.currentTarget;
    if (!(target instanceof HTMLElement)) {
      return Promise.resolve(undefined);
    }

    const { doc, selection, schema } = state;
    const markType = schema.marks['mark-text-hightlight'];
    const { from, to } = selection;
    const result = findNodesWithSameMark(doc, from, to, markType);
    const hex = result ? result.mark.attrs.highlightColor : null;
    const anchor = event ? event.currentTarget : null;
    return new Promise(resolve => {
      this._popUp = createPopUp(
        ColorEditor,
        { hex },
        {
          anchor,
          onClose: val => {
            if (this._popUp) {
              this._popUp = null;
              resolve(val);
            }
          },
        }
      );
    });
  };

  executeWithUserInput = (
    state,
    dispatch,
    view,
    color
  ) => {
    if (dispatch && color !== undefined) {
      const { schema } = state;
      let { tr } = state;
      const markType = schema.marks['mark-text-hightlight'];
      const attrs = color ? { highlightColor: color } : null;
      tr = applyMark(tr.setSelection(state.selection), schema, markType, attrs);
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

export default TextHighlightCommand;
