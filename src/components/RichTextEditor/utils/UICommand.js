import { Transform } from 'prosemirror-transform';

function dryRunEditorStateProxyGetter(
  state,
  propKey
) {
  const val = state[propKey];
  if (propKey === 'tr' && val instanceof Transform) {
    return val.setMeta('dryrun', true);
  }
  return val;
}

function dryRunEditorStateProxySetter(
  state,
  propKey,
  propValue
) {
  state[propKey] = propValue;
  // Indicate success
  return true;
}

class UICommand {
  renderLabel = (state) => {
    return null;
  };

  isActive = (state) => {
    return false;
  };

  isEnabled = (state, view) => {
    return this.dryRun(state, view);
  };

  dryRun = (state, view) => {
    const { Proxy } = window;
    const dryRunState = Proxy
      ? new Proxy(state, {
        get: dryRunEditorStateProxyGetter,
        set: dryRunEditorStateProxySetter,
      })
      : state;

    return this.execute(dryRunState, null, view);
  };

  execute = (
    state,
    dispatch,
    view,
    event
  ) => {
    this.waitForUserInput(state, dispatch, view, event)
      .then(inputs => {
        this.executeWithUserInput(state, dispatch, view, inputs);
      })
      .catch(error => {
        console.error(error);
      });
    return false;
  };

  waitForUserInput = (
    state,
    dispatch,
    view,
    event
  ) => {
    return Promise.resolve(undefined);
  };

  executeWithUserInput = (
    state,
    dispatch,
    view,
    inputs
  ) => {
    return false;
  };

  cancel() {
    // subclass should overwrite this.
  }
}

export default UICommand;
