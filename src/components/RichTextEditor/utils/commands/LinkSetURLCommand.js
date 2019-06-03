import { TextSelection } from 'prosemirror-state';

import applyMark from '../applyMark';
import findNodesWithSameMark from '../findNodesWithSameMark';
import LinkURLEditor from '../../components/LinkURLEditor';
import UICommand from '../UICommand';
import createPopUp from '../createPopUp';

class LinkSetURLCommand extends UICommand {
  _popUp = null;

  isEnabled = (state) => {
    if (!(state.selection instanceof TextSelection)) {
      // Could be a NodeSelection or CellSelection.
      return false;
    }

    const markType = state.schema.marks['link'];
    if (!markType) {
      return false;
    }
    const { from, to } = state.selection;
    return from < to;
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

    const { doc, schema, selection } = state;
    const markType = schema.marks['link'];
    if (!markType) {
      return Promise.resolve(undefined);
    }
    const { from, to } = selection;
    const result = findNodesWithSameMark(doc, from, to, markType);
    const href = result ? result.mark.attrs.href : null;
    const anchor = event ? event.currentTarget : null;

    return new Promise(resolve => {
      this._popUp = createPopUp(
        LinkURLEditor,
        { href },
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
    href
  ) => {
    if (dispatch) {
      const { selection, schema } = state;
      let { tr } = state;
      tr = tr.setSelection(selection);
      if (href !== undefined) {
        const markType = schema.marks['link'];
        const attrs = href ? { href } : null;
        tr = applyMark(
          tr.setSelection(state.selection),
          schema,
          markType,
          attrs
        );
      }
      dispatch(tr);
    }
    view && view.focus();
    return true;
  };
}

export default LinkSetURLCommand;
