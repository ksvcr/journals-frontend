import UICommand from '../UICommand';
import applyMark from '../applyMark';
import findNodesWithSameMark from '../findNodesWithSameMark';
import isTextStyleMarkCommandEnabled from '../isTextStyleMarkCommandEnabled';
import React from 'react';

class TextColorCommand extends UICommand {
  isEnabled = (state) => {
    return isTextStyleMarkCommandEnabled(state, 'mark-text-color');
  };

  renderBox = ({ onChange }) => {
    return <div onClick={ onChange.bind(null, '#eee') }>jopa</div>
  };

  waitForUserInput = (
    state,
    dispatch,
    view,
    event,
    renderBox
  ) => {
    const target = event.currentTarget;
    if (!(target instanceof HTMLElement)) {
      return Promise.resolve(undefined);
    }

    const { doc, selection, schema } = state;
    const markType = schema.marks['mark-text-color'];
    const { from, to } = selection;
    const result = findNodesWithSameMark(doc, from, to, markType);
    const color = result ? result.mark.attrs.color : null;

    return new Promise(resolve => {

      if (renderBox) {
        renderBox({ color, onChange: ({ r, g, b, a }) => { resolve(`rgba(${r},${g},${b},${a})`) } });
      }
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
