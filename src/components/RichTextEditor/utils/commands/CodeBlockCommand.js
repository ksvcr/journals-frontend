import { findParentNodeOfType } from 'prosemirror-utils';

import toggleCodeBlock from '../toggleCodeBlock';
import UICommand from '../UICommand';

class CodeBlockCommand extends UICommand {
  isActive = (state) => {
    const result = this._findCodeBlock(state);
    return !!(result && result.node);
  };

  execute = (
    state,
    dispatch,
    view
  ) => {
    const { selection, schema } = state;
    let { tr } = state;
    tr = tr.setSelection(selection);
    tr = toggleCodeBlock(tr.setSelection(selection), schema);
    if (tr.docChanged) {
      dispatch && dispatch(tr);
      return true;
    } else {
      return false;
    }
  };

  _findCodeBlock(state) {
    const codeBlock = state.schema.nodes['code_block'];
    const findCodeBlock = codeBlock ? findParentNodeOfType(codeBlock) : function() {};
    return findCodeBlock(state.selection);
  }
}

export default CodeBlockCommand;
