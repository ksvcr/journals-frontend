import { findParentNodeOfType } from 'prosemirror-utils';

import toggleHeading from '../toggleHeading';
import UICommand from '../UICommand';

class HeadingCommand extends UICommand {
  constructor(level) {
    super();
    this._level = level;
  }

  isActive = (state) => {
    const result = this._findHeading(state);
    return !!(
      result &&
      result.node &&
      result.node.attrs &&
      result.node.attrs.level === this._level
    );
  };

  execute = (
    state,
    dispatch,
    view
  ) => {
    const { schema, selection } = state;
    const tr = toggleHeading(
      state.tr.setSelection(selection),
      schema,
      this._level
    );
    if (tr.docChanged) {
      dispatch && dispatch(tr);
      return true;
    } else {
      return false;
    }
  };

  _findHeading(state) {
    const heading = state.schema.nodes['heading'];
    const fn = heading ? findParentNodeOfType(heading) : function() {};
    return fn(state.selection);
  }
}

export default HeadingCommand;
