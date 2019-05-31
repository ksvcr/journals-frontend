import ReactDOM from 'react-dom';

import SelectionObserver from './SelectionObserver';

// Standard className for selected node.
const SELECTED_NODE_CLASS_NAME = 'ProseMirror-selectednode';

const mountedViews = new Set();
const pendingViews = new Set();

function onMutation(mutations, observer) {
  const root = document.body;
  if (!root) {
    return;
  }

  const mountingViews = [];
  for (const view of pendingViews) {
    const el = view.dom;
    if (root.contains(el)) {
      pendingViews.delete(view);
      mountingViews.push(view);
      view.__renderReactComponent();
    }
  }

  for (const view of mountedViews) {
    const el = view.dom;
    if (!root.contains(el)) {
      mountedViews.delete(el);
      ReactDOM.unmountComponentAtNode(el);
    }
  }

  mountingViews.forEach(view => mountedViews.add(view));

  if (mountedViews.size === 0) {
    observer.disconnect();
  }
}

// Workaround to get in-selection views selected.
// See https://discuss.prosemirror.net/t/copy-selection-issue-with-the-image-node/1673/2;
function onSelection(entries, observer) {
  if (!window.getSelection) {
    console.warn('window.getSelection() is not supported');
    observer.disconnect();
    return;
  }

  const selection = window.getSelection();
  if (!selection.containsNode) {
    console.warn('selection.containsNode() is not supported');
    observer.disconnect();
    return;
  }

  for (const view of mountedViews) {
    const el = view.dom;
    if (selection.containsNode(el)) {
      view.selectNode();
    } else {
      view.deselectNode();
    }
  }

  if (mountedViews.size === 0) {
    observer.disconnect();
  }
}

const selectionObserver = new SelectionObserver(onSelection);
const mutationObserver = new MutationObserver(onMutation);

// This implements the `NodeView` interface and renders a Node with a react
// Component.
// https://prosemirror.net/docs/ref/#view.NodeView
// https://github.com/ProseMirror/prosemirror-view/blob/master/src/viewdesc.js#L429
class CustomNodeView {
  constructor(
    node,
    editorView,
    getPos,
    decorations
  ) {
    this.props = {
      decorations,
      editorView,
      getPos,
      node,
      selected: false,
      focused: false,
    };

    pendingViews.add(this);

    // The editor will use this as the node's DOM representation
    const dom = this.createDOMElement();
    this.dom = dom;
    dom.onClick = this._onClick;

    if (pendingViews.size === 1) {
      mutationObserver.observe(document, { childList: true, subtree: true });
      selectionObserver.observe(document);
    }
  }

  update(node, decorations) {
    this.props = {
      ...this.props,
      node,
    };
    this.__renderReactComponent();
    return true;
  }

  stopEvent() {
    return false;
  }

  // Mark this node as being the selected node.
  selectNode() {
    this._selected = true;
    this.dom.classList.add(SELECTED_NODE_CLASS_NAME);
    this.__renderReactComponent();
  }

  // Remove selected node marking from this node.
  deselectNode() {
    this._selected = false;
    this.dom.classList.remove(SELECTED_NODE_CLASS_NAME);
    this.__renderReactComponent();
  }

  // This should be overwrite by subclass.
  createDOMElement() {
    // The editor will use this as the node's DOM representation.
    // return document.createElement('span');
    throw new Error('not implemented');
  }

  // This should be overwrite by subclass.
  renderReactComponent() {
    // return <CustomNodeViewComponent {...this.props} />;
    throw new Error('not implemented');
  }

  destroy() {
    // Called when the node view is removed from the editor or the whole
    // editor is destroyed.
    // sub-class may override this method.
  }

  __renderReactComponent() {
    const { editorView, getPos } = this.props;

    if (editorView.state && editorView.state.selection) {
      const { from } = editorView.state.selection;
      const pos = getPos();
      this.props.selected = this._selected;
      this.props.focused = editorView.focused && pos === from;
    } else {
      this.props.selected = false;
      this.props.focused = false;
    }

    ReactDOM.render(this.renderReactComponent(), this.dom);
  }
}

export default CustomNodeView;
