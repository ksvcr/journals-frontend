import { Plugin } from 'prosemirror-state';

import findActionableCell from './findActionableCell';
import { atAnchorTopRight } from './PopUpPosition';
import TableCellMenu from '../components/TableCellMenu';
import bindScrollHandler from './bindScrollHandler';
import createPopUp from './createPopUp';
import { fromHTMlElement } from './rects';

class TableCellTooltipView {
  _popUp = null;
  _scrollHandle = null;

  constructor(editorView) {
    this.update(editorView, null);
  }

  update(view, lastState) {
    const { state, readOnly } = view;
    const result = findActionableCell(state);

    if (!result || readOnly) {
      this.destroy();
      return;
    }

    // These is screen coordinate.
    const domFound = view.domAtPos(result.pos + 1);
    if (!domFound) {
      this.destroy();
      return;
    }

    let cellEl = domFound.node;
    const popUp = this._popUp;
    const viewPops = {
      editorState: state,
      editorView: view,
    };

    if (cellEl && !isElementFullyVisible(cellEl)) {
      cellEl = null;
    }

    if (!cellEl) {
      // Closes the popup.
      popUp && popUp.close();
      this._cellElement = null;
    } else if (popUp && cellEl === this._cellElement) {
      // Updates the popup.
      popUp.update(viewPops);
    } else {
      // Creates a new popup.
      popUp && popUp.close();
      this._cellElement = cellEl;
      this._popUp = createPopUp(TableCellMenu, viewPops, {
        anchor: cellEl,
        autoDismiss: false,
        onClose: this._onClose,
        position: atAnchorTopRight,
      });
      this._onOpen();
    }
  }

  destroy = () => {
    this._popUp && this._popUp.close();
    this._popUp = null;
  };

  _onOpen = () => {
    const cellEl = this._cellElement;
    if (!cellEl) {
      return;
    }
    this._scrollHandle = bindScrollHandler(cellEl, this._onScroll);
  };

  _onClose = () => {
    this._popUp = null;
    this._scrollHandle && this._scrollHandle.dispose();
    this._scrollHandle = null;
  };

  _onScroll = () => {
    const popUp = this._popUp;
    const cellEl = this._cellElement;
    if (!popUp || !cellEl) {
      return;
    }
    if (!isElementFullyVisible(cellEl)) {
      popUp.close();
    }
  };
}

function isElementFullyVisible(el) {
  const { x, y, w, h } = fromHTMlElement(el);
  // Only checks the top-left point.
  const nwEl = w && h ? el.ownerDocument.elementFromPoint(x + 1, y + 1) : null;

  if (!nwEl) {
    return false;
  }

  if (nwEl === el) {
    return true;
  }

  if (el.contains(nwEl)) {
    return true;
  }

  return false;
}

const SPEC = {
  view(editorView) {
    return new TableCellTooltipView(editorView);
  },
};

class TableCellMenuPlugin extends Plugin {
  constructor() {
    super(SPEC);
  }
}

export default TableCellMenuPlugin;
